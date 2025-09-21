const express = require('express');
const { generateReport, getUserReports, deleteUserReport } = require('../controllers/reportController');

const router = express.Router();

router.post('/generate/pdf', generateReport);
router.get('/download/pdf', getUserReports);
router.delete('/delete/pdf', deleteUserReport);

module.exports = router;
