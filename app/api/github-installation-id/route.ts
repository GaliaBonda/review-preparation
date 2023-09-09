import GitInstallationId from "@models/gitInstallationId";
import { connectToDB } from "@utils/database";

export const GET = async () => {
    try {
        await connectToDB()

        const gitInstallationIds = await GitInstallationId.find({});

        return new Response(JSON.stringify(gitInstallationIds), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all git installation ids", { status: 500 })
    }
} 