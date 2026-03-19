"use client";

import { useState, useEffect } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const [adminPassword, setAdminPassword] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth");
    if (saved) {
      // Validate the saved password is still correct
      fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: saved }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setAdminPassword(saved);
          } else {
            sessionStorage.removeItem("admin_auth");
          }
        })
        .catch(() => {
          sessionStorage.removeItem("admin_auth");
        })
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-8 h-8 border-[3px] border-border border-t-accent rounded-full animate-spin-slow" />
      </div>
    );
  }

  if (!adminPassword) {
    return <AdminLogin onLogin={(pw) => setAdminPassword(pw)} />;
  }

  return <AdminDashboard adminPassword={adminPassword} />;
}
