// Vercel serverless function — /api/generate
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const DOC_PROMPTS = {
  nda: (d) => ({
    title: `${d.type === "mutual" ? "Mutual " : ""}Non-Disclosure Agreement`,
    prompt: `Draft a professional ${d.type === "mutual" ? "mutual " : ""}Non-Disclosure Agreement with these details:
- Disclosing Party: ${d.party1 || "Party A"}
- Receiving Party: ${d.party2 || "Party B"}
- Purpose: ${d.purpose || "business discussions"}
- Duration: ${d.duration || "2 years"}
- Governing Law: ${d.governingLaw || "California, USA"}

Include: definitions of confidential information, obligations of receiving party, permitted disclosures, exclusions, term and termination, remedies, general provisions. Use plain language but be legally precise. Include signature blocks.`
  }),

  freelance: (d) => ({
    title: "Freelance Service Agreement",
    prompt: `Draft a professional Freelance Service Agreement:
- Freelancer: ${d.freelancer || "Service Provider"}
- Client: ${d.client || "Client"}
- Services: ${d.services || "as agreed"}
- Payment: ${d.payment || "as agreed"}
- Payment Schedule: ${d.schedule || "50% upfront, 50% on completion"}
- Deadline: ${d.deadline || "as agreed"}
- Governing Law: ${d.governingLaw || "New York, USA"}

Include: scope of services, payment terms, intellectual property assignment, revisions policy, kill fee, confidentiality, independent contractor status, limitation of liability, termination, dispute resolution. Include signature blocks.`
  }),

  llc: (d) => ({
    title: `${d.llcName || "LLC"} Operating Agreement`,
    prompt: `Draft an LLC Operating Agreement for:
- LLC Name: ${d.llcName || "Company LLC"}
- State: ${d.state || "Delaware"}
- Members: ${d.members || "as listed"}
- Management: ${d.management || "member-managed"}
- Business Purpose: ${d.purpose || "general business"}

Include: formation details, purpose, capital contributions, membership interests, distributions, management (${d.management || "member-managed"}), voting, transfer restrictions, dissolution, tax treatment (default pass-through). Include signature and exhibit pages.`
  }),

  employment: (d) => ({
    title: "Employment Offer Letter",
    prompt: `Draft a professional employment offer letter:
- Company: ${d.company || "Company"}
- Candidate: ${d.candidate || "Candidate"}
- Job Title: ${d.title || "the position"}
- Salary: ${d.salary || "as discussed"}
- Start Date: ${d.startDate || "TBD"}
- Employment Type: ${d.empType || "Full-time"}
- Benefits: ${d.benefits || "as per company policy"}

Include: offer details, compensation, benefits, start date, at-will employment clause, confidentiality expectation, conditions of employment (background check), acceptance deadline, warm congratulatory tone. Include signature line for candidate acceptance.`
  }),

  saas: (d) => ({
    title: `${d.productName || "Service"} Terms of Service`,
    prompt: `Draft comprehensive SaaS Terms of Service for:
- Product: ${d.productName || "the Service"}
- Website: ${d.url || "the website"}
- Pricing: ${d.pricing || "subscription"}
- Governing Law: ${d.governingLaw || "Delaware, USA"}
- Description: ${d.description || "software-as-a-service"}

Include: acceptance of terms, description of service, account registration, payment and billing, refund policy, intellectual property, user data and privacy, acceptable use policy, disclaimer of warranties, limitation of liability, termination, changes to terms, contact information. Be comprehensive but readable.`
  }),
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { docType, formData } = req.body || {};
  if (!docType || !DOC_PROMPTS[docType]) {
    return res.status(400).json({ error: "Invalid document type." });
  }

  try {
    const { title, prompt } = DOC_PROMPTS[docType](formData || {});
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: `You are an experienced business attorney drafting professional legal documents.
Write clear, enforceable documents. Use today's date (${today}) where relevant.
Format with proper section numbering. Output plain text, no markdown.`,
      messages: [{ role: "user", content: prompt }],
    });

    return res.status(200).json({
      document: message.content[0]?.text || "",
      title,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Document generation failed. Please try again." });
  }
}
