import { AITool } from '../../types';

export const videoTools: AITool[] = [
  {
    id: 'tool-runway',
    slug: 'runway',
    name: 'Runway',
    tagline: 'Generative AI video suite featuring Gen-2 and Gen-3 Alpha for cinematic storytelling',
    description: 'Pioneering multimodal AI research company building text-to-video, image-to-video, and advanced generative media tools.',
    fullDescription: 'Runway is a powerhouse in AI video synthesis. Powered by its benchmark Gen-3 Alpha model, Runway allows filmmakers, VFX artists, and animators to generate photorealistic, high-frame-rate video sequences from text prompts or still images with precise camera controls and motion brush painting.',
    category: 'ai-video-tools',
    categoryLabel: 'AI Video Tools',
    categories: ['ai-video-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: '125 one-time free credits; Standard plan starts at $12/user/month billed annually ($15/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'one-time credits',
        features: ['125 one-time generation credits', 'Access to Gen-2 and Gen-3 Alpha video generation', '720p video export resolution', '3 video projects']
      },
      {
        name: 'Standard',
        price: '$12',
        billing: 'per user / month (billed annually at $144)',
        popular: true,
        features: ['625 credits per month', 'Upscale video to 4K resolution', 'Unlimited video editor exports', 'Green screen and motion brush tools']
      },
      {
        name: 'Pro',
        price: '$28',
        billing: 'per user / month (billed annually)',
        features: ['2,250 credits per month', 'Custom voice generation', 'Advanced camera controls & Gen-3 priority queue', 'Train custom AI portrait models']
      }
    ],
    bestFor: 'Filmmakers, VFX artists, art directors, and content creators looking for cinematic video generation.',
    keyFeatures: [
      'Gen-3 Alpha model delivering photorealistic human emotions, lighting, and fluid physical motion',
      'Motion Brush allowing precise directional control over specific regions of an image',
      'Advanced Camera Controls simulating real zooms, dollies, pans, and rolls',
      'Image-to-Video bringing static midjourney or photography portraits to life'
    ],
    pros: [
      'Benchmark-setting cinematic fidelity in AI video generation',
      'Motion Brush gives unprecedented control over fluid dynamics and smoke',
      'Clean web-based timeline video editing workspace',
      'Regular continuous releases of cutting-edge video models'
    ],
    cons: [
      'Free plan credits do not replenish monthly (one-time allocation)',
      'High-resolution Gen-3 video renders consume credits quickly'
    ],
    howToUse: [
      { step: 1, title: 'Upload Reference Image or Type Prompt', description: 'Enter a cinematic prompt detailing camera motion and lighting, or upload a still image.' },
      { step: 2, title: 'Set Motion Parameters', description: 'Adjust motion intensity, camera pan/zoom, or paint specific areas with Motion Brush.' },
      { step: 3, title: 'Generate & Extend', description: 'Render the 5-to-10 second clip and use Extend Video to lengthen the sequence seamlessly.' }
    ],
    alternatives: ['Pika', 'InVideo AI', 'HeyGen'],
    officialUrl: 'https://runwayml.com',
    affiliateUrl: 'https://runwayml.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 19000,
    badges: ['Cinematic Leader', 'Verified Free Plan'],
    iconName: 'Film',
    iconBg: 'bg-black',
    verifiedDate: 'September 2026',
    useCases: ['Cinematic B-roll generation', 'Music video visual effects', 'Concept film trailers', 'Animated photography'],
    faqs: [
      { question: 'Is Runway free?', answer: 'Yes, Runway offers a free trial tier with 125 credits to test Gen-2 and Gen-3 Alpha without entering payment details.' },
      { question: 'What is Runway Gen-3 Alpha?', answer: 'Gen-3 Alpha is Runway’s high-fidelity video generation model capable of rendering expressive characters, cinematic camera motions, and photorealistic physics.' }
    ]
  },
  {
    id: 'tool-heygen',
    slug: 'heygen',
    name: 'HeyGen',
    tagline: 'AI video generation with hyper-realistic human avatars and instant voice translation',
    description: 'Transform text scripts into studio-quality videos featuring photorealistic AI avatars and multi-language lip-synced voice cloning.',
    fullDescription: 'HeyGen is the market-leading AI avatar video generator. Designed for corporate training, sales prospecting, and viral social videos, HeyGen lets users produce studio-quality talking-head videos simply by typing a script. Its video translation engine translates speech into 40+ languages with automatic mouth lip-syncing.',
    category: 'ai-video-tools',
    categoryLabel: 'AI Video Tools',
    categories: ['ai-video-tools', 'ai-marketing-tools', 'free-ai-tools', 'ai-business-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan includes 1 free video credit (1 min); Creator plan starts at $24/month billed annually ($29/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free (1 credit)',
        features: ['1 free credit (~1 min video)', 'Access to 120+ public avatars', '300+ AI voices', 'Auto-captions']
      },
      {
        name: 'Creator',
        price: '$24',
        billing: 'per month (billed annually at $288)',
        popular: true,
        features: ['15 credits per month (15 mins video)', 'Fast processing queue', 'No HeyGen watermark', 'Unlimited 1080p downloads', 'Voice cloning']
      },
      {
        name: 'Team',
        price: '$72',
        billing: 'per month (billed annually, 30 credits)',
        features: ['30 credits per month with rollover', '4K resolution exports', 'Team brand kits and shared avatars', 'API access availability']
      }
    ],
    bestFor: 'Corporate trainers, sales reps sending personalized video pitches, and educational content creators.',
    keyFeatures: [
      '120+ diverse photorealistic avatars with realistic facial micro-expressions',
      'Video Translation cloning your voice and re-syncing mouth movements into 40+ languages',
      'Instant Avatar creator cloning your own appearance and voice from a 2-minute webcam recording',
      'Streaming Avatar API allowing real-time interactive conversational video avatars'
    ],
    pros: [
      'The most realistic lip-syncing and natural facial expressions on the market',
      'Video translation makes global multi-language marketing effortless',
      'Instant Avatar creation takes under 5 minutes on standard webcams',
      'Templates tailored for corporate training and TikTok/Reels'
    ],
    cons: [
      'Free plan only provides 1 complimentary video credit',
      'Additional video minutes can become costly for long-form courses'
    ],
    howToUse: [
      { step: 1, title: 'Pick an AI Avatar', description: 'Choose from 120+ professional avatars or record yourself for 2 minutes to create a clone.' },
      { step: 2, title: 'Type or Paste Script', description: 'Enter your dialogue in any of 40+ supported languages and select vocal pacing.' },
      { step: 3, title: 'Generate & Download in 1080p', description: 'Render the finished presenter video complete with graphics and captions in minutes.' }
    ],
    alternatives: ['Synthesia', 'Descript', 'ElevenLabs'],
    officialUrl: 'https://www.heygen.com',
    affiliateUrl: 'https://www.heygen.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 17500,
    badges: ['Top Avatar Tech', 'Verified Free Plan'],
    iconName: 'Film',
    iconBg: 'bg-purple-600',
    verifiedDate: 'September 2026',
    useCases: ['Employee onboarding videos', 'Multilingual customer support', 'Personalized sales prospecting', 'YouTube explainer videos'],
    faqs: [
      { question: 'Is HeyGen free to try?', answer: 'Yes, HeyGen provides 1 free credit to generate a full 1-minute video without requiring a credit card.' },
      { question: 'How does HeyGen video translation work?', answer: 'HeyGen translates your spoken video into 40+ languages, clones your exact voice in the target language, and modifies mouth movements to match the translated syllables.' }
    ]
  },
  {
    id: 'tool-synthesia',
    slug: 'synthesia',
    name: 'Synthesia',
    tagline: 'Enterprise-grade AI video creation platform with expressive avatars and 140+ languages',
    description: 'Transform company documents and text into professional training and marketing videos using AI avatars and realistic voiceovers.',
    fullDescription: 'Synthesia is the enterprise benchmark for video production without cameras, microphones, or actors. Trusted by Fortune 500 companies, Synthesia turns dry documentation and slide presentations into engaging video modules featuring over 160+ AI avatars and 140+ languages with enterprise security and SOC 2 compliance.',
    category: 'ai-video-tools',
    categoryLabel: 'AI Video Tools',
    categories: ['ai-video-tools', 'ai-business-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 36 mins of video per year; Starter plan from $18/month billed annually ($29/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free (36 mins/year)',
        features: ['3 mins of video per month (36 mins/yr)', '6 stock avatars', '140+ languages', 'Standard Synthesia video editor']
      },
      {
        name: 'Starter',
        price: '$18',
        billing: 'per month (billed annually at $216)',
        popular: true,
        features: ['10 mins of video per month (120 mins/yr)', '1 editor seat & 3 guest commenters', '70+ avatars', 'AI video script assistant']
      },
      {
        name: 'Creator',
        price: '$64',
        billing: 'per month (billed annually at $768)',
        features: ['30 mins of video per month', 'Unlimited video downloads', 'Full avatar library (160+)', 'Custom voice cloning']
      }
    ],
    bestFor: 'Enterprise HR teams, customer success departments, and corporate learning & development managers.',
    keyFeatures: [
      '160+ ethnically diverse AI avatars dressed in corporate and casual attire',
      'Over 140+ natural languages and accents with nuanced vocal intonation',
      'AI Video Assistant converting uploaded PDFs or blog posts into complete multi-scene video courses',
      'SOC 2 Type II and GDPR enterprise security compliance'
    ],
    pros: [
      'Free tier provides a generous 36 minutes of video per year for casual creators',
      'Highest level of enterprise compliance and data security for corporations',
      'Easy to update videos when policies change without re-booking studio time',
      'Intuitive slide-based editor requires zero video editing experience'
    ],
    cons: [
      'Avatars can look formal, making them less ideal for raw TikTok/Reels aesthetics',
      'Custom personal avatar creation requires an enterprise tier add-on'
    ],
    howToUse: [
      { step: 1, title: 'Choose an Avatar & Background Template', description: 'Select a presenter and choose a clean corporate layout or custom background.' },
      { step: 2, title: 'Type Your Script', description: 'Paste training copy; Synthesia speaks the lines naturally in your chosen language.' },
      { step: 3, title: 'Add Screen Recordings & Export', description: 'Combine presenter narration with screen captures, text callouts, and download in 1080p.' }
    ],
    alternatives: ['HeyGen', 'InVideo AI', 'Descript'],
    officialUrl: 'https://www.synthesia.io',
    affiliateUrl: 'https://www.synthesia.io',
    hasAffiliate: false,
    rating: 4.7,
    reviewsCount: 16000,
    badges: ['Enterprise Choice', 'Verified Free Plan'],
    iconName: 'Film',
    iconBg: 'bg-emerald-700',
    verifiedDate: 'September 2026',
    useCases: ['Corporate training modules', 'Customer onboarding videos', 'Software product demos', 'Internal executive updates'],
    faqs: [
      { question: 'Does Synthesia have a free plan?', answer: 'Yes, Synthesia offers a free plan that grants 3 minutes of video generation per month (36 minutes total per year) with access to stock avatars.' },
      { question: 'What languages does Synthesia support?', answer: 'Synthesia supports voice narration across more than 140 languages, dialects, and localized regional accents.' }
    ]
  },
  {
    id: 'tool-descript',
    slug: 'descript',
    name: 'Descript',
    tagline: 'Text-based audio and video editor that lets you edit media like a Google Doc',
    description: 'All-in-one podcast and video editing platform where deleting words from the transcript automatically cuts the video.',
    fullDescription: 'Descript fundamentally changed video editing by treating media like text. When you upload audio or video, Descript transcribes it with high accuracy. Removing filler words ("um", "uh"), deleting stumbles, or rearranging paragraphs in the transcript automatically splices and edits the video timeline simultaneously.',
    category: 'ai-video-tools',
    categoryLabel: 'AI Video Tools',
    categories: ['ai-video-tools', 'ai-productivity-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 1 transcription hour/month & 720p export; Hobbyist starts at $12/month billed annually ($19/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['1 transcription hour per month', '1 watermark-free video export per month at 720p', 'Studio Sound audio enhancement (limited)', 'AI voice cloning preview']
      },
      {
        name: 'Hobbyist',
        price: '$12',
        billing: 'per user / month (billed annually at $144)',
        popular: true,
        features: ['10 transcription hours per month', 'Unlimited watermark-free exports up to 1080p', 'Full Studio Sound background noise removal', 'Automatic filler word removal ("ums", "uhs")']
      },
      {
        name: 'Creator',
        price: '$24',
        billing: 'per user / month (billed annually)',
        features: ['30 transcription hours per month', '4K export resolution', 'AI Eye Contact correction', 'Full Overdub voice cloning']
      }
    ],
    bestFor: 'Podcasters, YouTubers, online educators, and remote teams creating high-volume video and audio recordings.',
    keyFeatures: [
      'Text-based editing allowing you to cut video simply by highlighting and deleting words',
      'Studio Sound removing echo, room noise, and background hum to make laptop mics sound professional',
      'AI Eye Contact subtly redirecting pupil gaze so you appear to be looking directly into the camera',
      'Automatic Filler Word Removal purging repeated "ums" and "ahs" in a single click'
    ],
    pros: [
      'Eliminates the steep learning curve of traditional NLE timeline editors like Premiere Pro',
      'Studio Sound is miraculous at transforming cheap microphone audio into broadcast quality',
      'AI Eye Contact helps creators read scripts naturally without appearing distracted',
      'One-click multi-track podcast transcription and speaker labeling'
    ],
    cons: [
      'Free plan limits exports to 1 watermark-free video per month',
      'Desktop application requires substantial RAM for large 4K multi-cam timelines'
    ],
    howToUse: [
      { step: 1, title: 'Import Video or Record Screen', description: 'Drag and drop video files or record directly using Descript’s built-in recorder.' },
      { step: 2, title: 'Edit Transcript Text', description: 'Click "Remove filler words" to purge all "ums" and "uhs", and delete text to trim clips.' },
      { step: 3, title: 'Apply Studio Sound & Export', description: 'Toggle Studio Sound on to remove room noise and export directly to YouTube or MP4.' }
    ],
    alternatives: ['VEED', 'CapCut', 'Runway'],
    officialUrl: 'https://www.descript.com',
    affiliateUrl: 'https://www.descript.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 26000,
    badges: ['Podcaster Essential', 'Verified Free Plan'],
    iconName: 'Mic',
    iconBg: 'bg-blue-600',
    verifiedDate: 'September 2026',
    useCases: ['Podcast audio editing', 'YouTube talking head videos', 'Screen recording product demos', 'Social media video snippets'],
    faqs: [
      { question: 'Is Descript free?', answer: 'Yes, Descript offers a free plan with 1 hour of transcription per month and 1 watermark-free 720p export.' },
      { question: 'What does Descript Studio Sound do?', answer: 'Studio Sound uses AI to isolate human voice frequencies and eliminate all background noise, echo, and microphone hiss.' }
    ]
  },
  {
    id: 'tool-elevenlabs',
    slug: 'elevenlabs',
    name: 'ElevenLabs',
    tagline: 'Hyper-realistic AI voice synthesis, voice cloning, and text-to-speech audio models',
    description: 'The industry-leading AI audio platform producing emotional, nuanced human voices and instant zero-shot voice cloning.',
    fullDescription: 'ElevenLabs sets the gold standard in artificial speech generation. Capable of conveying authentic human emotion, comedic pauses, whispering, and crying, ElevenLabs is used by audiobook publishers, game studios, and YouTubers to produce studio-grade voice narration and clone voices from short audio clips.',
    category: 'ai-productivity-tools',
    categoryLabel: 'AI Audio & Productivity',
    categories: ['ai-productivity-tools', 'ai-video-tools', 'ai-marketing-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with 10,000 characters/month; Starter plan starts at $5/month ($4/mo annual).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['10,000 characters per month (~10 mins audio)', 'Access to 3 custom voices', 'Voice design generator', 'Text-to-speech in 32 languages']
      },
      {
        name: 'Starter',
        price: '$5',
        billing: 'per month ($4/mo billed annually)',
        popular: true,
        features: ['30,000 characters per month', 'Instant Voice Cloning with 1-minute audio sample', 'Access to community Voice Library', 'Commercial license included']
      },
      {
        name: 'Creator',
        price: '$22',
        billing: 'per month ($18/mo billed annually)',
        features: ['100,000 characters per month (~2 hours audio)', 'Professional Voice Cloning', 'High-quality 192kbps audio output', 'AI Dubbing studio access']
      }
    ],
    bestFor: 'Audiobook narrators, game developers, video creators, and publishers wanting emotional, lifelike voiceovers.',
    keyFeatures: [
      'Emotional and pacing control generating authentic whispers, laughs, sarcasm, and dramatic pauses',
      'Instant Voice Cloning duplicating any speaker’s vocal timbre from 60 seconds of clean audio',
      'Dubbing Studio translating video audio into 30+ languages while preserving the original speaker’s voice',
      'Voice Library featuring thousands of community-shared accents and character voices'
    ],
    pros: [
      'Unsurpassed natural human inflection that avoids robotic monotone output',
      'Generous 10,000 free monthly characters for hobbyists and experimentation',
      'Instant voice cloning requires only a one-minute smartphone recording',
      'Seamless API with sub-second latency for developers'
    ],
    cons: [
      'Free tier does not include commercial usage rights (requires $5 Starter plan)',
      'Character consumption counts punctuation and spaces toward monthly quotas'
    ],
    howToUse: [
      { step: 1, title: 'Choose or Clone a Voice', description: 'Select an expressive voice from the library or upload an audio sample to clone a voice.' },
      { step: 2, title: 'Type or Paste Dialogue', description: 'Paste text and adjust Stability and Clarity sliders to fine-tune emotional expression.' },
      { step: 3, title: 'Generate & Download MP3', description: 'Listen to the audio, re-generate specific sentences if desired, and export.' }
    ],
    alternatives: ['Descript', 'HeyGen', 'Synthesia'],
    officialUrl: 'https://elevenlabs.io',
    affiliateUrl: 'https://elevenlabs.io',
    hasAffiliate: false,
    rating: 4.9,
    reviewsCount: 34000,
    badges: ['Top Voice Tech', 'Verified Free Plan'],
    iconName: 'Mic',
    iconBg: 'bg-black',
    verifiedDate: 'September 2026',
    useCases: ['Audiobook narration', 'Video game character acting', 'YouTube narration voiceovers', 'Automated video dubbing'],
    faqs: [
      { question: 'Is ElevenLabs free?', answer: 'Yes, ElevenLabs provides 10,000 characters every month for free with access to standard text-to-speech in 32 languages.' },
      { question: 'Can I clone my own voice on ElevenLabs?', answer: 'Yes, with the $5 Starter tier you can clone your voice in under a minute by uploading a brief voice recording.' }
    ]
  },
  {
    id: 'tool-capcut',
    slug: 'capcut',
    name: 'CapCut',
    tagline: 'ByteDance’s premier video editor packed with AI auto-captions and viral effects',
    description: 'All-in-one desktop, mobile, and web video editing suite famous for auto-captions, background removal, and trending templates.',
    fullDescription: 'CapCut (developed by ByteDance) is the definitive video editing software for TikTok, Instagram Reels, and YouTube Shorts. CapCut integrates AI features including animated auto-captions, one-click background cutout, AI video upscaling, and text-to-speech voiceovers directly into an intuitive, free timeline editor.',
    category: 'ai-video-tools',
    categoryLabel: 'AI Video Tools',
    categories: ['ai-video-tools', 'free-ai-tools', 'ai-marketing-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Completely free core editor; CapCut Pro starts at $7.99/month ($74.99/year) for premium effects.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        popular: true,
        features: ['Full timeline video editing on desktop, mobile, and web', 'AI Auto-Captions with animated styles', 'Background removal and chroma key', 'Massive royalty-free audio library', '1080p export without mandatory watermark']
      },
      {
        name: 'CapCut Pro',
        price: '$7.99',
        billing: 'per month or $74.99/year',
        features: ['100GB cloud storage', 'Advanced AI motion tracking and optical flow slow motion', 'AI body shape and facial retouching', 'Exclusive trending transitions and audio effects']
      }
    ],
    bestFor: 'Short-form content creators, TikTokers, social media managers, and mobile video editors.',
    keyFeatures: [
      'AI Auto-Captions automatically transcribing speech into animated, styled karaoke subtitles in 20+ languages',
      'Smart Background Removal cutting out subjects from videos without needing a green screen',
      'Text-to-Speech voices featuring popular trending social media voices',
      'Optical Flow Smooth Slow Motion creating cinematic 60fps slow-mo from standard footage'
    ],
    pros: [
      'The most feature-complete free video editor on desktop and mobile',
      'Exports clean 1080p and 4K videos without watermarks on the free version',
      'Auto-captions save hours of manual typing and styling for Reels and TikToks',
      'Enormous collection of trending music, sound effects, and transitions'
    ],
    cons: [
      'Certain advanced effects and cloud storage features require CapCut Pro',
      'Cloud sync between mobile and desktop occasionally requires manual project uploading'
    ],
    howToUse: [
      { step: 1, title: 'Import Clips on Mobile or Desktop', description: 'Drag video recordings onto the CapCut timeline.' },
      { step: 2, title: 'Generate Auto-Captions', description: 'Click "Text" > "Auto Captions" and select an animated bold subtitle style.' },
      { step: 3, title: 'Export Watermark-Free', description: 'Export directly to TikTok, Instagram, or download as a 1080p MP4 file.' }
    ],
    alternatives: ['VEED', 'Descript', 'OpusClip'],
    officialUrl: 'https://www.capcut.com',
    affiliateUrl: 'https://www.capcut.com',
    hasAffiliate: false,
    rating: 4.9,
    reviewsCount: 85000,
    badges: ['Viral Creator Essential', 'Verified Free Plan'],
    iconName: 'Film',
    iconBg: 'bg-black',
    verifiedDate: 'September 2026',
    useCases: ['TikTok & Reels short-form videos', 'Animated social captions', 'Green screen cutout effects', 'YouTube Shorts editing'],
    faqs: [
      { question: 'Is CapCut free without a watermark?', answer: 'Yes, CapCut allows you to export high-definition 1080p videos completely free without a forced watermark on mobile, desktop, and web.' },
      { question: 'Does CapCut have auto-captions?', answer: 'Yes, CapCut has an AI auto-caption generator that transcribes speech and styles karaoke-style animated captions in seconds.' }
    ]
  },
  {
    id: 'tool-veed',
    slug: 'veed',
    name: 'VEED',
    tagline: 'Browser-based online video editor with AI subtitles, screen recording, and clean templates',
    description: 'Easy-to-use cloud video suite allowing creators to record, transcribe, edit, and translate videos directly in the browser.',
    fullDescription: 'VEED (VEED.IO) is an online video editing studio that runs entirely in web browsers without demanding heavy computer hardware. It specializes in auto-subtitling, AI eye-contact correction, clean screen recording, voice dubbing, and formatting videos for social media channels.',
    category: 'ai-video-tools',
    categoryLabel: 'AI Video Tools',
    categories: ['ai-video-tools', 'ai-marketing-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with 10-minute exports (with watermark); Lite plan at $12/month billed annually ($18/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['Exports up to 10 minutes (with VEED watermark)', '30 minutes of subtitles per month', '720p export quality', 'Screen recording']
      },
      {
        name: 'Lite',
        price: '$12',
        billing: 'per user / month (billed annually at $144)',
        popular: true,
        features: ['No watermark on exports', 'Full HD 1080p exports up to 25 mins', '12 hours of auto-subtitles per year', 'Clean audio enhancement']
      },
      {
        name: 'Pro',
        price: '$24',
        billing: 'per user / month (billed annually at $288)',
        features: ['4K resolution exports up to 2 hours', 'AI voice cloning and translation', 'Brand kits and custom typography', 'AI Eye Contact correction']
      }
    ],
    bestFor: 'Marketing agencies, content marketers, educators, and social media managers editing in web browsers.',
    keyFeatures: [
      'Accurate Auto-Subtitle generator with customizable typography, emojis, and highlighting',
      'AI Clean Audio removing ambient noise, echo, and electrical hum in one click',
      'AI Eye Contact realigning pupil positions so presenters look natural on camera',
      'One-click aspect ratio resizer adapting videos for 9:16 (vertical), 1:1 (square), or 16:9 (horizontal)'
    ],
    pros: [
      '100% browser-based—works on any Chromebook, Mac, or Windows laptop without software installation',
      'Accurate auto-subtitle engine with modern social media presets',
      'Convenient screen and webcam recorder integrated directly into the editor',
      'Fast video rendering on cloud servers'
    ],
    cons: [
      'Free plan exports include a visible VEED watermark',
      'Requires stable high-speed internet connection for large raw file uploads'
    ],
    howToUse: [
      { step: 1, title: 'Upload Video to Browser', description: 'Drag and drop your MP4 or record screen and webcam directly in the browser.' },
      { step: 2, title: 'Add Auto-Subtitles', description: 'Click Subtitles > Auto Subtitle to generate and style captions in one click.' },
      { step: 3, title: 'Export & Share Link', description: 'Render in 1080p and share via direct link or download to your computer.' }
    ],
    alternatives: ['Descript', 'CapCut', 'InVideo AI'],
    officialUrl: 'https://www.veed.io',
    affiliateUrl: 'https://www.veed.io',
    hasAffiliate: false,
    rating: 4.7,
    reviewsCount: 22000,
    badges: ['Cloud Editor', 'Verified Free Plan'],
    iconName: 'Film',
    iconBg: 'bg-indigo-600',
    verifiedDate: 'September 2026',
    useCases: ['Social video auto-subtitles', 'Customer testimonial editing', 'Webinar highlight clips', 'Product demo screen recordings'],
    faqs: [
      { question: 'Is VEED free to use?', answer: 'Yes, VEED offers a free plan allowing exports up to 10 minutes with 720p resolution and a small watermark.' },
      { question: 'Do I need to download software to use VEED?', answer: 'No, VEED is 100% cloud-based and operates entirely within modern web browsers like Chrome, Edge, and Safari.' }
    ]
  },
  {
    id: 'tool-pika',
    slug: 'pika',
    name: 'Pika',
    tagline: 'Idea-to-video platform delivering dynamic physics, creative transformations, and animations',
    description: 'Creative text-to-video and image-to-video generator capable of dynamic camera zooms, physical effects, and object animations.',
    fullDescription: 'Pika (Pika Labs) is an innovative AI video creation platform built for visual storytellers. Known for fluid 3D animations, creative object transformations, and realistic physical simulations, Pika allows users to generate 3-second cinematic clips from simple prompts or animate existing still images.',
    category: 'ai-video-tools',
    categoryLabel: 'AI Video Tools',
    categories: ['ai-video-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with daily credits and Pika watermark; Standard plan starts at $8/month billed annually ($10/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['Initial credits with daily top-ups (~6-10 videos/day)', 'Standard generation speed', 'Pika watermark on exports', 'Access to Pika 1.0 web interface']
      },
      {
        name: 'Standard',
        price: '$8',
        billing: 'per month ($8/mo billed annually at $96)',
        popular: true,
        features: ['700 credits per month', 'Remove Pika watermarks', 'Generate 1080p upscale video', 'Modify region inpainting', 'Expand canvas aspect ratios']
      },
      {
        name: 'Pro',
        price: '$28',
        billing: 'per month ($28/mo billed annually)',
        features: ['2,000 credits per month', 'Unlimited relaxed generations', 'Priority generation queue', 'Commercial rights']
      }
    ],
    bestFor: '3D animators, digital artists, marketers, and creative visual directors creating stylized video clips.',
    keyFeatures: [
      'Pika Effects (Inflate, Melt, Explode, Squish) applying surreal physical transformations to objects',
      'Modify Region inpainting allowing you to change clothes, hair, or backgrounds in video clips',
      'Expand Canvas expanding 16:9 videos to 9:16 or wide cinema formats without stretching',
      'Lip-Sync synchronizing character mouth movements to uploaded audio tracks'
    ],
    pros: [
      'Pika Effects provide fun, surreal physical simulations unmatched by other video models',
      'Generous daily credit top-ups make it easy to experiment for free',
      'Clean modern web UI with quick generation previews',
      'Strong adherence to camera pan and tilt commands'
    ],
    cons: [
      'Free generations carry a small watermark in the lower corner',
      'Clips default to 3-4 seconds and require manual extension for longer scenes'
    ],
    howToUse: [
      { step: 1, title: 'Upload Image or Type Prompt', description: 'Input a descriptive prompt or upload a still artwork to animate.' },
      { step: 2, title: 'Pick a Pika Effect or Camera Movement', description: 'Apply Melt, Inflate, or specify camera motion parameters.' },
      { step: 3, title: 'Download or Extend', description: 'Upscale to 1080p and extend the video duration by 4-second intervals.' }
    ],
    alternatives: ['Runway', 'InVideo AI', 'HeyGen'],
    officialUrl: 'https://pika.art',
    affiliateUrl: 'https://pika.art',
    hasAffiliate: false,
    rating: 4.7,
    reviewsCount: 15000,
    badges: ['Creative FX', 'Verified Free Plan'],
    iconName: 'Film',
    iconBg: 'bg-rose-600',
    verifiedDate: 'September 2026',
    useCases: ['Surreal physical visual effects', 'Animated 3D artwork', 'Social media teaser clips', 'Product concept motion'],
    faqs: [
      { question: 'Is Pika free?', answer: 'Yes, Pika offers a free tier that grants daily credit top-ups to generate video clips without requiring payment.' },
      { question: 'What are Pika Effects?', answer: 'Pika Effects are unique animation modifiers (like Melt, Squish, Explode, and Inflate) that apply dynamic physical transformations to any uploaded photo.' }
    ]
  },
  {
    id: 'tool-invideo-ai',
    slug: 'invideo-ai',
    name: 'InVideo AI',
    tagline: 'Prompt-to-video generator crafting complete YouTube and TikTok videos from text ideas',
    description: 'Turn a single sentence prompt into a fully scripted, narrated, and edited video with stock footage, subtitles, and music.',
    fullDescription: 'InVideo AI automates the entire video production pipeline. Users type a prompt describing their topic, target platform, and voice tone; InVideo AI writes the script, selects relevant stock footage from a 16M+ library, generates voiceover narration, adds on-screen subtitles, and stitches everything into an edited video.',
    category: 'ai-video-tools',
    categoryLabel: 'AI Video Tools',
    categories: ['ai-video-tools', 'ai-marketing-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with 10 mins/week AI video generation (with watermark); Plus plan from $20/month billed annually ($25/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['10 mins/week of AI generation (~4 videos/mo)', 'Access to 10M+ stock assets', 'Voiceover generator in multiple accents', 'Watermarked 1080p exports']
      },
      {
        name: 'Plus',
        price: '$20',
        billing: 'per month (billed annually at $240)',
        popular: true,
        features: ['50 mins/month of AI generation', 'No InVideo watermarks', 'Unlimited exports', '1 voice clone included', 'iStock licensed media']
      },
      {
        name: 'Max',
        price: '$48',
        billing: 'per month (billed annually at $576)',
        features: ['200 mins/month of AI generation', '5 voice clones', 'Priority AI generation speed', 'Advanced team collaboration']
      }
    ],
    bestFor: 'Faceless YouTube channel creators, affiliate marketers, and small business owners generating high-volume explainer videos.',
    keyFeatures: [
      'Prompt-to-Video generating complete scripted, voiced, and stock-edited videos from a single prompt',
      'Magic Box text prompt editing allowing you to change scenes by typing "Replace clip in scene 2 with a beach sunset"',
      '16M+ royalty-free stock media library including premium Shutterstock and iStock footage',
      'Voice cloning matching the creator’s authentic vocal tone for automated narration'
    ],
    pros: [
      'Generates a complete YouTube video with script, voiceover, and stock B-roll in 2 minutes',
      'Magic Box prompt editor makes revising scenes fast without manual timeline slicing',
      'Generous 10 mins per week free tier for trying the platform',
      'Wide variety of realistic AI voiceover accents'
    ],
    cons: [
      'Free version exports carry a visible InVideo AI watermark',
      'Stock footage selections can occasionally be generic and require manual swaps'
    ],
    howToUse: [
      { step: 1, title: 'Describe Your Video Idea', description: 'Type "Create a 60-second YouTube Short about 5 morning habits of billionaires, energetic tone".' },
      { step: 2, title: 'Review Generated Video', description: 'Watch the rendered video complete with voiceover, B-roll, and karaoke captions.' },
      { step: 3, title: 'Refine via Text Prompts', description: 'Type commands into the prompt bar to delete sections or swap clips before exporting.' }
    ],
    alternatives: ['HeyGen', 'CapCut', 'Synthesia'],
    officialUrl: 'https://invideo.io',
    affiliateUrl: 'https://invideo.io',
    hasAffiliate: false,
    rating: 4.7,
    reviewsCount: 25000,
    badges: ['Faceless Video Champion', 'Verified Free Plan'],
    iconName: 'Film',
    iconBg: 'bg-blue-600',
    verifiedDate: 'September 2026',
    useCases: ['Faceless YouTube automation', 'TikTok and Reels explainer shorts', 'Real estate promo clips', 'Affiliate product reviews'],
    faqs: [
      { question: 'Is InVideo AI free to try?', answer: 'Yes, InVideo AI provides 10 minutes of AI video generation per week for free so you can test complete video workflows.' },
      { question: 'What is InVideo Magic Box?', answer: 'The Magic Box is a natural-language editor where you type instructions like "Change the voice to casual British" or "Make scene 3 faster" to alter your video automatically.' }
    ]
  },
  {
    id: 'tool-opusclip',
    slug: 'opusclip',
    name: 'OpusClip',
    tagline: 'AI video repurposing tool turning 1 long video into 10 viral short-form clips in 1 click',
    description: 'Generative AI clipping tool that analyzes long podcasts, interviews, and webinars to automatically extract viral highlights with animated captions.',
    fullDescription: 'OpusClip is a video repurposing platform for content creators. Powered by ClipGenius technology, it parses long YouTube videos, podcasts, and speeches, identifies hooks and compelling punchlines, and crops speakers dynamically into 9:16 vertical frames complete with animated emojis and dynamic subtitles.',
    category: 'ai-video-tools',
    categoryLabel: 'AI Video Tools',
    categories: ['ai-video-tools', 'ai-marketing-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with 60 processing minutes/month; Starter plan starts at $9/month ($108/yr); Pro at $19/month.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free (60 mins/mo)',
        features: ['60 processing minutes per month', 'Auto-generated virality score for each clip', 'Animated karaoke subtitles & auto-emojis', 'Active speaker auto-reframe to 9:16 (with small watermark)']
      },
      {
        name: 'Starter',
        price: '$9',
        billing: 'per month (billed annually)',
        popular: true,
        features: ['150 processing minutes per month', 'Remove OpusClip watermark', '1080p HD exports', 'Custom brand templates & fonts']
      },
      {
        name: 'Pro',
        price: '$19',
        billing: 'per month (billed annually at $228)',
        features: ['300 processing minutes per month', 'Multiple brand templates', 'Social media auto-scheduler', 'Export directly to Premiere Pro (.xml)']
      }
    ],
    bestFor: 'Podcasters, YouTubers, interviewers, and marketing teams repurposing long-form webinars into daily TikToks and Reels.',
    keyFeatures: [
      'ClipGenius AI ranking clips with a Virality Score predicting engagement potential',
      'AI Dynamic Framing keeping moving speakers centered in vertical 9:16 frames',
      'Auto-Captions with animated keywords, custom highlight colors, and automatic emoji insertion',
      'Direct social media scheduling publishing straight to TikTok, YouTube Shorts, and Instagram'
    ],
    pros: [
      'Free plan gives 60 processing minutes every month (generates ~10-15 short clips)',
      'Accurate speaker tracking centers talking faces automatically',
      'Virality Score saves hours of manual review by identifying the best hooks',
      'Pastes directly from YouTube links without downloading raw files'
    ],
    cons: [
      'Free tier clips include an OpusClip watermark',
      'Complex multi-speaker overlapping conversation can occasionally confuse camera tracking'
    ],
    howToUse: [
      { step: 1, title: 'Paste YouTube Link', description: 'Drop any YouTube podcast, interview, or webinar URL directly into OpusClip.' },
      { step: 2, title: 'Analyze & Review Virality Scores', description: 'OpusClip outputs 10+ vertical clips with predicted virality ratings and transcripts.' },
      { step: 3, title: 'Adjust Captions & Schedule', description: 'Customize font colors and schedule clips directly to your social channels.' }
    ],
    alternatives: ['CapCut', 'Descript', 'VEED'],
    officialUrl: 'https://www.opus.pro',
    affiliateUrl: 'https://www.opus.pro',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 20000,
    badges: ['Repurposing Champion', 'Verified Free Plan'],
    iconName: 'Film',
    iconBg: 'bg-emerald-600',
    verifiedDate: 'September 2026',
    useCases: ['Podcast highlight clips', 'Webinar bite-sized lessons', 'YouTube Shorts repurposing', 'TikTok viral hooks'],
    faqs: [
      { question: 'Is OpusClip free?', answer: 'Yes, OpusClip offers a free plan with 60 processing minutes per month that replenishes every 30 days.' },
      { question: 'How does the OpusClip Virality Score work?', answer: 'ClipGenius analyzes thousands of viral social media clips to score your hooks, storytelling pace, and punchlines on a scale of 0 to 99.' }
    ]
  }
];
