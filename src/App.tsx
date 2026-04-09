import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RegisterView from './components/RegisterView';
import Onboarding from './components/Onboarding';
import { REGISTERS } from './constants';
import { CompanyDetails } from './types';
import { Toaster } from './components/ui/sonner';
import { initDb, getDb, saveDb } from './services/dbService';

export default function App() {
  const [activeRegisterId, setActiveRegisterId] = useState<string | null>(null);
  const [companies, setCompanies] = useState<CompanyDetails[]>([]);
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddingCompany, setIsAddingCompany] = useState(false);

  useEffect(() => {
    async function setup() {
      await initDb();
      const db = getDb();
      
      // Load companies from SQLite
      const result = db.exec("SELECT * FROM companies");
      let loadedCompanies: CompanyDetails[] = [];
      if (result.length > 0) {
        loadedCompanies = result[0].values.map((row: any) => ({
          id: row[0],
          name: row[1],
          cin: row[2],
          incorporationDate: row[3]
        }));
      }

      setCompanies(loadedCompanies);
      
      const savedActiveId = localStorage.getItem('statreg_active_company_id');
      if (loadedCompanies.length > 0) {
        if (savedActiveId && loadedCompanies.some(c => c.id === savedActiveId)) {
          setActiveCompanyId(savedActiveId);
        } else {
          setActiveCompanyId(loadedCompanies[0].id);
          localStorage.setItem('statreg_active_company_id', loadedCompanies[0].id);
        }
      }

      setLoading(false);
    }
    setup();
  }, []);

  const handleOnboardingComplete = (details: any) => {
    const newCompany: CompanyDetails = {
      ...details,
      id: 'comp_' + Date.now() + Math.random().toString(36).substring(2, 9)
    };
    
    const db = getDb();
    db.run("INSERT INTO companies (id, name, cin, incorporationDate) VALUES (?, ?, ?, ?)", 
      [newCompany.id, newCompany.name, newCompany.cin, newCompany.incorporationDate]);
    saveDb();

    const updatedCompanies = [...companies, newCompany];
    setCompanies(updatedCompanies);
    setActiveCompanyId(newCompany.id);
    
    localStorage.setItem('statreg_active_company_id', newCompany.id);
    setIsAddingCompany(false);
  };

  const handleSwitchCompany = (id: string) => {
    setActiveCompanyId(id);
    localStorage.setItem('statreg_active_company_id', id);
    setActiveRegisterId(null);
  };

  const activeRegister = activeRegisterId 
    ? REGISTERS.find(r => r.id === activeRegisterId) 
    : null;

  const activeCompany = companies.find(c => c.id === activeCompanyId) || null;

  if (loading) return null;

  if (companies.length === 0 || isAddingCompany) {
    return (
      <>
        <Onboarding 
          onComplete={handleOnboardingComplete} 
          onCancel={companies.length > 0 ? () => setIsAddingCompany(false) : undefined}
        />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Layout 
        activeRegisterId={activeRegisterId} 
        onSelectRegister={setActiveRegisterId}
        company={activeCompany!}
        companies={companies}
        onSwitchCompany={handleSwitchCompany}
        onAddCompany={() => setIsAddingCompany(true)}
      >
        {activeRegister ? (
          <RegisterView register={activeRegister} />
        ) : (
          <Dashboard company={activeCompany!} onSelectRegister={setActiveRegisterId} />
        )}
      </Layout>
      <Toaster position="top-right" />
    </div>
  );
}
