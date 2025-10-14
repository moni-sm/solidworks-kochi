require("dotenv").config();
const Registration = require("../models/Registration");
const ExcelJS = require("exceljs");
const path = require("path");

// 📌 Register User endpoint 
exports.registerUser = async (req, res) => {
  try {
    const { name, phone, email, organization, designation } = req.body;

    if (!name || !phone || !email || !organization || !designation) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save to DB
    const newRegistration = new Registration({
      name,
      phone,
      email,
      organization,
      designation,
      timestamp: new Date(),
    });
    await newRegistration.save();

    // Uncomment and configure email sending if needed

    res.status(200).json({ message: "✅ Registration successful." });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// 📌 Download Excel endpoint (unchanged)
exports.downloadExcel = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ timestamp: 1 });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Registrations");

    sheet.columns = [
      { header: "Name", key: "name", width: 25 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Email", key: "email", width: 25 },
      { header: "Organization", key: "organization", width: 25 },
      { header: "Designation", key: "designation", width: 25 },
      { header: "Registered On", key: "timestamp", width: 30 },
    ];

    registrations.forEach((reg) => {
      sheet.addRow({
        name: reg.name,
        phone: reg.phone,
        email: reg.email,
        organization: reg.organization,
        designation: reg.designation,
        timestamp: reg.timestamp.toLocaleString(),
      });
    });

    const filePath = path.join(__dirname, "../registrations.xlsx");
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, "registrations.xlsx", (err) => {
      if (err) {
        console.error("❌ File download error:", err);
        res.status(500).json({ message: "Error downloading file." });
      }
    });
  } catch (err) {
    console.error("❌ Excel Export Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
