// orderController.js
const { getIncomeForPeriod } = require('../service/salesService');

async function getIncome(req, res) {
  const { period } = req.query;  // Получаем период из параметра запроса (например, "month" или "year")

  try {
    const incomeData = await getIncomeForPeriod(period);
    res.json(incomeData);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении дохода' });
  }
}

module.exports = {
  getIncome,
};
