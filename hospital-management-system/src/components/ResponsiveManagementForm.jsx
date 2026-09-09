import { useState } from "react";

function ResponsiveManagementForm({ title, description, fields, buttonLabel }) {
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((field) => [field.name, ""])));
  const [message, setMessage] = useState("");

  const submit = (event) => {
    event.preventDefault();
    setMessage(`${title} details saved.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {fields.map((field) => (
            <label key={field.name} className="block min-w-0 text-sm font-medium text-slate-700">
              <span className="mb-1 block">{field.label}</span>
              {field.options ? (
                <select
                  required={field.required}
                  value={values[field.name]}
                  onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
                  className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input
                  required={field.required}
                  type={field.type || "text"}
                  value={values[field.name]}
                  onChange={(event) => setValues({ ...values, [field.name]: event.target.value })}
                  placeholder={field.placeholder}
                  className="w-full min-w-0 rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              )}
            </label>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 sm:w-auto">
            {buttonLabel}
          </button>
          {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
        </div>
      </form>
    </div>
  );
}

export default ResponsiveManagementForm;
