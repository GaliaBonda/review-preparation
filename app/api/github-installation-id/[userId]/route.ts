import GitInstallationId from "@models/gitInstallationId";
import { connectToDB } from "@utils/database";
import type { NextApiRequest } from 'next'

export const GET = async (request : NextApiRequest) => {
    try {
        await connectToDB()
// console.log(request)
        const installationId = await GitInstallationId.findOne({userId: {$eq: request.body}})
        if (!installationId) return new Response("InstallationId Not Found", { status: 404 });

        return new Response(JSON.stringify(installationId), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
