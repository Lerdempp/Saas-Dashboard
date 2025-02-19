import React, { useState, useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const AddUserModal = ({ isOpen, onClose, onAdd }) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert(t.enterUserName);
      return;
    }

    onAdd({ name, email, role });
    onClose();
    setName("");
    setEmail("");
    setRole("User");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
        }}
      >
        <h2>{t.addUser}</h2>
        <form onSubmit={handleSubmit}>
          <label>{t.userName}:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }}
          />

          <label>{t.email}:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }}
          />

          <label>{t.role}:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
            <button type="button" onClick={onClose} style={{ padding: "10px", background: "#ccc", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              {t.cancel}
            </button>
            <button type="submit" style={{ padding: "10px", background: "#2ecc71", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              {t.addUser}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
