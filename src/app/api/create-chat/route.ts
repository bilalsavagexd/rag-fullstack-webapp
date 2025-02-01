// Send the file name and file key to the backend 
// whenever doc uplaoded in s3

// /api/create-chat
import { NextResponse } from "next/server";
import { loadS3IntoPinecone } from "@/lib/pinecone";

export async function POST ( req: Request, res: Response) {
    try {
        const body = await req.json()
        const {file_key,  file_name} = body;
        console.log(file_key, file_name);
        const pages = await loadS3IntoPinecone(file_key)
        return NextResponse.json ({ pages });
    } catch (error) {
        console.error (error);
        return NextResponse.json(
            {
                error: 'internal server error'
            },
            {
                status: 500
            }
        )

    }
}