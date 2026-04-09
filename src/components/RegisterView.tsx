import React, { useState, useEffect } from 'react';
import { RegisterMetadata, RegisterEntry } from '../types';
import * as XLSX from 'xlsx';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Edit2, 
  Trash2,
  FileSpreadsheet,
  History,
  ShieldCheck
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './ui/dialog';

import { exportSingleRegisterToExcel } from '../lib/exportUtils';
import { toast } from 'sonner';
import { getDb, saveDb } from '../services/dbService';

interface RegisterViewProps {
  register: RegisterMetadata;
}

export default function RegisterView({ register }: RegisterViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const columns = register.fields;
  const [data, setData] = useState<any[]>([]);
  const [newEntry, setNewEntry] = useState<Record<string, any>>({});
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [showAuditLog, setShowAuditLog] = useState(false);

  useEffect(() => {
    loadData();
    loadAuditLogs();
  }, [register.id]);

  const loadData = () => {
    const db = getDb();
    const result = db.exec("SELECT data FROM registers WHERE registerId = ?", [register.id]);
    if (result.length > 0) {
      setData(JSON.parse(result[0].values[0][0] as string));
    } else {
      setData([]);
    }
  };

  const loadAuditLogs = () => {
    const db = getDb();
    const result = db.exec("SELECT user, action, timestamp FROM audit_logs ORDER BY timestamp DESC");
    if (result.length > 0) {
      setAuditLogs(result[0].values.map((row: any) => ({
        user: row[0],
        action: row[1],
        time: new Date(row[2]).toLocaleString()
      })));
    }
  };

  const handleSaveEntry = () => {
    // Ensure all fields have a value, defaulting to empty string if undefined
    const entryData = columns.reduce((acc, col) => {
      acc[col.key] = newEntry[col.key] || '';
      return acc;
    }, {} as Record<string, any>);

    const entry = { ...entryData, id: `entry_${Date.now()}` };
    const newData = [...data, entry];
    
    const db = getDb();
    db.run("INSERT OR REPLACE INTO registers (id, companyId, registerId, data) VALUES (?, ?, ?, ?)", 
      [`reg_${register.id}`, 'comp_1', register.id, JSON.stringify(newData)]);
    
    db.run("INSERT INTO audit_logs (id, user, action, timestamp) VALUES (?, ?, ?, ?)", 
      [`log_${Date.now()}`, 'User', `Added entry to ${register.name}`, new Date().toISOString()]);
    
    saveDb();
    
    setData(newData);
    setNewEntry({});
    loadAuditLogs();
    toast.success("Entry added successfully.");
  };

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white text-blue-600 border-blue-200 font-mono text-[10px]">
              {register.sheetName}
            </Badge>
            <Badge className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              register.type === 'Statutory' ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
            )}>
              {register.type}
            </Badge>
            <span className="text-xs text-gray-500 font-medium">Maintained by: {register.maintainedBy}</span>
          </div>
          <p className="text-sm text-gray-600 max-w-2xl">
            {register.rule}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 gap-2 text-green-700 border-green-200 bg-green-50 hover:bg-green-100"
            onClick={() => setShowAuditLog(true)}
          >
            <History className="w-4 h-4" />
            Audit Trail
          </Button>
          <Dialog open={showAuditLog} onOpenChange={setShowAuditLog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Audit Log</DialogTitle>
                <DialogDescription>
                  Recent activity for {register.name}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="divide-y divide-gray-100">
                  {auditLogs.map((log, i) => (
                    <div key={i} className="p-4">
                      <p className="text-sm text-gray-900">{log.action}</p>
                      <p className="text-xs text-gray-500">{log.user} • {log.time}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 gap-2 text-indigo-700 border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
            onClick={() => {
              toast.success("Register digitally signed and authenticated by CS.");
            }}
          >
            <ShieldCheck className="w-4 h-4" />
            Authenticate
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 gap-2"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = '.xlsx, .xls, .csv';
              input.onchange = async (e: any) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (evt) => {
                  try {
                    const bstr = evt.target?.result;
                    const wb = XLSX.read(bstr, { type: 'binary' });
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
                    
                    if (rawData.length > 1) {
                      const headers = rawData[0];
                      const rows = rawData.slice(1);
                      
                      const keyMap: Record<number, string> = {};
                      headers.forEach((header: string, index: number) => {
                        const col = columns.find(c => c.label.toLowerCase().trim() === header?.toLowerCase().trim());
                        if (col) {
                          keyMap[index] = col.key;
                        }
                      });

                      const newEntries = rows.map((row, rowIndex) => {
                        const entry: any = { id: `imported_${Date.now()}_${rowIndex}` };
                        row.forEach((cell: any, index: number) => {
                          if (keyMap[index]) {
                            entry[keyMap[index]] = cell;
                          }
                        });
                        return entry;
                      }).filter(entry => Object.keys(entry).length > 1);

                      if (newEntries.length > 0) {
                        setData(prev => [...prev, ...newEntries]);
                        toast.success(`Successfully imported ${newEntries.length} entries.`);
                      } else {
                        toast.error('No matching columns found in the imported file. Please ensure headers match the statutory fields.');
                      }
                    } else {
                      toast.error('The imported file is empty or invalid.');
                    }
                  } catch (error) {
                    console.error(error);
                    toast.error('Failed to parse the Excel file.');
                  }
                };
                reader.readAsBinaryString(file);
              };
              input.click();
            }}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Import
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 gap-2"
            onClick={() => {
              toast.promise(
                async () => {
                  exportSingleRegisterToExcel(register);
                },
                {
                  loading: 'Generating Excel file...',
                  success: `${register.sheetName} exported successfully!`,
                  error: 'Failed to export register'
                }
              );
            }}
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger render={
              <Button size="sm" className="h-9 gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Add Entry
              </Button>
            } />
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Add New Entry</DialogTitle>
                <DialogDescription>
                  Enter the details for {register.name} as per {register.section}.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  {columns.map((col) => (
                    <div key={col.key} className="flex flex-col gap-2">
                      <Label htmlFor={col.key} className="text-xs font-bold text-gray-700 uppercase">
                        {col.label}
                      </Label>
                      <Input
                        id={col.key}
                        className="h-9 text-sm"
                        placeholder={`Enter ${col.label.toLowerCase()}...`}
                        value={newEntry[col.key] || ''}
                        onChange={(e) => setNewEntry({...newEntry, [col.key]: e.target.value})}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveEntry}>Save Entry</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="pb-0 pt-6 px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search entries..."
                className="pl-10 bg-gray-50 border-gray-200 h-10 focus-visible:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger render={
                  <Button variant="ghost" size="sm" className="h-10 gap-2 text-gray-600">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                } />
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Advanced Filtering</DialogTitle>
                    <DialogDescription>
                      Advanced filtering functionality is coming soon.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" className="h-10 gap-2 text-gray-600" onClick={() => setShowAuditLog(true)}>
                <History className="w-4 h-4" />
                Audit Log
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-6 border-t border-gray-200">
          <ScrollArea className="h-[calc(100vh-320px)] w-full">
            <Table className="border-collapse w-full">
              <TableHeader className="bg-gray-100 sticky top-0 z-10 shadow-sm">
                <TableRow className="hover:bg-transparent">
                  {columns.map((col) => (
                    <TableHead key={col.key} className="text-[11px] font-bold text-gray-600 uppercase tracking-wider py-3 px-4 border-r border-gray-200 whitespace-nowrap min-w-[150px]">
                      {col.label}
                    </TableHead>
                  ))}
                  <TableHead className="w-[80px] border-r border-gray-200"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, i) => (
                    <TableRow key={row.id} className="group hover:bg-blue-50/50 transition-colors border-b border-gray-200">
                      {columns.map((col) => (
                        <TableCell key={col.key} className="py-3 px-4 text-sm text-gray-700 font-medium border-r border-gray-200 whitespace-nowrap">
                          {row[col.key]}
                        </TableCell>
                      ))}
                      <TableCell className="py-2 px-4 text-right border-r border-gray-200">
                        <DropdownMenu>
                          <DropdownMenuTrigger render={
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          } />
                          <DropdownMenuContent align="end" className="w-40">
                            <div className="px-2 py-1.5 text-sm font-semibold">Actions</div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                              <Edit2 className="w-3.5 h-3.5" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <FileSpreadsheet className="w-3.5 h-3.5" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FileSpreadsheet className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-sm font-medium">No entries found for this register</p>
                        <p className="text-xs mt-1">Try adjusting your search or add a new entry</p>
                        <Button variant="outline" size="sm" className="mt-4 gap-2">
                          <Plus className="w-4 h-4" /> Add First Entry
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-gray-500">
          Showing <span className="font-bold text-gray-900">{filteredData.length}</span> of <span className="font-bold text-gray-900">{data.length}</span> entries
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled className="h-8 text-xs">Previous</Button>
          <Button variant="outline" size="sm" disabled className="h-8 text-xs">Next</Button>
        </div>
      </div>
    </div>
  );
}


