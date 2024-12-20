class AdminController {
  
    //GET /admin/renderdashboard
    async renderDashboard(req, res) {
        try {
            res.render('admin/dashboard', {
                layout: 'admin',
            });
        } catch (error) {
            res.status(400).json({ error: 'error' }); 
        }
    }
}

module.exports = new AdminController();