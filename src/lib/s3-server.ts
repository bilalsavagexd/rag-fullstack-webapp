import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';

const s3Client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY!,
    }
});

export async function downloadFromS3(file_key: string) {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
        });

        const response = await s3Client.send(command);
        const file_name = `/tmp/pdf-${Date.now()}.pdf`;
        
        // Convert the response body to a Buffer and write to file
        if (response.Body) {
            const bodyContents = await response.Body.transformToByteArray();
            fs.writeFileSync(file_name, Buffer.from(bodyContents));
            return file_name;
        }
        
        return null;
    } catch (error) {
        console.error('Error downloading from S3:', error);
        return null;
    }
}