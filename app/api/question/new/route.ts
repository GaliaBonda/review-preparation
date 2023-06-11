import Question from "@models/question";
import { connectToDB } from "@utils/database";


export const POST = async (request: Request) => {
    const { userId, content, tag, section } = await request.json();
    console.log(userId, content, tag, section)

    try {
        await connectToDB();
        const newQuestion = new Question({ creator: userId, content, tag, section });

        await newQuestion.save();
        return new Response(JSON.stringify(newQuestion), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new question", { status: 500 });
    }
}