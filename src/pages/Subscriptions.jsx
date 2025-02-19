import React, { useState, useEffect, useContext } from "react";
import { getSubscriptions, saveSubscriptions } from "../data";
import AddSubscriptionModal from "../components/AddSubscriptionModal";
import SubscriptionList from "../components/SubscriptionList";
import LanguageContext from "../context/LanguageContext";
import translations from "../translations";

const Subscriptions = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Seçili dili al

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSubscriptionData(getSubscriptions());
  }, []);

  // Abonelik ekleme fonksiyonu
  const addSubscription = (newSub) => {
    const newSubscription = { id: subscriptionData.length + 1, ...newSub };
    const updatedData = [...subscriptionData, newSubscription];

    setSubscriptionData(updatedData);
    saveSubscriptions(updatedData);
  };

  // Abonelik silme fonksiyonu
  const removeSubscription = (id) => {
    const updatedSubscriptions = subscriptionData.filter((sub) => sub.id !== id);
    setSubscriptionData(updatedSubscriptions);
    saveSubscriptions(updatedSubscriptions);
  };

  // Abonelik durumu güncelleme fonksiyonu
  const updateSubscriptionStatus = (id, newStatus) => {
    const updatedSubscriptions = subscriptionData.map((sub) =>
      sub.id === id ? { ...sub, status: newStatus } : sub
    );

    setSubscriptionData(updatedSubscriptions);
    saveSubscriptions(updatedSubscriptions);
  };

  return (
    <div style={{ padding: "0px 0px 0px 100px" }}>
      <h1>{t.subscriptions}</h1>

      {/* Abonelik Ekleme Butonu */}
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
        }}
      >
        ➕ {t.addSubscription}
      </button>

      {/* Modal Bileşeni */}
      <AddSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addSubscription}
      />

      {/* Güncellenmiş Subscription Listesi */}
      <SubscriptionList
        subscriptions={subscriptionData}
        onDelete={removeSubscription}
        onUpdateStatus={updateSubscriptionStatus}
      />
    </div>
  );
};

export default Subscriptions;
