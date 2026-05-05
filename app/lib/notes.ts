export type NoteBlock =
  | { type: "p"; text: string }
  | { type: "section"; title: string; items: Array<{ name: string; body: string }> }
  | { type: "signoff"; text: string }

export type Note = {
  slug: string
  date: string
  title: string
  excerpt: string
  blocks: NoteBlock[]
}

export const NOTES: Note[] = [
  {
    slug: "new-year-new-templates",
    date: "January 3, 2024",
    title: "New year, new templates",
    excerpt: "Templates for strategy, managing, and meetings — all in FigJam.",
    blocks: [
      {
        type: "p",
        text: "Happy new year! This one's for my corporate friends. I took some time to templatize some of my fave frameworks that I've been finding myself using over and over again in my role as a design manager and pillar lead. I've got templates for strategy, managing, and meetings.",
      },
      {
        type: "p",
        text: "They're all in FigJam! But for good reason. The act of moving around ideas in a visual way helps draw connections you wouldn't have otherwise. And sharing updates at meetings with images is just way warm and fuzzy.",
      },
      {
        type: "section",
        title: "Product strategy",
        items: [
          {
            name: "Working backwards",
            body: "Like Amazon's working backwards method where you write a press release for your feature at the start — except for people who spend way too much time on Twitter. We've developed a few different FigJam features with these (high-fives, cursor chat, emotes, reactions, AI features).",
          },
          {
            name: "Eigenquestions",
            body: "I think about Shishir Mehrotra's eigenquestions article all the time. Nothing feels more satisfying than breaking down a big, hairy problem this way.",
          },
          {
            name: "Prioritizing design work: Fidelity vs. urgency",
            body: "Surprise! Another 2×2. I use this one to help designers be scrappy in the way that they design. Not everything needs to be high fidelity all at once, and there are ways to create clarity through writing or rough mocks. Pairs well with the decision making framework.",
          },
          {
            name: "Problems → Hypotheses",
            body: "A way to be methodical and exhaustive with growth-y projects. You don't have to A/B test everything!",
          },
          {
            name: "Decision making framework",
            body: "Analysis paralysis? Only some decisions are worth dwelling on. This framework helps you gut-check and prioritize those.",
          },
        ],
      },
      {
        type: "section",
        title: "Coaching and managing",
        items: [
          {
            name: "Career 1:1s",
            body: "I do career 1:1s with my team once per quarter. Here are some questions that can guide a conversation.",
          },
          {
            name: "Project retrospective for 1:1s",
            body: "Everyone has a rocky project or a stretch project sometimes. One of my fave ways to help coach folks through the experience is to reflect on it in a 1:1 context.",
          },
          {
            name: "Prioritization matrix",
            body: "A classic Eisenhower matrix! I use this myself on weeks where I'm really busy and don't have a sense of which way is up. But I also love this as a 1:1 activity when I'm hearing from a designer, “I’m so overwhelmed!”",
          },
        ],
      },
      {
        type: "section",
        title: "Meetings",
        items: [
          {
            name: "Team intros",
            body: "Whenever someone new joins, I like to use one of our 30 minute weekly meetings to welcome them, and introduce them to everyone with this format.",
          },
          {
            name: "Weekly team meeting",
            body: "My weekly FigJam design team format. I love when people pull in photos from their camera roll and everyone reacts and stamps to their updates.",
          },
          {
            name: "Interview debrief",
            body: "For hiring debriefs, I pull all of the feedback out of our recruiting tool and into this FigJam board. It definitely takes a bit of time to do this, but I like that it slows me down in making this very important decision. I also like that this format helps people with quieter voices join in the discussion.",
          },
        ],
      },
      {
        type: "signoff",
        text: "Hope these are helpful! Would love to see your templates and processes, as well.",
      },
    ],
  },
]

export function getNoteBySlug(slug: string): Note | undefined {
  return NOTES.find(n => n.slug === slug)
}
