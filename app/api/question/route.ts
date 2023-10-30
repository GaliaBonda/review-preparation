import Question from "@models/question";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();

    const questions = await Question.find({});
    
    return new Response(JSON.stringify(questions), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all questions", { status: 500 });
  }
};
