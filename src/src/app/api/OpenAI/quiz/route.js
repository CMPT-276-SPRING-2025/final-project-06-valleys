import OpenAI from "openai";
import { NextResponse } from "next/server";

const api_key = process.env.OPENAI_API_KEY;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function POST(request) {
  try {

    const client = new OpenAI({
      baseURL: endpoint,
      apiKey: api_key,
    });

    const response = await client.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "Respond only with valid JSON. Do NOT include markdown formatting (` ```json `) or any extra text. Only return a JSON object." 
        },
        { 
          role: "user",
          content: `Generate 5 multiple-choice questions on phishing emails using this JSON structure. Make sure that there is only fake option and real option, nothing else. 
          Do NOT include markdown (\`\`\`json) or explanations. Return ONLY a valid JSON object.

          {
            "questions": [
              {
                "fake_subject": "Problem with your recent Amazon delivery",
                "real_subject": "Your Amazon order #402-9372841-4921557 has shipped",
                "fake_email": "shipping@amazon-delivery.net",
                "real_email": "noreply@amazon.com",
                "fake_message": "Dear Amazon Customer,

                We regret to inform you that we encountered a problem delivering your recent Amazon order.

                To reschedule your delivery, please verify your delivery address by clicking the link below: [VERIFY ADDRESS LINK]

                If we don't hear from you within 24 hours, your package will be returned to our warehouse.

                Amazon Delivery Team",
                "real_message": "Hello,

                Your Amazon order of 'Wireless Headphones' has shipped.

                You can track your package at any time by visiting Your Orders on Amazon.com.

                Arriving: Thursday, June 8 Shipped to: Your default address

                Thank you for shopping with us. Amazon.com",
                "correct_email": "noreply@amazon.com"
              }
            ]
          }`
        }
      ],
      model: modelName,
      temperature: 1,
      max_tokens: 4096,
      top_p: 1
    });

    const rawContent = response.choices[0].message.content.trim();
    const cleanedResponse = rawContent.replace(/```json|```/g, "").trim();

    let parsedContent;
    try 
    {
      parsedContent = JSON.parse(cleanedResponse);
    } 
    catch (error) 
    {
      console.error("Failed to parse AI response as JSON:", error);
      return NextResponse.json
      (
        {
          error: "Failed to parse AI response as JSON",
          rawContent
        },
        { 
          status: 500 
        }
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
