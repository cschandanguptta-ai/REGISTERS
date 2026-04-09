import * as XLSX from 'xlsx';
import { REGISTERS } from '../constants';
import { CompanyDetails } from '../types';

// Mock data for different registers (shared with RegisterView)
export const MOCK_ENTRIES: Record<string, any[]> = {
  'mgt-1': [
    { id: '1', folio: '001', name: 'John Doe', address: '123 Main St, Mumbai', occupation: 'Business', pan_cin: 'ABCDE1234F', parent_name: 'Robert Doe', nationality: 'Indian', entry_date: '2020-01-01', shares_count: 5000, distinctive_nos: '1-5000', nominal_value: 10, amount_paid: 50000 },
    { id: '2', folio: '002', name: 'Jane Smith', address: '456 Park Ave, Delhi', occupation: 'Professional', pan_cin: 'FGHIJ5678K', parent_name: 'William Smith', nationality: 'Indian', entry_date: '2021-03-15', shares_count: 2500, distinctive_nos: '5001-7500', nominal_value: 10, amount_paid: 25000 },
  ],
  'dir-12': [
    { id: '1', din: '01234567', name: 'Rahul Sharma', father_name: 'Suresh Sharma', address: 'Bandra, Mumbai', designation: 'Managing Director', appt_date: '2015-10-10', qualification: 'CA, CS', pan: 'ABCDE1234F', nationality: 'Indian' },
    { id: '2', din: '08765432', name: 'Anita Gupta', father_name: 'Ramesh Gupta', address: 'South Ex, Delhi', designation: 'Director', appt_date: '2018-06-20', qualification: 'MBA', pan: 'FGHIJ5678K', nationality: 'Indian' },
  ]
};

export const exportSingleRegisterToExcel = (register: typeof REGISTERS[0]) => {
  const wb = XLSX.utils.book_new();
  const data = MOCK_ENTRIES[register.id] || [];
  const headers = register.fields.map(f => f.label);
  const keys = register.fields.map(f => f.key);

  const sheetData = [headers];

  data.forEach(entry => {
    const row = keys.map(key => entry[key] || '');
    sheetData.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  
  let sheetName = register.sheetName.substring(0, 31);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const fileName = `${register.sheetName}_export.xlsx`;
  XLSX.writeFile(wb, fileName);
};

export const exportAllRegistersToExcel = (company: CompanyDetails) => {
  const wb = XLSX.utils.book_new();

  // Add a summary sheet
  const summaryData = [
    ['Company Name', company.name],
    ['CIN', company.cin],
    ['Address', company.address],
    ['Email', company.email],
    ['Financial Year', company.financialYear],
    ['Export Date', new Date().toLocaleDateString()],
    [],
    ['Register Name', 'Section', 'Type', 'Category', 'Status']
  ];

  REGISTERS.forEach(reg => {
    summaryData.push([
      reg.name,
      reg.section,
      reg.type,
      reg.category,
      MOCK_ENTRIES[reg.id] ? `${MOCK_ENTRIES[reg.id].length} Entries` : 'Empty'
    ]);
  });

  const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');

  // Add a sheet for each register
  REGISTERS.forEach(reg => {
    const data = MOCK_ENTRIES[reg.id] || [];
    const headers = reg.fields.map(f => f.label);
    const keys = reg.fields.map(f => f.key);

    const sheetData = [headers];

    data.forEach(entry => {
      const row = keys.map(key => entry[key] || '');
      sheetData.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    
    // Sheet names cannot exceed 31 characters in Excel
    let sheetName = reg.sheetName.substring(0, 31);
    // Ensure unique sheet names if truncated (though sheetName should be unique enough)
    
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  // Generate Excel file and trigger download
  const fileName = `${company.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_all_registers.xlsx`;
  XLSX.writeFile(wb, fileName);
};
