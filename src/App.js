import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import Users from "./pages/Users"; // 🆕 Users sayfasını ekledik
import Settings from "./pages/Settings";
import { LanguageProvider } from "./context/LanguageContext"; // LanguageProvider ekledik

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, marginLeft: "280px" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/users" element={<Users />} /> {/* 🆕 Users sayfasını ekledik */}
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
