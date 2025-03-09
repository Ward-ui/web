document.addEventListener("DOMContentLoaded", async () => {
  const ctx = document.getElementById("salesChart").getContext("2d");

  async function fetchData(period) {
    try {
      const response = await fetch('http://localhost:3000/api/orders/sales', {
        method: 'POST', // Используем POST-запрос
        headers: {
          'Content-Type': 'application/json', // Указываем, что передаем JSON
        },
        body: JSON.stringify({ period }), // Передаем параметр period в теле запроса
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Полученные данные:", data);  // Это покажет структуру полученных данных
      return data.totalIncome;  // Доступ к числовому значению
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return 0; // Возвращаем 0 в случае ошибки
    }
  }

  const monthIncome = await fetchData("month");
  const yearIncome = await fetchData("year");

  console.log("Доход за месяц:", monthIncome);
  console.log("Доход за год:", yearIncome);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Доход за месяц", "Доход за год"],
      datasets: [
        {
          label: "Доход (₽)",
          data: [monthIncome, yearIncome],
          backgroundColor: ["blue", "green"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  });
});
