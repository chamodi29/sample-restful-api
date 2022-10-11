import mongoose, { Document, Schema } from "mongoose";

export interface IStudent {
  name: string;
  stream: string;
}

export interface IStudentModel extends IStudent, Document {}

const StudentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    stream: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IStudentModel>("Student", StudentSchema);
