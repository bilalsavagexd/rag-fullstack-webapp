// function to load in the s3 configuration

import AWS from 'aws-sdk'
export async function uploadToS3(file: File) {
    // Since accepted file are in a array
    try {
        AWS.config.update ({
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
        });

        // After configuring the AWS Object 
        // Get S3 Object
        const s3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },

            // After the configuring the param
            // pass in the region under params
            region: ''
        })

        const file_key = 'uploads/' + Date.now().toString() + file.name.replace(' ', '-')
        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
            Body: file,
          };
        const upload = s3.putObject(params).on('httpUploadProgress', evt => {
            console.log('uploading to s3...', parseInt(((evt.loaded*100)/evt.total).toString())) + "%"
        }). promise()

        await upload.then (data => {
            console.log('successfully uploaded to S3!', file_key)
        })

        return Promise.resolve({
            file_key,
            file_name: file.name,
        })

    } catch (error) {

    }
}

// function to return publically accessible s3 url
// so that we can embed the pdf within our chat screen reader
export function getS3Url (file_key: string) {
    const url = `https://${process.env.NEXTPUBLIC_S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${file_key}`
    return url;
}

