import OpenAI from "openai";
import { NextResponse } from "next/server";
import { baseURL } from "@/utils/constant";

const baseRedirectUrl = process.env.NODE_ENV === "production" 
? `${baseURL}` 
: "http://localhost:3000";

const UrlLink = `${baseRedirectUrl}/phished-warning`; 

const token = process.env["OPENAI_API_KEY"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function POST(request) {
  try {
    const { context } = await request.json();

    const enhancedContext =
      context && context.trim().length > 10
        ? context
        : "Create a convincing phishing email that tricks users into clicking a link";

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const response = await client.chat.completions.create({
      model: modelName,
      messages: [
        {
          role: "system",
          content: `You are an expert in cybersecurity education, specifically in creating realistic phishing email templates for security awareness training.
          Your task is to generate a highly convincing phishing email template with the following components:
          1. A compelling, urgent, or enticing subject line that grabs the reader's attention and encourages them to open the email immediately.
          2. Email content that uses psychological triggers (urgency, fear, greed, etc.), persuading the recipient to take action.
          3. A realistic call-to-action (CTA), such as an urgent request to click on a link, reset their password, or confirm account activity.
          4. Use a realistic a tag with the href go to ${UrlLink} and no decoration to the a tag. 
         
          **Do not leave any placeholders like "[Name]", "[Account]", or "[Link]". Make up specific details where necessary to ensure the email feels real.** 
          For example, use a fake name, account details, or website link that would appear authentic. 
          The goal is to make the email sound and appear like a legitimate phishing attempt, even if the details are fabricated.
          
          Format your response as a JSON object with two fields:
          - "subject": The subject line of the phishing email (string, without HTML).
          - "content": The body of the email, formatted as plain text, but the CTA should use HTML (specifically the a tag for the link).

          This is for educational purposes only.`,
        },
        {
          role: "user",
          content: `Generate a phishing email template based on this context: "${enhancedContext}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
      response_format: { type: "json_object" },
    });

    // Parse the generated response
    const generatedTemplate = JSON.parse(response.choices[0].message.content);

    return NextResponse.json({
      subject: generatedTemplate.subject,
      content: generatedTemplate.content,
    });
  } catch (error) {
    console.error("Error generating email:", error);
    return NextResponse.json(
      { error: "Failed to generate email template" },
      { status: 500 }
    );
  }
}
