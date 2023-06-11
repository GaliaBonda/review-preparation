"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link'

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

type NewQuestionType = {
  userId: string;
  question: string;
  tag: string;
  section: QuestionSection;
};

const CreateQuestion = () => {
  const { data: session } = useSession();

  console.log(session);
  

  const [submitting, setIsSubmitting] = useState(false);
  const [newQuestion, setNewQuestion] = useState<
    Omit<NewQuestionType, "userId">
  >({ question: "", tag: "", section: QuestionSection.JavaScript });

  console.log(newQuestion)

  const createQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log({
        content: newQuestion.question,
        userId: session?.user.id,
        tag: newQuestion.tag,
        section: newQuestion.section
      })
      const response = await fetch("/api/question/new", {
        method: "POST",
        body: JSON.stringify({
          content: newQuestion.question,
          userId: session?.user.id,
          tag: newQuestion.tag,
          section: newQuestion.section
        }),
      });

      if (response.ok) {
        // router.push("/");
        console.log(response)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={createQuestion}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
    >
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Your Question
        </span>

        <textarea
          value={newQuestion.question}
          onChange={(e) => setNewQuestion(prev => ({...prev, question: e.target.value}))}
          placeholder="Question..."
          required
          className="border border-black"
        />
      </label>

      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Field of Prompt{" "}
          <span className="font-normal">
            (#product, #webdevelopment, #idea, etc.)
          </span>
        </span>
        <input
          value={newQuestion.tag}
          onChange={(e) => setNewQuestion(prev => ({...prev, tag: e.target.value}))}
          type="text"
          placeholder="#Tag"
          required
          className="border border-black"

        />
      </label>

      <div className="flex-end mx-3 mb-5 gap-4">
        <Link href="/" className="text-gray-500 text-sm">
          Cancel
        </Link>

        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full"
        >
          {submitting ? `Creating...` : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default CreateQuestion;
