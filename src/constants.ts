import { RegisterMetadata } from './types';

export const REGISTERS: RegisterMetadata[] = [
  {
    id: 'mgt-1',
    name: 'Register of Members',
    section: 'Sec. 88(1)(a)',
    rule: 'Rule 3, Companies (MGT) Rules 2014',
    sheetName: 'MGT-1_Members',
    maintainedBy: 'Company Secretary',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Folio Number', key: 'folio', type: 'string', required: true },
      { label: 'Full Name of Member', key: 'name', type: 'string', required: true },
      { label: "Father's/Mother's/Spouse's Name", key: 'parent_name', type: 'string' },
      { label: 'Date of Birth (if minor)', key: 'dob', type: 'date' },
      { label: 'Name of Guardian (if minor)', key: 'guardian_name', type: 'string' },
      { label: 'Address (including e-mail)', key: 'address', type: 'string' },
      { label: 'Occupation', key: 'occupation', type: 'string' },
      { label: 'PAN / Aadhaar / Passport / CIN', key: 'id_number', type: 'string' },
      { label: 'Nationality', key: 'nationality', type: 'string' },
      { label: 'Status (Individual/Body Corp/HUF/Trust)', key: 'status', type: 'string' },
      { label: 'Date of becoming a Member', key: 'entry_date', type: 'date' },
      { label: 'Date of declaration under Sec 89', key: 'sec89_date', type: 'date' },
      { label: 'Date of cessation (and reason)', key: 'cessation_date', type: 'date' },
      { label: 'Class of Shares (Equity/Preference)', key: 'share_class', type: 'string' },
      { label: 'Number of Shares held', key: 'shares_count', type: 'number' },
      { label: 'Distinctive Numbers (From – To)', key: 'distinctive_nos', type: 'string' },
      { label: 'Certificate Number(s)', key: 'cert_nos', type: 'string' },
      { label: 'Amount Paid-up per Share', key: 'paid_up_amount', type: 'number' },
      { label: 'Amount called-up but unpaid', key: 'unpaid_amount', type: 'number' },
      { label: 'Nominal Value of Shares', key: 'nominal_value', type: 'number' },
      { label: 'Details of Shares transferred', key: 'transfer_details', type: 'string' },
      { label: 'Details of Transmission', key: 'transmission_details', type: 'string' },
      { label: 'Details of Forfeiture/Surrender', key: 'forfeiture_details', type: 'string' },
      { label: 'Details of Calls made/paid', key: 'calls_details', type: 'string' },
      { label: 'Lien on Shares', key: 'lien_details', type: 'string' },
      { label: 'Details of Joint Holders', key: 'joint_holders', type: 'string' },
      { label: 'Nominee details', key: 'nominee_details', type: 'string' },
      { label: 'Pledge/Hypothecation details', key: 'pledge_details', type: 'string' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'mgt-2',
    name: 'Register of Debenture Holders / Other Security Holders',
    section: 'Sec. 88(1)(b) & (c)',
    rule: 'Rule 4, Companies (MGT) Rules 2014',
    sheetName: 'MGT-2_Debentures',
    maintainedBy: 'Company Secretary',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Name of Holder', key: 'name', type: 'string', required: true },
      { label: 'Address (including e-mail)', key: 'address', type: 'string' },
      { label: 'Occupation', key: 'occupation', type: 'string' },
      { label: 'PAN / CIN / Registration No.', key: 'id_number', type: 'string' },
      { label: "Father's/Mother's/Spouse's Name", key: 'parent_name', type: 'string' },
      { label: 'Date of Birth (if minor)', key: 'dob', type: 'date' },
      { label: 'Name of Guardian (if minor)', key: 'guardian_name', type: 'string' },
      { label: 'Nationality', key: 'nationality', type: 'string' },
      { label: 'Date of becoming holder', key: 'entry_date', type: 'date' },
      { label: 'Date of cessation as holder', key: 'cessation_date', type: 'date' },
      { label: 'Type/Class of Debenture/Security', key: 'security_type', type: 'string' },
      { label: 'Number of Debentures/Securities', key: 'count', type: 'number' },
      { label: 'Distinctive Numbers', key: 'distinctive_nos', type: 'string' },
      { label: 'Certificate Number(s)', key: 'cert_nos', type: 'string' },
      { label: 'Nominal Value', key: 'nominal_value', type: 'number' },
      { label: 'Amount Paid-up', key: 'paid_up_amount', type: 'number' },
      { label: 'Principal Amount held', key: 'principal_amount', type: 'number' },
      { label: 'Date of Allotment', key: 'allotment_date', type: 'date' },
      { label: 'Details of Transfers/Transmissions', key: 'transfer_details', type: 'string' },
      { label: 'Redemption Details (date, amount)', key: 'redemption_details', type: 'string' },
      { label: 'Interest Payment Records', key: 'interest_records', type: 'string' },
      { label: 'Conversion Details', key: 'conversion_details', type: 'string' },
      { label: 'Details of Joint Holders', key: 'joint_holders', type: 'string' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'mgt-index',
    name: 'Register of Index of Members',
    section: 'Sec. 88(2)',
    rule: 'Rule 5, Companies (MGT) Rules 2014',
    sheetName: 'MGT-Index',
    maintainedBy: 'Company Secretary',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Name of Member', key: 'name', type: 'string', required: true },
      { label: 'Folio No.', key: 'folio', type: 'string', required: true },
      { label: 'Page No. in Register', key: 'page_no', type: 'number' }
    ]
  },
  {
    id: 'mgt-foreign',
    name: 'Foreign Register of Members, Debenture Holders',
    section: 'Sec. 88(4)',
    rule: 'Rule 7, Companies (MGT) Rules 2014',
    sheetName: 'MGT-3_Foreign',
    maintainedBy: 'Company Secretary',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Name of Member/Holder', key: 'name', type: 'string', required: true },
      { label: 'Country of Residence', key: 'country', type: 'string', required: true },
      { label: 'Address (including e-mail)', key: 'address', type: 'string' },
      { label: 'PAN / CIN / Registration No.', key: 'id_number', type: 'string' },
      { label: 'Nationality', key: 'nationality', type: 'string' },
      { label: 'Date of becoming member/holder', key: 'entry_date', type: 'date' },
      { label: 'Number of Shares/Securities', key: 'count', type: 'number' },
      { label: 'Distinctive Numbers', key: 'distinctive_nos', type: 'string' },
      { label: 'Certificate Number(s)', key: 'cert_nos', type: 'string' },
      { label: 'Details of agent in India', key: 'agent_details', type: 'string' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'dir-12',
    name: 'Register of Directors and KMP and their Shareholding',
    section: 'Sec. 170',
    rule: 'Rule 17, Companies (Appt & Qual) Rules 2014',
    sheetName: 'DIR-170_Register',
    maintainedBy: 'Company Secretary',
    category: 'Directors & KMP',
    type: 'Statutory',
    fields: [
      { label: 'DIN (optional for KMP)', key: 'din', type: 'string' },
      { label: 'Present Name and Surname', key: 'name', type: 'string', required: true },
      { label: 'Any Former Name', key: 'former_name', type: 'string' },
      { label: "Father's/Mother's/Spouse's Name", key: 'parent_name', type: 'string' },
      { label: 'Date of Birth', key: 'dob', type: 'date' },
      { label: 'Nationality', key: 'nationality', type: 'string' },
      { label: 'Occupation', key: 'occupation', type: 'string' },
      { label: 'Residential Address', key: 'address', type: 'string' },
      { label: 'E-mail ID', key: 'email', type: 'email' },
      { label: 'PAN', key: 'pan', type: 'string' },
      { label: 'Educational Qualification', key: 'qualification', type: 'string' },
      { label: 'Designation', key: 'designation', type: 'string' },
      { label: 'Category (Exec/Non-Exec/Ind/Woman)', key: 'category', type: 'string' },
      { label: 'Date of Board Resolution', key: 'res_date', type: 'date' },
      { label: 'Date of Appointment', key: 'appt_date', type: 'date' },
      { label: 'Date of Cessation and Reasons', key: 'cessation_info', type: 'string' },
      { label: 'Membership No. (for CS)', key: 'membership_no', type: 'string' },
      { label: 'Other Directorships held', key: 'other_directorships', type: 'string' },
      { label: 'Date of acquisition of shares', key: 'share_acq_date', type: 'date' },
      { label: 'Number of Shares held', key: 'shares_held', type: 'number' },
      { label: 'Face Value and Paid-up value', key: 'share_values', type: 'string' },
      { label: 'Shares in Holding/Subsidiary/Assoc', key: 'group_shares', type: 'string' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'mbp-4',
    name: 'Register of Contracts or Arrangements in which Directors are Interested',
    section: 'Sec. 189(1)',
    rule: 'Rule 16, Companies (Meetings) Rules 2014',
    sheetName: 'MBP-4_Contracts',
    maintainedBy: 'Company Secretary',
    category: 'Governance & Others',
    type: 'Statutory',
    fields: [
      { label: 'Date of Contract/Arrangement', key: 'contract_date', type: 'date' },
      { label: 'Names of Related Parties', key: 'party_names', type: 'string', required: true },
      { label: 'Nature of Contract/Arrangement', key: 'nature', type: 'string' },
      { label: 'Name of Interested Director', key: 'director_name', type: 'string' },
      { label: 'Nature of Interest or Concern', key: 'interest_nature', type: 'string' },
      { label: 'Salient Terms and Conditions', key: 'terms', type: 'string' },
      { label: "Whether transaction is at arm's length", key: 'arms_length', type: 'string' },
      { label: 'Duration of Contract', key: 'duration', type: 'string' },
      { label: 'Value/Amount', key: 'value', type: 'number' },
      { label: 'Date of Board Approval', key: 'board_approval_date', type: 'date' },
      { label: 'Date of GM Approval', key: 'gm_approval_date', type: 'date' },
      { label: 'Details of modification', key: 'mod_details', type: 'string' },
      { label: 'Names of Bodies Corp/Firms interested', key: 'entities_interested', type: 'string' },
      { label: 'Date of MBP-1 Notice', key: 'mbp1_date', type: 'date' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'mbp-2',
    name: 'Register of Loans, Guarantees, Securities and Acquisitions',
    section: 'Sec. 186(9)',
    rule: 'Rule 12, Companies (Meetings) Rules 2014',
    sheetName: 'MBP-2_Loans',
    maintainedBy: 'Company Secretary',
    category: 'Investments & Loans',
    type: 'Statutory',
    fields: [
      { label: 'Date of Resolution', key: 'res_date', type: 'date' },
      { label: 'Date of Special Resolution (if req)', key: 'special_res_date', type: 'date' },
      { label: 'Nature of Transaction', key: 'nature', type: 'string', required: true },
      { label: 'Name and Address of Person/Entity', key: 'entity_info', type: 'string', required: true },
      { label: 'CIN/PAN of Borrower/Investee', key: 'id_number', type: 'string' },
      { label: 'Relation (if related party)', key: 'relation', type: 'string' },
      { label: 'Purpose', key: 'purpose', type: 'string' },
      { label: 'Amount', key: 'amount', type: 'number', required: true },
      { label: '% of loan/guarantee to paid-up cap', key: 'percent_cap', type: 'number' },
      { label: 'Rate of Interest', key: 'roi', type: 'number' },
      { label: 'Terms and Conditions', key: 'terms', type: 'string' },
      { label: 'Period/Tenure', key: 'tenure', type: 'string' },
      { label: 'Repayment Schedule', key: 'repayment_schedule', type: 'string' },
      { label: 'Details of Security Provided', key: 'security_details', type: 'string' },
      { label: 'Date of Making Transaction', key: 'transaction_date', type: 'date' },
      { label: 'Date of Repayment/Release', key: 'release_date', type: 'date' },
      { label: 'Amount Outstanding', key: 'outstanding_amount', type: 'number' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'chg-register',
    name: 'Register of Charges',
    section: 'Sec. 85',
    rule: 'Rule 10, Companies (Registration of Charges) Rules 2014',
    sheetName: 'CHG_Register',
    maintainedBy: 'Company Secretary',
    category: 'Investments & Loans',
    type: 'Statutory',
    fields: [
      { label: 'Serial Number', key: 'serial_no', type: 'number' },
      { label: 'SRN of Form filed with ROC', key: 'srn', type: 'string' },
      { label: 'Date of Creation of Charge', key: 'creation_date', type: 'date' },
      { label: 'Date of Registration with ROC', key: 'reg_date', type: 'date' },
      { label: 'Description/Nature of Charge', key: 'nature', type: 'string' },
      { label: 'Amount Secured', key: 'amount', type: 'number' },
      { label: 'Particulars of Property Charged', key: 'property_details', type: 'string' },
      { label: 'Name(s) and Address(es) of Holder', key: 'holder_info', type: 'string' },
      { label: 'Terms and Conditions', key: 'terms', type: 'string' },
      { label: 'Rate of Interest', key: 'roi', type: 'number' },
      { label: 'Margin', key: 'margin', type: 'string' },
      { label: 'Extent of Operation', key: 'extent', type: 'string' },
      { label: 'Date of Modification', key: 'mod_date', type: 'date' },
      { label: 'Particulars of Modification', key: 'mod_details', type: 'string' },
      { label: 'Date of Satisfaction', key: 'satisfaction_date', type: 'date' },
      { label: 'Charge ID (from ROC)', key: 'charge_id', type: 'string' },
      { label: 'Instrument Reference', key: 'instrument_ref', type: 'string' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'sh-2',
    name: 'Register of Renewed or Duplicate Share Certificates',
    section: 'Rule 6(7)',
    rule: 'Companies (Share Capital) Rules 2014',
    sheetName: 'SH-2_DupShare',
    maintainedBy: 'Company Secretary',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Name of the Shareholder', key: 'name', type: 'string', required: true },
      { label: 'Folio Number', key: 'folio', type: 'string' },
      { label: 'Number of Shares', key: 'shares_count', type: 'number' },
      { label: 'Distinctive Numbers', key: 'distinctive_nos', type: 'string' },
      { label: 'Date of Issue of Original', key: 'orig_issue_date', type: 'date' },
      { label: 'Date of Issue of Renewed/Dup', key: 'new_issue_date', type: 'date' },
      { label: 'New Certificate Number', key: 'new_cert_no', type: 'string' },
      { label: 'Old Certificate Number', key: 'old_cert_no', type: 'string' },
      { label: 'Reason for Renewal/Duplicate', key: 'reason', type: 'string' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'sh-10',
    name: 'Register of Securities Bought Back',
    section: 'Sec. 68(9)',
    rule: 'Rule 17(12), Companies (Share Capital) Rules 2014',
    sheetName: 'SH-10_BuyBack',
    maintainedBy: 'Company Secretary',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Date of passing Special Resolution', key: 'special_res_date', type: 'date' },
      { label: 'Date of Board Approval', key: 'board_res_date', type: 'date' },
      { label: 'Number and Class of Shares/Securities', key: 'shares_info', type: 'string', required: true },
      { label: 'Distinctive Numbers', key: 'distinctive_nos', type: 'string' },
      { label: 'Consideration Paid', key: 'consideration', type: 'number' },
      { label: 'Date of Buy-back', key: 'buyback_date', type: 'date' },
      { label: 'Date of Cancellation', key: 'cancel_date', type: 'date' },
      { label: 'Date of Extinguishing/Destroying', key: 'destroy_date', type: 'date' },
      { label: 'Mode of Buy-back', key: 'mode', type: 'string' },
      { label: 'Name and Address of Seller', key: 'seller_info', type: 'string' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'sh-3',
    name: 'Register of Sweat Equity Shares',
    section: 'Sec. 54',
    rule: 'Rule 8(14), Companies (Share Capital) Rules 2014',
    sheetName: 'SH-3_SweatEquity',
    maintainedBy: 'Company Secretary',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Name of the Person', key: 'name', type: 'string', required: true },
      { label: 'Designation/Relationship', key: 'relation', type: 'string' },
      { label: 'Class of Shares issued', key: 'share_class', type: 'string' },
      { label: 'Number of Shares issued', key: 'shares_count', type: 'number' },
      { label: 'Nominal/Face Value per Share', key: 'face_value', type: 'number' },
      { label: 'Consideration (other than cash)', key: 'consideration_nature', type: 'string' },
      { label: 'Valuation of Consideration', key: 'valuation', type: 'number' },
      { label: 'Date of Issue/Allotment', key: 'allotment_date', type: 'date' },
      { label: 'Price at which issued', key: 'issue_price', type: 'number' },
      { label: 'Lock-in Period', key: 'lock_in', type: 'string' },
      { label: 'Date of Expiry of Lock-in', key: 'lock_in_expiry', type: 'date' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'sh-6',
    name: 'Register of Employee Stock Options',
    section: 'Sec. 62(1)(b)',
    rule: 'Rule 12(9), Companies (Share Capital) Rules 2014',
    sheetName: 'SH-6_ESOP',
    maintainedBy: 'Company Secretary',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Name of the Grantee (Employee)', key: 'name', type: 'string', required: true },
      { label: 'Designation', key: 'designation', type: 'string' },
      { label: 'Employee ID', key: 'emp_id', type: 'string' },
      { label: 'Number of Options Granted', key: 'granted_count', type: 'number' },
      { label: 'Date of Grant', key: 'grant_date', type: 'date' },
      { label: 'Exercise Price', key: 'exercise_price', type: 'number' },
      { label: 'Date of Vesting', key: 'vesting_date', type: 'date' },
      { label: 'Vesting Period', key: 'vesting_period', type: 'string' },
      { label: 'Exercise Period', key: 'exercise_period', type: 'string' },
      { label: 'Number of Options Exercised', key: 'exercised_count', type: 'number' },
      { label: 'Date of Exercise', key: 'exercise_date', type: 'date' },
      { label: 'Number of Shares from Exercise', key: 'shares_count', type: 'number' },
      { label: 'Lock-in Period', key: 'lock_in', type: 'string' },
      { label: 'Options Lapsed/Forfeited', key: 'lapsed_count', type: 'number' },
      { label: 'Consideration received', key: 'consideration', type: 'number' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'ben-3',
    name: 'Register of Significant Beneficial Owners',
    section: 'Sec. 90',
    rule: 'Rule 9, Companies (SBO) Rules 2018',
    sheetName: 'BEN-3_SBO',
    maintainedBy: 'Company Secretary',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Name of Registered Owner', key: 'owner_name', type: 'string', required: true },
      { label: 'Name of SBO', key: 'sbo_name', type: 'string', required: true },
      { label: "Father's/Mother's/Spouse's Name", key: 'parent_name', type: 'string' },
      { label: 'Nationality of SBO', key: 'nationality', type: 'string' },
      { label: 'Date of Birth of SBO', key: 'dob', type: 'date' },
      { label: 'Residential Address of SBO', key: 'address', type: 'string' },
      { label: 'PAN / Passport Number of SBO', key: 'id_number', type: 'string' },
      { label: 'Nature of Interest', key: 'interest_nature', type: 'string' },
      { label: 'Percentage of Beneficial Interest', key: 'interest_percent', type: 'number' },
      { label: 'Date of BEN-1 Declaration', key: 'ben1_date', type: 'date' },
      { label: 'Date of Entry in Register', key: 'entry_date', type: 'date' },
      { label: 'Date of Cessation', key: 'cessation_date', type: 'date' },
      { label: 'Date of Filing BEN-2', key: 'ben2_date', type: 'date' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'dpt-register',
    name: 'Register of Deposits',
    section: 'Sec. 73 & 76',
    rule: 'Rule 14, Companies (Acceptance of Deposits) Rules 2014',
    sheetName: 'DPT_Register',
    maintainedBy: 'Company Secretary',
    category: 'Investments & Loans',
    type: 'Statutory',
    fields: [
      { label: 'Name and Address of Depositor', key: 'name', type: 'string', required: true },
      { label: 'PAN of Depositor', key: 'pan', type: 'string' },
      { label: "Father's/Mother's/Spouse's Name", key: 'parent_name', type: 'string' },
      { label: 'Particulars of Guardian (minor)', key: 'guardian_info', type: 'string' },
      { label: 'Particulars of Nominee', key: 'nominee_info', type: 'string' },
      { label: 'Deposit Receipt Number', key: 'receipt_no', type: 'string' },
      { label: 'Date of Deposit / Renewal', key: 'date', type: 'date' },
      { label: 'Amount of Each Deposit', key: 'amount', type: 'number' },
      { label: 'Duration/Tenure', key: 'tenure', type: 'string' },
      { label: 'Date of Maturity', key: 'maturity_date', type: 'date' },
      { label: 'Rate of Interest', key: 'roi', type: 'number' },
      { label: 'Due Date for Interest', key: 'interest_due_date', type: 'date' },
      { label: 'Mode of Payment of Interest', key: 'interest_mode', type: 'string' },
      { label: 'Mandate for Payment (bank)', key: 'bank_mandate', type: 'string' },
      { label: 'Particulars of Charge Created', key: 'charge_details', type: 'string' },
      { label: 'Date and Amount of Repayment', key: 'repayment_info', type: 'string' },
      { label: 'Premature Withdrawal details', key: 'withdrawal_details', type: 'string' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'mbp-3',
    name: 'Register of Investments Not Held in Its Own Name',
    section: 'Sec. 187',
    rule: 'Rule 14, Companies (Meetings) Rules 2014',
    sheetName: 'MBP-3_Investments',
    maintainedBy: 'Company Secretary',
    category: 'Investments & Loans',
    type: 'Statutory',
    fields: [
      { label: 'Date of Board Resolution', key: 'res_date', type: 'date' },
      { label: 'Date of Investment', key: 'investment_date', type: 'date' },
      { label: 'Name of Person/Depository', key: 'held_name', type: 'string' },
      { label: 'Address and Relationship', key: 'held_info', type: 'string' },
      { label: 'Reason for not holding in Co Name', key: 'reason', type: 'string' },
      { label: 'Name of Investee Company', key: 'investee_name', type: 'string' },
      { label: 'CIN/Registration of Investee', key: 'investee_id', type: 'string' },
      { label: 'Nature/Type of Securities', key: 'security_type', type: 'string' },
      { label: 'Number of Securities', key: 'count', type: 'number' },
      { label: 'Face Value', key: 'face_value', type: 'number' },
      { label: 'Cost of Acquisition', key: 'cost', type: 'number' },
      { label: 'Date of Disposal', key: 'disposal_date', type: 'date' },
      { label: 'Sale Consideration', key: 'consideration', type: 'number' },
      { label: 'Gain/Loss on Disposal', key: 'gain_loss', type: 'number' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'sh-7',
    name: 'Register of Alteration of Share Capital',
    section: 'Sec. 64 | Rule 15',
    rule: 'Companies (Share Capital) Rules 2014',
    sheetName: 'SH-7_AltShareCap',
    maintainedBy: 'CS / PCS',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Date of Alteration', key: 'date', type: 'date' },
      { label: 'Nature of Alteration', key: 'nature', type: 'string' },
      { label: 'Previous Capital', key: 'prev_cap', type: 'number' },
      { label: 'New Capital', key: 'new_cap', type: 'number' }
    ]
  },
  {
    id: 'sh-4',
    name: 'Register of Transfer and Transmission of Shares',
    section: 'Sec. 56 | Rule 11',
    rule: 'Companies (Share Capital) Rules 2014',
    sheetName: 'SH-4_Transfers',
    maintainedBy: 'CS / PCS',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Transfer No.', key: 'transfer_no', type: 'string' },
      { label: 'Date of Transfer', key: 'date', type: 'date' },
      { label: 'Transferor Name', key: 'transferor', type: 'string' },
      { label: 'Transferee Name', key: 'transferee', type: 'string' },
      { label: 'No. of Shares', key: 'count', type: 'number' }
    ]
  },
  {
    id: 'mbp-1',
    name: "Register of Directors' Interest / Disclosure (MBP-1)",
    section: 'Sec. 184 | Rule 9',
    rule: 'Companies (Meetings) Rules 2014',
    sheetName: 'MBP-1_DirInterest',
    maintainedBy: 'CS',
    remarks: 'Every FY — first BM',
    category: 'Directors & KMP',
    type: 'Statutory',
    fields: [
      { label: 'Name of Director', key: 'name', type: 'string' },
      { label: 'Date of Disclosure', key: 'date', type: 'date' },
      { label: 'Nature of Interest', key: 'nature', type: 'string' },
      { label: 'Entities Interested In', key: 'entities', type: 'string' }
    ]
  },
  {
    id: 'dir-8',
    name: "Register of Directors' Disqualification",
    section: 'Sec. 164(2) | Rule 14',
    rule: 'Companies (Appt & Qual) Rules 2014',
    sheetName: 'DIR-8_Disqualification',
    maintainedBy: 'CS / Board',
    category: 'Directors & KMP',
    type: 'Statutory',
    fields: [
      { label: 'Name of Director', key: 'name', type: 'string' },
      { label: 'DIN', key: 'din', type: 'string' },
      { label: 'Reason for Disqualification', key: 'reason', type: 'string' },
      { label: 'Period of Disqualification', key: 'period', type: 'string' }
    ]
  },
  {
    id: 'att-board',
    name: 'Attendance Register — Board Meetings',
    section: 'Sec. 118 | SS-1',
    rule: 'Secretarial Standard - 1',
    sheetName: 'ATT-Board_Meetings',
    maintainedBy: 'CS',
    remarks: 'Every Board Meeting',
    category: 'Meetings & Attendance',
    type: 'Statutory',
    fields: [
      { label: 'Date of Meeting', key: 'date', type: 'date' },
      { label: 'Time of Meeting', key: 'time', type: 'string' },
      { label: 'Place of Meeting', key: 'place', type: 'string' },
      { label: 'Name of Director', key: 'name', type: 'string' },
      { label: 'Mode of Attendance', key: 'mode', type: 'string' },
      { label: 'Signature/Confirmation', key: 'sign', type: 'string' }
    ]
  },
  {
    id: 'att-general',
    name: 'Attendance Register — General Meetings',
    section: 'Sec. 101, 118 | SS-2',
    rule: 'Secretarial Standard - 2',
    sheetName: 'ATT-General_Meeting',
    maintainedBy: 'CS',
    remarks: 'Every GM',
    category: 'Meetings & Attendance',
    type: 'Statutory',
    fields: [
      { label: 'Date of Meeting', key: 'date', type: 'date' },
      { label: 'Name of Member', key: 'name', type: 'string' },
      { label: 'Folio No.', key: 'folio', type: 'string' },
      { label: 'Signature', key: 'sign', type: 'string' }
    ]
  },
  {
    id: 'proxy-register',
    name: 'Register of Proxies',
    section: 'Sec. 105 | Rule 19',
    rule: 'Companies (MGT) Rules 2014',
    sheetName: 'PROXY_Register',
    maintainedBy: 'CS',
    category: 'Meetings & Attendance',
    type: 'Statutory',
    fields: [
      { label: 'Date of Meeting', key: 'date', type: 'date' },
      { label: 'Name of Member', key: 'member_name', type: 'string' },
      { label: 'Name of Proxy', key: 'proxy_name', type: 'string' },
      { label: 'Date of Receipt of Proxy', key: 'receipt_date', type: 'date' }
    ]
  },
  {
    id: 'postal-ballot',
    name: 'Register of Postal Ballot',
    section: 'Sec. 110',
    rule: 'Rule 22, Companies (MGT) Rules 2014',
    sheetName: 'POSTAL_BALLOT_Reg',
    maintainedBy: 'PCS Scrutiniser',
    category: 'Meetings & Attendance',
    type: 'Statutory',
    fields: [
      { label: 'Name of the Member', key: 'name', type: 'string', required: true },
      { label: 'Registered Folio / DP ID', key: 'folio', type: 'string' },
      { label: 'Number of Shares held', key: 'shares_count', type: 'number' },
      { label: 'Date of dispatch of Notice', key: 'dispatch_date', type: 'date' },
      { label: 'Date of receipt of Ballot/e-voting', key: 'receipt_date', type: 'date' },
      { label: 'Assent or Dissent', key: 'vote_type', type: 'string' },
      { label: 'Number of Votes (For / Against)', key: 'votes_count', type: 'number' },
      { label: 'Invalid/Rejected ballots', key: 'rejected_info', type: 'string' },
      { label: 'Scrutinizer Report reference', key: 'report_ref', type: 'string' },
      { label: 'Date and Result of Resolution', key: 'result_info', type: 'string' },
      { label: 'Remarks', key: 'remarks', type: 'string' }
    ]
  },
  {
    id: 'allotment-register',
    name: 'Register of Allotment of Shares / Securities',
    section: 'Sec. 39, 42, 62 | Rule 12, 14',
    rule: 'Companies (Share Capital) Rules 2014',
    sheetName: 'ALLOTMENT_Register',
    maintainedBy: 'CS / PCS',
    category: 'Members & Shares',
    type: 'Statutory',
    fields: [
      { label: 'Date of Allotment', key: 'date', type: 'date' },
      { label: 'Name of Allottee', key: 'name', type: 'string' },
      { label: 'No. of Shares Allotted', key: 'count', type: 'number' },
      { label: 'Distinctive Nos.', key: 'distinctive', type: 'string' }
    ]
  },
  {
    id: 'dividend-register',
    name: 'Register of Dividend Payments',
    section: 'Sec. 123-127 | Div. Rules',
    rule: 'Companies (Declaration and Payment of Dividend) Rules 2014',
    sheetName: 'DIVIDEND_Register',
    maintainedBy: 'CS',
    category: 'Governance & Others',
    type: 'Statutory',
    fields: [
      { label: 'Year of Dividend', key: 'year', type: 'string' },
      { label: 'Name of Member', key: 'name', type: 'string' },
      { label: 'Dividend Amount', key: 'amount', type: 'number' },
      { label: 'Date of Payment', key: 'pay_date', type: 'date' }
    ]
  },
  {
    id: 'unpaid-dividend',
    name: 'Register of Unpaid / Unclaimed Dividend',
    section: 'Sec. 124 | IEPF Rules 2016',
    rule: 'IEPF Rules 2016',
    sheetName: 'UNPAID_DIVIDEND_Reg',
    maintainedBy: 'CS / PCS',
    remarks: 'IEPF transfer after 7 yrs',
    category: 'Governance & Others',
    type: 'Statutory',
    fields: [
      { label: 'Name of Member', key: 'name', type: 'string' },
      { label: 'Unpaid Amount', key: 'amount', type: 'number' },
      { label: 'Date of Transfer to Unpaid A/c', key: 'transfer_date', type: 'date' },
      { label: 'Due Date for IEPF Transfer', key: 'iepf_due', type: 'date' }
    ]
  },
  {
    id: 'invest-186',
    name: 'Register of Investments under Section 186',
    section: 'Sec. 186(9) | Rule 12',
    rule: 'Companies (Meetings) Rules 2014',
    sheetName: 'INVEST-Sec186_Reg',
    maintainedBy: 'CS / PCS',
    category: 'Investments & Loans',
    type: 'Statutory',
    fields: [
      { label: 'Name of Body Corporate', key: 'name', type: 'string' },
      { label: 'Amount of Investment', key: 'amount', type: 'number' },
      { label: 'Date of Investment', key: 'date', type: 'date' }
    ]
  },
  {
    id: 'dir-att-annual',
    name: "Annual Summary — Directors' Attendance",
    section: 'Sec. 173 | SS-1',
    rule: 'Secretarial Standard - 1',
    sheetName: 'DIR-ATTEND_Annual',
    maintainedBy: 'CS',
    remarks: 'Annual compilation',
    category: 'Meetings & Attendance',
    type: 'Statutory',
    fields: [
      { label: 'Name of Director', key: 'name', type: 'string' },
      { label: 'Total Meetings in FY', key: 'total', type: 'number' },
      { label: 'Meetings Attended', key: 'attended', type: 'number' },
      { label: '% Attendance', key: 'percent', type: 'number' }
    ]
  },
  {
    id: 'minutes-board',
    name: 'Register/Index of Minutes — Board Meetings',
    section: 'Sec. 118 | SS-1',
    rule: 'Secretarial Standard - 1',
    sheetName: 'MINUTES-Board_Index',
    maintainedBy: 'CS',
    category: 'Meetings & Attendance',
    type: 'Statutory',
    fields: [
      { label: 'Meeting No.', key: 'no', type: 'number' },
      { label: 'Date of Meeting', key: 'date', type: 'date' },
      { label: 'Page No. in Minutes Book', key: 'page', type: 'number' }
    ]
  },
  {
    id: 'minutes-gm',
    name: 'Register/Index of Minutes — General Meetings',
    section: 'Sec. 118 | SS-2',
    rule: 'Secretarial Standard - 2',
    sheetName: 'MINUTES-GM_Index',
    maintainedBy: 'CS',
    category: 'Meetings & Attendance',
    type: 'Statutory',
    fields: [
      { label: 'Type of Meeting', key: 'type', type: 'string' },
      { label: 'Date of Meeting', key: 'date', type: 'date' },
      { label: 'Page No. in Minutes Book', key: 'page', type: 'number' }
    ]
  },
  {
    id: 'fixed-assets',
    name: 'Register of Fixed Assets / Immovable Properties',
    section: 'Sec. 187 | AS-10 / Ind AS-16',
    rule: 'Accounting Standards',
    sheetName: 'FIXED_ASSETS_Reg',
    maintainedBy: 'CS / CFO',
    category: 'Governance & Others',
    type: 'Non-Statutory',
    fields: [
      { label: 'Asset Name', key: 'name', type: 'string' },
      { label: 'Date of Purchase', key: 'purchase_date', type: 'date' },
      { label: 'Cost of Acquisition', key: 'cost', type: 'number' },
      { label: 'Location', key: 'location', type: 'string' }
    ]
  },
  {
    id: 'kmp-register',
    name: 'Register of Key Managerial Personnel (KMP)',
    section: 'Sec. 203 | Rule 8',
    rule: 'Companies (Appt & Remuneration) Rules 2014',
    sheetName: 'KMP_Register',
    maintainedBy: 'CS / PCS',
    category: 'Directors & KMP',
    type: 'Statutory',
    fields: [
      { label: 'Name of KMP', key: 'name', type: 'string' },
      { label: 'Designation', key: 'designation', type: 'string' },
      { label: 'Date of Appointment', key: 'appt_date', type: 'date' },
      { label: 'PAN', key: 'pan', type: 'string' }
    ]
  },
  {
    id: 'insurance-register',
    name: 'Register of Insurance Policies',
    section: 'Best Practice | Governance',
    rule: 'Governance Best Practice',
    sheetName: 'INSURANCE_Register',
    maintainedBy: 'CS / CFO',
    remarks: 'Best practice',
    category: 'Governance & Others',
    type: 'Non-Statutory',
    fields: [
      { label: 'Policy Name', key: 'name', type: 'string' },
      { label: 'Policy No.', key: 'no', type: 'string' },
      { label: 'Premium Amount', key: 'premium', type: 'number' },
      { label: 'Expiry Date', key: 'expiry', type: 'date' }
    ]
  },
  {
    id: 'rpt-detailed',
    name: 'Detailed Register of Related Party Transactions',
    section: 'Sec. 188-189 | SEBI LODR 23',
    rule: 'Companies (Meetings) Rules 2014',
    sheetName: 'RPT_Detailed_Reg',
    maintainedBy: 'CS / PCS',
    category: 'Governance & Others',
    type: 'Statutory',
    fields: [
      { label: 'Name of Related Party', key: 'name', type: 'string' },
      { label: 'Nature of Relationship', key: 'relation', type: 'string' },
      { label: 'Nature of Transaction', key: 'nature', type: 'string' },
      { label: 'Value', key: 'value', type: 'number' }
    ]
  },
  {
    id: 'csr-register',
    name: 'Register of CSR Activities and Expenditure',
    section: 'Sec. 135 | CSR Policy Rules',
    rule: 'Companies (CSR Policy) Rules 2014',
    sheetName: 'CSR_Register',
    maintainedBy: 'CS / CSR Committee',
    category: 'Governance & Others',
    type: 'Statutory',
    fields: [
      { label: 'Project Name', key: 'name', type: 'string' },
      { label: 'Amount Spent', key: 'amount', type: 'number' },
      { label: 'Date of Expenditure', key: 'date', type: 'date' },
      { label: 'Implementation Agency', key: 'agency', type: 'string' }
    ]
  },
  {
    id: 'investor-grievance',
    name: 'Register of Investor / Shareholder Grievances',
    section: 'Sec. 177 | SEBI LODR Reg. 13',
    rule: 'SEBI LODR Regulations',
    sheetName: 'INVESTOR_GRIEVANCE',
    maintainedBy: 'CS / SRC',
    remarks: 'Listed companies',
    category: 'Governance & Others',
    type: 'Statutory',
    fields: [
      { label: 'Name of Investor', key: 'name', type: 'string' },
      { label: 'Nature of Complaint', key: 'nature', type: 'string' },
      { label: 'Date of Receipt', key: 'receipt_date', type: 'date' },
      { label: 'Status of Resolution', key: 'status', type: 'string' }
    ]
  },
  {
    id: 'bank-accounts',
    name: 'Register of Bank Accounts',
    section: 'Best Practice | IT/FEMA',
    rule: 'Governance Best Practice',
    sheetName: 'BANK_ACCOUNTS_Reg',
    maintainedBy: 'CS / CFO',
    category: 'Governance & Others',
    type: 'Non-Statutory',
    fields: [
      { label: 'Bank Name', key: 'bank', type: 'string' },
      { label: 'Account No.', key: 'acc_no', type: 'string' },
      { label: 'Type of Account', key: 'type', type: 'string' },
      { label: 'Branch', key: 'branch', type: 'string' }
    ]
  },
  {
    id: 'common-seal',
    name: 'Register of Documents under Common Seal',
    section: 'Sec. 9, 22 | AOA',
    rule: 'Articles of Association',
    sheetName: 'COMMON_SEAL_Reg',
    maintainedBy: 'CS',
    remarks: 'If common seal adopted',
    category: 'Governance & Others',
    type: 'Non-Statutory',
    fields: [
      { label: 'Document Description', key: 'desc', type: 'string' },
      { label: 'Date of Sealing', key: 'date', type: 'date' },
      { label: 'Authorized Signatories', key: 'signs', type: 'string' }
    ]
  },
  {
    id: 'licences-register',
    name: 'Register of Licences / Approvals / Registrations',
    section: 'All Applicable Laws',
    rule: 'Various Statutes',
    sheetName: 'LICENCES_Register',
    maintainedBy: 'CS / Compliance Team',
    category: 'Governance & Others',
    type: 'Non-Statutory',
    fields: [
      { label: 'Licence Name', key: 'name', type: 'string' },
      { label: 'Issuing Authority', key: 'authority', type: 'string' },
      { label: 'Validity Date', key: 'validity', type: 'date' }
    ]
  },
  {
    id: 'litigation-register',
    name: 'Register of Litigation and Legal Proceedings',
    section: 'Sec. 134 | Ind AS-37',
    rule: 'Companies (Accounts) Rules 2014',
    sheetName: 'LITIGATION_Register',
    maintainedBy: 'CS / Legal Dept.',
    remarks: 'Board Report disclosure',
    category: 'Governance & Others',
    type: 'Non-Statutory',
    fields: [
      { label: 'Case Title', key: 'title', type: 'string' },
      { label: 'Court/Forum', key: 'court', type: 'string' },
      { label: 'Status', key: 'status', type: 'string' },
      { label: 'Amount Involved', key: 'amount', type: 'number' }
    ]
  },
  {
    id: 'subsidiaries-reg',
    name: 'Register of Subsidiaries, Associates and JVs',
    section: 'Sec. 129(3) | AOC-1',
    rule: 'Companies (Accounts) Rules 2014',
    sheetName: 'SUBSIDIARIES_Reg',
    maintainedBy: 'CS / PCS',
    category: 'Governance & Others',
    type: 'Statutory',
    fields: [
      { label: 'Name of Entity', key: 'name', type: 'string' },
      { label: 'Type (Sub/Assoc/JV)', key: 'type', type: 'string' },
      { label: '% Holding', key: 'holding', type: 'number' }
    ]
  },
  {
    id: 'secretarial-audit',
    name: 'Register/Log of Secretarial Audit Reports',
    section: 'Sec. 204 | SEBI LODR 24A',
    rule: 'Companies (Appt & Remuneration) Rules 2014',
    sheetName: 'SECRETARIAL_AUDIT_Log',
    maintainedBy: 'PCS',
    category: 'Governance & Others',
    type: 'Statutory',
    fields: [
      { label: 'FY', key: 'fy', type: 'string' },
      { label: 'Date of Report', key: 'date', type: 'date' },
      { label: 'Name of PCS', key: 'pcs_name', type: 'string' }
    ]
  },
  {
    id: 'statutory-notices',
    name: 'Register of Statutory Notices Received',
    section: 'All Laws',
    rule: 'Various Statutes',
    sheetName: 'NOTICES_RECEIVED_Reg',
    maintainedBy: 'CS / Legal',
    remarks: 'All regulatory notices',
    category: 'Governance & Others',
    type: 'Non-Statutory',
    fields: [
      { label: 'Notice From', key: 'from', type: 'string' },
      { label: 'Date of Receipt', key: 'date', type: 'date' },
      { label: 'Subject', key: 'subject', type: 'string' }
    ]
  },
  {
    id: 'ss-compliance',
    name: 'Register of Secretarial Standards Compliance',
    section: 'Sec. 118(10) | SS-1, SS-2',
    rule: 'Secretarial Standards',
    sheetName: 'SS_COMPLIANCE_Reg',
    maintainedBy: 'CS',
    remarks: 'SS compliance tracking',
    category: 'Governance & Others',
    type: 'Statutory',
    fields: [
      { label: 'Standard (SS-1/SS-2)', key: 'ss', type: 'string' },
      { label: 'Meeting Date', key: 'date', type: 'date' },
      { label: 'Compliance Status', key: 'status', type: 'string' }
    ]
  },
  {
    id: 'annual-filings',
    name: 'Register / Log of Annual and Event-Based Filings',
    section: 'All Sections | MCA21',
    rule: 'Companies Act 2013',
    sheetName: 'ANNUAL_FILINGS_Log',
    maintainedBy: 'CS / PCS',
    remarks: 'All ROC/MCA filings',
    category: 'Governance & Others',
    type: 'Statutory',
    fields: [
      { label: 'Form No.', key: 'form', type: 'string' },
      { label: 'SRN', key: 'srn', type: 'string' },
      { label: 'Date of Filing', key: 'date', type: 'date' },
      { label: 'Status', key: 'status', type: 'string' }
    ]
  }
];

export const CATEGORIES: { name: string; icon: string }[] = [
  { name: 'Members & Shares', icon: 'Users' },
  { name: 'Directors & KMP', icon: 'UserCog' },
  { name: 'Meetings & Attendance', icon: 'CalendarDays' },
  { name: 'Investments & Loans', icon: 'Banknote' },
  { name: 'Governance & Others', icon: 'ShieldCheck' }
];
