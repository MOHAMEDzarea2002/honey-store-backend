
const  dashboardService = require('../services/dashboardStatisticsService');
const getDashboardStats = async (req,res) => {
  const stats = await dashboardService.getDashboardStats();


  res.status(200).json({
    success: true,
    message: 'Dashboard Stats Retrieved Successfully',
    stats,
  }
)
}
module.exports = {
  getDashboardStats,
};
