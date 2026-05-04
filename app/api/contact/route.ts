import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, service, budget, message } = await req.json();
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "ACADIA Portfolio <contact@acadiaberry.com>",
      to: "acadiaberry@gmail.com",
      replyTo: email,
      subject: `New inquiry from ${name}${service ? ` — ${service}` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service || "Not specified"}`,
        `Budget: $${budget || "Not specified"}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
