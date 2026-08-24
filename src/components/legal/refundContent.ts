import type { LegalSection } from "@/components/legal/LegalPage";

/** UK Innovator Founder Refund & Cancellation Policy (client-supplied content). */
export const REFUND: LegalSection[] = [
  {
    id: "our-commitment",
    n: "1",
    title: "Our Commitment",
    blocks: [
      { type: "p", text: `At Shams Britvisa Lawyers Ltd, we are committed to providing a refund and cancellation policy that is fair, transparent and compliant with applicable UK consumer legislation.` },
      { type: "p", text: `Our approach seeks to balance:` },
      { type: "ul", items: [
        `the work undertaken on your behalf;`,
        `your statutory consumer rights;`,
        `the professional nature of the immigration services we provide; and`,
        `the fact that Government Fees and third-party charges are determined by the relevant authorities and are outside our control.`,
      ] },
      { type: "p", text: `We assess each request on its own individual circumstances and aim to deal with refund requests promptly, fairly and consistently.` },
    ],
  },
  {
    id: "right-to-cancel",
    n: "2",
    title: "Your Right to Cancel",
    blocks: [
      { type: "sub", text: `2.1 Cancellation Before Work Begins` },
      { type: "p", text: `You may withdraw your instructions at any time before substantive work has commenced on your matter.` },
      { type: "p", text: `Where no meaningful or substantive work has been undertaken, you will normally be entitled to a full refund of any Legal Fees paid plus the Government Fee.` },
      { type: "p", text: `For the purposes of this Policy, substantive work may include opening your file, reviewing your instructions, assessing your eligibility, considering supporting documents, preparing your application, corresponding with you regarding your matter, providing immigration advice, or carrying out any other professional work connected with your instructions.` },
      { type: "sub", text: `2.2 No Obligation to Proceed` },
      { type: "p", text: `You are under no obligation to continue with our Services merely because you have:` },
      { type: "ul", items: [
        `made an enquiry;`,
        `started an online application;`,
        `requested information; or`,
        `communicated with us.`,
      ] },
    ],
  },
  {
    id: "cancellation-after-work",
    n: "3",
    title: "Cancellation After Work Has Commenced",
    blocks: [
      { type: "p", text: `Where you cancel after substantive work has commenced but before submission of your application, we reserve the right to retain fair and proportionate Legal Fees reflecting the work completed.` },
      { type: "p", text: `Examples include:` },
      { type: "table", columns: ["Stage of Work Completed", "Approximate Legal Fees Retained"], rows: [
        ["Initial eligibility assessment and opening the file", "Up to 30%"],
        ["Reviewing documents and preparing the application", "Up to 50%"],
        ["Application substantially completed and ready for submission", "Up to 80%"],
        ["Application submitted to UKVI", "Up to 100%"],
      ] },
      { type: "p", text: `These percentages are intended as guidance only. Each case will be assessed individually to ensure any deductions remain fair and reasonable.` },
    ],
  },
  {
    id: "change-of-mind",
    n: "4",
    title: "Change of Mind After Submission",
    blocks: [
      { type: "p", text: `If you decide not to proceed after:` },
      { type: "ul", items: [
        `your application has been finalised;`,
        `Government Fees have been paid on your behalf; and/or`,
        `substantial work has been completed,`,
      ] },
      { type: "p", text: `our Legal Fees shall generally remain non-refundable, as the Services requested have already been provided.` },
    ],
  },
  {
    id: "government-fees",
    n: "5",
    title: "Government Fees",
    blocks: [
      { type: "p", text: `Government Fees are separate from our Legal Fees.` },
      { type: "p", text: `Government Fees may include payments made to:` },
      { type: "ul", items: [
        `UK Visas and Immigration (UKVI);`,
        `the Home Office;`,
        `VFS Global;`,
        `TLScontact;`,
        `Priority or Super Priority services; and`,
        `other third-party providers selected by you.`,
      ] },
      { type: "p", text: `Government Fees do not belong to UK Innovator Founder and are subject to the refund policies of the relevant authority.` },
    ],
  },
  {
    id: "withdrawal-before-biometrics",
    n: "6",
    title: "Withdrawal Before Biometrics",
    blocks: [
      { type: "p", text: `Where:` },
      { type: "ul", items: [
        `your application has been submitted;`,
        `Government Fees have been paid; and`,
        `you have not attended your biometric appointment,`,
      ] },
      { type: "p", text: `we may assist you in requesting a refund of Government Fees from UKVI where UKVI's policies permit.` },
      { type: "p", text: `However:` },
      { type: "ul", items: [
        `the decision to issue a refund rests entirely with UKVI;`,
        `Government Fee refunds cannot be guaranteed; and`,
        `our Legal Fees will generally remain non-refundable because the substantive work has been completed.`,
      ] },
    ],
  },
  {
    id: "after-biometrics",
    n: "7",
    title: "After Biometrics",
    blocks: [
      { type: "p", text: `Where:` },
      { type: "ul", items: [
        `Government Fees have been paid; and`,
        `biometrics have already been enrolled,`,
      ] },
      { type: "p", text: `Government Fees are generally non-refundable.` },
      { type: "p", text: `Neither Government Fees nor Legal Fees will usually be refundable once the application is awaiting a decision.` },
    ],
  },
  {
    id: "visa-refusals",
    n: "8",
    title: "Visa Refusals",
    blocks: [
      { type: "p", text: `A visa refusal does not automatically mean that UK Innovator Founder or SBVL acted negligently.` },
      { type: "p", text: `UKVI may refuse applications for reasons outside our control, including where an Entry Clearance Officer is not satisfied regarding:` },
      { type: "ul", items: [
        `the genuineness of the visit;`,
        `the Applicant's intentions;`,
        `financial circumstances;`,
        `immigration history;`,
        `credibility;`,
        `supporting evidence; or`,
        `ties to the Applicant's home country.`,
      ] },
      { type: "p", text: `Where a refusal arises from factors outside our control:` },
      { type: "ul", items: [
        `Legal Fees shall not be refundable; and`,
        `Government Fees shall not be refundable.`,
      ] },
    ],
  },
  {
    id: "goodwill-reapplication",
    n: "9",
    title: "Goodwill Re-Application",
    blocks: [
      { type: "p", text: `Although we accept no liability for visa refusals arising from matters outside our reasonable control, we recognise that a refusal can be disappointing and stressful.` },
      { type: "p", text: `Accordingly, entirely at our sole discretion and as a gesture of goodwill, we may choose to assist you with a fresh application by offering one of the following:` },
      { type: "ul", items: [
        `a 50% discount on our Legal Fees for preparing a new application; or`,
        `where the circumstances and the amount of additional work involved reasonably justify it, preparation of a fresh application without charging any additional Legal Fees.`,
      ] },
      { type: "p", text: `Any such goodwill assistance is entirely discretionary and will be assessed on the individual facts and circumstances of each case.` },
      { type: "p", text: `Where a goodwill offer is made:` },
      { type: "ul", items: [
        `you will remain responsible for paying any new Government Fees, visa application fees, biometric charges and any other third-party costs payable to UKVI or other relevant authorities; and`,
        `the decision whether to make a goodwill offer, and the form of any such offer, rests entirely with Shams Britvisa Lawyers Ltd.`,
      ] },
      { type: "p", text: `Nothing in this clause creates a contractual right or entitlement to a discounted or free re-application, nor does it constitute an admission of liability or fault.` },
    ],
  },
  {
    id: "errors-attributable",
    n: "10",
    title: "Errors Attributable to Us",
    blocks: [
      { type: "p", text: `We strive to maintain the highest professional standards.` },
      { type: "p", text: `If an application is refused solely because of an error directly attributable to UK Innovator Founder or SBVL, we shall investigate the matter thoroughly.` },
      { type: "p", text: `Examples may include:` },
      { type: "ul", items: [
        `completing the application incorrectly despite receiving accurate information from you;`,
        `failing to upload documents supplied by you;`,
        `omitting evidence provided by you without reasonable explanation; or`,
        `administrative mistakes that materially affected the outcome.`,
      ] },
      { type: "p", text: `Where, following investigation, we determine that the refusal arose solely due to our error, we may, at our discretion:` },
      { type: "ul", items: [
        `provide a full refund of the Legal Fees paid;`,
        `prepare and submit a fresh application without charging additional Legal Fees; and/or`,
        `reimburse or cover the relevant Government Fees where circumstances justify such action.`,
      ] },
    ],
  },
  {
    id: "exclusions",
    n: "11",
    title: "Exclusions",
    blocks: [
      { type: "p", text: `Refunds shall generally not be available where losses arise wholly or partly from:` },
      { type: "ul", items: [
        `inaccurate information supplied by you;`,
        `missing documents not provided to us;`,
        `changes in circumstances not disclosed to us;`,
        `adverse immigration history;`,
        `discretionary decisions made by UKVI beyond our control; or`,
        `failure to comply with requests for information.`,
      ] },
    ],
  },
  {
    id: "how-to-request",
    n: "12",
    title: "How to Request a Refund",
    blocks: [
      { type: "p", text: `If you wish to request a refund, please contact us at:` },
      { type: "p", text: `Email: info@ukinnovatorfounder.uk` },
      { type: "p", text: `Please provide:` },
      { type: "ul", items: [
        `your full name;`,
        `application or order reference number;`,
        `details of your request; and`,
        `any supporting information.`,
      ] },
      { type: "p", text: `We may request further information before reaching a decision.` },
    ],
  },
  {
    id: "consumer-rights",
    n: "13",
    title: "Consumer Rights",
    blocks: [
      { type: "p", text: `Nothing in this Policy is intended to exclude, restrict or limit any statutory rights available to consumers under applicable law, including rights arising under the Consumer Rights Act 2015.` },
    ],
  },
  {
    id: "changes",
    n: "14",
    title: "Changes to This Policy",
    blocks: [
      { type: "p", text: `We reserve the right to amend this Refund & Cancellation Policy from time to time to reflect changes in legislation, regulatory requirements, Government Fee policies or improvements to our Services.` },
      { type: "p", text: `The latest version of this Policy will be published on UK Innovator Founder.` },
    ],
  },
];
