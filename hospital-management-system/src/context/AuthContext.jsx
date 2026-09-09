import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = window.localStorage.getItem("doctorAuth");
      return stored ? JSON.parse(stored) : { user: null, role: null };
    } catch {
      return { user: null, role: null };
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("doctorAuth", JSON.stringify(auth));
    } catch {
      // ignore storage failures
    }
  }, [auth]);

  const loginDoctor = (doctor) => {
    setAuth({ user: doctor, role: "doctor" });
  };

  const logout = () => {
    setAuth({ user: null, role: null });
  };

  const value = {
    auth,
    isDoctor: auth.role === "doctor",
    doctor: auth.role === "doctor" ? auth.user : null,
    loginDoctor,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
