import React, { useContext, useState } from "react";
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const Settings = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const t = translations[language]; // Seçili dilin çeviri verisini al

  // Tema ve bildirim state'leri
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  return (
    <div style={{ padding: "0px 0px 0px 100px" }}>
      <h1>{t.settings}</h1>

      {/* Dil Ayarı */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <label style={{ fontSize: "18px", fontWeight: "bold" }}>{t.language}:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <option value="English">English</option>
          <option value="Turkish">Türkçe</option>
          <option value="Spanish">Español</option>
        </select>
      </div>

      {/* Tema Seçimi */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <label style={{ fontSize: "18px", fontWeight: "bold" }}>{t.theme}:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <option value="light">{t.lightTheme}</option>
          <option value="dark">{t.darkTheme}</option>
        </select>
      </div>

      {/* Bildirim Ayarı */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <label style={{ fontSize: "18px", fontWeight: "bold" }}>{t.notifications}:</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
        {notifications ? t.enableNotifications : t.disableNotifications}
      </div>
    </div>
  );
};

export default Settings;
