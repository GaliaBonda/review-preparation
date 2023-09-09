import { Schema, model, models } from "mongoose";

enum QuestionSection {
  TypeScript = "TypeScript",
  JavaScript = "JavaScript",
  HTML = "HTML",
  CSS = "CSS",
  React = "React",
  API = "API",
  OOP = "OOP",
  SOLID = "SOLID",
  Data_Structures_Algorithms = "Data Structures and Algorithms",
  Git = "Git",
}

const QuestionSchema = new Schema({
  section: {
    type: String,
    enum: [
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "React",
      "API",
      "OOP",
      "SOLID",
      "Data Structures and Algorithms",
      "Git",
    ],
    default: "JavaScript",
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  tags: {
    type: [String],
    required: [true, "Tag is required."],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
