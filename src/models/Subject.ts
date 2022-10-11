import mongoose, { Document, Schema } from "mongoose";

export interface ISubject {
  subName: string;
  stream: string;
}

export interface ISubjectModel extends ISubject, Document {}

const SubjectSchema: Schema = new Schema(
  {
    subName: { type: String, required: true },
    stream: { type: String, required: true },
    // student: { type: Schema.Types.ObjectId, required: true, ref: "Student" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<ISubjectModel>("Subject", SubjectSchema);
