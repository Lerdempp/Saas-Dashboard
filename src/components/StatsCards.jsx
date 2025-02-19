import React, { useContext } from "react";
import { getSubscriptions } from "../data";
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const StatsCards = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Seçili dili al
  const subscriptionData = getSubscriptions();

  // Abonelik durumlarını sayalım
  const totalRevenue = subscriptionData.reduce((acc, sub) => acc + sub.revenue, 0);
  const activeCount = subscriptionData.filter((sub) => sub.status === "Active").length;
  const pendingCount = subscriptionData.filter((sub) => sub.status === "Pending").length;
  const cancelledCount = subscriptionData.filter((sub) => sub.status === "Cancelled").length;

  // Sayıları formatlamak (Binlik ayırıcı ve noktalama)
  const formatNumber = (number) => new Intl.NumberFormat().format(number);

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
      {/* Toplam Gelir Kartı */}
      <div
        style={{
          backgroundColor: "#2ecc71",
          color: "white",
          padding: "20px",
          borderRadius: "16px",
          width: "200px",
          textAlign: "center",
        }}
      >
        <h3>{t.totalRevenue}</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>${formatNumber(totalRevenue)}</p>
      </div>

      {/* Aktif Abonelik Kartı */}
      <div
        style={{
          backgroundColor: "#3498db",
          color: "white",
          padding: "20px",
          borderRadius: "16px",
          width: "200px",
          textAlign: "center",
        }}
      >
        <h3>{t.activeSubscriptions}</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>{formatNumber(activeCount)}</p>
      </div>

      {/* Bekleyen Abonelik Kartı */}
      <div
        style={{
          backgroundColor: "#f1c40f",
          color: "white",
          padding: "20px",
          borderRadius: "16px",
          width: "200px",
          textAlign: "center",
        }}
      >
        <h3>{t.pendingSubscriptions}</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>{formatNumber(pendingCount)}</p>
      </div>

      {/* İptal Edilen Abonelik Kartı */}
      <div
        style={{
          backgroundColor: "#e74c3c",
          color: "white",
          padding: "20px",
          borderRadius: "16px",
          width: "220px",
          textAlign: "center",
        }}
      >
        <h3>{t.cancelledSubscriptions}</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>{formatNumber(cancelledCount)}</p>
      </div>
    </div>
  );
};

export default StatsCards;
