import OpenAI from "openai";
import { NextResponse } from "next/server";

const token = process.env["OPENAI_API_KEY"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini"; // Using mini for cost efficiency

export async function POST(request) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const response = await client.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: "system",
          content: `Convert the given text to HTML. Use appropriate tags when necessary, pay attention to line break: Preserve any existing HTML tags in the input. 
                    Return as HTML paragraph, no need to indicate that it's a html paragraph`,
        },
        {
          role: "user",
          content: content,
        },
      ],
      temperature: 0.7, // Lower temperature for more consistent formatting
      max_tokens: 800,
    });

    return NextResponse.json({
      content: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error converting to HTML:", error);
    return NextResponse.json(
      { error: "Failed to convert content to HTML" },
      { status: 500 }
    );
  }
}
