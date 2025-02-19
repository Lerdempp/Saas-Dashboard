import React, { useState, useEffect, useContext } from "react";
import { getUsers, saveUsers } from "../data"; // Kullanıcı verilerini al
import AddUserModal from "../components/AddUserModal"; // Kullanıcı ekleme modalı
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const Users = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Seçili dil

  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setUsers(getUsers()); // Kullanıcıları al
  }, []);

  // Yeni kullanıcı ekleme fonksiyonu
  const addUser = (newUser) => {
    const updatedUsers = [...users, { id: users.length + 1, ...newUser }];
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  // Kullanıcı silme fonksiyonu
  const removeUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  return (
    <div style={{ padding: "0px 0px 0px 100px", width: "100%" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "15px" }}>
        {t.users}
      </h1>

      {/* Kullanıcı Ekle Butonu */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: "10px 15px",
          backgroundColor: "#2ecc71",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "15px",
          fontSize: "16px",
        }}
      >
        ➕ {t.addUser}
      </button>

      {/* Kullanıcı Ekleme Modalı */}
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addUser} />

      {/* Kullanıcı Tablosu */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "12px", fontSize: "16px", fontWeight: "bold" }}>{t.userName}</th>
            <th style={{ padding: "12px", fontSize: "16px", fontWeight: "bold" }}>{t.email}</th>
            <th style={{ padding: "12px", fontSize: "16px", fontWeight: "bold" }}>{t.role}</th>
            <th style={{ padding: "12px", fontSize: "16px", fontWeight: "bold" }}>{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{user.name}</td>
                <td style={{ padding: "12px", color: "#555" }}>{user.email}</td>
                
                {/* Kullanıcı rolü için renklendirme */}
                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                    color:
                      user.role === "Admin"
                        ? "#e74c3c"
                        : user.role === "Moderator"
                        ? "#27ae60"
                        : "#3498db",
                  }}
                >
                  {user.role}
                </td>

                {/* Silme butonu */}
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => removeUser(user.id)}
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    ❌ {t.delete}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "12px", color: "#777" }}>
                {t.noDataAvailable}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
