import { AITool } from '../../types';

export const designAndImageTools: AITool[] = [
  {
    id: 'tool-canva',
    slug: 'canva',
    name: 'Canva',
    tagline: 'All-in-one visual design platform with Magic Studio generative AI tools',
    description: 'Popular graphic design platform featuring Magic Studio AI for instant image generation, text rewrites, background removal, and auto-layouts.',
    fullDescription: 'Canva makes professional graphic design accessible to non-designers. Its integrated Magic Studio suite includes Magic Design (instant presentations and social posts from prompts), Magic Expand, Magic Eraser, and AI text copywriting, alongside an enormous library of pre-licensed stock assets and templates.',
    category: 'ai-design-tools',
    categoryLabel: 'AI Design Tools',
    categories: ['ai-design-tools', 'ai-marketing-tools', 'free-ai-tools', 'ai-tools-for-students'],
    pricingType: 'freemium',
    pricingSummary: 'Generous free tier with thousands of templates; Canva Pro at $12.99/month ($119.99/yr).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['Access to 1M+ free photos & graphics', 'Basic Magic Studio AI features (limited uses)', 'Drag-and-drop design editor', '5GB cloud storage']
      },
      {
        name: 'Canva Pro',
        price: '$12.99',
        billing: 'per month or $119.99/year',
        popular: true,
        features: ['Full Magic Studio access (Magic Switch, Magic Eraser, Magic Expand)', '100M+ premium stock photos, videos, and graphics', 'Brand Kit with unlimited brand fonts and logos', '1TB cloud storage']
      },
      {
        name: 'Canva for Teams',
        price: '$14.99',
        billing: 'per month (for first 3 people)',
        features: ['Team brand controls & asset approvals', 'Shared team templates and workflows', 'Activity logging and centralized billing']
      }
    ],
    bestFor: 'Social media creators, small business owners, educators, and marketing teams needing fast, polished visual graphics.',
    keyFeatures: [
      'Magic Design generating complete presentations, videos, or social posts from a simple text prompt',
      'One-click Magic Switch converting designs into different dimensions, formats, or languages',
      'Magic Eraser and Magic Grab allowing instant element manipulation within raster photos',
      'Extensive Brand Kit storing logos, color palettes, and custom typography'
    ],
    pros: [
      'Extremely generous free plan that covers 90% of basic graphic design needs',
      'Unmatched library of professional templates for every social media platform',
      'Magic Switch instantly reformats posts for Instagram, LinkedIn, and Pinterest',
      'No steep learning curve compared to traditional desktop design software'
    ],
    cons: [
      'AI image generation resolution is lower than specialized tools like Midjourney',
      'Advanced vector editing tools are limited compared to Adobe Illustrator or Figma'
    ],
    howToUse: [
      { step: 1, title: 'Describe Your Design in Magic Studio', description: 'Type a prompt like "Instagram carousel about productivity tips for freelancers".' },
      { step: 2, title: 'Customize Layout & Brand Assets', description: 'Apply your Brand Kit colors and swap placeholder text with ease.' },
      { step: 3, title: 'Magic Switch & Export', description: 'Resize to Pinterest pin dimensions in 1 click and download as PNG or PDF.' }
    ],
    alternatives: ['Microsoft Designer', 'Adobe Firefly', 'Figma'],
    officialUrl: 'https://www.canva.com',
    affiliateUrl: 'https://www.canva.com',
    hasAffiliate: false,
    rating: 4.9,
    reviewsCount: 68000,
    badges: ['Popular', 'Verified Free Plan', 'Editor Choice'],
    iconName: 'Palette',
    iconBg: 'bg-cyan-600',
    verifiedDate: 'September 2026',
    useCases: ['Social media graphics', 'Pitch deck presentations', 'Marketing flyers & posters', 'YouTube thumbnails'],
    faqs: [
      { question: 'Is Canva free to use?', answer: 'Yes, Canva has a free tier that gives you access to millions of templates, basic AI design tools, and standard export options without paying anything.' },
      { question: 'What is Canva Magic Studio?', answer: 'Magic Studio is Canva’s collection of AI-powered tools, including text-to-image generation, one-click photo background removal, and automated presentation design.' }
    ]
  },
  {
    id: 'tool-adobe-firefly',
    slug: 'adobe-firefly',
    name: 'Adobe Firefly',
    tagline: 'Commercially safe generative AI for photorealistic images, vectors, and text effects',
    description: 'Adobe’s generative AI engine trained exclusively on licensed Adobe Stock images, ensuring commercial safety for professionals.',
    fullDescription: 'Adobe Firefly is Adobe’s standalone generative AI application and creative engine embedded across Photoshop, Illustrator, and Premiere Pro. Unlike models trained on unvetted internet scrapes, Firefly is trained on Adobe Stock and openly licensed content, giving enterprises and creatives complete intellectual property indemnification.',
    category: 'ai-image-tools',
    categoryLabel: 'AI Image Tools',
    categories: ['ai-image-tools', 'ai-design-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: '25 free generative credits per month; Firefly Premium at $4.99/month for 100 credits (also included in Creative Cloud).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['25 generative credits per month', 'Text-to-Image with Firefly Image 3 model', 'Generative Fill in web browser', 'Watermarked exports with Content Credentials']
      },
      {
        name: 'Premium',
        price: '$4.99',
        billing: 'per month',
        popular: true,
        features: ['100 generative credits per month', 'Commercial use rights without Firefly watermarks', 'Priority processing queue', 'Access to Adobe Fonts']
      }
    ],
    bestFor: 'Graphic designers, creative agencies, and corporate marketing teams that require commercially safe generative imagery.',
    keyFeatures: [
      'Trained on Adobe Stock to deliver commercially safe imagery with Content Credentials provenance',
      'Generative Fill allowing precise element addition or removal via natural language brush masks',
      'Generative Recolor creating custom vector color variations for SVG and Illustrator assets',
      'Style Reference and Structure Reference matching exact brand palettes and compositions'
    ],
    pros: [
      'Safe for commercial advertising without copyright infringement risk',
      'Deep integration into Photoshop and Illustrator',
      'Structure and style reference match existing brand imagery with high accuracy',
      'Includes 25 free monthly credits for casual testing'
    ],
    cons: [
      'Credit consumption can be fast when exploring multiple variations',
      'Strict safety guardrails restrict certain creative art styles'
    ],
    howToUse: [
      { step: 1, title: 'Enter Text Prompt', description: 'Visit firefly.adobe.com and type a detailed description of your desired scene.' },
      { step: 2, title: 'Upload Style Reference', description: 'Provide a reference photo to guide lighting, camera angle, and color grading.' },
      { step: 3, title: 'Export or Edit in Photoshop', description: 'Download high-res assets with embedded Content Credentials or open in Adobe apps.' }
    ],
    alternatives: ['Midjourney', 'Ideogram', 'Leonardo AI'],
    officialUrl: 'https://firefly.adobe.com',
    affiliateUrl: 'https://firefly.adobe.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 22000,
    badges: ['Commercially Safe', 'Verified Free Plan'],
    iconName: 'Image',
    iconBg: 'bg-red-600',
    verifiedDate: 'September 2026',
    useCases: ['Commercial ad creative', 'Generative Fill photo retouching', 'Vector color variations', 'Editorial illustrations'],
    faqs: [
      { question: 'Is Adobe Firefly free?', answer: 'Yes, Firefly offers a free web plan providing 25 generative credits every month with a free Adobe account.' },
      { question: 'Is Firefly imagery safe for commercial use?', answer: 'Yes, Firefly is designed to be commercially safe because it was trained on licensed Adobe Stock content and public domain works with expired copyrights.' }
    ]
  },
  {
    id: 'tool-midjourney',
    slug: 'midjourney',
    name: 'Midjourney',
    tagline: 'Benchmark generative AI for photorealistic art, conceptual design, and cinematic imagery',
    description: 'Leading AI image generator celebrated for unmatched aesthetic coherence, realistic lighting, and artistic versatility.',
    fullDescription: 'Midjourney is widely regarded as the gold standard in generative visual quality. Accessible through Discord and its web interface, Midjourney produces cinematic lighting, painterly styles, architectural concepts, and photorealistic portraits that consistently outperform competitors in aesthetic nuance.',
    category: 'ai-image-tools',
    categoryLabel: 'AI Image Tools',
    categories: ['ai-image-tools', 'ai-design-tools'],
    pricingType: 'paid',
    pricingSummary: 'Basic plan starts at $10/month ($8/mo annual); Standard plan at $30/month for unlimited Relaxed GPU generations.',
    pricingPlans: [
      {
        name: 'Basic Plan',
        price: '$10',
        billing: 'per month ($8/mo annual)',
        features: ['3.3 hours/month of Fast GPU time (~200 generations)', 'Access to Midjourney member gallery', 'Commercial terms for individuals']
      },
      {
        name: 'Standard Plan',
        price: '$30',
        billing: 'per month ($24/mo annual)',
        popular: true,
        features: ['15 hours/month of Fast GPU time', 'Unlimited Relax GPU generations (never run out of images)', 'Web interface access once unlocked']
      },
      {
        name: 'Pro Plan',
        price: '$60',
        billing: 'per month ($48/mo annual)',
        features: ['30 hours/month of Fast GPU time', 'Stealth Mode (hide images from public gallery)', '12 concurrent Fast jobs']
      }
    ],
    bestFor: 'Concept artists, photographers, game designers, architects, and filmmakers desiring high visual fidelity.',
    keyFeatures: [
      'v6.1 architecture delivering cinematic skin textures, lighting, and photorealism',
      'Vary (Region) and inpainting tools for surgical image modifications',
      'Style Reference (--sref) and Character Reference (--cref) for visual consistency',
      'Dedicated modern web interface with canvas editor and drag-and-drop image blending'
    ],
    pros: [
      'Unmatched artistic flair, dramatic lighting, and photorealistic textures',
      'Standard plan includes unlimited generations in Relax mode',
      'Consistency flags (--cref) allow recurring characters across a visual storyboard',
      'High-resolution upscalers produce print-ready files'
    ],
    cons: [
      'No free trial currently available (requires paid subscription)',
      'Complex Discord prompt syntax has a learning curve for beginners'
    ],
    howToUse: [
      { step: 1, title: 'Subscribe & Join Discord / Web', description: 'Sign up at midjourney.com and log in through Discord or the standalone web app.' },
      { step: 2, title: 'Craft Prompt with Parameters', description: 'Type `/imagine` followed by your concept and parameters like `--ar 16:9 --v 6.1`.' },
      { step: 3, title: 'Upscale & Vary', description: 'Choose from the 4-image grid to upscale, generate subtle variations, or inpaint specific regions.' }
    ],
    alternatives: ['Ideogram', 'Adobe Firefly', 'Leonardo AI'],
    officialUrl: 'https://www.midjourney.com',
    affiliateUrl: 'https://www.midjourney.com',
    hasAffiliate: false,
    rating: 4.9,
    reviewsCount: 45000,
    badges: ['Top Visual Quality', 'Industry Standard'],
    iconName: 'Image',
    iconBg: 'bg-slate-900',
    verifiedDate: 'September 2026',
    useCases: ['Cinematic film concepts', 'Product visualization', 'Architectural renders', 'Album covers & posters'],
    faqs: [
      { question: 'Does Midjourney offer a free trial?', answer: 'No, Midjourney paused its free trial due to heavy server demand. Plans begin at $10 per month.' },
      { question: 'Can I use Midjourney images commercially?', answer: 'Yes, paid Midjourney subscribers own all generated assets and can use them commercially subject to terms of service.' }
    ]
  },
  {
    id: 'tool-ideogram',
    slug: 'ideogram',
    name: 'Ideogram',
    tagline: 'AI image generator specializing in perfect typography, text rendering, and graphic logos',
    description: 'Generative AI platform famous for rendering crisp, accurate typography and coherent graphic design inside images.',
    fullDescription: 'Ideogram solves one of the oldest challenges in AI image generation: legible text and typography. It allows designers to generate t-shirt designs, posters, logos, and illustrations with crisp, spelled-out words, accompanied by an intelligent Magic Prompt enhancer that expands short descriptions into rich creative prompts.',
    category: 'ai-image-tools',
    categoryLabel: 'AI Image Tools',
    categories: ['ai-image-tools', 'ai-design-tools', 'free-ai-tools', 'ai-marketing-tools'],
    pricingType: 'freemium',
    pricingSummary: '10 free slow credits per day (~40 images); Basic plan at $8/month ($7/mo annual); Plus at $20/month.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['10 slow credits per day (~40 images generated)', 'Access to Ideogram 2.0 model', 'Public image gallery', 'Magic Prompt auto-enhancer']
      },
      {
        name: 'Basic',
        price: '$8',
        billing: 'per month ($7/mo billed annually)',
        popular: true,
        features: ['400 priority prompt credits per month (~1,600 images)', '100 slow credits/day', 'Private image generation', 'High-res image upscaling']
      },
      {
        name: 'Plus',
        price: '$20',
        billing: 'per month ($16/mo billed annually)',
        features: ['1,000 priority credits per month', 'Unlimited slow credits', 'Private generation & image upload editor', 'Bulk generation queue']
      }
    ],
    bestFor: 'Print-on-demand creators, logo designers, social marketers, and typography enthusiasts.',
    keyFeatures: [
      'Unrivaled text rendering accuracy generating complete sentences on signs, apparel, and posters',
      'Magic Prompt feature expanding minimal prompts into detailed visual directives',
      'Color Palette control specifying exact HEX color codes in the generated output',
      'Dedicated design and realism styles for logos, stickers, and vector aesthetics'
    ],
    pros: [
      'Best-in-class text and typography rendering on the web',
      'Generous free daily allowance of 10 slow credits (~40 images) refreshed daily',
      'Magic Prompt eliminates guesswork for beginners',
      'Color palette controls ensure strict adherence to brand guidelines'
    ],
    cons: [
      'Free tier images are publicly visible in community feeds',
      'Complex human anatomy can occasionally require re-rolls'
    ],
    howToUse: [
      { step: 1, title: 'Put Text in Quotation Marks', description: 'Include exact phrases inside quotes, e.g., A vintage bakery logo with the text "Sweet Flour Bakery".' },
      { step: 2, title: 'Select Style & Color Palette', description: 'Choose Graphic, Typography, or Realistic and enter your primary HEX codes.' },
      { step: 3, title: 'Generate & Upscale', description: 'Pick the best variation from the grid and upscale for print-ready resolution.' }
    ],
    alternatives: ['Midjourney', 'Adobe Firefly', 'Recraft'],
    officialUrl: 'https://ideogram.ai',
    affiliateUrl: 'https://ideogram.ai',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 21000,
    badges: ['Verified Free Plan', 'Typography Champion'],
    iconName: 'Palette',
    iconBg: 'bg-rose-600',
    verifiedDate: 'September 2026',
    useCases: ['T-shirt & merchandise designs', 'Typographic posters', 'Brand logo concepts', 'Stickers and decals'],
    faqs: [
      { question: 'Is Ideogram free?', answer: 'Yes, Ideogram provides 10 free slow credits daily (~40 images per day) without requiring payment details.' },
      { question: 'Why is Ideogram popular for t-shirts?', answer: 'Ideogram accurately renders spelled-out typography inside graphics, making it the top choice for print-on-demand slogans and apparel design.' }
    ]
  },
  {
    id: 'tool-leonardo-ai',
    slug: 'leonardo-ai',
    name: 'Leonardo AI',
    tagline: 'Comprehensive generative AI asset suite for game developers, artists, and creators',
    description: 'Feature-packed generative platform offering custom model fine-tuning, canvas inpainting, and real-time generation.',
    fullDescription: 'Leonardo AI is an end-to-end creative suite acquired by Canva. It provides artists and game designers with granular controls including Realtime Canvas, Motion video generation, PhotoReal rendering, and custom AI model training on proprietary character sets.',
    category: 'ai-image-tools',
    categoryLabel: 'AI Image Tools',
    categories: ['ai-image-tools', 'ai-design-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: '150 free fast tokens renewed every 24 hours; Apprentice plan starts at $10/month billed annually ($12/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free (daily reset)',
        features: ['150 fast generation tokens per day (~75 images)', 'Access to Leonardo Phoenix model', 'Realtime Gen and Canvas inpainting', 'Community models access']
      },
      {
        name: 'Apprentice',
        price: '$10',
        billing: 'per month (billed annually at $120)',
        popular: true,
        features: ['8,500 fast tokens per month', 'Train up to 10 custom AI models per month', 'Private generations', 'Unlimited relaxed generations']
      },
      {
        name: 'Artisan',
        price: '$24',
        billing: 'per month (billed annually)',
        features: ['25,000 fast tokens per month', 'Train up to 20 custom models', 'Priority queue and higher resolution upscaling']
      }
    ],
    bestFor: 'Game developers, concept artists, graphic designers, and creators needing consistent character models.',
    keyFeatures: [
      'Custom Model Fine-Tuning training bespoke AI models on 10–20 reference images',
      'Realtime Canvas letting you draw rough brush strokes and see photorealistic art render instantly',
      'PhotoReal engine delivering cinematic dynamic range and depth of field',
      'Motion tool adding subtle cinematic camera panning and motion to generated images'
    ],
    pros: [
      'Daily allowance of 150 tokens resets every 24 hours forever',
      'Realtime Canvas is one of the most responsive drawing tools available',
      'Model training enables consistent character art across an entire project',
      'Granular control sliders for guidance scale, seed, and negative prompts'
    ],
    cons: [
      'Free tier tokens do not roll over from day to day',
      'Interface has many advanced knobs that can feel overwhelming at first'
    ],
    howToUse: [
      { step: 1, title: 'Select Base Model', description: 'Pick Leonardo Phoenix, PhotoReal, or a community game-asset fine-tuned model.' },
      { step: 2, title: 'Set Generation Dimensions', description: 'Specify aspect ratio, guidance scale, and add reference images for ControlNet posing.' },
      { step: 3, title: 'Upscale or Animate', description: 'Use the Alchemy upscaler to boost resolution or apply Motion to create a 4-second video loop.' }
    ],
    alternatives: ['Midjourney', 'Ideogram', 'Adobe Firefly'],
    officialUrl: 'https://leonardo.ai',
    affiliateUrl: 'https://leonardo.ai',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 28000,
    badges: ['Verified Free Plan', 'Game Asset Favorite'],
    iconName: 'Sparkles',
    iconBg: 'bg-indigo-700',
    verifiedDate: 'September 2026',
    useCases: ['Video game character sprites', 'Real-time digital painting', 'Concept environment art', 'Consistent storybook characters'],
    faqs: [
      { question: 'Is Leonardo AI free?', answer: 'Yes, Leonardo AI gives every user 150 free fast tokens that replenish every single day.' },
      { question: 'Can I train my own AI model on Leonardo?', answer: 'Yes, users can upload 10–20 images to train a custom checkpoint that generates assets in their unique art style.' }
    ]
  },
  {
    id: 'tool-microsoft-designer',
    slug: 'microsoft-designer',
    name: 'Microsoft Designer',
    tagline: '100% free graphic design and image generation powered by OpenAI DALL-E 3',
    description: 'Microsoft’s free AI design application that turns text prompts into social media posts, greeting cards, stickers, and graphics.',
    fullDescription: 'Microsoft Designer is a cloud-based design app powered by OpenAI’s DALL-E 3 and Microsoft Copilot. Designed for consumers and small business owners, it allows users to create social media graphics, invitation cards, personalized stickers, and branding elements entirely for free using a Microsoft account.',
    category: 'ai-design-tools',
    categoryLabel: 'AI Design Tools',
    categories: ['ai-design-tools', 'free-ai-tools', 'ai-image-tools'],
    pricingType: 'free',
    pricingSummary: '100% Free with a Microsoft Account; includes 15 daily boosts for rapid generation.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'completely free',
        popular: true,
        features: ['15 daily generation boosts', 'DALL-E 3 image generation', 'Background removal & generative eraser', 'Social media resize and templates', 'Sticker and avatar creator']
      }
    ],
    bestFor: 'Casual creators, teachers, students, and small businesses looking for a 100% free graphic design tool.',
    keyFeatures: [
      'DALL-E 3 image generator producing high-resolution artwork from natural language',
      'One-click Remove Background and Generative Erase tools',
      'AI sticker generator producing transparent PNGs ready for messaging or printing',
      'Prompt-driven template designer adapting typography and imagery automatically'
    ],
    pros: [
      'Completely free with no credit card required',
      'Powered by DALL-E 3 without requiring a ChatGPT Plus subscription',
      'Clean, simple interface that anyone can use within minutes',
      'Automatic caption and hashtag suggestions for social media'
    ],
    cons: [
      'Less template variety compared to Canva’s massive catalog',
      'Limited advanced multi-page document layout options'
    ],
    howToUse: [
      { step: 1, title: 'Log in with Microsoft Account', description: 'Visit designer.microsoft.com and sign in for free.' },
      { step: 2, title: 'Describe Your Goal', description: 'Type "An announcement poster for a school bake sale with pastel colors".' },
      { step: 3, title: 'Customize & Export', description: 'Click any element to replace fonts, remove backgrounds, and export as PNG or MP4.' }
    ],
    alternatives: ['Canva', 'Adobe Firefly', 'Ideogram'],
    officialUrl: 'https://designer.microsoft.com',
    affiliateUrl: 'https://designer.microsoft.com',
    hasAffiliate: false,
    rating: 4.7,
    reviewsCount: 19000,
    badges: ['100% Free Tool', 'Verified Free Plan'],
    iconName: 'Palette',
    iconBg: 'bg-blue-500',
    verifiedDate: 'September 2026',
    useCases: ['Social media announcements', 'Custom digital stickers', 'Birthday & holiday cards', 'Blog post banners'],
    faqs: [
      { question: 'Is Microsoft Designer really free?', answer: 'Yes, Microsoft Designer is 100% free for anyone with a personal Microsoft Account and includes 15 daily boosts.' },
      { question: 'What AI model does Microsoft Designer use?', answer: 'Microsoft Designer is powered by OpenAI’s DALL-E 3 image generation model alongside Microsoft Copilot text systems.' }
    ]
  },
  {
    id: 'tool-gamma',
    slug: 'gamma',
    name: 'Gamma',
    tagline: 'AI presentation, document, and webpage generator built for rapid storytelling',
    description: 'Transform rough notes or prompts into beautiful, interactive presentations, pitch decks, and one-page websites in under 30 seconds.',
    fullDescription: 'Gamma reimagines presentation slides by abandoning rigid 16:9 boxes. Using flexible, fluid cards, Gamma generates complete presentation decks, client proposals, and standalone webpages from a short prompt or document outline, automatically picking imagery, formatting charts, and structuring paragraphs.',
    category: 'ai-design-tools',
    categoryLabel: 'AI Design Tools',
    categories: ['ai-design-tools', 'ai-productivity-tools', 'free-ai-tools', 'ai-tools-for-students'],
    pricingType: 'freemium',
    pricingSummary: '400 free AI credits on sign-up; Plus plan starts at $8/month billed annually ($10/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['400 AI credits on signup', 'Export to PDF and PPTX (with Gamma branding)', 'Basic analytics', '7-day version history']
      },
      {
        name: 'Plus',
        price: '$8',
        billing: 'per user / month (billed annually at $96)',
        popular: true,
        features: ['Unlimited AI text and card generations', 'Remove "Made with Gamma" watermark', 'Export to PDF & PowerPoint', 'Custom fonts']
      },
      {
        name: 'Pro',
        price: '$15',
        billing: 'per user / month (billed annually)',
        features: ['Advanced AI model access (longer inputs)', 'Custom domain publishing for websites', 'Detailed slide engagement analytics', 'Custom team themes']
      }
    ],
    bestFor: 'Entrepreneurs pitching investors, students creating class presentations, and consultants drafting deliverables.',
    keyFeatures: [
      'One-click prompt-to-presentation turning a single topic sentence into a 10-slide deck',
      'Fluid card layout letting content expand naturally without cramming text into tiny boxes',
      'Interactive embeds supporting live Figma prototypes, Airtable tables, and Loom videos',
      'Direct export to PowerPoint (.pptx) and PDF formats'
    ],
    pros: [
      'Saves hours of slide formatting and alignment compared to traditional PowerPoint',
      'Decks look modern, clean, and natively mobile-responsive',
      'Generous 400 signup credits allow you to generate multiple full decks for free',
      'Can publish presentations as interactive public web links'
    ],
    cons: [
      'Free exports carry a "Made with Gamma" badge',
      'Complex animations and slide transitions are simpler than PowerPoint'
    ],
    howToUse: [
      { step: 1, title: 'Choose Presentation, Document, or Webpage', description: 'Select your format and type your topic or paste raw notes.' },
      { step: 2, title: 'Review Generated Outline', description: 'Rearrange, add, or delete slide topics before generating the visuals.' },
      { step: 3, title: 'Pick a Visual Theme & Polish', description: 'Choose from dozen of aesthetic color palettes and export to PowerPoint.' }
    ],
    alternatives: ['Canva', 'Microsoft Designer', 'Notion AI'],
    officialUrl: 'https://gamma.app',
    affiliateUrl: 'https://gamma.app',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 23000,
    badges: ['Verified Free Plan', 'Presentation Innovator'],
    iconName: 'Layers',
    iconBg: 'bg-violet-700',
    verifiedDate: 'September 2026',
    useCases: ['Startup pitch decks', 'Classroom presentations', 'Consulting proposals', 'One-page portfolios'],
    faqs: [
      { question: 'Is Gamma free to try?', answer: 'Yes, Gamma gives new users 400 free AI credits upon sign-up, which is enough to generate several complete decks.' },
      { question: 'Can I export Gamma presentations to PowerPoint?', answer: 'Yes, Gamma supports one-click exports directly to editable PowerPoint (.pptx) and PDF formats.' }
    ]
  },
  {
    id: 'tool-napkin-ai',
    slug: 'napkin-ai',
    name: 'Napkin AI',
    tagline: 'Transform raw business text into clear diagrams, flowcharts, and infographics',
    description: 'AI visual documentation tool that reads your text and automatically generates editable flowcharts, mind maps, and diagrams.',
    fullDescription: 'Napkin AI bridges the gap between text notes and visual diagrams. By pasting articles, memos, or project briefs into Napkin, the AI scans key concepts and presents multiple diagram formats (flowcharts, Venn diagrams, timelines, comparison matrices) that can be edited and exported as vector SVGs or PNGs.',
    category: 'ai-design-tools',
    categoryLabel: 'AI Design Tools',
    categories: ['ai-design-tools', 'ai-productivity-tools', 'free-ai-tools', 'ai-business-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Starter plan is free during public rollout; Professional plans available for enterprise teams.',
    pricingPlans: [
      {
        name: 'Starter (Free)',
        price: '$0',
        billing: 'free tier',
        popular: true,
        features: ['Unlimited text-to-visual transformations', 'Export to PNG, PDF, and SVG', 'Custom color and font styling', 'Standard icon libraries']
      },
      {
        name: 'Pro',
        price: '$9',
        billing: 'per month',
        features: ['Team workspace collaboration', 'Custom brand kits and color themes', 'Unlimited document storage', 'Priority diagram generation']
      }
    ],
    bestFor: 'Product managers, technical writers, educators, and consultants communicating complex ideas visually.',
    keyFeatures: [
      'Automated text analysis recommending the optimal diagram style (timeline, process, pyramid)',
      'Vector SVG export enabling infinite scaling and editing inside Figma or Illustrator',
      'Interactive diagram customizer for tweaking labels, node connections, and colors',
      'Minimalist markdown-friendly document editor'
    ],
    pros: [
      'Instantly turns dense paragraphs into clean, readable infographics',
      'Generates vector SVGs that can be dropped straight into slide decks or websites',
      'Saves hours compared to manually building flowcharts in Lucidchart or Miro',
      'Clean, distraction-free writing environment'
    ],
    cons: [
      'Best suited for conceptual diagrams rather than complex database schemas',
      'Relies on clear structured text to produce optimal charts'
    ],
    howToUse: [
      { step: 1, title: 'Paste Your Text or Outline', description: 'Paste a paragraph or list of steps into the Napkin document.' },
      { step: 2, title: 'Click the Sparkle Icon', description: 'Click the AI icon beside any paragraph to preview generated visual diagrams.' },
      { step: 3, title: 'Export as SVG or PNG', description: 'Download the visual asset or copy it directly into your presentation or blog.' }
    ],
    alternatives: ['Canva', 'Figma', 'Gamma'],
    officialUrl: 'https://www.napkin.ai',
    affiliateUrl: 'https://www.napkin.ai',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 11000,
    badges: ['Verified Free Plan', 'Visual Storytelling'],
    iconName: 'Workflow',
    iconBg: 'bg-emerald-600',
    verifiedDate: 'September 2026',
    useCases: ['Process flowcharts', 'Timeline infographics', 'Strategy comparison matrices', 'Presentation graphics'],
    faqs: [
      { question: 'Is Napkin AI free?', answer: 'Yes, Napkin AI provides a free Starter tier allowing users to generate and export diagrams to PNG and SVG formats.' },
      { question: 'Can I export Napkin AI diagrams to Figma?', answer: 'Yes, Napkin exports scalable vector SVG files that can be pasted directly into Figma for further styling.' }
    ]
  },
  {
    id: 'tool-recraft',
    slug: 'recraft',
    name: 'Recraft',
    tagline: 'Infinite canvas generative AI for brand vector art, 3D icons, and illustrations',
    description: 'Professional AI graphic design engine specialized in generating clean vector graphics, 3D icons, and brand style systems.',
    fullDescription: 'Recraft is built specifically for graphic designers and illustrators. Unlike typical text-to-image models that output flattened pixels, Recraft generates native vector graphics (SVG), clean 3D clay icons, and corporate illustration sets while maintaining a coherent brand style across an infinite canvas.',
    category: 'ai-design-tools',
    categoryLabel: 'AI Design Tools',
    categories: ['ai-design-tools', 'ai-image-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with daily credits and public assets; Basic plan starts at $20/month ($16/mo annual).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['50 daily credits', 'Full access to vector (SVG) and raster generation', 'Public gallery publishing', 'Infinite canvas workspace']
      },
      {
        name: 'Basic',
        price: '$20',
        billing: 'per month ($16/mo billed annually)',
        popular: true,
        features: ['1,000 priority generation credits per month', 'Private generations (hidden from community)', 'Fast-track vectorizer', 'Commercial ownership']
      }
    ],
    bestFor: 'UI/UX designers, vector illustrators, app developers, and brand identity creators.',
    keyFeatures: [
      'Native Vector (SVG) generation producing clean anchor points and grouped paths',
      'Consistent Style Palette locking brand color palettes and visual aesthetics across dozens of assets',
      'Infinite Canvas layout facilitating side-by-side asset design and visual brainstorming',
      'AI Vectorizer converting low-res bitmap logos into crisp, clean vector outlines'
    ],
    pros: [
      'Generates genuine editable vector SVGs, not just flat raster images',
      'Exceptional style consistency for complete app icon sets and web illustrations',
      'Infinite canvas environment feels familiar to Figma and Illustrator users',
      'Generous 50 daily credits refreshed every day'
    ],
    cons: [
      'Free generations are added to the public community showcase',
      'Pricing on paid tier is slightly higher than consumer-level image generators'
    ],
    howToUse: [
      { step: 1, title: 'Choose Style on Canvas', description: 'Select Vector Art, 3D Clay, Line Art, or Pixel Art from the top style picker.' },
      { step: 2, title: 'Set Brand Color Palette', description: 'Define up to 6 exact brand colors to constrain the generator.' },
      { step: 3, title: 'Export Scalable SVG', description: 'Download clean vector SVGs to use directly in web code, Figma, or mobile apps.' }
    ],
    alternatives: ['Adobe Firefly', 'Figma', 'Ideogram'],
    officialUrl: 'https://www.recraft.ai',
    affiliateUrl: 'https://www.recraft.ai',
    hasAffiliate: false,
    rating: 4.9,
    reviewsCount: 16000,
    badges: ['Vector Specialist', 'Verified Free Plan'],
    iconName: 'Palette',
    iconBg: 'bg-purple-600',
    verifiedDate: 'September 2026',
    useCases: ['App store icon sets', 'Landing page vector illustrations', 'Website brand assets', 'Marketing infographics'],
    faqs: [
      { question: 'Does Recraft generate real SVG vector files?', answer: 'Yes, Recraft generates true mathematical vector paths (SVG) that you can open and edit in Figma, Adobe Illustrator, or code.' },
      { question: 'Is Recraft free to use?', answer: 'Yes, Recraft offers 50 free credits daily with full access to the infinite canvas and vector export.' }
    ]
  },
  {
    id: 'tool-figma',
    slug: 'figma',
    name: 'Figma',
    tagline: 'Collaborative product design platform supercharged with generative AI UI creation',
    description: 'The industry-standard collaborative interface design tool, now featuring AI for generating UI layouts, rewriting copy, and finding components.',
    fullDescription: 'Figma is the benchmark tool for digital product design. With integrated Figma AI features, product designers can generate responsive UI wireframes from text prompts, rename layers automatically, replace placeholder text with realistic data, and search the entire team design system using visual similarity.',
    category: 'ai-design-tools',
    categoryLabel: 'AI Design Tools',
    categories: ['ai-design-tools', 'ai-productivity-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Starter plan is free forever (3 Figma files, unlimited FigJam); Professional is $12/editor/month billed annually ($15/mo monthly).',
    pricingPlans: [
      {
        name: 'Starter',
        price: '$0',
        billing: 'forever free',
        features: ['3 collaborative Figma files', 'Unlimited personal drafts', 'Unlimited FigJam whiteboards', 'Basic community AI plugins']
      },
      {
        name: 'Professional',
        price: '$12',
        billing: 'per editor / month (annual) or $15 monthly',
        popular: true,
        features: ['Unlimited Figma design files', 'Team design systems & shared component libraries', 'Advanced prototyping and variables', 'Figma AI features']
      },
      {
        name: 'Organization',
        price: '$45',
        billing: 'per editor / month (billed annually)',
        features: ['Org-wide design systems', 'Centralized analytics & admin controls', 'Branching and merge workflows', 'SSO & enterprise security']
      }
    ],
    bestFor: 'UI/UX designers, front-end developers, product managers, and software teams collaborating on digital products.',
    keyFeatures: [
      'First Draft generative UI creating editable multi-screen mobile or web layouts from prompts',
      'Visual Search locating design system components by dragging an image onto the canvas',
      'Automated layer renaming organizing chaotic component trees with one click',
      'Context-aware text replacement filling mockup screens with realistic localized content'
    ],
    pros: [
      'Unchallenged industry standard for web and mobile interface design',
      'Generative AI outputs fully editable Auto Layout frames, not flat screenshots',
      'Real-time multi-player collaboration works smoothly in any browser',
      'Massive community plugin ecosystem with thousands of AI helpers'
    ],
    cons: [
      'Has a steep learning curve for non-designers compared to drag-and-drop tools like Canva',
      'Figma AI features are rolling out progressively with usage limits'
    ],
    howToUse: [
      { step: 1, title: 'Open First Draft in Figma', description: 'Click the AI action bar and type "A mobile food delivery checkout screen".' },
      { step: 2, title: 'Inspect Auto Layout Components', description: 'Modify the generated buttons, text fields, and icons using your design system.' },
      { step: 3, title: 'Prototype & Share Code', description: 'Add interactive transitions and switch to Dev Mode for CSS/React code inspection.' }
    ],
    alternatives: ['Canva', 'Recraft', 'Microsoft Designer'],
    officialUrl: 'https://www.figma.com',
    affiliateUrl: 'https://www.figma.com',
    hasAffiliate: false,
    rating: 4.9,
    reviewsCount: 72000,
    badges: ['Industry Standard', 'Verified Free Plan'],
    iconName: 'Workflow',
    iconBg: 'bg-black',
    verifiedDate: 'September 2026',
    useCases: ['Mobile app interface design', 'Responsive web wireframing', 'Interactive prototypes', 'Design systems'],
    faqs: [
      { question: 'Is Figma free?', answer: 'Yes, Figma has a free Starter plan with 3 collaborative files and unlimited personal drafts that students and freelancers use worldwide.' },
      { question: 'What does Figma AI do?', answer: 'Figma AI can generate editable mobile and web screen layouts, rename layers automatically, generate realistic mockup text, and remove image backgrounds.' }
    ]
  }
];
