# UK Innovator Founder Website – Client Review (English Transcript)

Source: two screen recordings dated 2026-10-03 (Google Drive folder "innovator founder website review").
Site reviewed: uk-innovator-founder.vercel.app
Language: the client speaks a mix of Urdu and Pashto with English terms. Translated to English below.
Timestamps are approximate. Anything in [square brackets] is my note on what's on screen or a part that was unclear.

---

## Video 1 — "Screen Recording 2026-10-03 at 20.11.54" (3:56)

**[0:00–0:30] Hero section (the coloured buttons: What is it, Benefits, Eligibility, Endorsement Process, Timeline, Why Applications Fail, Packages & Fees, FAQs)**
> Okay, brother — these sections you've made here, do the same on the other two websites, Global Talent and Sponsorship Licence. Try to build them with this same design. Mention Benefits, What is it, Eligibility, Endorsement — for example, on Global Talent it will be "Endorsement Bodies" — Timeline, Why Applications Fail. Do the same for the others, okay?

**[0:32–0:55] Repeated information / hero bullets**
> And remove the information that is repeated — on every website. For example, Benefits is mentioned twice. So this part here [the hero tick-list] is enough — make benefits in this bullet style. This description — remove it… actually no, leave it, it's not that bad.

**[1:00–1:26] Repeated process + use this design on other sites**
> In some places the information is repeated. For example, this one tells us the process [the "From CV to UK founder in nine steps" strip]. That process is repeated two or three times on the page. The design you've made for Innovator Founder is very good, so make Global Talent the same way, and Sponsorship Licence too. These button-style sections you've made — look, they're a bit … [unclear] … look at this.

**[1:27–1:55] "Two stages: get endorsed, then apply" section**
> This — Stage 1 / Stage 2 — this is fine, this is perfect. Do Global Talent the same way, with Stage 1 and Stage 2. And for Sponsorship Licence too: Stage 1 – get the sponsor licence first; Stage 2 – do the visa application for the candidate from outside [the UK]. ChatGPT will tell you the details. Okay — and this, for example, fine.

**[1:56–2:08] "Why founders choose this route" (Benefits section)**
> Okay, this is mentioning benefits — we don't need this, because we've already mentioned it [in the hero]. Cancel this section. [Moves on] This is fine, keep this.

**[2:09–2:32] "The 12-step endorsement journey" (dark vertical timeline)**
> Okay, remove this… no, don't remove it — change its shape. It goes vertically down the page; that's too much. Make it horizontal, like you did here, for example — this one you made [the horizontal "nine steps" strip]. Do it like that. Look, it's too big — it takes up the whole page. I'm talking about this section.

**[2:33–2:46] "A focused 4-week preparation roadmap"**
> This is also showing a timeline again, but what's in it is not really correct. Do a bit of research on this.

**[2:48–3:01] "What happens after submission"**
> And look — this repeats the timeline again. This is a timeline, that's a timeline, so it's repeating. No information should be repeated anywhere.

**[3:03–3:16] Fee cards (£1,000 / £500)**
> And this — this is £1,000 plus VAT. And this is [also plus] VAT [pointing at £500 per contact-point meeting]. Okay, look — this is fine.
> [Note: "£500 + VAT" is my best reading; he points at the £500 card and says "this is VAT".]

**[3:20–3:55] "Why applications fail" / "You don't need a business idea"**
> Okay — this is the most important thing. I'll explain it in the other video: on Innovator Founder Visa and Global Talent there's one thing you need to pay attention to. I'm telling you in a separate video so this one stays shorter. One minute…

---

## Video 2 — "Screen Recording 2026-10-03 at 20.15.59" (2:40)

**[0:00–0:53] "Why we're different – You don't need a business idea to start"**
> The most important thing on the Innovator Founder Visa site, since we're going to advertise it — and on Global Talent too: we are NOT giving them the idea. Here it says "Idea matched to your sector", meaning we're showing that we're the ones giving the idea. When they give us a case we'll help them, but we can't say this on the website. So read up a bit with ChatGPT and write it like "your idea is refined", "your idea is discussed", "potential weaknesses discussed" — something like that. For Innovator Founder, we will not give any idea. We can't give an idea — it's not allowed, it's illegal. So you need to look at this whole concept. [Rest of this section] is fine, not bad.

**[0:56–1:20] Packages & Fees (Basic / Standard / Premium)**
> Okay, here again: "Up to 2–3 business concepts" — change to something like "2–3 business ideas discussed based on your profile" / "your innovative idea discussed", and "refinement". Meaning, we are not giving them any idea — you need to write it in that way.

**[1:20–1:39] "The three-year journey to potential ILR"**
> Here the process is mentioned again, but this is the overall three-year process, so leave this one — don't remove it. It's fine. Give it its own name, something like "Three-Year Journey".

**[1:39–2:17] FAQs**
> The FAQ is fine too. Here, mention — under the business-idea question — look, this has to be removed. Write something like: "We strongly suggest you do your own research and come up with an innovative idea. We cannot give an idea; we can only refine and discuss your idea." Okay? This one is also not necessary, because they should already have it [unclear which item — on screen, the "What if I already have an idea?" and "Do I need £50,000?" answers are open]. The rest below is fine.

**[2:17–2:36] Global Talent site**
> And Global Talent is the same. On Global Talent we cannot suggest that we'll prepare their documents for them, or do everything for them. This is very important, okay?

---

## Action list for Claude Code

### Innovator Founder site
1. **Compliance (most important):** Remove every claim that we *give / suggest / match* business ideas. Reword to "we review, refine and discuss *your* idea, and highlight potential weaknesses." Places I can see this claim on the site:
   - Hero text: "No business idea yet? We can suggest up to 2–3 based on your profile."
   - "From CV to UK founder in nine steps", step 03 "Up to 2–3 Innovative Business Ideas"
   - 12-step journey, Step 3 "Suggest Up to 2–3 Innovative Business Ideas"
   - "You don't need a business idea to start" section (Idea 01 matched to your sector, etc.)
   - Packages: Basic "Innovative idea development if needed", "Up to 2–3 business concepts"
   - FAQ "What if I do not have a business idea?" → new answer: "We strongly suggest you do your own research and come up with an innovative idea. We cannot provide an idea; we can only refine and discuss your idea."
   - Hero form question "Do you already have a business idea?" (check wording)
2. **Remove the "Why founders choose this route" (Benefits) section** — benefits are already in the hero tick-list (keep them as bullets there).
3. **Remove duplicate process/timeline content.** Keep one of each:
   - Keep "Two stages: get endorsed, then apply" (client says it's perfect).
   - Keep "The three-year journey to potential ILR", but give it its own clear name/label (e.g. "Three-Year Journey").
   - 12-step endorsement journey: **keep, but make it horizontal** (like the "nine steps" strip) — it's currently far too tall.
   - Check overlap between "nine steps", "12-step journey", "4-week roadmap" and "What happens after submission" — no information should be repeated.
4. **4-week preparation roadmap:** content is "not really correct" — research and fix the timings/stages.
5. **Fees:** "£1,000" → "£1,000 + VAT"; "£500" → "£500 + VAT" (please confirm the £500 one).
6. Hero description text: keep as is.

### Global Talent site & Sponsorship Licence site
7. Rebuild both with the same design and section structure as Innovator Founder: hero buttons for What is it, Benefits, Eligibility, Endorsement (Global Talent: "Endorsement Bodies"), Timeline, Why Applications Fail, Packages & Fees, FAQs.
8. Add a "Two stages" section to each:
   - Global Talent: Stage 1 endorsement, Stage 2 visa application.
   - Sponsorship Licence: Stage 1 get the sponsor licence; Stage 2 visa application for the overseas candidate.
9. Remove repeated information on these sites too (benefits, process, timelines).
10. **Global Talent compliance:** don't say or imply we will prepare/write the applicant's documents or "do everything" for them.

### Unclear — confirm with client
- 0:45–0:55 (Video 1): exactly which description he first said to remove and then said to keep.
- 2:06–2:17 (Video 2): which FAQ item he called "not necessary".
- £500 card: + VAT or not.
