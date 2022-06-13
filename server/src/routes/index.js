const express = require("express");
const { register, checkAuth, login } = require("../controllers/auth");
const {
  addbarangkeluar,
  editbarangkeluar,
  deletebarangkeluar,
  getbarangkeluars,
  getbarangkeluar,
} = require("../controllers/barangKeluar");
const {
  addBarangmasuk,
  getBarangmasuks,
  getbarangmasuk,
  deletebarangmasuks,
  editbarangmasuks,
} = require("../controllers/barangMasuk");
const {
  addReport,
  editReport,
  deleteReport,
  getReports,
  getReport,
} = require("../controllers/report");
const { getUser } = require("../controllers/user");
// const { addPersediaan } = require("../controllers/persediaan");

const { auth } = require("../middlewares/checkAuth");

const router = express.Router();

router.get("/getuser/:id", getUser);

router.post("/addbarangmasuk", auth, addBarangmasuk);
router.get("/getbarangmasuks", auth, getBarangmasuks);
router.get("/getbarangmasuk/:id", auth, getbarangmasuk);
router.delete("/deletebarang/:id", auth, deletebarangmasuks);
router.patch("/edititemasuk/:id", auth, editbarangmasuks);

router.post("/addbarangkeluar", auth, addbarangkeluar);
router.patch("/edititemkeluar/:id", auth, editbarangkeluar);
router.delete("/deleteitem/:id", auth, deletebarangkeluar);
router.get("/getbarangkeluars", auth, getbarangkeluars);
router.get("/getbarangkeluar/:id", auth, getbarangkeluar);

router.post("/addreports", auth, addReport);
router.patch("/editReport/:id", auth, editReport);
router.delete("/deleteReport/:id", auth, deleteReport);
router.get("/getReports", auth, getReports);
router.get("/getReport/:id", auth, getReport);

router.post("/register", register);
router.post("/login", login);

router.get("/check-auth", auth, checkAuth);

module.exports = router;
