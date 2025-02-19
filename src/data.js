export const getSubscriptions = () => {
  // LocalStorage kontrolü
  const savedData = localStorage.getItem("subscriptions");
  return savedData ? JSON.parse(savedData) : [
    { id: 1, user: "Ali Yılmaz", plan: "Pro", status: "Active", revenue: 150 },
    { id: 2, user: "Zeynep Kaya", plan: "Basic", status: "Pending", revenue: 50 },
    { id: 3, user: "Mehmet Demir", plan: "Enterprise", status: "Active", revenue: 500 },
    { id: 4, user: "Ayşe Koç", plan: "Pro", status: "Cancelled", revenue: 0 },
  ];
};

// Verileri kaydetme fonksiyonu
export const saveSubscriptions = (data) => {
  localStorage.setItem("subscriptions", JSON.stringify(data));
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

