import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Receptionist from "./pages/Receptionist";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import Nurses from "./pages/Nurses";
import Ambulance from "./pages/Ambulance";
import ICU from "./pages/ICU";
import Wards from "./pages/Wards";
import Insurance from "./pages/Insurance";
import OperationTheatre from "./pages/OperationTheatre";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="receptionist" element={<Receptionist />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
        <Route path="nurses" element={<Nurses />} />
        <Route path="ambulance" element={<Ambulance />} />
        <Route path="icu" element={<ICU />} />
        <Route path="wards" element={<Wards />} />
        <Route path="insurance" element={<Insurance />} />
        <Route path="operation-theatre" element={<OperationTheatre />} />
      </Route>
    </Routes>
  );
}

export default App;