import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const Sidebar = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Seçili dili al
  const location = useLocation(); // Aktif linki belirlemek için

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "18px",
    textDecoration: "none",
    color: location.pathname === path ? "#000000" : "white", // Seçili olan metin siyah
    backgroundColor: location.pathname === path ? "#1abc9c" : "transparent",
    transition: "background-color 0.3s ease, color 0.3s ease",
    cursor: "pointer",
  });

  const linkHoverStyle = {
    backgroundColor: "#34495e",
    color: "#ecf0f1",
  };

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        backgroundColor: "#2C3E50",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ fontSize: "26px", marginBottom: "30px", color: "#1abc9c", textAlign: "center" }}>
        🌟 SaaS Panel
      </h2>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "15px" }}>
        {[
          { path: "/", label: `🏠 ${t.dashboard}` },
          { path: "/subscriptions", label: `📋 ${t.subscriptions}` },
          { path: "/users", label: `👥 ${t.users}` },
          { path: "/settings", label: `⚙ ${t.settings}` },
        ].map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              style={linkStyle(item.path)}
              onMouseEnter={(e) => (e.target.style.backgroundColor = linkHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = location.pathname === item.path ? "#1abc9c" : "transparent")}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
