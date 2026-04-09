import React, { useState, useEffect } from 'react';
import { REGISTERS, CATEGORIES } from '../constants';
import { CompanyDetails } from '../types';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  FileText,
  Users,
  ChevronRight,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { exportAllRegistersToExcel } from '../lib/exportUtils';
import { toast } from 'sonner';
import { getDb } from '../services/dbService';

export default function Dashboard({ company, onSelectRegister }: { company: CompanyDetails, onSelectRegister?: (id: string) => void }) {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const db = getDb();
    
    // Fetch audit logs
    const logsResult = db.exec("SELECT user, action, timestamp FROM audit_logs ORDER BY timestamp DESC LIMIT 5");
    if (logsResult.length > 0) {
      setAuditLogs(logsResult[0].values.map((row: any) => ({
        user: row[0],
        action: row[1],
        time: new Date(row[2]).toLocaleString()
      })));
    }

    // Calculate total records
    const registersResult = db.exec("SELECT data FROM registers");
    let count = 0;
    registersResult.forEach(res => {
      res.values.forEach(row => {
        const data = JSON.parse(row[0] as string);
        count += data.length;
      });
    });
    setTotalRecords(count);
  }, []);

  const stats = [
    { label: 'Total Registers', value: '45', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Members', value: '1,240', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Records', value: totalRecords.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Maintenance Health', value: '98%', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const categoryData = CATEGORIES.map(cat => ({
    name: cat.name,
    count: REGISTERS.filter(r => r.category === cat.name).length,
    color: cat.name === 'Members & Shares' ? '#3b82f6' : 
           cat.name === 'Directors & KMP' ? '#10b981' : 
           cat.name === 'Meetings & Attendance' ? '#f59e0b' : 
           cat.name === 'Investments & Loans' ? '#8b5cf6' : '#64748b'
  }));
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              CIN: <span className="font-mono font-medium text-gray-700">{company.cin}</span>
            </p>
            <p className="text-sm text-gray-500">
              FY: <span className="font-medium text-gray-700">{company.financialYear}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            Company Profile
          </Button>
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 gap-2"
            onClick={() => {
              toast.promise(
                async () => {
                  exportAllRegistersToExcel(company);
                },
                {
                  loading: 'Generating Excel file...',
                  success: 'All registers exported successfully!',
                  error: 'Failed to export registers'
                }
              );
            }}
          >
            <Download className="w-4 h-4" />
            Export All Registers
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-green-600 font-medium">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Register Distribution</CardTitle>
              <CardDescription className="text-xs">Statutory registers by category</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-blue-600">View Details</Button>
          </CardHeader>
          <CardContent className="h-[300px] min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  width={140}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">Compliance Status</CardTitle>
            <CardDescription className="text-xs">Companies Act, 2013</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center h-[300px] min-h-[300px] gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-100 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-green-900">Rule 27 & 28 Compliant</h4>
                <p className="text-xs text-green-700 mt-1">Electronic records are secured, backed up, and support digital authentication.</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-blue-900">Format Compliant</h4>
                <p className="text-xs text-blue-700 mt-1">All 45 registers strictly follow MCA prescribed formats (MGT, MBP, SH, etc.).</p>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 flex items-start gap-3">
              <FileText className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-purple-900">Secretarial Standards</h4>
                <p className="text-xs text-purple-700 mt-1">Registers comply with SS-1 and SS-2 requirements for board and general meetings.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm lg:row-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">All Statutory Registers</CardTitle>
              <CardDescription className="text-xs">Quick access to all 45 registers</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none">45 Total</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="divide-y divide-gray-100 pb-20">
                {REGISTERS.map((reg, index) => (
                  <div 
                    key={reg.id} 
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group cursor-pointer"
                    onClick={() => onSelectRegister?.(reg.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{reg.name}</p>
                        <p className="text-[10px] text-gray-500">{reg.section} • {reg.sheetName.split('_')[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end gap-1">
                        <Badge className={cn(
                          "text-[8px] font-bold uppercase tracking-wider h-4 px-1.5",
                          reg.type === 'Statutory' ? "bg-purple-100 text-purple-700 hover:bg-purple-100" : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                        )}>
                          {reg.type}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-green-500" />
                          <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Maintained</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">Recent Record Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {auditLogs.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <div className={cn("w-2 h-2 rounded-full mt-1", 'text-blue-500')} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-bold">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

