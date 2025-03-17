import OpenAI from "openai";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config({ path: ".env" });

const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function POST(request) {
  try {
    const client = new OpenAI({
      baseURL: endpoint,
      apiKey: "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"
    });

    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "" },
        {
          role: "user",
          content: `Give me 5 multiple choice questions on phsing emails using this format make sure u give 2 potential answers in format give in the json skeleton make sure to give me the fake email real email fake message real message and correct message make sure to use real companies and follow this template I have provided make sure that the fake and real messages have white space gaps after parts like real emails. also make sure that both the fake and real emails have a similar problem occurring
      
      "questions": [ { "fake_subject": "Problem with your recent Amazon delivery", "real_subject": "Your Amazon order #402-9372841-4921557 has shipped ", "fake_email": "shipping@amazon-delivery.net", "real_email": "noreply@amazon.com", "fake_message": "Dear Amazon Customer,
      
      We regret to inform you that we encountered a problem delivering your recent Amazon order.
      
      To reschedule your delivery, please verify your delivery address by clicking the link below: [VERIFY ADDRESS LINK]
      
      If we don't hear from you within 24 hours, your package will be returned to our warehouse.
      
      Amazon Delivery Team", "real_message": "Hello,
      
      Your Amazon order of \"Wireless Headphones\" has shipped.
      
      You can track your package at any time by visiting Your Orders on Amazon.com.
      
      Arriving: Thursday, June 8 Shipped to: Your default address
      
      Thank you for shopping with us. Amazon.com", "correct_email": "noreply@amazon.com" },
      
      " }`
        }
      ],
      model: modelName,
      temperature: 1,
      max_tokens: 4096,
      top_p: 1
    });

    const rawContent = response.choices[0].message.content;

    let parsedContent;
    try {
      parsedContent = JSON.parse(rawContent);
    } catch (error) {
      console.error("Failed to parse AI response as JSON:", error);
      return NextResponse.json(
        {
          error: "Failed to parse AI response as JSON",
          rawContent
        },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedContent);

  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { error: "Failed to analyze email" },
      { status: 500 }
    );
  }
}
