import OpenAI from "openai";
import { NextResponse } from "next/server";
import { template } from "@/app/email-generator/page";

const token = process.env["OPENAI_API_KEY"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o-mini";

export async function POST(request){
    try {
        const { context } = await request.json();

        const enhancedContext = context && context.trim().length > 10 
        ? context 
        : "Create a convincing phishing email that tricks users into clicking a link";

        const client = new OpenAI({ baseURL: endpoint, apiKey: token});

        const response = await client.chat.completions.create({
            model: modelName,
            messages: [
                {
                    role: "system",
                    content: `You are an expert in cybersecurity education, specifically in creating realistic phishing email templates for security awareness training. 
                    Generate a convincing phishing email template with these components:
                    1. A deceptive sender email address that appears legitimate but has subtle issues
                    2. An urgent or enticing subject line
                    3. Email content with psychological triggers (urgency, fear, greed)
                    4. Include a call-to-action with a placeholder link
                    
                    Format your response as a JSON object with "sender", "subject", and "content" fields.
                    Use \n for line breaks in the "content" field, imaging you are writing this solely on a word document. This is for educational purposes only. 
                    Here is an example output for a bank phishing email content: ${template.bank.content} and please note that this is only an example output, 
                    this will not influence in any way to the actual output except in format that means, do not use html language and focus on writing a natural email then put it in the "content" field.`
                },
                {
                    role: "user",
                    content: `Generate a phishing email template based on this context: "${enhancedContext}. 
                    If you deems this context is unless or otherwise have nothing to do with to do with phishing, following this directive: 
                    "Create a convincing phishing email that tricks users into clicking a link" "`
                }
            ],
            temperature: 0.7,
            max_tokens: 800,
            response_format: { type: "json_object" }
        });

            // Parse the generated response
            const generatedTemplate = JSON.parse(response.choices[0].message.content);
    
            return NextResponse.json({
                sender: generatedTemplate.sender,
                subject: generatedTemplate.subject,
                content: generatedTemplate.content
            });
    } catch (error) {
        console.error("Error generating email:", error);
        return NextResponse.json(
            { error: "Failed to generate email template" },
            { status: 500 }
        );
    }
}