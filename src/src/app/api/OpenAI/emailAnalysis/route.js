import OpenAI from "openai";
import * as prompt from "./aiPrompt.js";
import { NextResponse } from "next/server";

export const maxDuration = 60;
const token = process.env["OPENAI_API_KEY"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function POST(request) {
  try {
    const formData = await request.formData();
    let text = formData.get("text");

    // Handle file input if provided
    const file = formData.get("file");
    if (file) {
      const buffer = await file.arrayBuffer();
      text = new TextDecoder().decode(buffer);
    }

    if (!text) {
      return NextResponse.json(
        { error: "Email content is required" },
        { status: 400 }
      );
    }

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });
    // Send the text to OpenAI for annotation
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an AI trained to detect potential scams in emails. 
          You must only analyze text that resembles an email format.
           If the input does not appear to be an email, respond with: 
           'This is not a valid email. Please paste in a valid email and try again.'
            When analyzing an email, identify potential scam keywords and annotate them in HTML. 
            Highlight suspicious words or phrases in **red** if they indicate a scam risk and
             in **green** if they are commonly found in legitimate emails from companies.`,
        },
        { role: "user", content: prompt.scamEmailText },
        { role: "system", content: prompt.scamEmailAiResponse },
        { role: "user", content: prompt.notScamEmailText },
        { role: "system", content: prompt.notScamEmailAiResponse },
        { role: "user", content: text },
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName,
    });

    // Return the annotated text to the client
    return NextResponse.json({
      annotatedHtml: response.choices[0].message.content,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to analyze email", errorMessage: err.message || err },
      { status: 500 }
    );
  }
}
