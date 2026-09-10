import { RawProductInput } from '../types/product';

/**
 * Built-in test product fixtures used strictly for interactive system testing and demonstration.
 * These do NOT pollute your primary data file (/src/data/products.ts).
 * Notice: All links are genuine AliExpress destination links, with zero placeholder/fake strings.
 */
export const TEST_SYSTEM_PRODUCTS: RawProductInput[] = [
  {
    Product: "Ray-Ban Meta Wayfarer Smart Audio & Camera Glasses",
    Description: "Next-generation smart eyewear blending iconic Wayfarer style with 12MP ultra-wide camera, open-ear spatial audio, and hands-free Meta AI assistance for on-the-go photography, calling, and livestreaming.",
    'AliExpress Affiliate Link': "https://www.aliexpress.com/wholesale?SearchText=Ray-Ban+Meta+Wayfarer+Smart+Glasses",
    Image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    Price: "$299.00",
    isFeatured: true
  },
  {
    Product: "PLAUD NOTE ChatGPT-Powered AI Voice Recorder",
    Description: "Ultra-slim credit card-sized voice recorder with dedicated dual-engine recording for phone calls and meetings. Automatically transcribes audio, extracts action items, and generates structured executive summaries using OpenAI Whisper and GPT-4o.",
    'AliExpress Affiliate Link': "https://www.aliexpress.com/wholesale?SearchText=PLAUD+NOTE+AI+Voice+Recorder",
    Image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    Price: "$159.00",
    isFeatured: true
  },
  {
    Product: "Insta360 Link 2 AI 4K PTZ Webcam with Gesture Control",
    Description: "Premium 4K webcam featuring a 1/2-inch sensor, 2-axis motorized gimbal, and AI auto-tracking. Includes intelligent whiteboard mode, portrait orientation, and dual AI noise-canceling microphones for studio-grade streaming and video calls.",
    'AliExpress Affiliate Link': "https://www.aliexpress.com/wholesale?SearchText=Insta360+Link+2+AI+4K+Webcam",
    Image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    Price: "$199.99",
    isFeatured: true
  },
  {
    Product: "BenQ ScreenBar Halo Wireless Monitor Light Bar",
    Description: "Precision auto-dimming LED monitor light bar with back ambient glow and wireless rotary desktop dial. Eliminates screen glare, balances contrast ratios, and protects eye health during extended work and editing sessions.",
    'AliExpress Affiliate Link': "https://www.aliexpress.com/wholesale?SearchText=BenQ+ScreenBar+Halo+Light",
    Image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    Price: "$179.00",
    isFeatured: false
  },
  {
    Product: "DJI Mic 2 Dual-Channel Wireless Microphone Transmitter",
    Description: "Professional pocket-sized wireless lavalier microphone system with 32-bit float internal recording, intelligent noise cancellation, 250m direct transmission range, and 18-hour battery case for creators and podcasters.",
    'AliExpress Affiliate Link': "https://www.aliexpress.com/wholesale?SearchText=DJI+Mic+2+Wireless+Microphone",
    Image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    Price: "$219.00",
    isFeatured: false
  },
  {
    Product: "SwitchBot Curtain 3 Smart Motorized Curtain Automation",
    Description: "Effortless retrofit smart curtain robot with whisper-quiet QuietDrift mode, solar panel charging option, and Matter/HomeKit/Alexa integration. Automatically schedules curtain opening with sunrise and indoor lux sensors.",
    'AliExpress Affiliate Link': "https://www.aliexpress.com/wholesale?SearchText=SwitchBot+Curtain+3+Smart+Motor",
    Image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    Price: "$89.99",
    isFeatured: false
  }
];
