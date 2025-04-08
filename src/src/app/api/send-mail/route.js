import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    // Get email data from request body
    const { recipientEmail, subject, content } = await request.json();

    // Validate required fields
    if (!recipientEmail || !subject || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Configure email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: subject,
      html: content,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
