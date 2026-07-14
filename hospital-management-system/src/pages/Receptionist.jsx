import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaClipboardList, FaCalendarCheck } from "react-icons/fa";

function Receptionist() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [patientFormData, setPatientFormData] = useState({
    name: "",
    age: "",
    gender: "Female",
    phone: "",
    condition: ""
  });
  const [doctorFormData, setDoctorFormData] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: ""
  });
  const [staffFormData, setStaffFormData] = useState({
    name: "",
    role: "Nurse",
    department: "General",
    phone: "",
    email: ""
  });
  const [patientMessage, setPatientMessage] = useState("");
  const [doctorMessage, setDoctorMessage] = useState("");
  const [staffMessage, setStaffMessage] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/patients").then((response) => response.json()).catch(() => []),
      fetch("/api/doctors").then((response) => response.json()).catch(() => []),
      fetch("/api/staff").then((response) => response.json()).catch(() => [])
    ])
      .then(([patientsData, doctorsData, staffData]) => {
        setPatients(patientsData);
        setDoctors(doctorsData);
        setStaffMembers(staffData);
      })
      .catch(() => {
        setPatients([]);
        setDoctors([]);
        setStaffMembers([]);
      });
  }, []);

  function handlePatientChange(event) {
    const { name, value } = event.target;
    setPatientFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleDoctorChange(event) {
    const { name, value } = event.target;
    setDoctorFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleStaffChange(event) {
    const { name, value } = event.target;
    setStaffFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePatientSubmit(event) {
    event.preventDefault();

    if (!patientFormData.name || !patientFormData.age || !patientFormData.phone || !patientFormData.condition) {
      setPatientMessage("Please complete all required fields before saving.");
      return;
    }

    fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: patientFormData.name,
        age: Number(patientFormData.age),
        gender: patientFormData.gender,
        phone: patientFormData.phone,
        condition: patientFormData.condition
      })
    })
      .then((response) => response.json())
      .then((newPatient) => {
        setPatients((prev) => [newPatient, ...prev]);
        setPatientMessage(`Patient ${patientFormData.name} added successfully.`);
        setPatientFormData({ name: "", age: "", gender: "Female", phone: "", condition: "" });
      })
      .catch(() => setPatientMessage("Unable to save patient right now."));
  }

  function handleDoctorSubmit(event) {
    event.preventDefault();

    if (!doctorFormData.name || !doctorFormData.specialty) {
      setDoctorMessage("Please enter the doctor's name and specialty.");
      return;
    }

    fetch("/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctorFormData)
    })
      .then((response) => response.json())
      .then((newDoctor) => {
        setDoctors((prev) => [newDoctor, ...prev]);
        setDoctorMessage(`Doctor ${doctorFormData.name} added successfully.`);
        setDoctorFormData({ name: "", specialty: "", phone: "", email: "" });
      })
      .catch(() => setDoctorMessage("Unable to save doctor right now."));
  }

  function handleStaffSubmit(event) {
    event.preventDefault();

    if (!staffFormData.name || !staffFormData.role || !staffFormData.department) {
      setStaffMessage("Please complete the staff member's name, role, and department.");
      return;
    }

    fetch("/api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(staffFormData)
    })
      .then((response) => response.json())
      .then((newStaffMember) => {
        setStaffMembers((prev) => [newStaffMember, ...prev]);
        setStaffMessage(`Staff member ${staffFormData.name} added successfully.`);
        setStaffFormData({ name: "", role: "Nurse", department: "General", phone: "", email: "" });
      })
      .catch(() => setStaffMessage("Unable to save staff record right now."));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-slate-200/80 bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow-lg shadow-slate-900/20 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Reception Desk</p>
            <h2 className="mt-2 text-3xl font-semibold">Receptionist overview</h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Welcome to the front office dashboard where you can review arrivals, register new patients, and add hospital staff.
            </p>
          </div>
          <Link
            to="/"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            View hospital dashboard
          </Link>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600"><FaClipboardList /></div>
            <div>
              <p className="text-sm text-slate-500">Today&apos;s arrivals</p>
              <p className="text-2xl font-semibold text-slate-800">{patients.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600"><FaCalendarCheck /></div>
            <div>
              <p className="text-sm text-slate-500">Appointments</p>
              <p className="text-2xl font-semibold text-slate-800">18</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-100 p-3 text-amber-600"><FaUserPlus /></div>
            <div>
              <p className="text-sm text-slate-500">New registrations</p>
              <p className="text-2xl font-semibold text-slate-800">{patients.filter((patient) => patient.id > 2).length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Add new patient</h3>
              <p className="text-sm text-slate-500">Capture guest details for the medical team.</p>
            </div>
          </div>

          <form onSubmit={handlePatientSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Full name</label>
                <input
                  name="name"
                  value={patientFormData.name}
                  onChange={handlePatientChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Age</label>
                <input
                  name="age"
                  type="number"
                  value={patientFormData.age}
                  onChange={handlePatientChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                  placeholder="e.g. 29"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Gender</label>
                <select
                  name="gender"
                  value={patientFormData.gender}
                  onChange={handlePatientChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Phone</label>
                <input
                  name="phone"
                  value={patientFormData.phone}
                  onChange={handlePatientChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">Condition / reason</label>
              <textarea
                name="condition"
                value={patientFormData.condition}
                onChange={handlePatientChange}
                rows="3"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                placeholder="Brief reason for visit"
              />
            </div>

            {patientMessage ? <p className="text-sm text-emerald-600">{patientMessage}</p> : null}

            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Save patient
            </button>
          </form>
        </section>

        <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800">Recent patients</h3>
          <p className="mt-1 text-sm text-slate-500">Latest registrations at the front desk.</p>

          <div className="mt-4 space-y-3">
            {patients.map((patient) => (
              <div key={patient.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-800">{patient.name}</p>
                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">{patient.gender}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{patient.age} years • {patient.phone}</p>
                <p className="mt-2 text-sm text-slate-600">{patient.condition}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-slate-800">Add new doctor</h3>
            <p className="text-sm text-slate-500">Register doctors for appointments and care coordination.</p>
          </div>

          <form onSubmit={handleDoctorSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Doctor name</label>
                <input
                  name="name"
                  value={doctorFormData.name}
                  onChange={handleDoctorChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                  placeholder="e.g. Dr. Amina"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Specialty</label>
                <input
                  name="specialty"
                  value={doctorFormData.specialty}
                  onChange={handleDoctorChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                  placeholder="e.g. Cardiology"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Phone</label>
                <input
                  name="phone"
                  value={doctorFormData.phone}
                  onChange={handleDoctorChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
                <input
                  name="email"
                  type="email"
                  value={doctorFormData.email}
                  onChange={handleDoctorChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                  placeholder="Email address"
                />
              </div>
            </div>

            {doctorMessage ? <p className="text-sm text-emerald-600">{doctorMessage}</p> : null}

            <button
              type="submit"
              className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Save doctor
            </button>
          </form>

          <div className="mt-5 space-y-3">
            {doctors.slice(0, 4).map((doctor) => (
              <div key={doctor.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-800">{doctor.name}</p>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">{doctor.specialty}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{doctor.phone || "No phone provided"}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-slate-800">Add other staff</h3>
            <p className="text-sm text-slate-500">Add nurses, receptionists, or other support staff to the system.</p>
          </div>

          <form onSubmit={handleStaffSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Staff name</label>
                <input
                  name="name"
                  value={staffFormData.name}
                  onChange={handleStaffChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                  placeholder="e.g. Jane Wambui"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Role</label>
                <select
                  name="role"
                  value={staffFormData.role}
                  onChange={handleStaffChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                >
                  <option value="Nurse">Nurse</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Lab Tech">Lab Tech</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Department</label>
                <input
                  name="department"
                  value={staffFormData.department}
                  onChange={handleStaffChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                  placeholder="e.g. ICU"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-600">Phone</label>
                <input
                  name="phone"
                  value={staffFormData.phone}
                  onChange={handleStaffChange}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
              <input
                name="email"
                type="email"
                value={staffFormData.email}
                onChange={handleStaffChange}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
                placeholder="Email address"
              />
            </div>

            {staffMessage ? <p className="text-sm text-emerald-600">{staffMessage}</p> : null}

            <button
              type="submit"
              className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Save staff
            </button>
          </form>

          <div className="mt-5 space-y-3">
            {staffMembers.slice(0, 4).map((member) => (
              <div key={member.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-800">{member.name}</p>
                  <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">{member.role}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{member.department}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Receptionist;
