import React, { useState, useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const AddSubscriptionModal = ({ isOpen, onClose, onAdd }) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Seçili dili al
  const [user, setUser] = useState("");
  const [plan, setPlan] = useState("Basic");

  // Planlara göre fiyatlar
  const planPrices = {
    Basic: 50,
    Pro: 150,
    Enterprise: 500,
  };

  // Eğer modal kapalıysa hiçbir şey gösterme
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert(t.enterUserName); // Kullanıcı adı girmesi için uyarı
      return;
    }

    // Yeni abonelik varsayılan olarak "Active" olacak
    onAdd({ user, plan, status: "Active", revenue: planPrices[plan] });
    onClose(); // Modalı kapat
    setUser(""); // Formu sıfırla
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
        <h2 style={{ fontWeight: "bold", marginBottom: "15px" }}>{t.addSubscription}</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: "bold" }}>{t.userName}:</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }}
          />

          <label style={{ fontWeight: "bold" }}>{t.plan}:</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }}
          >
            <option value="Basic">{t.basicPlan} (${planPrices.Basic})</option>
            <option value="Pro">{t.proPlan} (${planPrices.Pro})</option>
            <option value="Enterprise">{t.enterprisePlan} (${planPrices.Enterprise})</option>
          </select>

          <p style={{ fontWeight: "bold", marginTop: "10px" }}>
            {t.revenue}: <span style={{ color: "#27ae60" }}>${planPrices[plan]}</span>
          </p>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
            <button type="button" onClick={onClose} style={{ padding: "10px", background: "#ccc", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              {t.cancel}
            </button>
            <button type="submit" style={{ padding: "10px", background: "#2ecc71", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
              {t.addSubscription}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscriptionModal;
