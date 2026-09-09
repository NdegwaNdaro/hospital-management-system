import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || '';
const USE_MEMORY_DB = !MONGO_URI;

app.use(cors());
app.use(express.json());

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  condition: { type: String, required: true },
  status: { type: String, default: 'Registered' }
}, { timestamps: true });

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctor: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  shiftStart: { type: String, default: '' },
  shiftEnd: { type: String, default: '' },
  reportTime: { type: String, default: '' }
}, { timestamps: true });

const nurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shift: { type: String, required: true }
}, { timestamps: true });

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' }
}, { timestamps: true });

const ambulanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  driver: { type: String, required: true },
  status: { type: String, default: 'Available' },
  currentLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  eta: { type: String, default: '3 min' }
}, { timestamps: true });

const billingSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);
const Nurse = mongoose.model('Nurse', nurseSchema);
const Staff = mongoose.model('Staff', staffSchema);
const Ambulance = mongoose.model('Ambulance', ambulanceSchema);
const Billing = mongoose.model('Billing', billingSchema);

async function seedData() {
  const patientCount = await Patient.countDocuments();
  if (patientCount > 0) return;

  await Patient.create([
    { name: 'John Doe', age: 34, gender: 'Male', phone: '0712 345 678', condition: 'Routine checkup', status: 'Checked In' },
    { name: 'Mary Smith', age: 28, gender: 'Female', phone: '0722 555 444', condition: 'Flu symptoms', status: 'Waiting' }
  ]);

  await Appointment.create([
    { patientName: 'John Doe', doctor: 'Dr. Amina', time: '09:00', status: 'Confirmed' },
    { patientName: 'Mary Smith', doctor: 'Dr. Kamau', time: '11:30', status: 'Pending' }
  ]);

  await Doctor.create([
    { name: 'Dr. Amina', specialty: 'General Medicine', password: 'dramina2024', shiftStart: '08:00', shiftEnd: '16:00', reportTime: '07:50' },
    { name: 'Dr. Kamau', specialty: 'Cardiology', password: 'drkamau2024', shiftStart: '09:00', shiftEnd: '17:00', reportTime: '08:45' }
  ]);

  await Nurse.create([
    { name: 'Nurse Njeri', shift: 'Morning' },
    { name: 'Nurse Otieno', shift: 'Night' }
  ]);

  await Staff.create([
    { name: 'Jane Wambui', role: 'Nurse', department: 'ICU', phone: '0722 000 111' },
    { name: 'Kevin Kariuki', role: 'Receptionist', department: 'Front Desk', phone: '0711 222 333' }
  ]);

  await Ambulance.create([
    { name: 'Ambulance 01', driver: 'Driver Njoroge', status: 'En route', currentLocation: { lat: -1.2921, lng: 36.8219 }, eta: '4 min' },
    { name: 'Ambulance 02', driver: 'Driver Akinyi', status: 'Available', currentLocation: { lat: -1.3000, lng: 36.8100 }, eta: '2 min' }
  ]);

  await Billing.create([
    { patientName: 'John Doe', amount: 2500, status: 'Paid' },
    { patientName: 'Mary Smith', amount: 1800, status: 'Pending' }
  ]);
}

async function connectDatabase() {
  let uri = MONGO_URI;

  if (USE_MEMORY_DB) {
    const memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri();
    console.log(`MongoDB memory server started at ${uri}`);
  }

  await mongoose.connect(uri, {
    dbName: 'hospital_management'
  });

  console.log(`Connected to MongoDB at ${uri}`);
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Hospital backend is running with MongoDB',
    database: USE_MEMORY_DB ? 'memory' : 'atlas'
  });
});

app.get('/api/dashboard', async (req, res) => {
  try {
    const [totalPatients, totalDoctors, totalNurses, appointmentsToday, revenue] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Nurse.countDocuments(),
      Appointment.countDocuments(),
      Billing.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }])
    ]);

    res.json({
      totalPatients,
      totalDoctors,
      totalNurses,
      appointmentsToday,
      revenue: revenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load patients' });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    const patient = await Patient.create({
      ...req.body,
      status: req.body.status || 'Registered'
    });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create patient' });
  }
});

app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load appointments' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load doctors' });
  }
});

app.post('/api/doctors', async (req, res) => {
  try {
    const doctor = await Doctor.create({
      name: req.body.name || '',
      specialty: req.body.specialty || '',
      phone: req.body.phone || '',
      email: req.body.email || '',
      password: req.body.password || '',
      shiftStart: req.body.shiftStart || '',
      shiftEnd: req.body.shiftEnd || '',
      reportTime: req.body.reportTime || ''
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create doctor' });
  }
});

app.get('/api/nurses', async (req, res) => {
  try {
    const nurses = await Nurse.find().sort({ createdAt: -1 });
    res.json(nurses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load nurses' });
  }
});

app.post('/api/nurses', async (req, res) => {
  try {
    const nurse = await Nurse.create(req.body);
    res.status(201).json(nurse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create nurse' });
  }
});

app.get('/api/staff', async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load staff records' });
  }
});

app.get('/api/ambulances', async (req, res) => {
  try {
    const ambulances = await Ambulance.find().sort({ createdAt: -1 });
    res.json(ambulances);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load ambulance tracking data' });
  }
});

app.post('/api/ambulances/:id/location', async (req, res) => {
  try {
    const lat = Number(req.body.lat ?? req.body.latitude);
    const lng = Number(req.body.lng ?? req.body.longitude);

    const update = {
      status: req.body.status || 'En route',
      eta: req.body.eta || '2 min',
      currentLocation: {
        lat: Number.isFinite(lat) ? lat : -1.2921,
        lng: Number.isFinite(lng) ? lng : 36.8219
      }
    };

    const ambulance = await Ambulance.findByIdAndUpdate(req.params.id, update, { new: true });

    if (!ambulance) {
      return res.status(404).json({ error: 'Ambulance not found' });
    }

    res.json(ambulance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ambulance location' });
  }
});

app.post('/api/staff', async (req, res) => {
  try {
    const staffMember = await Staff.create(req.body);
    res.status(201).json(staffMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create staff record' });
  }
});

app.get('/api/billing', async (req, res) => {
  try {
    const billing = await Billing.find().sort({ createdAt: -1 });
    res.json(billing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load billing records' });
  }
});

app.post('/api/billing/:id/pay', async (req, res) => {
  try {
    const bill = await Billing.findByIdAndUpdate(
      req.params.id,
      { status: 'Paid' },
      { new: true }
    );

    if (!bill) {
      return res.status(404).json({ error: 'Billing record not found' });
    }

    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update billing status' });
  }
});

async function startServer() {
  try {
    await connectDatabase();
    await seedData();

    app.listen(PORT, () => {
      console.log(`Hospital backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
