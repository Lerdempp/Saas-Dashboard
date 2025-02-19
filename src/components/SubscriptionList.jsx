import React, { useState, useContext } from "react";
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const SubscriptionList = ({ subscriptions = [], onDelete, onUpdateStatus }) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Seçili dili al

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("All");

  // Filtrelenmiş abonelikleri döndür
  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === "All" || sub.plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  // Durumlara göre gruplama
  const activeSubs = filteredSubscriptions.filter((sub) => sub.status === "Active");
  const pendingSubs = filteredSubscriptions.filter((sub) => sub.status === "Pending");
  const cancelledSubs = filteredSubscriptions.filter((sub) => sub.status === "Cancelled");

  // Durum değiştirme sırası
  const getNextStatus = (currentStatus) => {
    if (currentStatus === "Active") return "Pending";
    if (currentStatus === "Pending") return "Cancelled";
    return "Active"; // Cancelled'dan sonra tekrar Active olsun
  };

  // Tekrar eden tablo yapısı için fonksiyon
  const renderTable = (title, data, color) => {
    if (data.length === 0) return null; // Eğer tablo boşsa hiç render etme

    return (
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ color: color, fontSize: "22px", fontWeight: "bold" }}>{title}</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
            marginLeft:"-10px"
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={{ padding: "12px", fontSize: "16px", fontWeight: "bold" }}>{t.userName}</th>
              <th style={{ padding: "12px", fontSize: "16px", fontWeight: "bold" }}>{t.plan}</th>
              <th style={{ padding: "12px", fontSize: "16px", fontWeight: "bold" }}>{t.status}</th>
              <th style={{ padding: "12px", fontSize: "16px", fontWeight: "bold" }}>{t.revenue}</th>
              <th style={{ padding: "12px", fontSize: "16px", fontWeight: "bold" }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((sub) => (
              <tr key={sub.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{sub.user || "N/A"}</td>
                <td style={{ padding: "12px", color: "#555" }}>{sub.plan || "N/A"}</td>

                {/* Status Görünümü */}
                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                    color:
                      sub.status === "Active"
                        ? "#2ecc71"
                        : sub.status === "Pending"
                        ? "#f1c40f"
                        : "#e74c3c",
                  }}
                >
                  {t[sub.status.toLowerCase()]} {/* Aktif, Bekleyen, İptal Edildi çevirisi */}
                </td>

                <td style={{ padding: "12px" }}>${sub.revenue || 0}</td>

                {/* Actions Butonları */}
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <div style={{ display: "flex", gap: "10px" }}> {/* 10px GAP EKLENDİ */}
                    {/* Status değiştir butonu */}
                    <button
                      onClick={() => onUpdateStatus(sub.id, getNextStatus(sub.status))}
                      style={{
                        backgroundColor: "#3498db",
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
                      🔄 {t.switchStatus}
                    </button>

                    {/* Silme butonu */}
                    <button
                      onClick={() => onDelete(sub.id)}
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Filtreleme Alanı */}
            
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px", marginLeft:"-10px" }}>
        <input
          type="text"
          placeholder={t.searchPlaceholder} // Hata buradaydı, düzeltildi!
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <option value="All">{t.allPlans}</option>
          <option value="Basic">{t.basicPlan}</option>
          <option value="Pro">{t.proPlan}</option>
          <option value="Enterprise">{t.enterprisePlan}</option>
        </select>
      </div>

      {renderTable(t.activeSubscriptions, activeSubs, "#2ecc71")}
      {renderTable(t.pendingSubscriptions, pendingSubs, "#f1c40f")}
      {renderTable(t.cancelledSubscriptions, cancelledSubs, "#e74c3c")}
    </div>
  );
};

export default SubscriptionList;
