import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), "/lib/logs/passwd.json");

// const fetchData = async () => {
//     const response = await fetch('/api/quote')
//     const data: ApiData = await response.json();
//     console.log("data", data);
// }

// fetchData();

export async function GET(request: Request) {
    console.log("Request", request);

    try {
        return Response.json({status: "Just works"})
    }
    catch (error) {
        console.error("Error reading file", error);
        return Response.error();
    }
}

export async function POST(request: Request) {
    const res = await request.json();

    if (!res || typeof res.value === 'undefined' || typeof res.timestamp === 'undefined' || typeof res.user_id === 'undefined' || typeof res.correct === 'undefined') {
        return Response.json({"error": "Invalid data provided."})
    }

    const handleOnFileFound = async () => {
        const jsonData = await fsPromises.readFile(dataFilePath);
        const objectData = JSON.parse(jsonData.toString());
        const randString = Math.random().toString(36).substring(7);
        
        objectData[randString] = {
            user_id: res.user_id,
            value: res.value,
            correct: res.correct,
            timestamp: res.timestamp
        };

        await fsPromises.writeFile(dataFilePath, JSON.stringify(objectData, null, 2));
    }

    try {
        await fsPromises.access(dataFilePath);
        await handleOnFileFound();

        return Response.json({})
    } catch (error) {
        console.error("Error reading file", error);

        await fsPromises.writeFile(dataFilePath, JSON.stringify({}));
        await handleOnFileFound();

        return Response.json({})
    }
}
  
  