import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Subject from "../models/Subject";

const createSubject = (req: Request, res: Response, next: NextFunction) => {
  const { subName } = req.body;
  const { stream } = req.body;

  const subject = new Subject({
    _id: new mongoose.Types.ObjectId(),
    subName,
    stream,
  });

  return subject
    .save()
    .then((subject) => res.status(201).json({ subject }))
    .catch((error) => res.status(500).json({ error }));
};

const readSubject = (req: Request, res: Response, next: NextFunction) => {
  const subjectId = req.params.subjectId;

  return Subject.findById(subjectId)
    .then((subject) =>
      subject
        ? res.status(200).json({ subject })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Subject.find()
    .then((subjects) => res.status(200).json({ subjects }))
    .catch((error) => res.status(500).json({ error }));
};

const updateSubject = (req: Request, res: Response, next: NextFunction) => {
  const subjectId = req.params.subjectId;

  return Subject.findById(subjectId)
    .then((subject) => {
      if (subject) {
        subject.set(req.body);

        return subject
          .save()
          .then((subject) => res.status(201).json({ subject }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteSubject = (req: Request, res: Response, next: NextFunction) => {
  const subjectId = req.params.subjectId;

  return Subject.findByIdAndDelete(subjectId)
    .then((subject) =>
      subject
        ? res.status(201).json({ subject, message: "Subject Deleted" })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createSubject,
  readSubject,
  readAll,
  updateSubject,
  deleteSubject,
};
