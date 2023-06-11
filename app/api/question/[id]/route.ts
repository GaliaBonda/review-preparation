import Question from "@models/question";
import { connectToDB } from "@utils/database";
import type { NextApiRequest } from 'next'

export const GET = async (request : NextApiRequest) => {
    try {
        await connectToDB()

        const question = await Question.findById(request.query.id).populate("creator")
        if (!question) return new Response("Question Not Found", { status: 404 });

        return new Response(JSON.stringify(question), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request: NextApiRequest) => {
    const { question, tag } = await request.body.json();

    try {
        await connectToDB();

        const existingQuestion = await Question.findById(request.query.id);

        if (!existingQuestion) {
            return new Response("Question not found", { status: 404 });
        }

        existingQuestion.question = question;
        existingQuestion.tag = tag;

        await existingQuestion.save();

        return new Response("Successfully updated the Question", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Question", { status: 500 });
    }
};

export const DELETE = async (request: NextApiRequest) => {
    try {
        await connectToDB();

        await Question.findByIdAndRemove(request.query.id);

        return new Response("Question deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting question", { status: 500 });
    }
};