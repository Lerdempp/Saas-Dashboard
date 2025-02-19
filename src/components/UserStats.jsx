import React, { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getSubscriptions } from "../data";
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const UserStats = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Seçili dili al

  const subscriptionData = getSubscriptions();

  // Kullanıcıların abonelik durumlarını say
  const statusCounts = subscriptionData.reduce(
    (acc, sub) => {
      if (sub.status === "Active") acc.active += 1;
      else if (sub.status === "Pending") acc.pending += 1;
      else if (sub.status === "Cancelled") acc.cancelled += 1;
      return acc;
    },
    { active: 0, pending: 0, cancelled: 0 }
  );

  // PieChart için veri formatı
  const chartData = [
    { name: t.active, value: statusCounts.active },
    { name: t.pending, value: statusCounts.pending },
    { name: t.cancelled, value: statusCounts.cancelled },
  ];

  // Renkler
  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ padding: "20px", width: "100%", height: "300px", marginTop:"50px" }}>
      <h2>{t.subscriptionStatusOverview}</h2>

      {chartData.some((item) => item.value > 0) ? (
        <ResponsiveContainer width="50%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ color: "#e74c3c", fontSize: "18px", fontWeight: "bold" }}>
          {t.noDataAvailable}
        </p>
      )}
    </div>
  );
};

export default UserStats;
