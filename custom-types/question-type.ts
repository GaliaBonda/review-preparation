export enum QuestionSection {
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

export type QuestionType = {
  id: string;
  creator: string;
  content: string;
  tags: string[];
  section: QuestionSection;
};
