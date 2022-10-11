import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Student from "../models/Student";

const createStudent = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const { stream } = req.body;

  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name,
    stream,
  });

  return student
    .save()
    .then((student) => res.status(201).json({ student }))
    .catch((error) => res.status(500).json({ error }));
};

const readStudent = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.studentId;

  return Student.findById(studentId)
    .then((student) =>
      student
        ? res.status(200).json({ student })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Student.find()
    .then((students) => res.status(200).json({ students }))
    .catch((error) => res.status(500).json({ error }));
};

const updateStudent = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.studentId;

  return Student.findById(studentId)
    .then((student) => {
      if (student) {
        student.set(req.body);

        return student
          .save()
          .then((student) => res.status(201).json({ student }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteStudent = (req: Request, res: Response, next: NextFunction) => {
  const studentId = req.params.studentId;

  return Student.findByIdAndDelete(studentId)
    .then((student) =>
      student
        ? res.status(201).json({ student, message: "Student Deleted" })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createStudent,
  readStudent,
  readAll,
  updateStudent,
  deleteStudent,
};
