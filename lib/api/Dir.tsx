import client from "@/lib/api/ApiClient";

// interface AttachmentObject {
//     name: string;
//     content: string | ArrayBuffer | null;
// }

// export const sendEmail = (Subject: string, Body: string, Attachment: AttachmentObject | null = null) => {
//     return client.post("/email/send", { Subject, Body, Attachment }, { headers: { 'wb-email-token': process.env.NEXT_API_HEADER_TOKEN ?? '' } });
// }

export const deleteFile = (path: string) => {
    return new Promise((resolve, reject) => {
        client.delete(`/dir${path}`).then((res) => {
            const data: any = res.data;

            resolve(data);
        }).catch((err) => {
            const error: { success: boolean, message: string } = { success: false, message: 'An error occurred' };

            reject(error);
        });
    });
}

export default {
    deleteFile
};