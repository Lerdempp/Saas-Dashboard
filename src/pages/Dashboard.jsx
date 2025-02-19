import React, { useContext } from "react";
import RevenueChart from "../components/RevenueChart";
import UserStats from "../components/UserStats";
import StatsCards from "../components/StatsCards";
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const Dashboard = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Seçili dili al

  return (
    <div style={{ padding: "0px 0px 0px 100px", width:"1440px" }}>
      <h1>{t.welcomeMessage}</h1>
      <StatsCards />
      <RevenueChart />
      <UserStats />
    </div>
  );
};

export default Dashboard;
