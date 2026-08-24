import type { LegalSection } from "@/components/legal/LegalPage";

/** UK Innovator Founder Cookie Policy (source content supplied by the client). */
export const COOKIES: LegalSection[] = [
  {
    id: "introduction",
    n: "1",
    title: "Introduction",
    blocks: [
      { type: "p", text: `This Cookie Policy explains how UK Innovator Founder, operated by Shams Britvisa Lawyers Ltd, uses cookies and similar technologies when you visit or use our website.` },
      { type: "p", text: `By continuing to use our website, you acknowledge that cookies may be used in accordance with this Cookie Policy and your browser preferences.` },
      { type: "p", text: `This Policy should be read together with our Privacy Notice.` },
    ],
  },
  {
    id: "what-are-cookies",
    n: "2",
    title: "What Are Cookies?",
    blocks: [
      { type: "p", text: `Cookies are small text files placed on your computer, tablet or mobile device when you visit a website. They help websites function efficiently, improve your browsing experience and provide information about how visitors use the website.` },
      { type: "p", text: `Cookies do not normally identify you personally, although they may become associated with information that identifies you where permitted by law.` },
    ],
  },
  {
    id: "how-we-use-cookies",
    n: "3",
    title: "How We Use Cookies",
    blocks: [
      { type: "p", text: `We may use cookies and similar technologies to:` },
      { type: "ul", items: [
        `ensure the website functions correctly;`,
        `maintain website security;`,
        `remember your preferences and settings;`,
        `improve website performance and user experience;`,
        `understand how visitors use our website;`,
        `analyse website traffic and usage patterns;`,
        `diagnose technical problems; and`,
        `improve our services and website functionality.`,
      ] },
    ],
  },
  {
    id: "types-of-cookies",
    n: "4",
    title: "Types of Cookies We May Use",
    blocks: [
      { type: "sub", text: `Essential Cookies` },
      { type: "p", text: `These cookies are necessary for the operation and security of our website and cannot normally be disabled through our systems.` },
      { type: "sub", text: `Functional Cookies` },
      { type: "p", text: `These cookies remember your preferences and help personalise your experience when using our website.` },
      { type: "sub", text: `Analytics Cookies` },
      { type: "p", text: `We may use website analytics services, including Google Analytics, to help us understand how visitors interact with our website. These cookies collect aggregated and statistical information which helps us improve the performance, functionality and content of our website.` },
      { type: "p", text: `Where required by applicable law, analytics cookies will only be used after you have provided your consent.` },
      { type: "sub", text: `Performance Cookies` },
      { type: "p", text: `These cookies help us understand website performance and identify areas requiring improvement.` },
    ],
  },
  {
    id: "third-party-cookies",
    n: "5",
    title: "Third-Party Cookies",
    blocks: [
      { type: "p", text: `Some cookies may be placed by carefully selected third-party service providers whose services are integrated into our website, including website analytics, payment processing or embedded content.` },
      { type: "p", text: `We do not control third-party cookies, and their use is governed by the respective privacy and cookie policies of those providers.` },
    ],
  },
  {
    id: "managing-preferences",
    n: "6",
    title: "Managing Your Cookie Preferences",
    blocks: [
      { type: "p", text: `Most web browsers allow you to:` },
      { type: "ul", items: [
        `accept or reject cookies;`,
        `delete existing cookies;`,
        `block particular categories of cookies; or`,
        `receive notifications before cookies are stored.`,
      ] },
      { type: "p", text: `Please note that disabling certain cookies may affect the functionality, performance or availability of some parts of our website.` },
    ],
  },
  {
    id: "changes",
    n: "7",
    title: "Changes to This Cookie Policy",
    blocks: [
      { type: "p", text: `We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements or the operation of our website.` },
      { type: "p", text: `The latest version will always be published on UK Innovator Founder and will take effect from the Effective Date shown at the top of this Policy.` },
    ],
  },
  {
    id: "contact-us",
    n: "8",
    title: "Contact Us",
    blocks: [
      { type: "p", text: `If you have any questions about this Cookie Policy or our use of cookies, please contact:` },
      { type: "ul", items: [
        `UK Innovator Founder / Shams Britvisa Lawyers Ltd`,
        `291 Slade Lane, Manchester, M19 2HR, United Kingdom`,
        `Email: info@ukinnovatorfounder.uk`,
        `Website: www.ukinnovatorfounder.uk`,
      ] },
    ],
  },
];
