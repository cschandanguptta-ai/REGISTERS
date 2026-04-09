import React, { useState } from 'react';
import { REGISTERS, CATEGORIES } from '../constants';
import { RegisterCategory, RegisterMetadata, CompanyDetails } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  CalendarDays, 
  Banknote, 
  ShieldCheck, 
  Search, 
  Menu, 
  X,
  ChevronRight,
  Settings,
  Bell,
  User,
  ChevronsUpDown,
  PlusCircle,
  Building2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const categoryIcons: Record<string, any> = {
  'Members & Shares': Users,
  'Directors & KMP': UserCog,
  'Meetings & Attendance': CalendarDays,
  'Investments & Loans': Banknote,
  'Governance & Others': ShieldCheck,
};

interface LayoutProps {
  children: React.ReactNode;
  activeRegisterId: string | null;
  onSelectRegister: (id: string | null) => void;
  company: CompanyDetails;
  companies: CompanyDetails[];
  onSwitchCompany: (id: string) => void;
  onAddCompany: () => void;
}

export default function Layout({ 
  children, 
  activeRegisterId, 
  onSelectRegister, 
  company,
  companies,
  onSwitchCompany,
  onAddCompany
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRegisters = REGISTERS.filter(reg => 
    reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedRegisters = CATEGORIES.reduce((acc, cat) => {
    acc[cat.name] = filteredRegisters.filter(reg => reg.category === cat.name);
    return acc;
  }, {} as Record<string, RegisterMetadata[]>);

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col",
          isSidebarOpen ? "w-72" : "w-20"
        )}
      >
        <div className="p-4 flex items-center justify-between border-bottom border-gray-100">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <ShieldCheck className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-gray-900 tracking-tight">StatReg Pro</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mx-auto">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex"
          >
            {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {isSidebarOpen && (
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search registers..."
                className="pl-9 bg-gray-50 border-none h-9 text-sm focus-visible:ring-1 focus-visible:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        <ScrollArea className="flex-1 min-h-0 px-3 py-2">
          <div className="space-y-4 pb-20">
            <Button
              variant={activeRegisterId === null ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-10",
                activeRegisterId === null && "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
              )}
              onClick={() => onSelectRegister(null)}
            >
              <LayoutDashboard className="w-4 h-4" />
              {isSidebarOpen && <span>Dashboard</span>}
            </Button>

            {CATEGORIES.map((cat) => {
              const Icon = categoryIcons[cat.name];
              const regs = groupedRegisters[cat.name];
              if (regs.length === 0) return null;

              return (
                <div key={cat.name} className="space-y-1">
                  {isSidebarOpen ? (
                    <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-4 flex items-center gap-2">
                      <Icon className="w-3 h-3" />
                      {cat.name}
                    </h3>
                  ) : (
                    <Separator className="my-4" />
                  )}
                  {regs.map((reg) => {
                    const globalIndex = REGISTERS.findIndex(r => r.id === reg.id) + 1;
                    return (
                      <Button
                        key={reg.id}
                        variant={activeRegisterId === reg.id ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 h-9 text-sm font-medium transition-colors relative",
                          activeRegisterId === reg.id 
                            ? "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800" 
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                          !isSidebarOpen && "justify-center px-0"
                        )}
                        onClick={() => onSelectRegister(reg.id)}
                        title={reg.name}
                      >
                        {activeRegisterId === reg.id && isSidebarOpen && (
                          <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
                        )}
                        {!isSidebarOpen ? (
                          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-50 text-gray-400 text-[10px] font-bold">
                            {globalIndex}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 overflow-hidden w-full">
                            <span className="text-[10px] font-bold text-gray-400 w-5 shrink-0">{globalIndex}.</span>
                            <div className="flex flex-col items-start overflow-hidden flex-1">
                              <span className="truncate w-full text-left">{reg.name}</span>
                              <span className={cn(
                                "text-[8px] font-bold uppercase tracking-tighter px-1 rounded",
                                reg.type === 'Statutory' ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-500"
                              )}>
                                {reg.type}
                              </span>
                            </div>
                          </div>
                        )}
                      </Button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-100">
          <div className={cn("flex items-center gap-3", !isSidebarOpen && "justify-center")}>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Company Secretary</p>
                <p className="text-xs text-gray-500 truncate">Admin Access</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeRegisterId 
                ? REGISTERS.find(r => r.id === activeRegisterId)?.name 
                : "Compliance Dashboard"}
            </h2>
            {activeRegisterId && (
              <div className="flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-bold uppercase tracking-wider">
                {REGISTERS.find(r => r.id === activeRegisterId)?.section}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Settings className="w-5 h-5" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <DropdownMenu>
              <DropdownMenuTrigger className="h-auto p-2 hover:bg-gray-100 flex items-center gap-3 rounded-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-gray-900 truncate max-w-[150px]">{company.name}</p>
                  <p className="text-[10px] text-gray-500">FY {company.financialYear}</p>
                </div>
                <ChevronsUpDown className="w-4 h-4 text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="px-2 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Switch Company
                </div>
                <DropdownMenuSeparator />
                <ScrollArea className="max-h-[300px]">
                  {companies.map((c) => (
                    <DropdownMenuItem 
                      key={c.id} 
                      onClick={() => onSwitchCompany(c.id)}
                      className={cn(
                        "flex flex-col items-start p-3 cursor-pointer",
                        c.id === company.id && "bg-blue-50"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-sm truncate">{c.name}</span>
                        {c.id === company.id && (
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500 mt-1">CIN: {c.cin}</span>
                    </DropdownMenuItem>
                  ))}
                </ScrollArea>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onAddCompany} className="p-3 cursor-pointer text-blue-600 font-medium flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  Add New Company
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
