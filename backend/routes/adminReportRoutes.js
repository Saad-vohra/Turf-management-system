const express = require("express");
const router = express.Router();
const { getReports,exportCSV,exportExcel } = require("../controllers/adminReportController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.get("/reports", getReports);
router.get("/reports/export/csv", exportCSV);
router.get("/reports/export/excel",  exportExcel);
module.exports = router;