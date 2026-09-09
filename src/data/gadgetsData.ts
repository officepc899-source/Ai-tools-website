export type GadgetCategory = 'ai-gadgets' | 'office-setup' | 'creator-gear' | 'smart-home';

export interface AIGadget {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: GadgetCategory;
  categoryLabel: string;
  rating: number;
  reviewsCount: number;
  price: string;
  numericPrice: number;
  originalPrice?: string;
  discountPercentage?: string;
  savingsAmount?: string;
  shortReview: string;
  fullReview: string;
  verdict: string;
  imageUrl: string;
  galleryImages: string[];
  badge?: 'Best Seller' | "Editor's Choice" | 'Trending' | 'Price Drop' | 'Staff Pick';
  affiliateUrl: string;
  merchant: 'Amazon' | 'Official Store' | 'Best Buy' | 'B&H Photo';
  pros: string[];
  cons: string[];
  specs: {
    connectivity: string;
    batteryLife: string;
    aiChipset: string;
    compatibility: string;
    weight?: string;
    dimensions?: string;
    sensors?: string;
    warranty?: string;
  };
  features: string[];
  inTheBox: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const GADGET_CATEGORIES: { id: GadgetCategory | 'all'; label: string; description: string }[] = [
  {
    id: 'all',
    label: 'All Categories',
    description: 'Browse the entire curated collection of verified AI gadgets and smart hardware deals.'
  },
  {
    id: 'ai-gadgets',
    label: 'AI Gadgets',
    description: 'Next-generation multimodal smart wearables, autonomous pocket companions, and intelligent desktop robots.'
  },
  {
    id: 'office-setup',
    label: 'Office Setup',
    description: 'AI meeting recorders, smart monitor lightbars, intelligent ergonomic desks, and productivity peripherals.'
  },
  {
    id: 'creator-gear',
    label: 'Creator Gear',
    description: 'AI-tracked 4K PTZ webcams, noise-cancelling wireless microphones, and automated studio production consoles.'
  },
  {
    id: 'smart-home',
    label: 'Smart Home',
    description: 'Intelligent obstacle-avoidance robot vacuums, AI facial-recognition doorbells, and adaptive climate systems.'
  }
];

export const AI_GADGETS_DATA: AIGadget[] = [
  // -------------------------------------------------------------
  // 1. AI GADGETS
  // -------------------------------------------------------------
  {
    id: 'gadget-rayban-meta',
    slug: 'ray-ban-meta-smart-glasses',
    name: 'Ray-Ban Meta Smart Glasses (Gen 2)',
    brand: 'Meta x Ray-Ban',
    category: 'ai-gadgets',
    categoryLabel: 'AI Smart Glasses',
    rating: 4.9,
    reviewsCount: 4120,
    price: '$299.00',
    numericPrice: 299,
    originalPrice: '$329.00',
    discountPercentage: '9% OFF',
    savingsAmount: 'Save $30',
    shortReview: 'The pinnacle of multimodal AI wearables. Real-time visual object recognition, conversational voice assistant, and ultra-crisp 1080p POV video recording in classic Wayfarer frames.',
    fullReview: 'The Ray-Ban Meta Gen 2 glasses bridge high fashion and frontier multimodal AI effortlessly. Equipped with Meta AI with Vision, you can glance at landmark monuments, restaurant menus, or foreign signage and receive immediate spoken translations or context. The directional open-ear audio drivers deliver punchy acoustic fidelity for podcasts and phone calls without alienating you from ambient environmental cues.',
    verdict: 'If you want everyday AI that feels natural and looks like timeless eyewear rather than an awkward prototype, the Ray-Ban Meta Gen 2 is the clear gold standard.',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: "Editor's Choice",
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Multimodal Meta AI identifies objects, translates text, and explains surroundings in real-time',
      'Discreet high-fidelity open-ear audio delivers rich podcasts, music, and phone calls',
      'Classic Wayfarer aesthetic with lightweight ergonomic all-day comfort',
      'Ultra-stable 12MP ultra-wide camera capturing 1080p 60fps hands-free video clips'
    ],
    cons: [
      'Continuous mixed active battery life is around 4 hours (charging case provides 32h)',
      'Water resistant rating of IPX4 (sweat and light splash, not for swimming)'
    ],
    specs: {
      connectivity: 'Wi-Fi 6, Bluetooth 5.3',
      batteryLife: 'Up to 4 hours per charge (36 hours total with charging case)',
      aiChipset: 'Qualcomm Snapdragon AR1 Gen 1 platform',
      compatibility: 'iOS 14.4+ and Android 10+ via Meta View app',
      weight: '48.6 grams (Wayfarer Standard)',
      dimensions: '50-22-150 mm frame measurements',
      sensors: '5-microphone array, 12MP camera, capacitive touch touchpad',
      warranty: '1-Year Limited Manufacturer Warranty'
    },
    features: [
      'Multimodal Meta AI assistant with conversational voice prompts',
      '5-mic beamforming array with noise suppression for crisp call quality',
      'Hands-free POV video capture for creators, athletes, and travelers',
      'UV400 protective polarized and transitions lens options available'
    ],
    inTheBox: [
      'Ray-Ban Meta Smart Glasses',
      'Leatherette Portable Charging Case with USB-C',
      'Microfiber Cleaning Cloth',
      'Safety and Warranty Documentation'
    ],
    faqs: [
      {
        question: 'Do Ray-Ban Meta glasses require a monthly subscription?',
        answer: 'No. All Meta AI voice features, video captures, and phone integration features are completely free with no recurring subscription.'
      },
      {
        question: 'How do other people know when the camera is recording?',
        answer: 'A bright, hard-wired outward-facing LED indicator illuminates whenever photos or videos are captured. If the LED is obstructed, the camera refuses to record for privacy compliance.'
      },
      {
        question: 'Can I put prescription lenses in these frames?',
        answer: 'Yes. Most optical retailers and LensCrafters can fit prescription lenses directly into Ray-Ban Meta frames.'
      }
    ]
  },
  {
    id: 'gadget-rabbit-r1',
    slug: 'rabbit-r1-ai-pocket-companion',
    name: 'Rabbit R1 Autonomous Pocket Companion',
    brand: 'Rabbit Inc.',
    category: 'ai-gadgets',
    categoryLabel: 'AI Pocket Device',
    rating: 4.3,
    reviewsCount: 1560,
    price: '$199.00',
    numericPrice: 199,
    originalPrice: '$229.00',
    discountPercentage: '13% OFF',
    savingsAmount: 'Save $30',
    shortReview: 'Teenage Engineering industrial design meets Large Action Model (LAM) architecture to trigger web apps, book rides, and automate digital errands hands-free.',
    fullReview: 'Designed in Stockholm by Teenage Engineering, the Rabbit R1 operates via rabbit OS. Rather than trapping users in app icon silos, its Large Action Model carries out web tasks, music cues, travel bookings, and computer-vision inquiries using a rotating 360-degree camera eye and dedicated push-to-talk button.',
    verdict: 'A playful, uniquely designed pocket companion for early tech adopters who want screen-minimal computing without smartphone distraction.',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Trending',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Distinctive iconic Teenage Engineering hardware finished in radiant luminous orange',
      'Push-to-talk friction-free AI interaction with zero intrusive ads or notification bloat',
      'Rotating 360-degree computer-vision camera for real-world scene analysis',
      'No mandatory monthly subscription fees to access rabbit OS services'
    ],
    cons: [
      'Relies heavily on cellular or Wi-Fi connectivity for server-side LAM tasks',
      'Compact 2.88-inch touchscreen is intentionally limited to quick confirmations'
    ],
    specs: {
      connectivity: 'Global 4G LTE SIM slot, Wi-Fi 802.11ac, Bluetooth 5.0',
      batteryLife: 'All-day standby (approx. 5-7 hours continuous screen time)',
      aiChipset: 'MediaTek Helio P35 Octa-Core 2.3GHz',
      compatibility: 'Independent OS with cloud web portal (rabbithole)',
      weight: '115 grams',
      dimensions: '78 x 78 x 13 mm',
      sensors: '360° rotational camera eye, analog scroll wheel, dual microphones',
      warranty: '1-Year Limited Manufacturer Warranty'
    },
    features: [
      'Perceptive 360° rotational camera (rabbit eye) for document and scene inspection',
      'Tactile analog scroll-wheel navigation with instant push-to-talk trigger',
      'LAM actions supporting Spotify, Uber, Midjourney, and flight searches',
      'Ultra-compact 115g pocket footprint that slips into any coin pocket'
    ],
    inTheBox: [
      'Rabbit R1 Device',
      'USB-C Braided Charging Cable',
      'SIM Ejector Pin',
      'Quick Start Guide'
    ],
    faqs: [
      {
        question: 'Does Rabbit R1 require a cellular SIM card?',
        answer: 'You can use it completely over home Wi-Fi or phone hotspot. A 4G LTE SIM is only required for independent mobile connectivity without Wi-Fi.'
      },
      {
        question: 'Are there hidden monthly subscription charges?',
        answer: 'No. The Rabbit R1 purchase grants lifetime access to standard rabbit OS actions and cloud AI services.'
      }
    ]
  },
  {
    id: 'gadget-humane-ai-pin',
    slug: 'humane-ai-pin-wearable',
    name: 'Humane AI Pin Clip & Laser Projection System',
    brand: 'Humane',
    category: 'ai-gadgets',
    categoryLabel: 'Wearable Projector',
    rating: 4.1,
    reviewsCount: 980,
    price: '$499.00',
    numericPrice: 499,
    originalPrice: '$699.00',
    discountPercentage: '$200 OFF',
    savingsAmount: 'Save $200',
    shortReview: 'Screenless magnetic lapel pin featuring laser ink palm display, ambient camera, and conversational AI assistance powered by GPT-4o.',
    fullReview: 'The Humane AI Pin clips magnetically to your lapel or jacket, projecting an interactive monochrome green laser display directly onto the palm of your hand. Its CosmOS platform provides ambient voice search, nutritional scanning via the camera sensor, and real-time bidirectional language translation.',
    verdict: 'A glimpse into ambient post-smartphone computing, best suited for technology enthusiasts who want hands-free conversational AI.',
    imageUrl: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Price Drop',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Official Store',
    pros: [
      'Futuristic laser ink projection projects directly onto your open palm',
      'Magnetic hot-swappable battery booster packs enable continuous use',
      'Instant live translation in 50+ international languages',
      'Crafted from aerospace-grade aluminum and Corning Gorilla Glass'
    ],
    cons: [
      'Laser palm interface has reduced contrast under direct blinding sunlight',
      'Requires cellular subscription plan for autonomous cloud operation'
    ],
    specs: {
      connectivity: 'Dedicated LTE (T-Mobile network), Wi-Fi 5, Bluetooth 5.1',
      batteryLife: 'Dual battery system with perpetual magnetic hot-swap',
      aiChipset: 'Qualcomm Snapdragon Octa-Core with dedicated NPU',
      compatibility: 'Independent platform synced to Humane.center web portal',
      weight: '34g (Pin) + 20g (Battery Booster)',
      dimensions: '47.5 x 44.5 x 14.9 mm',
      sensors: 'Laser beam projection, ultra-wide RGB camera, depth sensor, ToF sensor',
      warranty: '1-Year Limited Manufacturer Warranty'
    },
    features: [
      'Laser Ink Display 720p optical projection system',
      'Trust Light LED privacy indicator for video/photo capture',
      'Vision food scanner with instant caloric breakdown',
      'Ultra-wide RGB camera with depth sensor'
    ],
    inTheBox: [
      'Humane AI Pin',
      'Charge Case & Charge Pad',
      'Two Battery Boosters',
      'Cable & Power Adapter'
    ],
    faqs: [
      {
        question: 'Does the Humane AI Pin have a physical screen?',
        answer: 'No. It is completely screenless. Visual feedback is projected onto your hand using safe class-2 laser beam scanning.'
      }
    ]
  },
  {
    id: 'gadget-emo-pet-robot',
    slug: 'emo-ai-desktop-pet-robot',
    name: 'EMO AI Desktop Companion & Robot Pet',
    brand: 'LivingAI',
    category: 'ai-gadgets',
    categoryLabel: 'AI Desktop Robot',
    rating: 4.8,
    reviewsCount: 2640,
    price: '$279.00',
    numericPrice: 279,
    originalPrice: '$299.00',
    discountPercentage: '$20 OFF',
    savingsAmount: 'Save $20',
    shortReview: 'Autonomous personality-rich AI desktop robot with optical face recognition, edge-detecting movement, interactive games, and daily routine assistance.',
    fullReview: 'EMO is an autonomous desktop pet robot with genuine curiosity. Equipped with a wide-angle camera with face recognition, a 4-microphone array, and neural network algorithms, EMO tracks your movements, plays mini-games, sets timers, dances to your music, and navigates your desk safely without falling off edges.',
    verdict: 'The most expressive, entertaining AI desk pet ever created, bringing warmth and interactive intelligence to any workstation.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Best Seller',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Over 1,000 expressive facial animations and lifelike physical motions',
      'Drop-off edge detection sensors prevent falling off desks or tables',
      'Wireless charging skateboard dock included in the box',
      'Regular free OTA firmware updates introducing new games and AI skills'
    ],
    cons: [
      'Requires stable 2.4GHz Wi-Fi network for voice command execution',
      'Best suited for flat desk surfaces rather than thick carpets'
    ],
    specs: {
      connectivity: 'Wi-Fi 802.11 b/g/n, Bluetooth 5.0',
      batteryLife: 'Approx. 2.5-3 hours off the skateboard charger',
      aiChipset: 'Quad-Core AI Processor with Neural Engine',
      compatibility: 'iOS & Android app management',
      weight: '248 grams',
      dimensions: '95 x 67 x 117 mm',
      sensors: 'Wide-angle optical camera, 4-mic array, drop sensors, optical touch sensor',
      warranty: '1-Year Limited Manufacturer Warranty'
    },
    features: [
      'Optical facial recognition remembering up to 10 distinct individuals',
      'Smart desk light accessory synced with voice controls',
      'Customizable alarm clocks with gentle morning greetings',
      'Interactive games (Rock-Paper-Scissors, Dance Battle, Quiz)'
    ],
    inTheBox: [
      'EMO AI Robot',
      'Skateboard Wireless Charging Pad',
      'Smart Light Accessory',
      'USB-C Power Cable & Adapter'
    ],
    faqs: [
      {
        question: 'Can EMO fall off my desk?',
        answer: 'EMO is equipped with bottom-mounted edge-detection optical sensors that prevent it from stepping off desks or table boundaries.'
      }
    ]
  },

  // -------------------------------------------------------------
  // 2. OFFICE SETUP
  // -------------------------------------------------------------
  {
    id: 'gadget-plaud-note-ai',
    slug: 'plaud-note-ai-voice-recorder',
    name: 'PLAUD NOTE AI ChatGPT-Powered Voice Recorder',
    brand: 'PLAUD.AI',
    category: 'office-setup',
    categoryLabel: 'AI Meeting Recorder',
    rating: 4.9,
    reviewsCount: 5410,
    price: '$159.00',
    numericPrice: 159,
    originalPrice: '$179.00',
    discountPercentage: '11% OFF',
    savingsAmount: 'Save $20',
    shortReview: 'Ultra-thin MagSafe voice recorder that snaps behind your iPhone or laptop to transcribe, summarize, and map phone calls and conference meetings with GPT-4o.',
    fullReview: 'PLAUD NOTE is a breakthrough for executives, journalists, lawyers, and students. Measuring just 0.12 inches thin, it adheres magnetically to your phone case. Its dual-pickup system captures both ambient conference rooms and hardware vibration from internal phone calls, generating instant mind maps and action items.',
    verdict: 'The highest-utility office productivity gadget on the market. Turns hours of recorded meetings into crystal-clear structured summaries in seconds.',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Best Seller',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Snap-on MagSafe ultra-slim aluminum card format (0.12 in thin)',
      'Dual recording modes: airborne microphone + call vibration sensor',
      'Automated transcriptions, meeting summaries, and mind maps via GPT-4o',
      'Massive 30-hour continuous recording & 64GB onboard memory'
    ],
    cons: [
      'Included starter plan provides 300 free transcription minutes/mo',
      'App sync requires Bluetooth handshake'
    ],
    specs: {
      connectivity: 'Bluetooth 5.0, USB-C Magnetic Dock',
      batteryLife: '30 hours continuous recording (60 days standby)',
      aiChipset: 'Dual Knowles MEMS & Vibration Pickup',
      compatibility: 'iOS & Android via PLAUD Companion App',
      weight: '30 grams',
      dimensions: '85.6 x 54.1 x 2.97 mm',
      sensors: 'Air conduction mic + bone conduction phone sensor',
      warranty: '1-Year Limited Manufacturer Warranty'
    },
    features: [
      'Whisper AI speech-to-text with 57 language support',
      'One-touch sliding switch for instant covert activation',
      'Automated speaker separation and diary timestamping',
      'Secure encrypted local storage with AES-256'
    ],
    inTheBox: [
      'PLAUD NOTE Voice Recorder',
      'MagSafe Black Leather Case',
      'Magnetic Ring Adapter for non-MagSafe phones',
      'USB-C Magnetic Charging Cable'
    ],
    faqs: [
      {
        question: 'Does it record WhatsApp and Zoom calls?',
        answer: 'Yes! When set to Call Recording mode, the hardware vibration sensor picks up the audio directly through the phone chassis without needing app permissions.'
      }
    ]
  },
  {
    id: 'gadget-benq-screenbar-halo',
    slug: 'benq-screenbar-halo-ai-lightbar',
    name: 'BenQ ScreenBar Halo AI Auto-Dimming Lightbar',
    brand: 'BenQ',
    category: 'office-setup',
    categoryLabel: 'Smart Monitor Light',
    rating: 4.8,
    reviewsCount: 3180,
    price: '$179.00',
    numericPrice: 179,
    originalPrice: '$199.00',
    discountPercentage: '10% OFF',
    savingsAmount: 'Save $20',
    shortReview: 'Intelligent monitor lightbar with ambient light sensing, back-glow halo illumination, and zero screen-glare optical architecture.',
    fullReview: 'The BenQ ScreenBar Halo is engineered to eliminate eye strain during long desk sessions. Its smart sensor measures workstation illumination in real-time and dynamically auto-dims to maintain the optimal 500 lux desk standard. A rear ambient halo light balances high-contrast monitor glare.',
    verdict: 'An indispensable upgrade for developers and office professionals who spend 8+ hours daily facing monitors.',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: "Editor's Choice",
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Zero screen reflection with asymmetrical optical design',
      'Real-time ambient light sensor auto-adjusts to optimal 500 lux',
      'Wireless tactile rotary controller with fine temperature tuning',
      'Rear back-light halo reduces dark-room ocular fatigue'
    ],
    cons: [
      'Rotary controller runs on AAA batteries',
      'Slightly higher price than basic manual lightbars'
    ],
    specs: {
      connectivity: 'Wireless 2.4GHz Rotary Dial, USB-A Powered',
      batteryLife: 'Direct USB-powered (5V/1.3A)',
      aiChipset: 'Smart Photodiode Ambient Sensor',
      compatibility: 'Fits flat and curved monitors (1000R-1800R)',
      weight: '800 grams',
      dimensions: '500 x 95 x 97 mm',
      sensors: 'Ambient light sensor, touch controls',
      warranty: '1-Year Limited Manufacturer Warranty'
    },
    features: [
      'Asymmetrical optical engineering preventing monitor glare',
      'Stepless color temperature adjustments from 2700K to 6500K',
      'Patented counterweight clamp fitting curved monitors seamlessly',
      'High color rendering index (Ra > 95)'
    ],
    inTheBox: [
      'BenQ ScreenBar Halo Light',
      'Wireless Desktop Controller',
      'Curved Monitor Accessory Pad',
      'AAA Batteries for Controller'
    ],
    faqs: [
      {
        question: 'Will this light damage or scratch my webcam?',
        answer: 'The ScreenBar Halo includes a dedicated webcam accessory mount that allows webcams to sit directly above the light without obstruction.'
      }
    ]
  },
  {
    id: 'gadget-logitech-mx-master-3s',
    slug: 'logitech-mx-master-3s-smart-mouse',
    name: 'Logitech MX Master 3S + Smart AI Actions Mouse',
    brand: 'Logitech',
    category: 'office-setup',
    categoryLabel: 'Ergonomic AI Mouse',
    rating: 4.9,
    reviewsCount: 12400,
    price: '$99.99',
    numericPrice: 99.99,
    originalPrice: '$119.99',
    discountPercentage: '17% OFF',
    savingsAmount: 'Save $20',
    shortReview: 'Ergonomic flagship mouse with whisper-quiet clicks, 8K DPI glass sensor, and Logi AI Prompt Builder integration for instantaneous text rewriting and summarizing.',
    fullReview: 'The Logitech MX Master 3S combines class-leading ergonomics with modern productivity intelligence. Its MagSpeed electromagnetic scroll wheel blazes through 1,000 lines per second. With Logi Options+ and AI Prompt Builder, you can highlight text anywhere on your screen, press one thumb button, and trigger customized AI prompts.',
    verdict: 'The undisputed king of productivity mice, made even better with native hardware-level AI shortcuts.',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Best Seller',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'MagSpeed electromagnetic scroll wheel scrolls 1,000 lines per second',
      'Quiet Click acoustic dampening eliminates 90% of click noise',
      '8,000 DPI Darkfield optical sensor tracks flawlessly even on glass',
      'One-click hardware trigger for Logi AI Prompt Builder'
    ],
    cons: [
      'Right-handed ergonomic orientation only',
      'Requires Logi Options+ software installation for custom AI actions'
    ],
    specs: {
      connectivity: 'Bluetooth Low Energy, Logi Bolt USB Receiver',
      batteryLife: 'Up to 70 days on a single full USB-C charge',
      aiChipset: 'Logi AI Prompt Engine Integration',
      compatibility: 'macOS, Windows, Linux, iPadOS, ChromeOS',
      weight: '141 grams',
      dimensions: '124.9 x 84.3 x 51 mm',
      sensors: 'Darkfield high precision sensor (200-8000 DPI)',
      warranty: '1-Year Limited Hardware Warranty'
    },
    features: [
      'Any-surface 8K DPI tracking including clear glass desks',
      'Cross-computer Flow control for moving files between Mac and PC',
      'USB-C quick charge gives 3 hours of battery in 1 minute',
      'Customizable thumb wheel for horizontal timeline scrubbing'
    ],
    inTheBox: [
      'Logitech MX Master 3S Mouse',
      'Logi Bolt USB Receiver',
      'USB-C Charging Cable (USB-A to USB-C)',
      'User Documentation'
    ],
    faqs: [
      {
        question: 'Does the AI Prompt Builder work with ChatGPT?',
        answer: 'Yes. Logi Options+ connects to OpenAI to offer one-click summaries, rewrites, and custom prompts without switching windows.'
      }
    ]
  },
  {
    id: 'gadget-autonomous-smartdesk',
    slug: 'autonomous-smartdesk-pro-ai-workstation',
    name: 'Autonomous SmartDesk Pro AI Sit-Stand Workstation',
    brand: 'Autonomous',
    category: 'office-setup',
    categoryLabel: 'Smart Standing Desk',
    rating: 4.7,
    reviewsCount: 1840,
    price: '$599.00',
    numericPrice: 599,
    originalPrice: '$699.00',
    discountPercentage: '$100 OFF',
    savingsAmount: 'Save $100',
    shortReview: 'Heavy-duty dual-motor electric standing desk with AI posture coaching, automated sit-stand intervals, and programmable memory presets.',
    fullReview: 'The Autonomous SmartDesk Pro provides an ergonomic foundation for high-performance home offices. Featuring dual electric motors capable of lifting 310 lbs smoothly at less than 45 decibels, its intelligent controller syncs with companion productivity apps to suggest optimal sit-stand posture intervals throughout your working day.',
    verdict: 'A rock-solid commercial-grade sit-stand desk that keeps you active and focused through intelligent ergonomics.',
    imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Staff Pick',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Official Store',
    pros: [
      'Dual electric heavy-duty steel frame motors with 310 lbs capacity',
      'AI posture coaching reminders to switch between sitting and standing',
      'Whisper-quiet motor operation below 45 dB with anti-collision protection',
      'Solid warp-proof natural bamboo or matte laminate desktop options'
    ],
    cons: [
      'Assembly requires approximately 45-60 minutes',
      'Heavy dual-box shipment'
    ],
    specs: {
      connectivity: 'Bluetooth Smart Controller & Memory Keypad',
      batteryLife: 'Direct AC Wall Powered',
      aiChipset: 'Smart Anti-Collision Dual Motor Controller',
      compatibility: 'Autonomous Ergo App (iOS & Android)',
      weight: '45 kg',
      dimensions: '53" x 29" (Regular) or 70.5" x 30" (XL)',
      sensors: 'Gyro anti-collision obstacle sensor',
      warranty: '7-Year Frame & Motor Warranty'
    },
    features: [
      'Height range from 26.2 inches to 52 inches',
      'Programmable 4-preset digital memory control pad',
      'Commercial grade solid SPCC steel frame construction',
      'Integrated cable management trays and grommets'
    ],
    inTheBox: [
      'Dual Motor Steel Frame',
      'Solid Desk Top Surface',
      'Programmable Handset Controller',
      'Cable Management Organizers & Hardware Kit'
    ],
    faqs: [
      {
        question: 'What happens if the desk hits a chair or drawer while lowering?',
        answer: 'The desk features an active gyro anti-collision sensor that automatically reverses direction if it detects any resistance.'
      }
    ]
  },

  // -------------------------------------------------------------
  // 3. CREATOR GEAR
  // -------------------------------------------------------------
  {
    id: 'gadget-insta360-link-2',
    slug: 'insta360-link-2-ai-4k-webcam',
    name: 'Insta360 Link 2 AI 4K PTZ Webcam',
    brand: 'Insta360',
    category: 'creator-gear',
    categoryLabel: 'AI 4K PTZ Webcam',
    rating: 4.9,
    reviewsCount: 2190,
    price: '$199.99',
    numericPrice: 199.99,
    originalPrice: '$229.99',
    discountPercentage: '13% OFF',
    savingsAmount: 'Save $30',
    shortReview: 'Pro-grade 1/2-inch sensor 4K webcam with 2-axis motorized gimbal, automated AI subject tracking, gesture controls, and whiteboard enhancements.',
    fullReview: 'The Insta360 Link 2 transforms remote meetings, presentations, and live streaming. Its mechanical 2-axis gimbal tracks you fluidly as you pace around your office or presentation stage. Intuitive hand gestures trigger zoom or Whiteboard mode, while AI noise cancellation silences keyboard clatter and ambient room echoes.',
    verdict: 'The most capable, cinematic webcam ever built. Delivers true studio-grade framing without requiring a cameraman.',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: "Editor's Choice",
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Silky motorized 2-axis mechanical gimbal with true AI auto-tracking',
      'Large 1/2-inch sensor delivering astonishing low-light clarity in 4K',
      'Natural hand-gesture controls for zooming and whiteboard focus',
      'Automatic privacy mode tilts lens down when disconnected'
    ],
    cons: [
      'Gimbal mechanism is slightly heavier than ultra-compact travel cams',
      'Desktop companion software unlocks the most advanced features'
    ],
    specs: {
      connectivity: 'USB-C 2.0 (High Speed)',
      batteryLife: 'Direct USB-C bus powered',
      aiChipset: 'Proprietary Neural Vision Tracking Core',
      compatibility: 'macOS 10.13+ & Windows 10/11 (Zoom, Teams, Meet)',
      weight: '102 grams',
      dimensions: '60.1 x 38.3 x 38.3 mm',
      sensors: '1/2" CMOS image sensor, dual beamforming mics',
      warranty: '1-Year Limited Manufacturer Warranty'
    },
    features: [
      'True 4K UHD at 30fps with Phase Detection Auto Focus (PDAF)',
      'DeskView Mode tilts down automatically to showcase sketches',
      'AI Smart Noise-Cancelling dual microphone array',
      'HDR support for high-contrast backlit window setups'
    ],
    inTheBox: [
      'Insta360 Link 2 Camera',
      'Magnetic Monitor Mount',
      'USB-C to USB-C Cable',
      'USB-C to USB-A Adapter',
      '4x Recognition Markers'
    ],
    faqs: [
      {
        question: 'Does the AI tracking work when I walk across the room?',
        answer: 'Yes! The 2-axis motorized gimbal pans up to 150 degrees and tilts up to 110 degrees to keep you centered in the frame automatically.'
      }
    ]
  },
  {
    id: 'gadget-hollyland-lark-m2',
    slug: 'hollyland-lark-m2-ai-wireless-mic',
    name: 'Hollyland Lark M2 AI Noise-Cancelling Wireless Microphone',
    brand: 'Hollyland',
    category: 'creator-gear',
    categoryLabel: 'AI Wireless Mic',
    rating: 4.8,
    reviewsCount: 3420,
    price: '$139.00',
    numericPrice: 139,
    originalPrice: '$159.00',
    discountPercentage: '13% OFF',
    savingsAmount: 'Save $20',
    shortReview: 'Button-sized 9-gram wireless lavalier microphone with Environmental Noise Cancellation (ENC), Hi-Fi 48kHz/24-bit audio, and 40-hour battery life.',
    fullReview: 'The Hollyland Lark M2 is the creator microphone perfected. Weighing a mere 9 grams, it clips discreetly to your shirt without sagging. Its on-device AI Environmental Noise Cancellation algorithm suppresses street traffic, coffee shop chatter, and air conditioners while preserving vocal richness and natural warmth.',
    verdict: 'The ultimate wireless microphone for mobile content creators, YouTubers, and podcasters who want plug-and-play pristine audio.',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Best Seller',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Featherweight 9-gram coin transmitter that will not sag shirts',
      'AI Environmental Noise Cancellation (ENC) wipes out ambient background chaos',
      'High-fidelity 48kHz/24-bit lossless audio recording with 70dB SNR',
      'Massive 40-hour total battery life with portable magnetic charging case'
    ],
    cons: [
      'Small button transmitters can be easy to misplace if not stored in the case',
      'No internal onboard transmitter backup recording'
    ],
    specs: {
      connectivity: '2.4GHz Digital Wireless, USB-C, Lightning, 3.5mm TRS',
      batteryLife: '10 hours per transmitter (40 hours with charging case)',
      aiChipset: 'Hollyland AI ENC Acoustic DSP',
      compatibility: 'iPhones, Android phones, DSLR/Mirrorless cameras, PCs',
      weight: '9 grams per transmitter',
      dimensions: '26 mm diameter x 9.9 mm thickness',
      sensors: 'Omnidirectional high-sensitivity condenser capsule',
      warranty: '1-Year Limited Warranty'
    },
    features: [
      'Up to 1,000 ft (300m) line-of-sight wireless transmission range',
      'Magnetic attachment, clip-on, and necklace pendant wear options',
      'LarkSound app for real-time gain control and ENC strength presets',
      'Direct plug-and-play phone connection with no cable adapters required'
    ],
    inTheBox: [
      '2x Lark M2 Transmitters',
      'Camera Receiver & Mobile Receivers',
      'Charging Case',
      'Magnetic Clips & Silicone Necklaces',
      'Windscreen Furry Deadcats & Cables'
    ],
    faqs: [
      {
        question: 'Can I connect this directly to my iPhone 15 or 16 without dongles?',
        answer: 'Yes! The Combo kit includes a USB-C receiver that plugs directly into iPhone 15/16 and modern Android devices.'
      }
    ]
  },
  {
    id: 'gadget-obsbot-tail-air',
    slug: 'obsbot-tail-air-4k-ai-ndi-camera',
    name: 'OBSBOT Tail Air 4K AI Auto-Tracking PTZ Camera',
    brand: 'OBSBOT',
    category: 'creator-gear',
    categoryLabel: 'AI Streaming PTZ Camera',
    rating: 4.8,
    reviewsCount: 1450,
    price: '$499.00',
    numericPrice: 499,
    originalPrice: '$549.00',
    discountPercentage: '9% OFF',
    savingsAmount: 'Save $50',
    shortReview: 'Autonomous 4K PTZ production camera with AI Director Grids, human and animal auto-tracking, NDI|HX3 broadcast support, and micro-HDMI output.',
    fullReview: 'The OBSBOT Tail Air is a full studio multi-camera production setup in a single compact device. Its cutting-edge AI tracks humans, pets, and objects across complex stages. With NDI|HX3 streaming and micro-HDMI, creators can broadcast multicam shows directly into OBS Studio, vMix, or YouTube Live with zero latency.',
    verdict: 'A cinematic robotic camera that replaces an entire multi-person studio crew for solo content creators.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Trending',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'B&H Photo',
    pros: [
      'AI Director Grids automatically generate wide, medium, and close-up angles from one 4K feed',
      'NDI|HX3 low-latency broadcast protocol integration',
      'Full 2-axis mechanical PTZ pan-tilt tracking at up to 120°/s',
      'Micro-HDMI and USB-C dual video output options'
    ],
    cons: [
      'NDI license key sold as an optional add-on for broadcast suites',
      'Battery life averages 2.5 hours on continuous wireless PTZ'
    ],
    specs: {
      connectivity: 'Wi-Fi, Bluetooth 5.0, Micro-HDMI, USB-C, NDI|HX3',
      batteryLife: 'Built-in 1500mAh battery (approx. 154 minutes operation)',
      aiChipset: 'AI Tracking Neural Processing Unit',
      compatibility: 'OBS Studio, vMix, Zoom, YouTube, Twitch',
      weight: '344 grams',
      dimensions: '69.65 x 73.25 x 132.5 mm',
      sensors: '1/1.8" CMOS sensor, 8-element prime lens',
      warranty: '1-Year Manufacturer Warranty'
    },
    features: [
      'True 4K at 30fps and 1080p at 60fps video capture',
      'AI Human, Animal, and Object target locking algorithms',
      'Gesture control triggers tracking and zoom from up to 20 feet away',
      'Obsbot Start App enables seamless multi-camera switching'
    ],
    inTheBox: [
      'OBSBOT Tail Air Camera',
      'USB-C Cable & USB-C to USB-A Adapter',
      'Storage Case',
      'Quick Start Documentation'
    ],
    faqs: [
      {
        question: 'Can this camera track multiple people simultaneously?',
        answer: 'You can select individual targets or enable group framing mode where the AI dynamically expands the crop to fit everyone on stage.'
      }
    ]
  },
  {
    id: 'gadget-loupedeck-live-s',
    slug: 'loupedeck-live-s-streaming-console',
    name: 'Loupedeck Live S AI Streaming & Editing Console',
    brand: 'Loupedeck / Razer',
    category: 'creator-gear',
    categoryLabel: 'Smart Streaming Console',
    rating: 4.7,
    reviewsCount: 1680,
    price: '$149.99',
    numericPrice: 149.99,
    originalPrice: '$179.99',
    discountPercentage: '17% OFF',
    savingsAmount: 'Save $30',
    shortReview: 'Customizable tactile control console with touchscreen buttons, dual analog rotary dials, and smart AI workflow integrations for Premiere, Photoshop, and OBS.',
    fullReview: 'The Loupedeck Live S puts creator superpowers at your fingertips. Combining a customizable touch grid, RGB tactile keys, and two heavy analog rotary knobs, it allows live streamers and video editors to tweak volume channels, color grades, and prompt triggers with physical tactile feedback.',
    verdict: 'The ideal tactile studio deck for streamers, audio engineers, and video creators looking to accelerate repetitive editing workflows.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Staff Pick',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Two high-precision continuous analog rotary dials with push-click',
      'Customizable LCD touch buttons with haptic feedback vibrations',
      'Native plugin integration for OBS, Twitch, Spotify, Adobe Premiere, and DaVinci',
      'Compact footprint that easily fits beneath your monitor'
    ],
    cons: [
      'Initial profile setup has a slight learning curve',
      'Wired USB connection only (no wireless mode)'
    ],
    specs: {
      connectivity: 'USB-C (Detachable 2-meter braided cable included)',
      batteryLife: 'Direct USB Bus Powered',
      aiChipset: 'Loupedeck Custom Control Engine',
      compatibility: 'macOS 10.14+ and Windows 10/11',
      weight: '230 grams',
      dimensions: '150 x 85.5 x 30 mm',
      sensors: 'Touchscreen haptic drivers, optical rotary encoders',
      warranty: '2-Year Limited Manufacturer Warranty'
    },
    features: [
      'Dynamic profiles switch tools automatically based on active application',
      'Stepless rotary control for scrubbing timelines, brush sizes, and audio levels',
      'Marketplace access with hundreds of community plugins and icon packs',
      'Adjustable 35° detachable desk stand included'
    ],
    inTheBox: [
      'Loupedeck Live S Console',
      'Detachable 35° Angle Stand',
      'USB-C to USB-C Cable with USB-A Adapter',
      'Quick Start Guide'
    ],
    faqs: [
      {
        question: 'Does this work with DaVinci Resolve and Adobe Premiere?',
        answer: 'Yes! Loupedeck provides official native plugins for Adobe Creative Cloud, DaVinci Resolve, Final Cut Pro, and OBS Studio.'
      }
    ]
  },

  // -------------------------------------------------------------
  // 4. SMART HOME
  // -------------------------------------------------------------
  {
    id: 'gadget-roborock-s8-pro-ultra',
    slug: 'roborock-s8-pro-ultra-ai-robot-vacuum',
    name: 'Roborock S8 Pro Ultra AI Obstacle-Avoidance Robot Vacuum',
    brand: 'Roborock',
    category: 'smart-home',
    categoryLabel: 'AI Robot Vacuum & Mop',
    rating: 4.9,
    reviewsCount: 4890,
    price: '$1199.99',
    numericPrice: 1199.99,
    originalPrice: '$1599.99',
    discountPercentage: '$400 OFF',
    savingsAmount: 'Save $400',
    shortReview: 'Autonomous cleaning flagship with Reactive 3D AI obstacle avoidance, DuoRoller Riser brushes, 6000Pa suction, and all-in-one self-washing, self-drying dock.',
    fullReview: 'The Roborock S8 Pro Ultra represents the pinnacle of automated home floorcare. Its 3D structured light and infrared imaging identify 42 different household hazard objects (shoes, power cords, pet waste) and circumnavigates them safely. The RockDock Ultra empties dust, washes the sonic mop pad with clean water, and warm-air dries it to prevent mildew.',
    verdict: 'The ultimate zero-maintenance robotic floor cleaning system that delivers truly hands-free domestic automation.',
    imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584285418504-006368d40be6?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Best Seller',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Reactive 3D AI obstacle avoidance recognizes and skirts 42+ object types',
      'RockDock Ultra washes mop, dries with warm air, and empties dust for 7 weeks',
      'VibraRise 2.0 sonic mopping vibrates at 3,000 times/min with auto carpet lift',
      'Massive 6,000 Pa HyperForce suction pulls debris from deep carpet fibers'
    ],
    cons: [
      'Premium investment for whole-home automation',
      'Docking station requires dedicated floor space'
    ],
    specs: {
      connectivity: 'Wi-Fi 2.4GHz, Alexa, Google Assistant, Siri Shortcuts',
      batteryLife: 'Up to 180 minutes runtime (cleans up to 3,200 sq ft)',
      aiChipset: 'Reactive 3D Obstacle Recognition Optical AI',
      compatibility: 'Roborock App (iOS & Android)',
      weight: '14.4 kg (including full dock)',
      dimensions: '350 x 353 x 96.5 mm (Robot), 426 x 514 x 450 mm (Dock)',
      sensors: 'PreciSense LiDAR, 3D structured light scanner, ultrasonic carpet sensor',
      warranty: '1-Year Limited Manufacturer Warranty'
    },
    features: [
      'Dual rubber DuoRoller Riser brushes resist hair tangling',
      'Auto mop lifting lifts mop 5mm when navigating across rugs and carpets',
      'Fast charging charges 30% faster than previous generations',
      '3D home mapping with custom no-go zones and multi-floor support'
    ],
    inTheBox: [
      'Roborock S8 Pro Ultra Robot Vacuum',
      'RockDock Ultra Empty Wash Fill Dock',
      'Disposable Dust Bag & Power Cable',
      'VibraRise Mop Cloth Mount & Pad',
      'User Manual'
    ],
    faqs: [
      {
        question: 'Does the mop get stinky after washing floors?',
        answer: 'No. The RockDock Ultra automatically runs a warm-air drying cycle immediately after mopping to ensure the mop pad stays sanitized and odor-free.'
      }
    ]
  },
  {
    id: 'gadget-aqara-doorbell-g4',
    slug: 'aqara-smart-video-doorbell-g4',
    name: 'Aqara Smart Video Doorbell G4 with On-Device AI Facial Recognition',
    brand: 'Aqara',
    category: 'smart-home',
    categoryLabel: 'AI Video Doorbell',
    rating: 4.7,
    reviewsCount: 2210,
    price: '$119.99',
    numericPrice: 119.99,
    originalPrice: '$139.99',
    discountPercentage: '14% OFF',
    savingsAmount: 'Save $20',
    shortReview: 'Local on-device AI facial recognition doorbell with Apple HomeKit Secure Video, dual battery/wire powering, and zero monthly cloud subscription fees.',
    fullReview: 'The Aqara Doorbell G4 is an privacy-focused AI smart doorbell. Unlike competitors that require pricey cloud plans, its local neural processor recognizes family members and visitors right on the hardware chip. It integrates with Apple HomeKit, Google Home, and Alexa, triggering tailored welcome automations when recognized family members return home.',
    verdict: 'The best privacy-first video doorbell with fast local AI face detection and zero recurring fees.',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584285418504-006368d40be6?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: "Editor's Choice",
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Local on-device AI facial recognition works even when Internet is down',
      'Full Apple HomeKit Secure Video with end-to-end iCloud encryption',
      'Dual power options: 6x AA batteries or direct hardwired 12-24V AC transformer',
      'Included indoor chime repeater with microSD slot for local footage storage'
    ],
    cons: [
      '1080p resolution rather than 2K/4K to comply with HomeKit bandwidth',
      'Plastic exterior chassis'
    ],
    specs: {
      connectivity: 'Wi-Fi 2.4GHz, Apple HomeKit, Matter, Google Home, Alexa',
      batteryLife: 'Up to 4 months on 6x AA batteries (or continuous wired power)',
      aiChipset: 'Local Neural Face Recognition Edge Processor',
      compatibility: 'iOS (Home app) & Android (Aqara Home app)',
      weight: '163 grams',
      dimensions: '141.5 x 65 x 30.4 mm',
      sensors: '162° ultra-wide camera, PIR motion sensor, tamper sensor',
      warranty: '1-Year Limited Manufacturer Warranty'
    },
    features: [
      'Custom automations triggered by recognizing specific people arriving home',
      'Free 7-day cloud event storage included with no monthly subscription',
      'Voice-changing privacy options (clown voice, robot voice) for callers',
      'Indoor chime box with 95dB alarm and microSD storage up to 512GB'
    ],
    inTheBox: [
      'Aqara Smart Video Doorbell G4',
      'Indoor Chime Repeater Box',
      '6x AA Batteries',
      '20° Wedge Angle Bracket',
      'Screws, Anchors & User Guide'
    ],
    faqs: [
      {
        question: 'Do I have to pay a monthly fee to save video recordings?',
        answer: 'No! The G4 includes free 7-day cloud event recording and supports local MicroSD cards up to 512GB inside the indoor chime.'
      }
    ]
  },
  {
    id: 'gadget-ecobee-smart-thermostat',
    slug: 'ecobee-smart-thermostat-premium-ai',
    name: 'Ecobee Smart Thermostat Premium with AI Occupancy & Air Quality',
    brand: 'Ecobee',
    category: 'smart-home',
    categoryLabel: 'AI Smart Climate',
    rating: 4.8,
    reviewsCount: 3820,
    price: '$219.99',
    numericPrice: 219.99,
    originalPrice: '$249.99',
    discountPercentage: '12% OFF',
    savingsAmount: 'Save $30',
    shortReview: 'Brushed zinc smart thermostat with built-in air quality monitor, AI occupancy sensing SmartSensor, and Energy Star certified 26% HVAC savings.',
    fullReview: 'The Ecobee Smart Thermostat Premium elevates home energy intelligence. Crafted in brushed zinc and crystal glass, it learns your family schedule and thermal preferences. Its remote SmartSensor measures temperature and occupancy in bedrooms, automatically rebalancing comfort and slashing energy bills by an average of 26% annually.',
    verdict: 'A beautiful, smart climate center that pays for itself in annual energy savings while monitoring indoor air quality.',
    imageUrl: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Trending',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Slashes heating and cooling bills by up to 26% annually',
      'Included remote SmartSensor detects occupancy and room cold spots',
      'Built-in indoor air quality monitor tracks VOCs and humidity',
      'Premium brushed zinc metal housing with responsive touch interface'
    ],
    cons: [
      'Requires C-wire (Power Extender Kit is included in the box)',
      'Initial installation takes about 30 minutes'
    ],
    specs: {
      connectivity: 'Dual-band Wi-Fi, Bluetooth, Apple HomeKit, Alexa, Google Home',
      batteryLife: 'Direct 24VAC HVAC power (Sensor lasts 5 years on CR2477)',
      aiChipset: 'Smart Home/Away AI Thermal Optimization Engine',
      compatibility: '95% of standard 24VAC residential HVAC systems',
      weight: '240 grams',
      dimensions: '103.8 x 103.8 x 25.9 mm',
      sensors: 'Radar occupancy sensor, humidity, temperature, air quality (VOC & CO2)',
      warranty: '3-Year Manufacturer Warranty with professional or DIY install'
    },
    features: [
      'Built-in smart speaker with Alexa or Siri voice assistant built right in',
      'Smoke alarm detection listens for existing alarms and alerts your phone',
      'Automatic weather forecast forecasting with pre-cooling logic',
      'Seamless Apple HomeKit integration with Matter update readiness'
    ],
    inTheBox: [
      'Ecobee Smart Thermostat Premium',
      'Ecobee SmartSensor with Detachable Stand',
      'Power Extender Kit (PEK)',
      'Trim Plate & Mounting Screws'
    ],
    faqs: [
      {
        question: 'Does this require a C-Wire at my thermostat?',
        answer: 'If your home does not have a C-wire, Ecobee includes a Power Extender Kit (PEK) right in the box that easily wires into your furnace control board.'
      }
    ]
  },
  {
    id: 'gadget-switchbot-curtain-3',
    slug: 'switchbot-curtain-3-smart-automation',
    name: 'SwitchBot Curtain 3 with AI Adaptive Light & Motion Automation',
    brand: 'SwitchBot',
    category: 'smart-home',
    categoryLabel: 'Smart Window Automation',
    rating: 4.6,
    reviewsCount: 2940,
    price: '$89.99',
    numericPrice: 89.99,
    originalPrice: '$109.99',
    discountPercentage: '18% OFF',
    savingsAmount: 'Save $20',
    shortReview: '30-second retrofittable smart curtain motor with QuietDrift mode (below 25dB), solar panel compatibility, and automated daylight-tracking wakeups.',
    fullReview: 'The SwitchBot Curtain 3 turns existing standard curtain rods and U-rails into automated smart curtains in 30 seconds with no tools required. With its QuietDrift acoustic motor running under 25dB, curtains glide open gently at sunrise. Its ambient light sensor tracks sunrise and sunset dynamically to optimize daylighting and indoor insulation.',
    verdict: 'The easiest, most affordable smart curtain upgrade that requires zero remodeling or rewiring.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=1200&q=80'
    ],
    badge: 'Price Drop',
    affiliateUrl: 'https://amazon.com/?tag=aitoolnest-20',
    merchant: 'Amazon',
    pros: [
      'Tool-free 30-second installation on standard grommet, rod, or track curtains',
      'Whisper-quiet QuietDrift mode moves curtains at barely audible 25dB',
      'High-thrust motor pulls heavy blackout curtains up to 16 kg (35 lbs)',
      'Solar Panel 3 accessory provides infinite autonomous solar recharging'
    ],
    cons: [
      'Requires SwitchBot Hub 2 for Matter and Apple HomeKit control',
      'Two units needed for curtains that split in the middle'
    ],
    specs: {
      connectivity: 'Bluetooth 5.0 Low Energy, Matter (via SwitchBot Hub 2)',
      batteryLife: 'Up to 8 months per charge (or perpetual with solar panel)',
      aiChipset: 'Smart Light-Sensing Drive Controller',
      compatibility: 'Fits Grommet, Rod, U-Rail, and I-Rail track curtains',
      weight: '280 grams',
      dimensions: '42 x 51 x 173 mm',
      sensors: 'Ambient light sensor, pull-to-start motion sensor',
      warranty: '1-Year Limited Manufacturer Warranty'
    },
    features: [
      'Pull-to-start detection allows manual tugging to trigger automated opening',
      'Custom sunrise circadian schedules for natural morning awakening',
      'Over-the-air firmware updates with scheduled timers',
      'Voice control via Alexa, Google Assistant, and Siri Shortcuts'
    ],
    inTheBox: [
      'SwitchBot Curtain 3 Main Body',
      '1 Pair of Hook Attachments',
      'Type-C Charging Cable',
      'Clip Accessories & User Manual'
    ],
    faqs: [
      {
        question: 'Do I need to replace my existing curtain rods?',
        answer: 'No! SwitchBot Curtain 3 hooks directly onto standard round rods, grommet holes, or ceiling tracks without changing your curtain fabric or hardware.'
      }
    ]
  }
];

export function getGadgetBySlug(slug: string): AIGadget | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase().trim();
  return AI_GADGETS_DATA.find((g) => g.slug.toLowerCase() === s || g.id.toLowerCase() === s);
}

export function getRelatedGadgets(currentId: string, category: GadgetCategory, limit: number = 3): AIGadget[] {
  const sameCategory = AI_GADGETS_DATA.filter((g) => g.id !== currentId && g.category === category);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = AI_GADGETS_DATA.filter((g) => g.id !== currentId && g.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}
