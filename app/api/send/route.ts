import { Resend } from "resend";

export async function POST(req: Request) {
  console.log("=== API SEND CALLED ===");

  try {
    console.log("ENV KEY EXISTS?", !!process.env.RESEND_API_KEY);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const rawBody = await req.text();
    console.log("RAW BODY:", rawBody);

    let parsed;
    try {
      parsed = JSON.parse(rawBody);
    } catch (e) {
      console.error("JSON PARSE FAILED:", e);
      return Response.json({ error: "Invalid JSON" }, { status: 400 });
    }

    console.log("PARSED BODY:", parsed);

    const { firstName, email, message } = parsed;

    if (!firstName || !email || !message) {
      console.error("MISSING FIELDS");
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("ATTEMPTING TO SEND EMAIL...");

    const response = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["santinogiordano13@gmail.com"],
      subject: `New message from ${firstName}`,
      html: `
        <h1>New Contact Submission</h1>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    console.log("RESEND RESPONSE:", response);

    if (response.error) {
      console.error("RESEND ERROR:", response.error);
      return Response.json({ error: response.error }, { status: 500 });
    }

    console.log("EMAIL SENT SUCCESSFULLY");

    return Response.json({ success: true });
  } catch (err) {
    console.error("🔥 FULL SERVER CRASH:", err);
    return Response.json(
      { error: "Server crashed", details: String(err) },
      { status: 500 }
    );
  }
}