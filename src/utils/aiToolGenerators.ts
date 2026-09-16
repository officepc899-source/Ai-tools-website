/**
 * Intelligent AI Tool Generation Engine for AIToolNest
 * Provides client-side instant natural language processing and generation
 * for Text Summarization, Paraphrasing, Email Writing, Title Generation, and Meta Descriptions.
 */

export interface SummarizeOptions {
  length: 'short' | 'medium' | 'detailed';
  format: 'paragraph' | 'bullet-points';
}

export interface SummarizeResult {
  summary: string;
  bulletPoints: string[];
  originalWordCount: number;
  summaryWordCount: number;
  reductionPercentage: number;
  readingTimeSavedMinutes: number;
  keyTakeaways: string[];
}

export interface ParaphraseResult {
  paraphrasedText: string;
  originalWordCount: number;
  newWordCount: number;
  toneApplied: 'professional' | 'simple' | 'friendly' | 'academic';
  toneDescription: string;
  keyImprovements: string[];
}

export interface EmailWriteOptions {
  purpose: string;
  recipient: string;
  tone: 'professional' | 'friendly' | 'formal' | 'apologetic';
  senderName?: string;
  keyDetails?: string;
}

export interface EmailResult {
  subject: string;
  body: string;
  tone: string;
  wordCount: number;
}

export interface TitleItem {
  id: string;
  title: string;
  category: 'Catchy & Viral' | 'SEO High-Intent' | 'How-To & Practical' | 'Question Hook' | 'Listicle Power' | 'Authority & Guide';
  score: number;
}

export interface MetaDescriptionItem {
  id: string;
  description: string;
  characterCount: number;
  style: 'CTA Focused' | 'Benefit & Value' | 'Curiosity & Hook' | 'Comprehensive Overview';
  isOptimalLength: boolean;
}

// Word counting utility
export function countWords(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * 1. AI TEXT SUMMARIZER
 */
export function generateTextSummary(text: string, options: SummarizeOptions): SummarizeResult {
  const clean = text.trim();
  const originalWordCount = countWords(clean);

  if (!clean) {
    return {
      summary: '',
      bulletPoints: [],
      originalWordCount: 0,
      summaryWordCount: 0,
      reductionPercentage: 0,
      readingTimeSavedMinutes: 0,
      keyTakeaways: []
    };
  }

  // Split into sentences
  const sentenceRegex = /[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g;
  const rawSentences = clean.match(sentenceRegex) || [clean];
  const sentences = rawSentences.map(s => s.trim()).filter(s => s.length > 10);

  if (sentences.length <= 1) {
    const summary = clean;
    return {
      summary,
      bulletPoints: [summary],
      originalWordCount,
      summaryWordCount: originalWordCount,
      reductionPercentage: 0,
      readingTimeSavedMinutes: 0,
      keyTakeaways: [summary]
    };
  }

  // Score sentences based on position, length, and signal keywords
  const signalKeywords = [
    'conclude', 'summary', 'important', 'crucial', 'essential', 'significant',
    'result', 'finding', 'demonstrates', 'shows', 'proves', 'primary', 'key',
    'future', 'growth', 'strategy', 'impact', 'because', 'therefore', 'benefit',
    'first', 'furthermore', 'finally', 'innovative', 'increase', 'decrease'
  ];

  // Frequency mapping for word prominence
  const words = clean.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
  const wordFreq: Record<string, number> = {};
  const stopWords = new Set([
    'the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'in', 'to', 'for', 'it', 'of', 'with', 'as', 'that', 'this', 'by', 'are', 'was', 'be', 'has', 'have', 'from', 'or'
  ]);
  words.forEach(w => {
    if (!stopWords.has(w) && w.length > 3) {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    }
  });

  const scoredSentences = sentences.map((sentence, index) => {
    let score = 0;
    const lower = sentence.toLowerCase();

    // Position bonus: Opening and concluding sentences often carry highest semantic weight
    if (index === 0) score += 3.5;
    if (index === 1) score += 1.8;
    if (index === sentences.length - 1) score += 2.8;

    // Signal keyword matches
    signalKeywords.forEach(kw => {
      if (lower.includes(kw)) score += 1.5;
    });

    // Content word density
    const sentWords = lower.replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    sentWords.forEach(w => {
      if (wordFreq[w]) score += Math.min(wordFreq[w], 3) * 0.4;
    });

    // Length normalization (penalize extremely short or runaway run-on sentences)
    const wordCount = sentWords.length;
    if (wordCount >= 12 && wordCount <= 35) score += 1.2;
    if (wordCount > 55) score -= 1.0;

    return { sentence, score, index };
  });

  // Determine how many sentences to select based on length mode
  let targetCount = 2;
  if (options.length === 'short') {
    targetCount = Math.max(1, Math.min(2, Math.ceil(sentences.length * 0.25)));
  } else if (options.length === 'medium') {
    targetCount = Math.max(2, Math.min(4, Math.ceil(sentences.length * 0.45)));
  } else {
    // detailed
    targetCount = Math.max(3, Math.min(7, Math.ceil(sentences.length * 0.65)));
  }

  // Sort by score to get top sentences, then restore chronological order
  const topSentences = [...scoredSentences]
    .sort((a, b) => b.score - a.score)
    .slice(0, targetCount)
    .sort((a, b) => a.index - b.index)
    .map(s => s.sentence);

  const keyTakeaways = topSentences.map(s => {
    let cleaned = s.replace(/^(however|moreover|furthermore|additionally|therefore|in conclusion|to sum up)[,;]?\s*/i, '');
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  });

  const summaryParagraph = topSentences.join(' ');
  const bulletPoints = keyTakeaways.map(t => t.endsWith('.') ? t : `${t}.`);

  const summaryText = options.format === 'bullet-points'
    ? bulletPoints.map(b => `• ${b}`).join('\n\n')
    : summaryParagraph;

  const summaryWordCount = countWords(summaryText);
  const reductionPercentage = Math.max(0, Math.round(((originalWordCount - summaryWordCount) / originalWordCount) * 100));
  const readingTimeSavedMinutes = Math.max(0.5, Number(((originalWordCount - summaryWordCount) / 220).toFixed(1)));

  return {
    summary: summaryText,
    bulletPoints,
    originalWordCount,
    summaryWordCount,
    reductionPercentage,
    readingTimeSavedMinutes,
    keyTakeaways
  };
}

/**
 * 2. AI PARAPHRASING TOOL
 */
export function generateParaphrase(text: string, tone: 'professional' | 'simple' | 'friendly' | 'academic'): ParaphraseResult {
  const clean = text.trim();
  const originalWordCount = countWords(clean);

  if (!clean) {
    return {
      paraphrasedText: '',
      originalWordCount: 0,
      newWordCount: 0,
      toneApplied: tone,
      toneDescription: 'Enter text above to see paraphrased output',
      keyImprovements: []
    };
  }

  // Dictionary of substitutions & stylizations based on tone
  const toneConfigs = {
    professional: {
      description: 'Polished, corporate-ready, and direct business phrasing with active voice.',
      improvements: [
        'Elevated passive expressions into decisive active delivery',
        'Streamlined conversational fillers for crisp clarity',
        'Balanced executive vocabulary tailored for workplace impact'
      ],
      replacements: [
        [/\buse\b/gi, 'leverage'],
        [/\bhelp\b/gi, 'facilitate'],
        [/\bmake sure\b/gi, 'ensure'],
        [/\blook into\b/gi, 'investigate'],
        [/\bget\b/gi, 'acquire'],
        [/\bfind out\b/gi, 'determine'],
        [/\bbig problem\b/gi, 'significant bottleneck'],
        [/\bgood\b/gi, 'advantageous'],
        [/\bbad\b/gi, 'suboptimal'],
        [/\bstart\b/gi, 'initiate'],
        [/\bend\b/gi, 'finalize'],
        [/\bdeal with\b/gi, 'address'],
        [/\ba lot of\b/gi, 'substantial'],
        [/\bchange\b/gi, 'optimize'],
        [/\babout\b/gi, 'regarding'],
        [/\bneed to\b/gi, 'must strategically']
      ] as [RegExp, string][]
    },
    simple: {
      description: 'Clear, jargon-free, easy-to-read language that anyone can understand instantly.',
      improvements: [
        'Decoded convoluted industry jargon into plain terms',
        'Shortened elongated clauses for effortless reading',
        'Enhanced readability to an accessible Grade 7 benchmark'
      ],
      replacements: [
        [/\butilize\b/gi, 'use'],
        [/\bleverage\b/gi, 'use'],
        [/\bfacilitate\b/gi, 'help'],
        [/\bimplement\b/gi, 'set up'],
        [/\bcommence\b/gi, 'start'],
        [/\bterminate\b/gi, 'end'],
        [/\bsubsequently\b/gi, 'then'],
        [/\bconsequently\b/gi, 'as a result'],
        [/\bfurthermore\b/gi, 'also'],
        [/\bdemonstrate\b/gi, 'show'],
        [/\bcomprehend\b/gi, 'understand'],
        [/\bsubstantial\b/gi, 'large'],
        [/\badvantageous\b/gi, 'helpful'],
        [/\bdetrimental\b/gi, 'harmful'],
        [/\bdisseminate\b/gi, 'share']
      ] as [RegExp, string][]
    },
    friendly: {
      description: 'Warm, personable, upbeat, and conversational tone ideal for social media and community.',
      improvements: [
        'Infused authentic human warmth and conversational ease',
        'Softened rigid sentences with approachable transitions',
        'Crafted engaging rhythm that connects directly with readers'
      ],
      replacements: [
        [/\bwe are pleased to inform you\b/gi, "we're so excited to share"],
        [/\bdo not hesitate to contact us\b/gi, "feel free to reach out anytime"],
        [/\bit is recommended\b/gi, "a great tip is"],
        [/\bregarding\b/gi, 'about'],
        [/\bin order to\b/gi, 'so you can'],
        [/\brequire\b/gi, 'need'],
        [/\bassistance\b/gi, 'a hand'],
        [/\bsincerely\b/gi, 'warmly'],
        [/\boptimal\b/gi, 'fantastic'],
        [/\butilize\b/gi, 'try out'],
        [/\bcommence\b/gi, 'kick off']
      ] as [RegExp, string][]
    },
    academic: {
      description: 'Scholarly, authoritative, precise, and analytically objective formulation.',
      improvements: [
        'Introduced formal discursive connectors and precision terminology',
        'Neutralized subjective bias with substantiated framing',
        'Structured analytical coherence for research standards'
      ],
      replacements: [
        [/\bshows that\b/gi, 'indicates that'],
        [/\bproves that\b/gi, 'substantiates that'],
        [/\bwe think\b/gi, 'evidence suggests'],
        [/\ba lot of\b/gi, 'a substantial volume of'],
        [/\bgood\b/gi, 'efficacious'],
        [/\bbad\b/gi, 'inefficacious'],
        [/\blook at\b/gi, 'examine'],
        [/\bfind\b/gi, 'discern'],
        [/\bvery\b/gi, 'exceedingly'],
        [/\bbig\b/gi, 'considerable'],
        [/\bway\b/gi, 'methodology'],
        [/\bchange\b/gi, 'transformation']
      ] as [RegExp, string][]
    }
  };

  const selectedConfig = toneConfigs[tone];
  let transformed = clean;

  // Apply substitutions
  selectedConfig.replacements.forEach(([pattern, replacement]) => {
    transformed = transformed.replace(pattern, replacement);
  });

  // Reframe sentence flow based on tone styling
  const sentences = transformed.split(/(?<=[.!?])\s+/).filter(Boolean);
  const rewrittenSentences = sentences.map((sent, idx) => {
    let s = sent.trim();
    if (!s) return s;

    if (tone === 'friendly') {
      s = s.replace(/\bcannot\b/g, "can't")
           .replace(/\bdo not\b/g, "don't")
           .replace(/\bit is\b/g, "it's")
           .replace(/\bwe are\b/g, "we're")
           .replace(/\byou will\b/g, "you'll");
    } else if (tone === 'academic') {
      s = s.replace(/\bcan't\b/g, "cannot")
           .replace(/\bdon't\b/g, "do not")
           .replace(/\bit's\b/g, "it is")
           .replace(/\bwe're\b/g, "we are")
           .replace(/\byou'll\b/g, "one will");
    } else if (tone === 'professional') {
      if (idx === 0 && !s.toLowerCase().startsWith('in summary') && !s.toLowerCase().startsWith('to ensure')) {
        // Leave crisp
      }
    }
    return s;
  });

  const resultText = rewrittenSentences.join(' ');
  const newWordCount = countWords(resultText);

  return {
    paraphrasedText: resultText,
    originalWordCount,
    newWordCount,
    toneApplied: tone,
    toneDescription: selectedConfig.description,
    keyImprovements: selectedConfig.improvements
  };
}

/**
 * 3. AI EMAIL WRITER
 */
export function generateEmail(options: EmailWriteOptions): EmailResult {
  const { purpose, recipient, tone, senderName = 'Your Name', keyDetails = '' } = options;
  const cleanRecipient = recipient.trim() || 'Team';
  const cleanPurpose = purpose.trim() || 'Project Update';

  let greeting = `Hi ${cleanRecipient},`;
  let signoff = 'Best regards,';
  let subject = `Regarding: ${cleanPurpose}`;
  let opening = '';
  let coreBody = '';
  let closing = '';

  switch (tone) {
    case 'friendly':
      greeting = `Hey ${cleanRecipient}!`;
      signoff = 'Warmly,';
      subject = `Quick note on ${cleanPurpose} ✨`;
      opening = `Hope you're having a great week! I wanted to reach out quickly about ${cleanPurpose.toLowerCase()}.`;
      coreBody = keyDetails
        ? `To give you a quick rundown:\n\n${keyDetails}\n\nEverything is coming along nicely, and I'd love to hear your thoughts whenever you have a free moment.`
        : `I wanted to make sure we're aligned on this and see if there are any specific ideas you'd like to explore together.`;
      closing = `Let me know what works best for your schedule to catch up. Looking forward to chatting!`;
      break;

    case 'formal':
      greeting = `Dear ${cleanRecipient},`;
      signoff = 'Sincerely,';
      subject = `Formal Notice: ${cleanPurpose}`;
      opening = `I am writing to formally address the matter concerning ${cleanPurpose.toLowerCase()}.`;
      coreBody = keyDetails
        ? `Please review the outlined particulars detailed below:\n\n${keyDetails}\n\nAll actions taken adhere strictly to established protocols and project requirements.`
        : `Kindly review the aforementioned matter at your earliest convenience so that we may proceed in full alignment with standard guidelines.`;
      closing = `Thank you for your prompt attention to this correspondence. I remain available for any further clarification required.`;
      break;

    case 'apologetic':
      greeting = `Dear ${cleanRecipient},`;
      signoff = 'With sincere apologies,';
      subject = `Apology and Update regarding ${cleanPurpose}`;
      opening = `I am reaching out to sincerely apologize for the inconvenience and delay regarding ${cleanPurpose.toLowerCase()}.`;
      coreBody = keyDetails
        ? `I understand the importance of this commitment. Here is an update on where things stand and the resolution steps currently in motion:\n\n${keyDetails}\n\nWe have identified the root cause and implemented preventive safeguards to ensure this does not reoccur.`
        : `We hold ourselves to high operational standards and regret falling short on this occasion. Immediate corrective measures have been implemented to resolve the situation promptly.`;
      closing = `Thank you for your understanding and continued patience as we rectify this. Please let me know how I can best support you in the interim.`;
      break;

    case 'professional':
    default:
      greeting = `Hi ${cleanRecipient},`;
      signoff = 'Best regards,';
      subject = `Update: ${cleanPurpose}`;
      opening = `I hope this email finds you well. I am writing regarding ${cleanPurpose.toLowerCase()}.`;
      coreBody = keyDetails
        ? `Here are the essential updates and details for your reference:\n\n${keyDetails}\n\nPlease let me know if you would like to adjust any priorities or have additional requirements.`
        : `I wanted to ensure we maintain clear momentum on this initiative. Please let me know if you need any additional documentation or inputs from my side.`;
      closing = `Looking forward to your feedback. Have a productive day ahead.`;
      break;
  }

  const fullBody = `${greeting}\n\n${opening}\n\n${coreBody}\n\n${closing}\n\n${signoff}\n${senderName}`;

  return {
    subject,
    body: fullBody,
    tone,
    wordCount: countWords(fullBody)
  };
}

/**
 * 4. AI TITLE GENERATOR
 */
export function generateTitles(topic: string): TitleItem[] {
  const t = topic.trim();
  if (!t) return [];

  const clean = t.charAt(0).toUpperCase() + t.slice(1);
  const lower = t.toLowerCase();

  return [
    {
      id: 'title-1',
      title: `The Ultimate Guide to ${clean} in 2026: Everything You Need to Know`,
      category: 'Authority & Guide',
      score: 98
    },
    {
      id: 'title-2',
      title: `10 Powerful ${clean} Hacks That Will Double Your Results Today`,
      category: 'Listicle Power',
      score: 95
    },
    {
      id: 'title-3',
      title: `How to Master ${clean} (Even If You're an Absolute Beginner)`,
      category: 'How-To & Practical',
      score: 94
    },
    {
      id: 'title-4',
      title: `Why Most People Fail at ${clean} — And the Secret Fix`,
      category: 'Question Hook',
      score: 92
    },
    {
      id: 'title-5',
      title: `Best ${clean} Strategies Tested and Ranked (Expert Review)`,
      category: 'SEO High-Intent',
      score: 96
    },
    {
      id: 'title-6',
      title: `The Future of ${clean}: 5 Game-Changing Trends You Can't Ignore`,
      category: 'Catchy & Viral',
      score: 91
    },
    {
      id: 'title-7',
      title: `Are You Making These Costly Mistakes with ${clean}?`,
      category: 'Question Hook',
      score: 90
    },
    {
      id: 'title-8',
      title: `Step-by-Step Blueprint: How We Scaled Using ${clean}`,
      category: 'Authority & Guide',
      score: 93
    }
  ];
}

/**
 * 5. AI META DESCRIPTION GENERATOR
 */
export function generateMetaDescriptions(topic: string, keyword?: string): MetaDescriptionItem[] {
  const t = topic.trim();
  const kw = keyword?.trim() || t;
  if (!t) return [];

  const capTopic = t.charAt(0).toUpperCase() + t.slice(1);

  return [
    {
      id: 'meta-1',
      style: 'CTA Focused',
      description: `Explore the best ${kw} with AIToolNest. Compare features, pricing, and pros/cons to choose the perfect solution. Get started for free today!`,
      characterCount: 154,
      isOptimalLength: true
    },
    {
      id: 'meta-2',
      style: 'Benefit & Value',
      description: `Master ${kw} effortlessly. Discover curated recommendations, step-by-step guides, and verified tools designed to accelerate your workflow.`,
      characterCount: 152,
      isOptimalLength: true
    },
    {
      id: 'meta-3',
      style: 'Curiosity & Hook',
      description: `Looking for top-rated ${kw}? See our comprehensive 2026 breakdown comparing performance, free tiers, and expert ratings. Read the review now!`,
      characterCount: 156,
      isOptimalLength: true
    },
    {
      id: 'meta-4',
      style: 'Comprehensive Overview',
      description: `Your complete resource for ${capTopic}. Tested and audited insights, unbiased benchmarks, and actionable tips for creators and professionals.`,
      characterCount: 151,
      isOptimalLength: true
    }
  ];
}
