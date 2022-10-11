import express from "express";
import controller from "../controllers/Student";

const router = express.Router();

router.post("/create", controller.createStudent);
router.get("/get/:studentId", controller.readStudent);
router.get("/get", controller.readAll);
router.patch("/update/:studentId", controller.updateStudent);
router.delete("/delete/:studentId", controller.deleteStudent);

export = router;
