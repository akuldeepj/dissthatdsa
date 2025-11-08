import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, mentor, doubt } = await request.json();

    // Validate required fields
    if (!name || !email || !mentor || !doubt) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get recipient email from environment variable
    const recipientEmail = process.env.RECIPIENT_EMAIL;
    if (!recipientEmail) {
      console.error("RECIPIENT_EMAIL environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Format the email subject
    const subject = `New Doubt Submission - ${mentor} - ${name}`;

    // Format the email body
    const emailBody = `
New doubt submission received:

Name: ${name}
Email: ${email}
Mentor: ${mentor}

Doubt:
${doubt}

---
This email was sent from the Diss That DSA website.
    `.trim();

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Diss That DSA <onboarding@resend.dev>", // You'll need to verify your domain with Resend
      to: recipientEmail,
      replyTo: email, // So you can reply directly to the user
      subject: subject,
      text: emailBody,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000; color: #fff;">
          <h2 style="color: #ff0000; border-bottom: 2px solid #ff0000; padding-bottom: 10px;">
            New Doubt Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong style="color: #ff0000;">Name:</strong> ${name}</p>
            <p><strong style="color: #ff0000;">Email:</strong> ${email}</p>
            <p><strong style="color: #ff0000;">Mentor:</strong> ${mentor}</p>
          </div>
          <div style="margin-top: 30px; padding: 15px; background-color: #1a1a1a; border-left: 4px solid #ff0000;">
            <h3 style="color: #ff0000; margin-top: 0;">Doubt:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${doubt.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            This email was sent from the Diss That DSA website.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in send-email route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

