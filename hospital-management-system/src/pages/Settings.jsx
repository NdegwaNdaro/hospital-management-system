import ResponsiveManagementForm from "../components/ResponsiveManagementForm";

export default function Settings() {
  return <ResponsiveManagementForm title="Settings" description="Update hospital contact and notification preferences." buttonLabel="Save settings" fields={[{ name: "hospitalName", label: "Hospital name", required: true, placeholder: "Enter hospital name" }, { name: "email", label: "Support email", type: "email", required: true, placeholder: "support@hospital.com" }, { name: "phone", label: "Contact phone", type: "tel", placeholder: "Enter phone number" }, { name: "notifications", label: "Notifications", options: ["Enabled", "Disabled"] }]} />;
}
