import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from './s3-server'; 
import { PDFLoader } from "langchain";

let pineconeClient: Pinecone | null = null;

export const getPineconeClient = async () => {
    if (!pineconeClient) {
        pineconeClient = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!,
        });
    }
    return pineconeClient;
};

// Function to load S3 into Pinecone
export async function loadS3IntoPinecone(fileKey: string) {
    // 1. obtain  the .pdf -> download and read from pdf
    console.log('downloading s3 into file system');
    const file_name = await downloadFromS3(fileKey);
    if (!file_name) {
        throw new Error("could not download from S3");
    }
    const loader = new PDFLoader(file_name);
    const pages = await loader.load();
    return pages;
}