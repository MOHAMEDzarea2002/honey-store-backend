// import the dashboardStatisticsService
const  dashboardService = require('../services/dashboardStatisticsService');

// Controller function to get dashboard statistics
const DashboardStatsController = async (req,res) => {
 try{
   const stats = await dashboardService.getDashboardStats();
   res.status(200).json({
     success: true,
     message: 'Dashboard Stats Retrieved Successfully',
     stats,
   }
   )
 }catch(error){
   res.status(500).json({
     success: false,
     message: error.message,
   });
 }
}
module.exports = {
  DashboardStatsController,
};
