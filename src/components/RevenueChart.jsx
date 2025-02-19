import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getSubscriptions } from "../data";
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const RevenueChart = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Seçili dili al

  // Güncellenmiş veri çağrımı
  const subscriptionData = getSubscriptions();

  // Kullanıcı bazlı gelirleri grafik için formatlayalım
  const chartData = subscriptionData.map(sub => ({
    name: sub.user,
    revenue: sub.revenue
  }));

  return (
    <div style={{ padding: "20px", width: "100%", height: "300px" }}>
      <h2>{t.revenueOverview}</h2>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="50%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ color: "#e74c3c", fontSize: "18px", fontWeight: "bold" }}>{t.noRevenueData}</p>
      )}
    </div>
  );
};

export default RevenueChart;
