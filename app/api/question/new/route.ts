import Question from "@models/question";
import { connectToDB } from "@utils/database";


export const POST = async (request: Request) => {
    const { userId, content, tags, section } = await request.json();
    console.log(userId, content, tags, section)

    try {
        await connectToDB();
        const newQuestion = new Question({ creator: userId, content, tags, section });

        await newQuestion.save();
        return new Response(JSON.stringify(newQuestion), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new question", { status: 500 });
    }
}