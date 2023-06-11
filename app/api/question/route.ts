import Question from "@models/question";
import { connectToDB } from "@utils/database";

export const GET = async () => {
    try {
        await connectToDB()

        const prompts = await Question.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all questions", { status: 500 })
    }
} 