import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env["RESEND_API_KEY"]);

export async function POST(request) {
  try {
    const { recipientEmail, senderEmail, subject, content } = await request.json();

    if (!recipientEmail || !senderEmail || !subject || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "nathanhuynh171005@gmail.com",
      to: recipientEmail,
      subject: subject,
      html: content,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 