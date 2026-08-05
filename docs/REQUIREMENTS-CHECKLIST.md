# UK Innovator Founder Visa Website — Requirements Checklist

**Source:** `PROJECT- INVT VISA.pdf` (8 pages, client brief + developer roadmap)
**Stack decided:** Next.js + Material UI
**Status:** Requirements captured. Nothing built yet.

> ⚠️ Scope note: the folder is named `landing-page1`, but the brief specifies a **full multi-page website** — one long homepage (18 sections) plus ~12 standalone pages (team, office, approved cases, case tracker, 7 legal pages). Confirm with the client whether we build all of it or phase it.

---

## 0. The core idea (what the client is actually selling)

The site must feel like an **interactive founder journey**, not a wall of immigration text.

**Main funnel the whole site pushes toward:**

```
CV → Profile Assessment → Up to 2-3 Business Ideas → Idea Selection →
Business Development → Endorsement → Visa Application →
12 & 24 Month Meetings → Potential ILR After 3 Years
```

**Primary conversion action, repeated throughout:** *Free CV & Profile Check*

**Key differentiator to emphasise:** the visitor does **not** need a business idea. Send a CV, get 2-3 suggested ideas.

---

## 1. Global navigation

- [ ] **Top utility banner** (above main nav): `Our Team` | `Our Office` | `Approved Cases` | `Case Tracker`
- [ ] **Main navigation:** `Home` | `What Is It?` | `Benefits` | `Eligibility` | `Endorsement Process` | `Timeline` | `Why Applications Fail` | `Packages & Fees` | `FAQs`
  - ⚠️ The PDF text is cut off at "Packages & F…" — **confirm the full nav list with the client** (assumed `Packages & Fees` + `FAQs`)
- [ ] Smooth-scroll anchor links to homepage sections
- [ ] Client explicitly wants **"Endorsement Process"**, NOT "How It Works" — it's the step-by-step endorsement journey
- [ ] Sticky/persistent header behaviour — *not specified, needs decision*
- [ ] Mobile nav (hamburger/drawer) — *not specified, needs decision*

---

## 2. Hero + lead collection (above the fold)

- [ ] **Headline:** "Build Your Own Innovative Business in the UK"
- [ ] **Subheadline:** "UK Innovator Founder Visa — No employer sponsor required. Potential ILR after 3 years."
- [ ] Supporting line: start with your CV; if no suitable idea, we suggest up to 2-3

### Hero benefit chips (6)
- [ ] No Employer Sponsor Required
- [ ] Build & Run Your Own UK Business
- [ ] Eligible Outside Skilled Employment
- [ ] Bring Eligible Dependants
- [ ] Potential ILR After 3 Years
- [ ] IAA-Regulated Immigration Support

> Page 1 mockup shows a condensed 3-item version (No Employer Sponsor / Potential ILR After 3 Years / Eligible Outside Skilled Work). **Confirm which set goes where.**

### Coloured section tiles (left column, 8 tiles)
- [ ] What Is It? › · Benefits › · Eligibility › · Endorsement Process › · Timeline › · Why Applications Fail › · Packages & Fees › · FAQs ›
- [ ] Each tile smooth-scrolls to its matching homepage section
- [ ] Subtle hover/click animation on tiles and buttons

### Lead form — "FREE CV & PROFILE CHECK"

Subheading: *"Free initial assessment to see whether your profile may be suitable for the Innovator Founder Visa and discuss the options available to you."*

| # | Field | Type | Required |
|---|---|---|---|
| 1 | Full Name | Text | not marked |
| 2 | WhatsApp / Phone | Text | not marked |
| 3 | Email | Email | **Yes (\*)** |
| 4 | Country of Residence | Country selector | not marked |
| 5 | Do you already have a business idea? | Yes / No | not marked |
| 6 | How much are you prepared to invest in your UK business? | Under £10,000 / £10,000–£25,000 / £25,000–£50,000 / £50,000+ / Not sure yet | not marked |
| 7 | Upload CV | File — PDF / DOC / DOCX, drag & drop or click | not marked |

- [ ] **CTA:** `GET MY FREE ASSESSMENT →`
- [ ] Trust strip under CTA: "Free initial review | No obligation | Secure CV upload"
- [ ] Nudge message near CTA: *"Don't have a business idea? We can suggest up to 2-3 innovative business ideas based on your profile."* — client says keep this close to the CTA to improve conversion
- [ ] Form stays **above the fold on desktop**; **immediately after hero text on mobile**
- [ ] ⚠️ Only Email is marked required — **confirm which other fields are mandatory**

---

## 3. Quick journey overview (connected ladder/step visual)

- [ ] 01 Free CV Check
- [ ] 02 Profile Assessment
- [ ] 03 Up to 2-3 Innovative Business Ideas
- [ ] 04 Business Development
- [ ] 05 Endorsement Application
- [ ] 06 Endorsement Granted
- [ ] 07 Visa Application
- [ ] 08 Grow UK Business
- [ ] 09 Potential ILR After 3 Years

---

## 4. What Is the Innovator Founder Visa?

- [ ] Explanatory copy: route for entrepreneurs establishing an innovative, viable and scalable UK business; no employer sponsor; business proposition must be endorsed
- [ ] **Stage 1 – Endorsement flow:** Idea → Development → Business Plan → Market Research → Financial Model → Validation → Endorsement Application → Interview/Pitch → Decision
- [ ] **Stage 2 – Visa Application flow:** Endorsement Letter → Visa Documents → Home Office Application → Decision

---

## 5. Benefits (7 items)

- [ ] No employer sponsor required
- [ ] Build and run your own UK business
- [ ] Potential ILR after 3 years, subject to settlement requirements
- [ ] Eligible outside skilled employment permitted alongside the business
- [ ] Eligible partner and children can apply as dependants
- [ ] No fixed £50,000 investment threshold; funding should match the needs of the venture
- [ ] Access to the UK market and potential national/international scale

---

## 6. Eligibility

Four pillars:
- [ ] **NEW** — a qualifying new business, not joining an already trading one
- [ ] **INNOVATIVE** — original proposition meeting a market need or creating meaningful competitive advantage
- [ ] **VIABLE** — realistic plan based on founder's skills, experience, resources, market understanding
- [ ] **SCALABLE** — structured growth planning, job creation, national/international expansion

Plus applicant-side requirements:
- [ ] Age, English language, maintenance funds where applicable, endorsement, wider Immigration Rules
- [ ] ⚠️ **Copy for these needs writing** — brief only says "also explain"

---

## 7. Endorsement Process — 12 steps (large vertical ladder/staircase)

Each step animates into view on scroll.

- [ ] **1. Share Your CV** — review experience, qualifications, skills, sector knowledge, business background
- [ ] **2. Profile Assessment** — identify where profile translates into a credible proposition
- [ ] **3. Suggest Up to 2-3 Innovative Business Ideas** — or refine existing idea
- [ ] **4. Choose & Refine the Idea** — problem, customer, solution, innovation, advantage, revenue model, growth
- [ ] **5. Initial Market Research** — target market, competitors, existing solutions, gaps, commercial opportunity
- [ ] **6. Business Plan & Financial Model** — business model, market analysis, revenue strategy, forecasts, scalability, job creation
- [ ] **7. Validate the Business** — *package-dependent:* surveys, LOIs, customer/partner interest, MVP, company formation, website, social presence
- [ ] **8. Review & Unlimited Revisions** — all packages include unlimited revision rounds
- [ ] **9. Endorsement Application** — prepare and submit to appropriate Endorsing Body
- [ ] **10. Interview / Pitch** — prep for founder, innovation, market, competition, financial, viability, scalability questions
- [ ] **11. Endorsement Decision** — if successful, endorsement granted
- [ ] **12. Visa Application** — prepare formal Innovator Founder visa application after endorsement

---

## 8. 4-Week Preparation Timeline

- [ ] **Before Week 1:** CV review → Profile assessment → 2-3 business ideas where required → Idea selection
- [ ] **Week 1:** Idea refinement and initial research
- [ ] **Weeks 2-3:** Business plan, market research, financial model, survey work, LOIs where applicable
- [ ] **Week 4:** Discussion, refinement, preparation for Endorsing Body submission
- [ ] **Prominent disclaimer:** the 4 weeks is the *preparation* roadmap only — Endorsing Body decision time is separate

---

## 9. Endorsing Body Assessment

- [ ] Flow: Application Submitted → Initial Review & Due Diligence → Interview/Pitch (where required) → Further Information / Revisions → Decision
- [ ] Indicative processing: **~4-8 weeks**, clearly marked as a planning guide only, **not guaranteed**
- [ ] Initial Endorsing Body fee: **£1,000 per person**, paid directly to the Endorsing Body
- [ ] Contact-point meetings: **£500 per mandatory meeting**, paid directly to the Endorsing Body
- [ ] Endorsement validity: visualise the **3-month window** to use the endorsement for the visa application

---

## 10. Approved Endorsing Bodies (4)

- [ ] UK Endorsing Services
- [ ] Innovator International
- [ ] Envestors Limited
- [ ] Global Entrepreneurs Programme (GEP) — *only for founders invited to its programme*
- [ ] ⚠️ Confirm whether logos are available and whether we're permitted to display them

---

## 11. Why Candidates Fail Endorsement — and How to Avoid It (8 pairs)

Each = failure reason + "How to avoid" (card flip / accordion / two-column would suit).

- [ ] The idea is not genuinely innovative → demonstrate real market problem, original solution, meaningful competitive advantage
- [ ] The founder cannot explain the innovation → founder must understand and genuinely contribute
- [ ] Weak connection between founder and business → align concept with background, or explain how missing capability is secured
- [ ] Weak market research → credible research, competitor analysis, surveys, LOIs, testing, pilot evidence
- [ ] Unrealistic financial forecasts → defensible assumptions on pricing, costs, CAC, revenue, growth
- [ ] Weak scalability → realistic job creation, operational scaling, national/international expansion
- [ ] Poor interview preparation → prep for detailed questions on innovation, finances, competition, implementation
- [ ] Business plan and interview answers do not match → keep founder actively involved so written and verbal evidence stay consistent

---

## 12. Why Our Approach Is Different

- [ ] Flow visual: `YOUR CV → EXPERIENCE & SKILLS → UP TO 2-3 BUSINESS IDEAS → CHOSEN IDEA → BESPOKE DEVELOPMENT → ENDORSEMENT PREPARATION`
- [ ] Statement (where appropriate): immigration work is handled/supervised by **IAA-regulated immigration lawyers** experienced in UK immigration matters

---

## 13. Packages & Fees — 3 equal-height comparison cards

Premium visually highlighted as **RECOMMENDED**, but all three must stay easy to compare.

### BASIC — £2,500–£3,000
Included: Innovative idea development if needed · Up to 2-3 business concepts · Idea refinement · Initial market research · Standard business plan · Basic financial model · Application guidance · Unlimited revisions
Not included: Market survey · LOI support · MVP · Priority turnaround · Company creation · Website · Social media

### STANDARD — £3,500–£4,500
Included: Everything in Basic · Innovative idea development if needed · In-depth market research · Market survey · Full financial model · LOI drafting support · Endorsing Body submission support · Company creation · Unlimited revisions · Free re-application if rejected (no additional legal fee)
Not included: MVP · Dedicated priority support · Website · Social media

### PREMIUM — £4,500–£6,000 · **RECOMMENDED**
Included: Everything in Standard · Innovative idea development if needed · MVP creation included · Priority turnaround & scheduling · Dedicated advisor · Unlimited revisions · Post-submission query support · Pitch & interview preparation · Company creation · Website development · Social media development · Free re-application if rejected · No additional legal fee on qualifying re-application · No Endorsing Body fee on qualifying re-application · Support at 12-month meeting · Support at 24-month meeting · Continuous guidance through the 3-year journey towards ILR

- [ ] **Flexible instalments** note: all package fees payable in agreed instalments, invoice + receipt at each stage
- [ ] **Terms block:** define exactly when free re-application applies and which third-party fees are covered — ⚠️ *client must supply this wording*
- [ ] **Clearly separate** professional fees from Endorsing Body fees and Home Office fees

---

## 14. After the Visa Is Granted

- [ ] Timeline: `VISA GRANTED → MONTHS 1-12 develop business → ~MONTH 12 first contact-point meeting → MONTHS 12-24 continue development → ~MONTH 24 second contact-point meeting → YEAR 3 settlement / ILR assessment`
- [ ] Premium callout: support at each Endorsing Body progress meeting + continuous guidance through the 3-year route

---

## 15. ILR After 3 Years

- [ ] Copy: route can potentially lead to ILR after three qualifying years, subject to residence, endorsement and business-achievement requirements
- [ ] Premium journey visual: `Initial Idea → Initial Endorsement → Visa → 12-Month Meeting Support → 24-Month Meeting Support → Preparation Towards ILR Stage`

---

## 16. FAQs (17 questions — accordion)

- [ ] What is the Innovator Founder Visa?
- [ ] Do I need an employer sponsor?
- [ ] What if I do not have a business idea?
- [ ] What if I already have an idea?
- [ ] What does innovative mean?
- [ ] What does viable mean?
- [ ] What does scalable mean?
- [ ] How much does endorsement cost? *(show Endorsing Body fee separately from professional fees)*
- [ ] How long does endorsement take? *(4-8 weeks indicative, non-guaranteed)*
- [ ] How long is the endorsement letter valid? *(3-month window)*
- [ ] Do I need £50,000? *(no fixed threshold)*
- [ ] Do I need an MVP? *(not necessarily)*
- [ ] Can I work for another company? *(eligible outside skilled employment, subject to conditions)*
- [ ] Can I bring my family? *(eligible partner and children as dependants)*
- [ ] Can I get ILR after three years? *(potentially, if requirements met)*
- [ ] Do I have to meet my Endorsing Body after visa grant? *(mandatory contact points ~months 12 and 24)*
- [ ] Can I pay professional fees in instalments? *(yes, staged, invoice + receipt)*

---

## 17. Final Conversion Section

- [ ] Headline: "Your Business Idea Could Start With Your CV"
- [ ] Body: send us your CV and, where appropriate, we can suggest up to 2-3 innovative business ideas
- [ ] Journey strip: `CV → Business Idea → Business Development → Endorsement → Visa → Business Growth → Potential ILR After 3 Years`
- [ ] CTA: `GET YOUR FREE CV CHECK`

---

## 18. Footer

Client reference: *"similar to the eVisaPortal layout"* — ⚠️ **need the URL / screenshot to match.**

Four link groups:

| COMPANY | INNOVATOR FOUNDER | HELP & CLIENT | LEGAL & COMPLIANCE |
|---|---|---|---|
| About Us | What Is It? | Free CV & Profile Check | Privacy Policy |
| Our Team | Benefits | Case Tracker | Terms & Conditions |
| Our Office | Eligibility | Already Have Endorsement? | Complaints Procedure |
| Approved Cases | Endorsement Process | Visa Application Support | Legal Disclaimer |
| Contact Us | Timeline | Contact Us | Refund & Cancellation Policy |
| | Why Applications Fail | | Anti-Fraud Policy |
| | Packages & Fees | | Professional Standards |
| | FAQs | | |

- [ ] **Regulatory footer strip:** legal/trading entity name · IAA registration details · office address · email · telephone · copyright
- [ ] Social media links **only where accounts are actively maintained**
- [ ] Legal policies must open as **dedicated pages**, not modals
- [ ] Footer must work sitewide

---

## 19. Pages to build (beyond the homepage)

| Page | Content status | Notes |
|---|---|---|
| Home (18 sections above) | Copy supplied ✅ | The main build |
| About Us | ❌ Not supplied | |
| Our Team | ❌ Not supplied | Needs bios + photos |
| Our Office | ❌ Not supplied | Needs address, photos, maybe map |
| Approved Cases | ❌ Not supplied | Needs anonymised case studies |
| Contact Us | ❌ Not supplied | Form + address + phone + email |
| Case Tracker | ❌ Not specified at all | **Biggest unknown — see Q1 below** |
| Already Have Endorsement? | ❌ Not supplied | |
| Visa Application Support | ❌ Not supplied | |
| Privacy Policy | ❌ Not supplied | Must be lawyer-approved |
| Terms & Conditions | ❌ Not supplied | Must be lawyer-approved |
| Complaints Procedure | ❌ Not supplied | IAA requirement |
| Legal Disclaimer | ❌ Not supplied | |
| Refund & Cancellation Policy | ❌ Not supplied | |
| Anti-Fraud Policy | ❌ Not supplied | |
| Professional Standards | ❌ Not supplied | |

---

## 20. Interaction & animation requirements (explicit client asks)

- [ ] Hero benefits **animate left-to-right** on page load / scroll, above the coloured nav tiles
- [ ] Section tiles **smooth-scroll** to matching homepage sections
- [ ] **Subtle hover/click animation** on all buttons, tiles and cards
- [ ] Endorsement ladder steps **animate into view on scroll**
- [ ] Use **ladders, connected steps, arrows, progress bars and cards** throughout process sections
- [ ] Overall feel: *interactive founder journey*, not a wall of text

---

## 21. Mobile requirements

- [ ] Lead form sits immediately after hero text
- [ ] **Persistent Free CV Check CTA fixed at bottom of screen**
- [ ] All ladder/step visuals must degrade gracefully to vertical stacks
- [ ] Three package cards must stay comparable on small screens (swipe carousel or stacked with sticky headers — *decision needed*)

---

## 22. Compliance & legal constraints (non-negotiable)

- [ ] ❗ **Never use absolute claims** — no "guaranteed endorsement", no "guaranteed ILR". Use "potential", "may", "subject to requirements" throughout
- [ ] Always mark 4-8 week processing as indicative and non-guaranteed
- [ ] Always separate: professional fees ↔ Endorsing Body fees ↔ Home Office fees
- [ ] Display IAA registration details in footer
- [ ] CV upload = personal data → GDPR: privacy notice at point of upload, lawful basis, retention policy, secure storage
- [ ] Cookie consent banner if analytics/marketing pixels are used

---

## 23. Technical decisions to make before setup

| Item | Decision |
|---|---|
| Framework | Next.js (App Router assumed — confirm) |
| UI library | Material UI (v7 assumed — confirm) |
| Language | TypeScript (recommended) |
| Styling | MUI theme + Emotion; custom brand palette needed |
| Animation | Framer Motion / MUI transitions / CSS + IntersectionObserver — *pick one* |
| Form handling | React Hook Form + Zod (recommended) |
| File upload target | ❓ See Q2 below |
| Form submission target | ❓ See Q2 below |
| Spam protection | reCAPTCHA v3 / Cloudflare Turnstile — *not mentioned in brief, needed* |
| Hosting | ❓ Vercel assumed — confirm |
| Domain | ❓ Not provided |
| Analytics | ❓ Not mentioned |
| SEO / metadata / OG images | ❓ Not mentioned but needed for a lead-gen site |
| Languages | English only assumed — confirm (audience is international) |

---

## 24. Assets & content still needed from the client

- [ ] Logo (SVG preferred) + favicon
- [ ] Brand colour palette — the coloured nav tiles imply a defined multi-colour scheme
- [ ] Typography / font choice
- [ ] Photography: team, office, hero imagery
- [ ] Legal/trading entity name
- [ ] IAA registration number
- [ ] Office address, phone, email, WhatsApp number
- [ ] Social media handles (only maintained ones)
- [ ] eVisaPortal footer reference (URL or screenshot)
- [ ] Copy for all 15 secondary pages listed in §19
- [ ] All 7 legal policy documents (lawyer-approved)
- [ ] Approved Cases content (anonymised)
- [ ] Confirmation that package price *ranges* should be shown publicly, rather than fixed prices

---

## 25. Open questions for the client — ask before setup

1. **Case Tracker** — is this a real logged-in client portal (auth, database, case statuses), a link to an existing external system, or just a "contact us for an update" page? This single answer changes the whole architecture and could double the project size.
2. **Where do form submissions and CV files go?** Email inbox? CRM (HubSpot/Pipedrive)? Database + admin dashboard? Cloud storage (S3/Supabase)? CV files are sensitive personal data — this needs a deliberate answer, not a default.
3. **Is the full site in scope now, or phase 1 = homepage only?** The 15 secondary pages have zero copy supplied.
4. **Who writes the missing copy** — client, a copywriter, or us drafting for their approval?
5. **Who supplies the 7 legal policies?** These must be lawyer-approved; we shouldn't invent them.
6. **Confirm the truncated main nav** (PDF cuts off at "Packages & F…").
7. **Hero benefits: 3 or 6?** Page 1 mockup shows 3, page 2 roadmap lists 6.
8. **Which form fields are mandatory?** Only Email is starred.
9. **Is there an existing brand/design system**, or do we define the visual direction?
10. **Multi-step form or single page?** 7 fields including a file upload — a 2-3 step wizard usually converts better, but the mockup shows a single form.
11. **Do we show package prices as ranges publicly** (£2,500–£3,000 etc.) or "from £2,500"?
12. **Are we allowed to display Endorsing Body logos** (UKES, Innovator International, Envestors, GEP)?
13. **Target launch date / deadline?**

---

## 26. Suggested build order (once questions are answered)

1. Project setup: Next.js + TypeScript + MUI theme + brand tokens
2. Layout shell: utility banner, main nav, footer, smooth-scroll anchor system
3. Hero + lead form (the money section) — including upload + submission backend
4. Reusable primitives: step ladder, journey strip, benefit card, comparison card, accordion
5. Homepage sections 3-17 using those primitives
6. Scroll/entrance animations + mobile sticky CTA
7. Legal pages + secondary pages
8. SEO, analytics, cookie consent, accessibility pass
9. Performance + responsive QA, then launch
