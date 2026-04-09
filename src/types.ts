export interface RegisterField {
  label: string;
  key: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'email';
  required?: boolean;
}

export interface RegisterMetadata {
  id: string;
  name: string;
  section: string;
  rule: string;
  sheetName: string;
  maintainedBy: string;
  remarks?: string;
  category: 'Members & Shares' | 'Directors & KMP' | 'Meetings & Attendance' | 'Investments & Loans' | 'Governance & Others';
  type: 'Statutory' | 'Non-Statutory';
  fields: RegisterField[];
}

export interface RegisterEntry {
  id: string;
  registerId: string;
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type RegisterCategory = RegisterMetadata['category'];

export interface CompanyDetails {
  id: string;
  name: string;
  cin: string;
  address: string;
  email: string;
  financialYear: string;
  onboarded: boolean;
}
