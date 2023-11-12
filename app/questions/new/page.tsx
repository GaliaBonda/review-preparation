"use client";

import { FormEvent, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BasicModal } from "@components/Modal";
import {
  Button,
  FormControl,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { QuestionSection } from "@custom-types/question-type";
import { CustomButton } from "@components/CustomButton";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store";
import { add } from "@store/thunk-reducers";

type NewQuestionType = {
  userId: string;
  question: string;
  tag: string;
  section: QuestionSection;
};

const getDown = (a: number) => {
  return a + 1;
};

// enum Test {
//   Up,
//   Down = "down"
// }

// const a = Test.Up;
// console.log(Test[a])

const CreateQuestion = () => {
  // const { data: session } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      setError("To proceed, please, sign in");
      // The user is not authenticated, handle it here.
    },
  });

  // console.log(session);
  // console.log(session);

  const [submitting, setIsSubmitting] = useState(false);
  const [newQuestion, setNewQuestion] = useState<
    Omit<NewQuestionType, "userId">
  >({ question: "", tag: "", section: QuestionSection.JavaScript });
  const [error, setError] = useState<string | null>(null);

  // console.log(newQuestion);

  

  const router = useRouter();

  const createQuestion = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      add({
        id: "",
        creator: session?.user.id ?? "",
        content: newQuestion.question,
        tags: newQuestion.tag.split(",").map((item) => item.trim()),
        section: newQuestion.section,
      })
    );
    return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/question/new", {
        method: "POST",
        body: JSON.stringify({
          content: newQuestion.question,
          userId: session?.user.id,
          tags: newQuestion.tag.split(",").map((item) => item.trim()),
          section: newQuestion.section,
        }),
      });

      if (response.ok) {
        setNewQuestion((prev) => ({
          question: "",
          tag: "",
          section: prev.section,
        }));
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={createQuestion}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <TextField
          value={newQuestion.question}
          label={`New question`}
          placeholder="Question..."
          required
          onChange={(e) =>
            setNewQuestion((prev) => ({ ...prev, question: e.target.value }))
          }
          minRows={3}
          multiline
        />

        <TextField
          label="Tag"
          variant="outlined"
          id="username"
          required
          value={newQuestion.tag}
          onChange={(e) =>
            setNewQuestion((prev) => ({ ...prev, tag: e.target.value }))
          }
          placeholder="#tag"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Section</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newQuestion.section}
            label="Section"
            onChange={(e) =>
              setNewQuestion((prev) => {
                const section = Object.values(QuestionSection).find(
                  (item) => item === e.target.value
                );
                if (!section) return prev;
                return { ...prev, section };
              })
            }
          >
            {Object.values(QuestionSection).map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="flex flex-end mx-3 mb-5 gap-4">
          <Button onClick={() => router.push("/")} variant="outlined">
            Cancel
          </Button>

          <CustomButton disabled={submitting} type="submit">
            {submitting ? `Creating...` : "Create"}
          </CustomButton>
        </div>
      </form>
      <BasicModal
        variant="ERROR"
        open={!!error}
        handleClose={() => {
          setError(null);
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ERROR
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {`${error?.[0].toUpperCase()}${error?.slice(1)}`}
        </Typography>
        <Link href="/" className="mt-4 text-white">
          Sign in
        </Link>
      </BasicModal>
    </>
  );
};

export default CreateQuestion;
