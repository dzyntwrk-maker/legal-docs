// Vercel serverless function — /api/generate
// Works with or without ANTHROPIC_API_KEY:
//   With key    → Claude Sonnet (full AI drafting)
//   Without key → professional template documents (fully usable)

const today = () => new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const TEMPLATES = {
  nda: (d) => {
    const p1 = d.party1 || "Party A";
    const p2 = d.party2 || "Party B";
    const mutual = d.type === "mutual";
    const title = mutual ? "MUTUAL NON-DISCLOSURE AGREEMENT" : "NON-DISCLOSURE AGREEMENT";
    return {
      title: mutual ? "Mutual Non-Disclosure Agreement" : "Non-Disclosure Agreement",
      document: `${title}

This Non-Disclosure Agreement ("Agreement") is entered into as of ${d.date || today()} by and between:

${p1} ("${mutual ? "Party A" : "Disclosing Party"}")
and
${p2} ("${mutual ? "Party B" : "Receiving Party"}")

(each a "Party," collectively the "Parties").

1. PURPOSE
The Parties wish to explore a potential business relationship concerning ${d.purpose || "business discussions"} ("Purpose"). In connection with this Purpose, each Party may disclose certain confidential information to the other Party.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public information disclosed by ${mutual ? "either Party" : "the Disclosing Party"} to ${mutual ? "the other Party" : "the Receiving Party"}, either directly or indirectly, in writing, orally, or by inspection of tangible objects, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure.

3. OBLIGATIONS
${mutual ? "Each Party agrees" : "The Receiving Party agrees"} to: (a) hold the Confidential Information in strict confidence using at least the same degree of care used to protect its own confidential information, but in no event less than reasonable care; (b) not disclose Confidential Information to any third parties without prior written consent; (c) use Confidential Information solely for the Purpose.

4. EXCLUSIONS
Confidential Information does not include information that: (a) is or becomes publicly known through no breach of this Agreement; (b) was rightfully known before disclosure; (c) is rightfully received from a third party without restriction; (d) is required to be disclosed by law or court order, provided the disclosing Party is given prompt written notice.

5. TERM
This Agreement shall remain in effect for ${d.duration || "two (2) years"} from the date of this Agreement, unless earlier terminated by either Party upon thirty (30) days' written notice.

6. RETURN OF INFORMATION
Upon request, ${mutual ? "each Party shall" : "the Receiving Party shall"} promptly return or destroy all Confidential Information and certify such destruction in writing.

7. REMEDIES
The Parties acknowledge that breach of this Agreement may cause irreparable harm for which monetary damages may be inadequate. The non-breaching Party shall be entitled to seek equitable relief, including injunction and specific performance, without posting bond.

8. GOVERNING LAW
This Agreement shall be governed by the laws of ${d.governingLaw || "the State of California, USA"}, without regard to conflict of law principles.

9. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the Parties regarding its subject matter and supersedes all prior discussions and agreements.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.

${p1}                                    ${p2}

Signature: _______________________       Signature: _______________________

Name: ___________________________        Name: ___________________________

Title: __________________________        Title: __________________________

Date: ___________________________        Date: ___________________________`
    };
  },

  freelance: (d) => {
    const freelancer = d.freelancer || "Service Provider";
    const client = d.client || "Client";
    return {
      title: "Freelance Service Agreement",
      document: `FREELANCE SERVICE AGREEMENT

This Freelance Service Agreement ("Agreement") is entered into as of ${d.date || today()} between:

${freelancer} ("Freelancer")
and
${client} ("Client")

1. SERVICES
Freelancer agrees to provide the following services to Client: ${d.services || "professional services as mutually agreed upon in writing"} ("Services"). Freelancer shall perform the Services in a professional manner consistent with industry standards.

2. COMPENSATION
Client agrees to pay Freelancer ${d.payment || "the agreed-upon fee"} for the Services. Payment schedule: ${d.schedule || "50% due upon signing; 50% due upon delivery of final work product"}.

3. TIMELINE
Services shall be completed by ${d.deadline || "the mutually agreed deadline"}. Any changes to the timeline must be agreed upon in writing by both Parties.

4. REVISIONS
This Agreement includes ${d.revisions || "two (2)"} rounds of revisions. Additional revisions will be billed at Freelancer's standard hourly rate.

5. KILL FEE
If Client cancels this project after work has commenced, Client agrees to pay a kill fee of 50% of the remaining balance for work completed to date.

6. INTELLECTUAL PROPERTY
Upon receipt of full payment, Freelancer assigns to Client all rights, title, and interest in the final work product. Freelancer retains the right to display the work in their portfolio unless Client requests otherwise in writing.

7. INDEPENDENT CONTRACTOR
Freelancer is an independent contractor and not an employee of Client. Freelancer is responsible for all applicable taxes on payments received under this Agreement.

8. CONFIDENTIALITY
Freelancer agrees to keep confidential all non-public information shared by Client in connection with this project.

9. LIMITATION OF LIABILITY
Freelancer's total liability shall not exceed the total fees paid under this Agreement. Neither party shall be liable for indirect, incidental, or consequential damages.

10. TERMINATION
Either Party may terminate this Agreement with ${d.noticeDays || "fourteen (14)"} days' written notice. Upon termination, Client shall pay for all work completed to date.

11. DISPUTE RESOLUTION
Any disputes shall be resolved through binding arbitration in ${d.governingLaw || "New York, USA"} under the rules of the American Arbitration Association.

12. GOVERNING LAW
This Agreement shall be governed by the laws of ${d.governingLaw || "the State of New York, USA"}.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.

${freelancer}                            ${client}

Signature: _______________________       Signature: _______________________

Name: ___________________________        Name: ___________________________

Date: ___________________________        Date: ___________________________`
    };
  },

  llc: (d) => {
    const name = d.llcName || "Company LLC";
    const state = d.state || "Delaware";
    return {
      title: `${name} Operating Agreement`,
      document: `OPERATING AGREEMENT OF ${name.toUpperCase()}

This Operating Agreement ("Agreement") of ${name}, a ${state} limited liability company ("Company"), is entered into as of ${d.date || today()}, by and among the members listed in Exhibit A (each a "Member," collectively "Members").

1. FORMATION
The Company was formed pursuant to the laws of the State of ${state}. The Company shall file and maintain its Articles of Organization with the ${state} Secretary of State.

2. PURPOSE
The Company is formed for the purpose of ${d.purpose || "engaging in any lawful business activity"} and any other lawful purpose determined by the Members.

3. PRINCIPAL OFFICE
The principal office of the Company shall be located at the address designated by the Members from time to time.

4. CAPITAL CONTRIBUTIONS
Each Member's initial capital contribution and membership interest percentage are set forth in Exhibit A. Additional capital contributions require unanimous written consent of all Members.

5. MEMBERSHIP INTERESTS
Membership interests shall be as set forth in Exhibit A. No Member may transfer, assign, or pledge their membership interest without the prior written consent of all other Members.

6. DISTRIBUTIONS
Distributions of cash or other assets shall be made at such times and in such amounts as determined by ${d.management === "manager-managed" ? "the Manager" : "the Members by majority vote"}, in proportion to each Member's membership interest.

7. MANAGEMENT
The Company shall be ${d.management || "member-managed"}. ${d.management === "manager-managed" ? `The Manager(s) shall have full authority to manage the day-to-day operations of the Company. Major decisions (as defined herein) require Member approval by majority vote.` : `All Members shall have equal right to participate in management. Ordinary business decisions require approval of a majority in interest of Members. Major decisions require unanimous consent.`}

8. VOTING
Except as otherwise provided, matters submitted to a Member vote shall require approval by Members holding a majority of the membership interests.

9. TAX TREATMENT
The Company shall be treated as a ${d.members?.includes(",") ? "partnership" : "disregarded entity"} for federal income tax purposes unless the Members unanimously elect otherwise. Each Member shall be allocated their proportionate share of profits and losses.

10. DISSOLUTION
The Company shall be dissolved upon: (a) unanimous written consent of all Members; (b) entry of a judicial decree of dissolution; or (c) as otherwise required by applicable law.

11. GOVERNING LAW
This Agreement shall be governed by the laws of the State of ${state}.

IN WITNESS WHEREOF, the undersigned have executed this Operating Agreement as of the date first written above.

EXHIBIT A — MEMBERSHIP INTERESTS
Member Name             Capital Contribution     Membership Interest
__________________      $___________________     __________________%
__________________      $___________________     __________________%

Member Signatures:

Signature: _______________________       Date: ___________________________

Signature: _______________________       Date: ___________________________`
    };
  },

  employment: (d) => {
    const company = d.company || "Company";
    const candidate = d.candidate || "Candidate";
    return {
      title: "Employment Offer Letter",
      document: `${company.toUpperCase()}
EMPLOYMENT OFFER LETTER

${d.date || today()}

${candidate}
[Address]

Dear ${candidate},

We are thrilled to offer you the position of ${d.title || "the position"} at ${company}! We believe your skills and experience make you an excellent fit for our team, and we look forward to having you on board.

OFFER DETAILS

Position:          ${d.title || "the position"}
Department:        ${d.department || "as discussed"}
Employment Type:   ${d.empType || "Full-Time"}
Start Date:        ${d.startDate || "to be confirmed"}
Reports To:        ${d.reportsTo || "your direct manager"}

COMPENSATION

Base Salary:       ${d.salary || "as discussed"}
Pay Frequency:     ${d.payFrequency || "Bi-weekly"}
Benefits:          ${d.benefits || "Health, dental, and vision insurance; 401(k); PTO per company policy"}
${d.equity ? `Equity:            ${d.equity}` : ""}

AT-WILL EMPLOYMENT
Your employment with ${company} is at-will, meaning either you or ${company} may terminate the employment relationship at any time, with or without cause or notice, subject to applicable law.

CONDITIONS OF EMPLOYMENT
This offer is contingent upon: (a) successful completion of a background check; (b) your execution of ${company}'s standard confidentiality and IP assignment agreement; (c) verification of your legal authorization to work in the United States.

CONFIDENTIALITY
As a condition of employment, you will be required to sign and comply with ${company}'s Confidentiality and Proprietary Information Agreement.

ACCEPTANCE
Please sign and return this letter by ${d.acceptDeadline || "within five (5) business days"} to confirm your acceptance. If we do not receive your signed acceptance by that date, this offer may be withdrawn.

We are excited about the opportunity to work with you and are confident you will make a significant contribution to ${company}.

Sincerely,

_______________________
${d.hiringManager || "Hiring Manager"}
${company}

ACCEPTANCE

I accept the offer of employment as described in this letter and agree to the terms and conditions set forth herein.

Signature: _______________________       Date: ___________________________

Printed Name: ${candidate}`
    };
  },

  saas: (d) => {
    const product = d.productName || "the Service";
    const url = d.url || "our website";
    return {
      title: `${product} Terms of Service`,
      document: `TERMS OF SERVICE — ${product.toUpperCase()}

Effective Date: ${d.date || today()}
Last Updated: ${d.date || today()}

Welcome to ${product}. These Terms of Service ("Terms") govern your access to and use of ${product} (the "Service") provided by ${d.company || "Dizzy Inc"} ("Company," "we," or "us"). By accessing or using the Service, you agree to be bound by these Terms.

1. ACCEPTANCE OF TERMS
By creating an account, accessing, or using the Service, you confirm that you are at least 18 years old, have read and understood these Terms, and agree to be bound by them.

2. DESCRIPTION OF SERVICE
${product} provides ${d.description || "software-as-a-service tools and features"} accessible via ${url}. The Service is provided on a ${d.pricing || "subscription"} basis. We reserve the right to modify, suspend, or discontinue any part of the Service at any time.

3. ACCOUNT REGISTRATION
You must provide accurate, current, and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account.

4. PAYMENT AND BILLING
${d.pricing || "Subscription fees are billed in advance"} on the applicable billing cycle. All fees are non-refundable except as expressly provided in our Refund Policy. We may change pricing with thirty (30) days' notice.

5. REFUND POLICY
Refunds may be issued at our sole discretion within ${d.refundDays || "7"} days of purchase for unused services. Digital products and access codes are non-refundable once delivered.

6. INTELLECTUAL PROPERTY
The Service and its content, features, and functionality are owned by the Company and are protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the Service for its intended purpose.

7. USER DATA AND PRIVACY
Your use of the Service is subject to our Privacy Policy. We collect and process data as described therein. You retain ownership of any data you submit to the Service.

8. ACCEPTABLE USE
You agree not to: (a) use the Service for unlawful purposes; (b) infringe on intellectual property rights; (c) transmit malicious code; (d) attempt to gain unauthorized access to any part of the Service; (e) resell or sublicense the Service without authorization.

9. DISCLAIMER OF WARRANTIES
THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

10. LIMITATION OF LIABILITY
TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, OR DATA. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.

11. TERMINATION
We may suspend or terminate your access to the Service at any time for violation of these Terms. You may cancel your account at any time. Upon termination, your right to use the Service will immediately cease.

12. CHANGES TO TERMS
We reserve the right to update these Terms at any time. We will notify you of material changes via email or prominent notice within the Service. Continued use after the effective date constitutes acceptance.

13. GOVERNING LAW
These Terms shall be governed by the laws of ${d.governingLaw || "the State of Delaware, USA"}, without regard to conflict of law principles.

14. CONTACT INFORMATION
For questions about these Terms, contact us at: ${d.contactEmail || "[contact email]"}

${d.company || "Dizzy Inc"}
${url}`
    };
  },
};

const DOC_PROMPTS = {
  nda: (d) => ({
    title: `${d.type === "mutual" ? "Mutual " : ""}Non-Disclosure Agreement`,
    prompt: `Draft a professional ${d.type === "mutual" ? "mutual " : ""}Non-Disclosure Agreement:
- Disclosing Party: ${d.party1 || "Party A"}
- Receiving Party: ${d.party2 || "Party B"}
- Purpose: ${d.purpose || "business discussions"}
- Duration: ${d.duration || "2 years"}
- Governing Law: ${d.governingLaw || "California, USA"}
Include: definitions, obligations, exclusions, term, return of information, remedies, governing law, signature blocks. Plain language, legally precise.`
  }),
  freelance: (d) => ({
    title: "Freelance Service Agreement",
    prompt: `Draft a professional Freelance Service Agreement:
- Freelancer: ${d.freelancer || "Service Provider"}
- Client: ${d.client || "Client"}
- Services: ${d.services || "as agreed"}
- Payment: ${d.payment || "as agreed"}
- Schedule: ${d.schedule || "50% upfront, 50% on completion"}
- Deadline: ${d.deadline || "as agreed"}
- Governing Law: ${d.governingLaw || "New York, USA"}
Include: scope, payment, IP assignment, revisions, kill fee, confidentiality, independent contractor status, limitation of liability, termination, signature blocks.`
  }),
  llc: (d) => ({
    title: `${d.llcName || "LLC"} Operating Agreement`,
    prompt: `Draft an LLC Operating Agreement:
- LLC Name: ${d.llcName || "Company LLC"}
- State: ${d.state || "Delaware"}
- Members: ${d.members || "as listed"}
- Management: ${d.management || "member-managed"}
- Purpose: ${d.purpose || "general business"}
Include: formation, purpose, capital contributions, membership interests, distributions, management, voting, transfer restrictions, dissolution, tax treatment, signature pages.`
  }),
  employment: (d) => ({
    title: "Employment Offer Letter",
    prompt: `Draft an employment offer letter:
- Company: ${d.company || "Company"}
- Candidate: ${d.candidate || "Candidate"}
- Title: ${d.title || "the position"}
- Salary: ${d.salary || "as discussed"}
- Start Date: ${d.startDate || "TBD"}
- Type: ${d.empType || "Full-time"}
- Benefits: ${d.benefits || "per company policy"}
Include: offer details, compensation, at-will clause, confidentiality expectation, background check condition, acceptance deadline, warm tone, signature line.`
  }),
  saas: (d) => ({
    title: `${d.productName || "Service"} Terms of Service`,
    prompt: `Draft SaaS Terms of Service:
- Product: ${d.productName || "the Service"}
- Website: ${d.url || "the website"}
- Pricing: ${d.pricing || "subscription"}
- Governing Law: ${d.governingLaw || "Delaware, USA"}
- Description: ${d.description || "software-as-a-service"}
Include: acceptance, description, account registration, payment/billing, refund policy, IP, user data/privacy, acceptable use, disclaimer of warranties, limitation of liability, termination, changes, contact info.`
  }),
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { docType, formData } = req.body || {};
  if (!docType || !TEMPLATES[docType]) {
    return res.status(400).json({ error: "Invalid document type." });
  }

  // Try Claude if API key available
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const { default: Anthropic } = await import("@anthropic-ai/sdk");
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const { title, prompt } = DOC_PROMPTS[docType](formData || {});
      const dt = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        system: `You are an experienced business attorney drafting professional legal documents. Use today's date (${dt}) where relevant. Format with proper section numbering. Output plain text, no markdown.`,
        messages: [{ role: "user", content: prompt }],
      });

      return res.status(200).json({
        document: message.content[0]?.text || "",
        title,
      });
    } catch (err) {
      console.error("Claude API error:", err?.message);
      // Fall through to template
    }
  }

  // Template fallback — fully usable documents without API key
  const result = TEMPLATES[docType](formData || {});
  return res.status(200).json(result);
}
