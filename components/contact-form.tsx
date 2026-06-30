"use client";

import { Check, Clock3, Copy, Globe2, Phone, Send, Share2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useEffect, useState, type FormEvent } from "react";
import type { EstimateSummary, PlanName } from "@/components/build-estimator";

interface ContactFormProps {
  selectedPlan: PlanName | null;
  estimate: EstimateSummary | null;
}

type SubmitState = "idle" | "sending" | "success" | "error";

export function ContactForm({ selectedPlan, estimate }: ContactFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [projectMessage, setProjectMessage] = useState("");

  useEffect(() => {
    if (!selectedPlan) return;
    setSubject(`${selectedPlan} website project inquiry`);
    setProjectMessage([
      `Hi Wafi,`,
      ``,
      `I have selected the ${selectedPlan} plan and would like to discuss moving forward.`,
      ``,
      `My current build estimate:`,
      `- Estimated project cost: ${estimate ? `$${estimate.cost.toLocaleString()}` : "To be confirmed"}`,
      `- Estimated timeline: ${estimate ? `${estimate.days} days` : "To be confirmed"}`,
      `- Pages: ${estimate?.pages ?? "To be confirmed"}`,
      `- Complexity: ${estimate?.complexity ?? "To be confirmed"}`,
      `- Features: ${estimate?.features.length ? estimate.features.join(", ") : "None selected"}`,
      `- Design polish: ${estimate?.design ?? "To be confirmed"}`,
      `- Delivery pace: ${estimate?.speed ?? "To be confirmed"}`,
      `- Revision rounds: ${estimate?.revisions ?? "To be confirmed"}`,
      `- Monthly maintenance: ${estimate?.maintenance ? `${estimate.maintenance.level} ($${estimate.maintenance.monthly}/month)` : "Not selected"}`,
      ``,
      `Please let me know the next steps and anything else you need from me.`,
      ``,
      `Thanks!`,
    ].join("\n"));
  }, [estimate, selectedPlan]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const body = String(data.get("message") ?? "").trim();
    if (!name || !email || !subject || !body) { setSubmitState("error"); setMessage("Please complete every required field."); return; }

    setSubmitState("sending"); setMessage("Sending your message...");
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_iwxl6w6",
          template_id: "template_s1uilom",
          user_id: "Pqse8h-LaxFgSW1SH",
          template_params: { from_name: name, from_email: email, subject, message: body, selected_plan: selectedPlan ?? "Not selected", to_email: "wafisyed.dev@gmail.com" },
        }),
      });
      if (!response.ok) throw new Error("Email service rejected the request");
      form.reset(); setSubject(""); setProjectMessage(""); setSubmitState("success"); setMessage("Thanks! Your message has been sent.");
    } catch {
      setSubmitState("error"); setMessage("The form could not send right now. Please call or message me through LinkedIn.");
    }
  }

  async function copyPhone() {
    await navigator.clipboard.writeText("+15107318687"); setPhoneCopied(true); window.setTimeout(() => setPhoneCopied(false), 1800);
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <div className="contact-wrapper">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {selectedPlan ? <div className="selected-plan-notice">Selected plan: <strong>{selectedPlan}</strong></div> : null}
            <div className="form-group"><label htmlFor="name">Your Name</label><input type="text" id="name" name="name" placeholder="John Doe" required /></div>
            <div className="form-group"><label htmlFor="email">Email Address</label><input type="email" id="email" name="email" placeholder="john@example.com" required /></div>
            <div className="form-group"><label htmlFor="subject">Subject</label><input type="text" id="subject" name="subject" placeholder="Project inquiry" value={subject} onChange={(event) => setSubject(event.target.value)} required /></div>
            <div className="form-group"><label htmlFor="message">Message</label><textarea id="message" name="message" placeholder="Tell me about your project and goals." rows={10} value={projectMessage} onChange={(event) => setProjectMessage(event.target.value)} required /></div>
            <button type="submit" className="btn btn-primary form-submit" disabled={submitState === "sending"}><Send aria-hidden="true" /> {submitState === "sending" ? "Sending..." : "Send Message"}</button>
            {message ? <div className={`form-message ${submitState}`} role="status">{message}</div> : null}
          </form>
          <aside className="contact-info">
            <h3>Let&apos;s Connect</h3>
            <div className="contact-item"><h4><Phone aria-hidden="true" /> Phone</h4><p><a href="tel:+15107318687" className="phone-link">+1 (510) 731-8687</a></p><button type="button" className="icon-btn" onClick={copyPhone}>{phoneCopied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />} {phoneCopied ? "Copied" : "Copy"}</button></div>
            <div className="contact-item"><h4><Share2 aria-hidden="true" /> Social</h4><div className="social-icons"><a href="https://github.com/WafflesNZXT" className="social-icon" target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> GitHub</a><a href="https://www.linkedin.com/in/wafisyed/" className="social-icon" target="_blank" rel="noreferrer"><FaLinkedin aria-hidden="true" /> LinkedIn</a></div></div>
            <div className="contact-item"><h4><Clock3 aria-hidden="true" /> Availability</h4><p>I typically respond within 24 hours.</p></div>
            <div className="contact-item"><h4><Globe2 aria-hidden="true" /> Based In</h4><p>Bay Area, California, available for remote work worldwide.</p></div>
          </aside>
        </div>
      </div>
    </section>
  );
}
