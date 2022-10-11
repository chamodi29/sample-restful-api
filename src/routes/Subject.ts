import express from "express";
import controller from "../controllers/Subject";

const router = express.Router();

router.post("/create", controller.createSubject);
router.get("/get/:subjectId", controller.readSubject);
router.get("/get", controller.readAll);
router.patch("/update/:subjectId", controller.updateSubject);
router.delete("/delete/:subjectId", controller.deleteSubject);

export = router;
