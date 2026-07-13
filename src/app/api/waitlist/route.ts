import { NextResponse } from "next/server";
import { addToWaitlist, getWaitlist } from "@/lib/waitlist";

export async function GET() {
  const data = await getWaitlist();
  return NextResponse.json({ count: data.count });
}

async function sendEmailViaREST({
  templateId,
  templateParams,
}: {
  templateId: string;
  templateParams: Record<string, any>;
}) {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !publicKey || !privateKey || !templateId) {
    console.error("Missing EmailJS environment variables configuration.");
    return false;
  }

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: templateParams,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`EmailJS REST API error (Status ${res.status}):`, text);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send email via EmailJS REST API:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      email?: string;
      country?: string;
      skillInterest?: string;
      skillLevel?: string;
      commitmentPeriod?: string;
      projectIdea?: string;
    };

    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const country = body.country?.trim();
    const skillInterest = body.skillInterest?.trim();
    const skillLevel = body.skillLevel?.trim();
    const commitmentPeriod = body.commitmentPeriod?.trim();
    const projectIdea = body.projectIdea?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!fullName || !country || !skillInterest || !skillLevel || !commitmentPeriod) {
      return NextResponse.json(
        { error: "Please complete every field before applying." },
        { status: 400 },
      );
    }

    const registration = {
      fullName,
      email,
      country,
      skillInterest,
      skillLevel,
      commitmentPeriod,
      projectIdea: projectIdea || undefined,
    };

    // Add to waitlist (inserts into Supabase & appends to JSON backup)
    const data = await addToWaitlist(registration);

    // Prepare email parameters
    const emailParams = {
      fullName,
      firstName: fullName.split(/\s+/)[0] || "builder",
      email,
      country,
      skillInterest,
      skillLevel,
      commitmentPeriod,
      projectIdea: projectIdea || "None",
      count: data.count,
      time: new Date().toLocaleString(),
    };

    // Trigger emails and await them so serverless execution context doesn't terminate prematurely
    const applicantTemplateId = process.env.EMAILJS_TEMPLATE_ID_APPLICANT;
    const founderTemplateId = process.env.EMAILJS_TEMPLATE_ID_FOUNDER;
    const emailPromises: Promise<any>[] = [];

    if (applicantTemplateId) {
      emailPromises.push(
        sendEmailViaREST({
          templateId: applicantTemplateId,
          templateParams: emailParams,
        }).catch(err => console.error("Error sending applicant email:", err))
      );
    }

    if (founderTemplateId) {
      emailPromises.push(
        sendEmailViaREST({
          templateId: founderTemplateId,
          templateParams: emailParams,
        }).catch(err => console.error("Error sending founder email:", err))
      );
    }

    if (emailPromises.length > 0) {
      await Promise.all(emailPromises);
    }

    return NextResponse.json({
      count: data.count,
      message:
        "You're on the list. We'll reach out personally when your team is ready.",
    });
  } catch (err) {
    console.error("Waitlist API route POST error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
