import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";

export async function onRequestPost(context) {
    const client = new DocumentAnalysisClient(
        context.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT,
        new AzureKeyCredential(context.env.AZURE_DOCUMENT_INTELLIGENCE_KEY)
    );
    try {
        const formData = await context.request.formData();
        const files = formData.getAll('files'); // Assuming input name is 'files'

        // Function to convert ArrayBuffer to base64
        const arrayBufferToBase64 = (buffer) => {
            let binary = '';
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        };

        // Function to convert base64 to ArrayBuffer
        const base64ToArrayBuffer = (base64) => {
            const binaryString = atob(base64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes.buffer;
        };

        // Process each file and send it to Azure for analysis
        const analysisResults = await Promise.all(files.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            const base64String = arrayBufferToBase64(arrayBuffer);

            // Convert base64 string back to ArrayBuffer
            const buffer = base64ToArrayBuffer(base64String);

            // Send the file to Azure Document Intelligence
            const poller = await client.beginAnalyzeDocument('prebuilt-receipt', buffer);
            const result = await poller.pollUntilDone();

            return {
                filename: file.name,
                result: result
            };
        }));

        // Respond with the analysis results
        return new Response(JSON.stringify({ message: 'Files analyzed', analysisResults }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error processing request', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}