import initSqlJs, { Database } from 'sql.js';
import sqlWasm from 'sql.js/dist/sql-wasm.wasm?url';
import { MOCK_ENTRIES } from '../lib/exportUtils';

let db: Database | null = null;

export async function initDb() {
  if (db) return db;

  console.log("Initializing DB...");
  const SQL = await initSqlJs({
    locateFile: () => sqlWasm
  });

  // Try to load existing database from localStorage
  const savedDb = localStorage.getItem('statreg_db_v2');
  if (savedDb) {
    console.log("Loading existing DB from localStorage");
    db = new SQL.Database(new Uint8Array(JSON.parse(savedDb)));
  } else {
    console.log("Creating new DB");
    db = new SQL.Database();
    // Initialize schema
    db.run(`
      CREATE TABLE IF NOT EXISTS companies (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        cin TEXT NOT NULL,
        incorporationDate TEXT
      );
      CREATE TABLE IF NOT EXISTS registers (
        id TEXT PRIMARY KEY,
        companyId TEXT NOT NULL,
        registerId TEXT NOT NULL,
        data TEXT,
        FOREIGN KEY(companyId) REFERENCES companies(id)
      );
      CREATE TABLE IF NOT EXISTS audit_logs (
        id TEXT PRIMARY KEY,
        user TEXT NOT NULL,
        action TEXT NOT NULL,
        timestamp TEXT NOT NULL
      );
    `);

    // Seed with default company
    db.run("INSERT INTO companies (id, name, cin, incorporationDate) VALUES (?, ?, ?, ?)", 
      ['comp_1', 'Default Company', 'U12345MH2020PTC123456', '2020-01-01']);

    // Seed with MOCK_ENTRIES
    Object.entries(MOCK_ENTRIES).forEach(([registerId, entries]) => {
      db!.run("INSERT INTO registers (id, companyId, registerId, data) VALUES (?, ?, ?, ?)", 
        [`reg_${registerId}`, 'comp_1', registerId, JSON.stringify(entries)]);
    });

    saveDb();
  }
  return db;
}

export function saveDb() {
  if (db) {
    const data = db.export();
    localStorage.setItem('statreg_db_v2', JSON.stringify(Array.from(data)));
  }
}

export function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}
