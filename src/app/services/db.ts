import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { AnonymousReport, ChatMessage, SHIELDAssessment } from '../types';

interface CyberbullyingDB extends DBSchema {
  reports: {
    key: string;
    value: AnonymousReport;
    indexes: { 'by-date': number };
  };
  chatHistory: {
    key: string;
    value: ChatMessage;
    indexes: { 'by-date': number };
  };
  shieldAssessments: {
    key: string;
    value: SHIELDAssessment;
    indexes: { 'by-date': number };
  };
}

let dbInstance: IDBPDatabase<CyberbullyingDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<CyberbullyingDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<CyberbullyingDB>('cyberbullying-awareness', 1, {
    upgrade(db) {
      // Reports store
      const reportStore = db.createObjectStore('reports', { keyPath: 'id' });
      reportStore.createIndex('by-date', 'timestamp');

      // Chat history store
      const chatStore = db.createObjectStore('chatHistory', { keyPath: 'id' });
      chatStore.createIndex('by-date', 'timestamp');

      // SHIELD assessments store
      const assessmentStore = db.createObjectStore('shieldAssessments', { keyPath: 'id' });
      assessmentStore.createIndex('by-date', 'timestamp');
    },
  });

  return dbInstance;
}

// Report operations
export async function saveReport(report: AnonymousReport): Promise<void> {
  const db = await getDB();
  await db.add('reports', report);
}

export async function getAllReports(): Promise<AnonymousReport[]> {
  const db = await getDB();
  return db.getAll('reports');
}

export async function getReportById(id: string): Promise<AnonymousReport | undefined> {
  const db = await getDB();
  return db.get('reports', id);
}

// Chat history operations
export async function saveChatMessage(message: ChatMessage): Promise<void> {
  const db = await getDB();
  await db.add('chatHistory', message);
}

export async function getAllChatMessages(): Promise<ChatMessage[]> {
  const db = await getDB();
  return db.getAll('chatHistory');
}

export async function clearChatHistory(): Promise<void> {
  const db = await getDB();
  await db.clear('chatHistory');
}

// SHIELD assessment operations
export async function saveAssessment(assessment: SHIELDAssessment): Promise<void> {
  const db = await getDB();
  await db.add('shieldAssessments', assessment);
}

export async function getAllAssessments(): Promise<SHIELDAssessment[]> {
  const db = await getDB();
  return db.getAll('shieldAssessments');
}

export async function getLatestAssessment(): Promise<SHIELDAssessment | undefined> {
  const db = await getDB();
  const all = await db.getAll('shieldAssessments');
  return all.sort((a, b) => b.timestamp - a.timestamp)[0];
}
