import OpenAI from "openai";
import dotenv from 'dotenv';
// import { NextResponse } from 'next/server';

// export async function POST(request){
//   try{
//     const formData = await request.formData();
//     let text = formData.get("text");

//     const file = formData.get("text");
//     if (file){
//       const buffer = await file.arrayBuffer();
//       text = new TextDecoder().decode(buffer);
//     }

//     if(!text){
//       return NextResponse.json({error: "No Text Provided"}, {status: 404});
//     }
//     const annotatatedText = hightlightScamwards(text);
//     return NextResponse.json({annotatedText});
//   }
//   catch (err) {
//   console.error("Error processing request:", err);
//   return NextResponse.json({ error: "Failed to analyze email" }, { status: 500 });
//   }
// }

dotenv.config({ path: '.env' });
const token = process.env["OPENAI_API_KEY"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function main() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

 
  try {
    // Get the response from OpenAI
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a scam detector." },
        { role: "user", content: prompt }
        { role: "system", content: aiResponse }
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName
    });
  console.log(response.choices[0].message.content);
  } catch (err) {
    console.error("Error during OpenAI API request:", err);
  }
  
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});