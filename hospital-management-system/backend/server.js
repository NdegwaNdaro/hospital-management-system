import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'node:process';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const databasePath = fileURLToPath(new URL('./data/db.json', import.meta.url));

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

const defaults = {
  patients: [], doctors: [], nurses: [], staff: [], appointments: [], billing: [],
  ambulances: [
    { id: 1, name: 'Ambulance 01', driver: 'Driver Njoroge', status: 'En route', currentLocation: { lat: -1.2921, lng: 36.8219 }, eta: '4 min' },
    { id: 2, name: 'Ambulance 02', driver: 'Driver Akinyi', status: 'Available', currentLocation: { lat: -1.3, lng: 36.81 }, eta: '2 min' }
  ]
};

async function loadDatabase() {
  const db = JSON.parse(await readFile(databasePath, 'utf8'));
  for (const [key, value] of Object.entries(defaults)) db[key] ??= value;
  return db;
}

async function saveDatabase(db) {
  await writeFile(databasePath, `${JSON.stringify(db, null, 2)}\n`, 'utf8');
}

const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
const newId = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

function validate(type, record) {
  const required = {
    patients: ['name', 'age', 'gender', 'phone', 'condition'],
    doctors: ['name', 'specialty'],
    nurses: ['name', 'shift'],
    staff: ['name', 'role', 'department'],
    appointments: ['patientName', 'doctor', 'time'],
    billing: ['patientName', 'amount']
  }[type] || [];
  const missing = required.filter((field) => record[field] === undefined || record[field] === '');
  if (missing.length) throw new Error(`Missing required fields: ${missing.join(', ')}`);
}

function collectionRoutes(path, key) {
  app.get(path, asyncRoute(async (req, res) => {
    const db = await loadDatabase();
    res.json([...db[key]].reverse());
  }));
  app.post(path, asyncRoute(async (req, res) => {
    validate(key, req.body);
    const db = await loadDatabase();
    const record = { ...req.body, id: newId(), _id: newId(), createdAt: new Date().toISOString() };
    record._id = record.id;
    db[key].push(record);
    await saveDatabase(db);
    res.status(201).json(record);
  }));
}

collectionRoutes('/api/patients', 'patients');
collectionRoutes('/api/doctors', 'doctors');
collectionRoutes('/api/nurses', 'nurses');
collectionRoutes('/api/staff', 'staff');
collectionRoutes('/api/appointments', 'appointments');
collectionRoutes('/api/billing', 'billing');

app.get('/api/health', (req, res) => res.json({ status: 'ok', database: 'local-json' }));

app.get('/api/dashboard', asyncRoute(async (req, res) => {
  const db = await loadDatabase();
  const today = new Date().toDateString();
  const appointmentsToday = db.appointments.filter((appointment) => !appointment.createdAt || new Date(appointment.createdAt).toDateString() === today).length;
  const revenue = db.billing.filter((bill) => bill.status === 'Paid').reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
  res.json({ totalPatients: db.patients.length, totalDoctors: db.doctors.length, totalNurses: db.nurses.length, appointmentsToday, revenue });
}));

app.post('/api/billing/:id/pay', asyncRoute(async (req, res) => {
  const db = await loadDatabase();
  const bill = db.billing.find((entry) => String(entry._id || entry.id) === req.params.id);
  if (!bill) return res.status(404).json({ error: 'Billing record not found' });
  bill.status = 'Paid';
  bill.paymentDate = new Date().toISOString();
  await saveDatabase(db);
  res.json(bill);
}));

app.get('/api/ambulances', asyncRoute(async (req, res) => {
  const db = await loadDatabase();
  res.json(db.ambulances);
}));

app.post('/api/ambulances/:id/location', asyncRoute(async (req, res) => {
  const db = await loadDatabase();
  const ambulance = db.ambulances.find((entry) => String(entry._id || entry.id) === req.params.id);
  if (!ambulance) return res.status(404).json({ error: 'Ambulance not found' });
  ambulance.status = req.body.status || 'En route';
  ambulance.eta = req.body.eta || '2 min';
  ambulance.currentLocation = { lat: Number(req.body.lat), lng: Number(req.body.lng) };
  await saveDatabase(db);
  res.json(ambulance);
}));

app.use((error, req, res, next) => {
  void req; void next;
  res.status(400).json({ error: error.message || 'Unexpected server error' });
});

app.listen(PORT, () => console.log(`Hospital backend running on http://localhost:${PORT}`));
