import { EmailTemplate } from "@/app/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, email, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Contact <santinogiordano13@gmail.com>",
      to: ["yourrealemail@gmail.com"], // <-- CHANGE THIS
      subject: `New message from ${firstName}`,
      react: EmailTemplate({ firstName, email, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}