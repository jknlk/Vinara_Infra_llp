export type LegalSection = {
  heading: string;
  body: string[];
  points?: string[];
};

export type LegalDoc = {
  title: string;
  standfirst: string;
  updated: string;
  sections: LegalSection[];
};

const UPDATED = "11 October 2026";

export const TERMS: LegalDoc = {
  title: "Terms & Conditions",
  standfirst:
    "The terms that apply when you browse this website, request a quote or get in touch with Vinara Infra LLP.",
  updated: UPDATED,
  sections: [
    {
      heading: "Acceptance of these terms",
      body: [
        "This website is operated by Vinara Infra LLP (“Vinara”, “we”, “us”). By accessing or using it you agree to these Terms & Conditions and to our Privacy Policy. If you do not agree, please do not use the website.",
      ],
    },
    {
      heading: "Purpose of the website",
      body: [
        "The website provides general information about Vinara, our services, projects, people and career opportunities. Nothing on it is an offer, a tender, a guarantee of availability or professional advice for your specific project.",
      ],
    },
    {
      heading: "Using the website",
      body: ["You may browse the website and share links to it for lawful, non-commercial purposes. You agree not to:"],
      points: [
        "copy, scrape or republish substantial parts of the website without our written permission;",
        "attempt to gain unauthorised access to the website, its administration area or the systems behind it;",
        "introduce malicious code, or interfere with the availability or security of the website;",
        "use the website in any way that is unlawful or that misrepresents your identity or your relationship with Vinara.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "Unless stated otherwise, the text, photographs, drawings, 3D visuals, graphics, logos and layout on this website belong to Vinara Infra LLP or are used with permission, and are protected by applicable intellectual property laws.",
        "Names and logos of clients, consultants, tenants and partners shown on the website remain the property of their respective owners and are shown to describe our work. Their appearance does not imply endorsement.",
      ],
    },
    {
      heading: "Project information and figures",
      body: [
        "Areas, progress percentages, timelines, specifications and other project figures are shared for general information and reflect the position at the time of publication. Projects evolve, so these details may change without notice and should not be relied on as a contractual commitment.",
      ],
    },
    {
      heading: "Quotes and enquiries",
      body: [
        "Sending us a quote request or enquiry does not create a contract between you and Vinara. Any indicative programme, approach note or price we share in response is subject to detailed scope, site conditions and a written agreement signed by both parties.",
        "Please do not send confidential information through the website unless we have agreed in writing how it will be handled.",
      ],
    },
    {
      heading: "Careers",
      body: [
        "Roles listed on the website are published for information and may be filled, changed or withdrawn at any time. A listing or an application is not an offer of employment. Any offer is made only in writing by an authorised representative of Vinara.",
      ],
    },
    {
      heading: "Third-party links and services",
      body: [
        "The website may link to, or embed content from, third parties, such as the map on our contact page. We do not control those services and are not responsible for their content, availability or privacy practices.",
      ],
    },
    {
      heading: "Disclaimer",
      body: [
        "We take care to keep the website accurate and up to date, but it is provided on an “as is” and “as available” basis. To the extent permitted by law, we make no warranties, express or implied, about the completeness, accuracy or reliability of its content, or that it will be uninterrupted or free of errors.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "To the extent permitted by law, Vinara Infra LLP, its partners and employees will not be liable for any indirect, incidental or consequential loss, or for any loss of data, business or profit, arising from your use of, or inability to use, this website or from reliance on its content.",
        "Nothing in these terms limits any liability that cannot be excluded under applicable law, or any obligation we take on in a separate written agreement with you.",
      ],
    },
    {
      heading: "Governing law and jurisdiction",
      body: [
        "These terms are governed by the laws of India. Any dispute relating to the website or these terms is subject to the exclusive jurisdiction of the courts at Bengaluru, Karnataka.",
      ],
    },
    {
      heading: "Changes to these terms",
      body: [
        "We may update these terms from time to time. The revised version takes effect when it is published on this page, and the date above shows when it was last changed. Continuing to use the website after an update means you accept the revised terms.",
      ],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  standfirst:
    "What personal information Vinara Infra LLP receives through this website, how we use it and the choices you have.",
  updated: UPDATED,
  sections: [
    {
      heading: "Who we are",
      body: [
        "This website is operated by Vinara Infra LLP (“Vinara”, “we”, “us”), a construction company headquartered in Bengaluru, India. This policy explains how we handle personal information connected with the website, in line with applicable Indian law, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.",
      ],
    },
    {
      heading: "Information we receive",
      body: ["You can browse the website without creating an account or telling us who you are. We receive personal information only when you choose to share it:"],
      points: [
        "Quote requests and enquiries — your name, company, email address, phone number and the project details you provide, such as type of work, built-up area, location, timeline and notes.",
        "Job applications — your contact details, CV and any other information you include when you write to our careers email address.",
        "Direct contact — anything you share when you email, call or write to us.",
      ],
    },
    {
      heading: "How the quote builder works",
      body: [
        "The quote builder on our contact page prepares an email in your own email application. Your answers are not stored on the website and reach us only when you send that email.",
      ],
    },
    {
      heading: "Technical information and cookies",
      body: [
        "The public website does not use advertising or analytics cookies. Like any website, the servers that deliver it automatically process basic technical data, such as your IP address, browser type and the time of your request, to serve pages and keep the website secure.",
        "A sign-in cookie is used only in the staff administration area and is not set for ordinary visitors.",
      ],
    },
    {
      heading: "How we use your information",
      body: ["We use the information you share to:"],
      points: [
        "respond to your enquiry and prepare quotes, approach notes or proposals;",
        "assess job applications and communicate with candidates;",
        "manage our relationship with clients, consultants, suppliers and partners;",
        "meet legal, regulatory, safety and audit obligations;",
        "protect the website and our business against misuse.",
      ],
    },
    {
      heading: "Sharing your information",
      body: [
        "We do not sell your personal information. We share it only where needed:",
      ],
      points: [
        "with service providers who support our operations, such as email, hosting and IT providers, under appropriate confidentiality obligations;",
        "with project consultants or partners, where this is needed to respond to your enquiry;",
        "with government or regulatory authorities, where the law requires it.",
      ],
    },
    {
      heading: "Third-party services",
      body: [
        "Some content is delivered by third parties, including the OpenStreetMap map on our contact page and an image delivery service used for photographs. When your browser loads this content, those providers receive technical data such as your IP address and handle it under their own privacy policies.",
      ],
    },
    {
      heading: "Retention",
      body: [
        "We keep personal information only for as long as it is needed for the purpose it was shared for, or for as long as the law requires us to keep records. After that it is deleted or anonymised.",
      ],
    },
    {
      heading: "Security",
      body: [
        "We use reasonable technical and organisational measures to protect personal information against loss, misuse and unauthorised access. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      heading: "Your rights",
      body: ["Subject to applicable law, you may ask us to:"],
      points: [
        "confirm what personal information we hold about you and give you a summary of it;",
        "correct or update information that is inaccurate or incomplete;",
        "erase information we no longer need to keep;",
        "stop using your information where you withdraw a consent you gave earlier;",
        "look into a concern or grievance about how your information has been handled.",
      ],
    },
    {
      heading: "Children",
      body: [
        "The website is intended for business and professional use and is not directed at anyone under 18. We do not knowingly collect personal information from children.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "We may update this policy from time to time. The revised version takes effect when it is published on this page, and the date above shows when it was last changed.",
      ],
    },
  ],
};
