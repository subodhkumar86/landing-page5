import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Xntrova Official Logo
const XNTROVA_LOGO = "https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1788158799/cms-settings/cx4pzlnw2srdmd5ckfjp.png";

// Temporary editorial stock images. Replace these links with licensed Xntrova shoots before launch.
const stockImages = [
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=82'
];

// Real Verified Xntrova Client Logos (from official Cloudinary CDN)
const clientLogos = [
  { name: 'Scholar Scribe Solutions', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209654/xntrova-wp-media/xntrova-wp-media/27-93030f459f54a40f.webp' },
  { name: 'Etex', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209657/xntrova-wp-media/xntrova-wp-media/25-b12b5da59d88eafd.webp' },
  { name: 'Onsa', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209658/xntrova-wp-media/xntrova-wp-media/24-a3b12968a07aa207.webp' },
  { name: 'Herbals Here', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209660/xntrova-wp-media/xntrova-wp-media/23-d847757291b16815.webp' },
  { name: 'Range Lilies', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209661/xntrova-wp-media/xntrova-wp-media/22-28c745b590448d01.webp' },
  { name: 'Pitti Jewels & Pearls', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209663/xntrova-wp-media/xntrova-wp-media/5-3699036ea4992f89.webp' },
  { name: 'Berryan Luiz', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209665/xntrova-wp-media/xntrova-wp-media/2-89328e3e86eae27d.webp' },
  { name: 'Amritya Wellness', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209666/xntrova-wp-media/xntrova-wp-media/logo-1-86c7453d4dbc03a3.webp' },
  { name: 'Fortune Mattresses', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209668/xntrova-wp-media/xntrova-wp-media/21-74fc495daed31461.webp' },
  { name: 'Umbrella Infocare', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209676/xntrova-wp-media/xntrova-wp-media/1-e2f9dbb875b34bd8.webp' },
  { name: 'Satvik', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209674/xntrova-wp-media/xntrova-wp-media/7-96b67b3d8ec27610.webp' },
  { name: 'Chetan Clinic', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209675/xntrova-wp-media/xntrova-wp-media/3-babd0060936cf265.webp' },
  { name: 'Mahadev Tours', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209680/xntrova-wp-media/xntrova-wp-media/Mahadev-India-Tours-logo-3-7622aec07f6d516f.webp' },
  { name: 'Quality Tech Engineers', url: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_384/v1787209683/xntrova-wp-media/xntrova-wp-media/13-df6ae5ebe4b0c8df.webp' }
];

// Tools We Work With (Xntrova Tech Stack)
const techTools = [
  { name: 'Meta Ads Manager', icon: 'fa-brands fa-facebook', color: '#0866FF' },
  { name: 'Google Ads', icon: 'fa-brands fa-google', color: '#4285F4' },
  { name: 'Google Analytics 4', icon: 'fa-solid fa-chart-pie', color: '#E37400' },
  { name: 'Google Search Console', icon: 'fa-solid fa-magnifying-glass', color: '#458CF5' },
  { name: 'Ahrefs', icon: 'fa-solid fa-chart-simple', color: '#0058F0' },
  { name: 'Semrush', icon: 'fa-solid fa-fire-flame-curved', color: '#FF642D' },
  { name: 'HubSpot', icon: 'fa-brands fa-hubspot', color: '#FF7A59' },
  { name: 'Shopify Plus', icon: 'fa-brands fa-shopify', color: '#96BF48' },
  { name: 'Canva Pro', icon: 'fa-solid fa-palette', color: '#00C4CC' },
  { name: 'Yoast SEO', icon: 'fa-solid fa-cubes', color: '#A61E69' },
  { name: 'AWS Cloud', icon: 'fa-brands fa-aws', color: '#FF9900' },
  { name: 'Salesforce', icon: 'fa-brands fa-salesforce', color: '#00A1E0' }
];

// 6 Official Xntrova Services Data
const xntrovaServices = [
  {
    id: 'seo',
    title: 'Search Engine Optimization',
    shortName: 'SEO & Organic Growth',
    icon: 'fa-magnifying-glass-chart',
    tag: 'Long-Term Compounding Traffic',
    headline: 'Achieve top search rankings and compounding, zero-CAC organic revenue.',
    desc: 'Our SEO services in Delhi integrate deep semantic keyword optimization, on-page code enhancements, authoritative contextual backlink acquisition, and technical audits to guarantee sustainable organic dominance.',
    deliverables: [
      'Comprehensive Technical SEO & Core Web Vitals Audit',
      'High-Intent Commercial & Transactional Keyword Research',
      'High-Authority Contextual Backlink & Digital PR Outreach',
      'Google Search Console & Schema Markup Optimization'
    ],
    metricVal: '+250%',
    metricLabel: 'Average Organic Traffic Surge',
    image: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_1200/v1787209757/xntrova-wp-media/xntrova-wp-media/Rectangle-4486-9-5504a7125cea09c8.png'
  },
  {
    id: 'paid-ads',
    title: 'Paid Advertising (PPC)',
    shortName: 'Paid Ads & Performance',
    icon: 'fa-bullseye',
    tag: 'High-Velocity Customer Acquisition',
    headline: 'Accelerate revenue with precision-targeted Meta, Google & YouTube campaigns.',
    desc: 'We engineer data-driven PPC funnels that reach high-intent buyers at the precise moment of intent. With scientific A/B testing of hooks, angles, and algorithmic media buying, we scale spend predictably.',
    deliverables: [
      'Meta Ads (Facebook & Instagram) Direct-Response Scaling',
      'Google Search, Performance Max (PMax) & YouTube Ads',
      'Server-Side Conversions API (CAPI) & Pixel Setup',
      'Continuous Creative Hook & Offer A/B Split Testing'
    ],
    metricVal: '4.8x',
    metricLabel: 'Average Blended ROAS Achieved',
    image: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_1200/v1787209759/xntrova-wp-media/xntrova-wp-media/Rectangle-4486-10-6264d1c8ec9d3fac.png'
  },
  {
    id: 'smo',
    title: 'Social Media Optimization',
    shortName: 'Social Media & Brand',
    icon: 'fa-share-nodes',
    tag: 'Community & Brand Authority',
    headline: 'Transform passive scrollers into an obsessed community of loyal brand advocates.',
    desc: 'Elevate your social presence across Instagram, LinkedIn, and YouTube through psychological storytelling, high-retention video production, and influencer collaborations that spark genuine engagement.',
    deliverables: [
      'Viral Short-Form Video Direction (Reels & Shorts)',
      'Brand Identity, Visual Theme & Graphic Design Lab',
      'Influencer Collaboration & UGC Creator Partnerships',
      'Automated DM Sales Funnels & Social Listening'
    ],
    metricVal: '50M+',
    metricLabel: 'Organic Reach & Video Views',
    image: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_1200/v1787209740/xntrova-wp-media/xntrova-wp-media/Rectangle-4486-4-715a3dab082f4239.png'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Marketing',
    shortName: 'E-Commerce Scaling',
    icon: 'fa-cart-shopping',
    tag: 'D2C Revenue Architecture',
    headline: 'Scale Shopify and WooCommerce stores into 8-figure powerhouse brands.',
    desc: 'From product page CRO and catalog retargeting to post-purchase retention loops and average order value (AOV) boosters, our e-commerce strategists turn one-time visitors into high-LTV repeat buyers.',
    deliverables: [
      'Shopify & Custom Store Conversion Rate Optimization',
      'Dynamic Product Catalog Retargeting & Lookalikes',
      'Klaviyo Automated Email & SMS Customer Nurture Flows',
      'AOV Bundling, Upsell & Cart Abandonment Recovery'
    ],
    metricVal: '₹15Cr+',
    metricLabel: 'Client E-Commerce Revenue Generated',
    image: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_1200/v1787209735/xntrova-wp-media/xntrova-wp-media/Rectangle-4486-2-7ff366e812bb60d4.png'
  },
  {
    id: 'content',
    title: 'Content Marketing',
    shortName: 'Content Marketing',
    icon: 'fa-pen-fancy',
    tag: 'Thought Leadership & Trust',
    headline: 'Build market dominance with content that educates, persuades, and converts.',
    desc: 'We craft high-authority articles, technical whitepapers, compelling case studies, and visual infographics that position your brand as the definitive industry thought leader while fueling your organic search rankings.',
    deliverables: [
      'Strategic Editorial Calendars & Keyword Mapped Topics',
      'High-Conversion Case Studies & Founder Customer Stories',
      'Data-Backed Infographics & Visual Thought Leadership',
      'Distribution Across Omnichannel Industry Channels'
    ],
    metricVal: '3.4x',
    metricLabel: 'Higher Inbound Lead Quality',
    image: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_1200/v1787209741/xntrova-wp-media/xntrova-wp-media/Rectangle-4486-5-19f726b3c1690da8.png'
  },
  {
    id: 'webdev',
    title: 'Website Development',
    shortName: 'Web & Landing Pages',
    icon: 'fa-code',
    tag: 'Fast, High-Converting Web Platforms',
    headline: 'Lightning-fast, responsive web experiences engineered for maximum conversion.',
    desc: 'Our Delhi development team builds modern, SEO-ready web applications and landing pages with sub-second loading speeds, sleek mobile ergonomics, and seamless payment and tracking integrations.',
    deliverables: [
      'Custom Modern UI/UX Design with Dark/Cyber Aesthetics',
      '95+ Mobile Google PageSpeed Score Optimization',
      'Full Conversions API (CAPI) & GA4 Event Tracking Setup',
      'Seamless E-Commerce, CRM & Payment Gateway Integration'
    ],
    metricVal: '< 1s',
    metricLabel: 'Average Page Load Time',
    image: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_1200/v1787209762/xntrova-wp-media/xntrova-wp-media/Rectangle-4486-11-c13ae712a8c5d68f.png'
  }
];

// Before vs After Comparison Matrix Points
const comparisonPoints = [
  {
    pillar: 'Paid Ad Performance & ROAS',
    chaosTitle: 'Unstable 1.2x - 1.8x ROAS',
    chaosDesc: 'Media buyers rely on outdated generic audiences and basic boosted posts. Blended ROAS collapses as spend increases.',
    xntrovaTitle: '4.8x Scalable Blended ROAS',
    xntrovaDesc: 'Data-driven creative testing loops, broad algorithmic targeting, and disciplined media buying that scales spend profitably.'
  },
  {
    pillar: 'Data Attribution & iOS 14+ Tracking',
    chaosTitle: '40-50% Blind Signal Loss',
    chaosDesc: 'Reliance on client-side pixels alone. Misattributed purchases cause ad platform algorithms to optimize towards the wrong audiences.',
    xntrovaTitle: '100% Signal Retention via CAPI',
    xntrovaDesc: 'Server-side Meta Conversions API (CAPI), Google Enhanced Conversions, and custom GA4 data streams to ensure maximum algorithmic learning.'
  },
  {
    pillar: 'Creative & Video Ad Iteration',
    chaosTitle: 'Tired Stock Photos & Generic Creatives',
    chaosDesc: 'Few static graphics made once a month. Creative fatigue quickly skyrockets CPA and chokes campaign delivery.',
    xntrovaTitle: 'In-House High-Hook Video Direction',
    xntrovaDesc: 'Weekly creative sprints delivering 10+ psychology-backed hook variations, motion graphics, and high-retention UGC.'
  },
  {
    pillar: 'Landing Pages & Conversion Rate (CRO)',
    chaosTitle: 'Slow 4s+ Load & 65% Bounce Rate',
    chaosDesc: 'Cluttered template pages filled with friction that leak traffic before visitors even view your product or offer.',
    xntrovaTitle: 'Sub-1s Mobile Speed & 3x Conversion Lift',
    xntrovaDesc: 'Custom-coded, lightning-fast landing pages engineered with frictionless checkout and high-urgency psychological architecture.'
  },
  {
    pillar: 'Accountability & Strategy',
    chaosTitle: 'Vendor Finger-Pointing & Vanity Metrics',
    chaosDesc: 'The copywriter blames the media buyer, who blames the dev. Monthly reports focus on meaningless vanity impressions.',
    xntrovaTitle: 'Unified Growth Team & 24/7 Live Analytics',
    xntrovaDesc: 'A dedicated Fractional Growth Director and 24/7 live commercial dashboard tracking real bank-deposit net revenue.'
  }
];

// Live Social Proof Notification Feed
const socialProofToasts = [
  { brand: 'New Delhi D2C Brand', action: 'scaled Meta ROAS to 4.8x', metric: '+₹38L Revenue' },
  { brand: 'Scholar Scribe Solutions', action: 'generated 1,400+ signups', metric: '42% Lower CAC' },
  { brand: 'Pitti Jewels & Pearls', action: 'hit monthly revenue milestone', metric: '₹48L/Month' },
  { brand: 'Herbals Here', action: 'achieved organic search surge', metric: '+250% Traffic' },
  { brand: 'Growth Diagnostic Call', action: '2 Free Audit Slots left', metric: 'Q3 Schedule' }
];

// Interactive Growth Diagnostic Quiz Data
const quizQuestions = [
  {
    question: "What is your primary growth bottleneck right now?",
    options: [
      { label: "Low or Unstable Meta/Google ROAS", icon: "fa-bullseye", targetService: "Paid Advertising (PPC)" },
      { label: "Poor Website Speed & High Bounce Rate", icon: "fa-gauge-high", targetService: "Website Development" },
      { label: "Low Organic Google Search Traffic", icon: "fa-magnifying-glass-chart", targetService: "Search Engine Optimization" },
      { label: "Scaling D2C E-Commerce Store Past 8 Figures", icon: "fa-cart-shopping", targetService: "E-Commerce Marketing" }
    ]
  },
  {
    question: "What is your current monthly ad spend or marketing budget?",
    options: [
      { label: "Under ₹1,00,000 / month", icon: "fa-seedling", budget: "₹50K - ₹1L" },
      { label: "₹1,00,000 to ₹5,00,000 / month", icon: "fa-chart-line", budget: "₹1L - ₹5L" },
      { label: "₹5,00,000 to ₹15,00,000 / month", icon: "fa-rocket", budget: "₹5L - ₹15L" },
      { label: "₹15,00,000+ Enterprise Scaling", icon: "fa-crown", budget: "₹15L+" }
    ]
  }
];

// Real Google Reviews from Xntrova Clients
const googleReviews = [
  {
    name: 'Amit Verma',
    role: 'Founder, D2C Wellness',
    avatar: 'A',
    bg: '#faae39',
    text: 'What impressed us most about Xntrova was their strategic mindset. Unlike other digital marketing agencies in Delhi, Xntrova didn’t give us a one-size-fits-all solution; instead, they created customised strategies for our business. Their proactive communication and data-driven approach gave us confidence in every decision.',
    stars: 5,
    tag: 'Verified Google Review'
  },
  {
    name: 'Neha Kapoor',
    role: 'Marketing Director, Tech SaaS',
    avatar: 'N',
    bg: '#005a7d',
    text: 'Xntrova is truly the best digital marketing agency in Delhi. Their team brought fresh ideas and clear directions for our business. They listened to all of our concerns and created their strategies accordingly, and the results they delivered were beyond expectations. Our demo requests quadrupled in 90 days!',
    stars: 5,
    tag: 'Verified Google Review'
  },
  {
    name: 'Rahul Sharma',
    role: 'CEO, E-Commerce Label',
    avatar: 'R',
    bg: '#0075a2',
    text: 'What sets Xntrova apart is the way they combine expertise with a human touch. They celebrate your wins, tackle challenges alongside you, and remain focused on creating long-term value. It’s the kind of high-impact growth partnership every ambitious business hopes to find.',
    stars: 5,
    tag: 'Verified Google Review'
  },
  {
    name: 'Ankit Gupta',
    role: 'Founder, Healthcare Brand',
    avatar: 'A',
    bg: '#0a4257',
    text: 'What started as a simple project quickly turned into a long-term partnership. The Xntrova team was approachable, proactive, and always willing to test high-performing angles. Our Meta ROAS stabilized at 4.6x with significantly lower acquisition costs.',
    stars: 5,
    tag: 'Verified Google Review'
  }
];

// Featured Case Study Milestones
const featuredClients = [
  {
    category: 'd2c',
    handle: 'D2C E-Commerce Brand',
    image: 'https://fobetmedia.com/wp-content/uploads/2026/08/@mehakmarketing.webp',
    badge: '👑 Milestone Unlocked',
    highlight: '₹5L to ₹48L/Month',
    subtext: 'in 90 days with 4.6x Meta ROAS!',
    url: 'https://www.instagram.com/xntrova.agency/'
  },
  {
    category: 'b2b',
    handle: 'Enterprise B2B SaaS',
    image: 'https://fobetmedia.com/wp-content/uploads/2026/08/@drmayankofficial.webp',
    badge: '👑 Milestone Unlocked',
    highlight: '1,400+ Demo Signups',
    subtext: 'at 42% lower CAC in 4 months!',
    url: 'https://www.linkedin.com/company/xntrova/'
  }
];

// 10 Filterable Client Transformation Results
const gridClients = [
  { category: 'd2c', handle: 'Healthcare & Wellness D2C', tag: '180% Revenue Jump', tagClass: 'tag-months', image: 'https://fobetmedia.com/wp-content/uploads/2026/08/dr.siddhant.bhargava.webp' },
  { category: 'paid', handle: 'FinTech Growth Engine', tag: '250K+ App Installs', tagClass: 'tag-months', image: 'https://fobetmedia.com/wp-content/uploads/2026/08/ritubihaniagarwal.webp' },
  { category: 'paid', handle: 'Luxury Fashion Label', tag: '4.8x Meta ROAS', tagClass: 'tag-featured-result', image: 'https://fobetmedia.com/wp-content/uploads/2026/08/@mehakmarketing.webp' },
  { category: 'b2b', handle: 'B2B Tech Solutions', tag: 'High-Intent Funnel', tagClass: 'tag-months', image: 'https://fobetmedia.com/wp-content/uploads/2026/08/@mazedarfinance.webp' },
  { category: 'd2c', handle: 'Consumer Electronics Brand', tag: '₹2.4Cr Pipeline', tagClass: 'tag-months', image: 'https://fobetmedia.com/wp-content/uploads/2026/08/@rajneeshupreti.webp' },
  { category: 'seo', handle: 'Doctor & MedTech Network', tag: '150K+ in 4 Months', tagClass: 'tag-featured-result', image: 'https://fobetmedia.com/wp-content/uploads/2026/08/@drmayankofficial.webp' },
  { category: 'seo', handle: 'E-Learning & Creator Academy', tag: '10M+ Organic Reach', tagClass: 'tag-months', image: 'https://fobetmedia.com/wp-content/uploads/2026/08/@muskannarrates.webp' },
  { category: 'paid', handle: 'Astrology & Spiritual App', tag: '340% Traffic Spike', tagClass: 'tag-months', image: 'https://fobetmedia.com/wp-content/uploads/2026/08/@namastroapp.webp' },
  { category: 'd2c', handle: 'Specialist Skincare D2C', tag: 'Omnichannel Scale', tagClass: 'tag-starting', image: 'https://fobetmedia.com/wp-content/uploads/2026/08/@ladydoctor.sadaf_.webp' },
  { category: 'b2b', handle: 'Real Estate Developer Hub', tag: 'Fast Track Launch', tagClass: 'tag-starting', image: 'https://fobetmedia.com/wp-content/uploads/2026/08/@Mayankdudeja.webp' }
];

// The 6-Step Xntrova Protocol
const protocolSteps = [
  {
    num: '01',
    title: 'Deep-Dive Audit & Market Intelligence',
    desc: 'We analyze your unit economics, competitor ad accounts, and conversion bottlenecks to build a data-backed growth roadmap.',
    icon: 'fa-microscope',
    image: 'https://fobetmedia.com/wp-content/uploads/2026/01/01.jpg'
  },
  {
    num: '02',
    title: 'High-Intent Messaging & Funnel Architecture',
    desc: 'We map out friction-free conversion funnels and psychological hook angles designed to attract high-intent, paying buyers.',
    icon: 'fa-pen-nib',
    image: 'https://fobetmedia.com/wp-content/uploads/2026/01/02.jpg'
  },
  {
    num: '03',
    title: 'High-Retention Creative & Video Direction',
    desc: 'Our creative team produces stop-the-scroll video ads, high-impact motion graphics, and UGC angles that drive maximum watch time.',
    icon: 'fa-wand-magic-sparkles',
    image: 'https://fobetmedia.com/wp-content/uploads/2026/01/03.jpg'
  },
  {
    num: '04',
    title: 'Omnichannel Paid Media Acquisition',
    desc: 'We deploy systematic media spend across Meta (Facebook & Instagram), Google Search, PMax, and YouTube to scale revenue profitably.',
    icon: 'fa-rocket',
    image: 'https://fobetmedia.com/wp-content/uploads/2026/01/04.jpg'
  },
  {
    num: '05',
    title: 'Conversion Rate Optimisation & CAPI Tracking',
    desc: 'We implement server-side tracking, Conversions API (CAPI), and GA4 event setups to ensure accurate data attribution and higher conversion rates.',
    icon: 'fa-chart-line',
    image: 'https://fobetmedia.com/wp-content/uploads/2026/01/05.jpg'
  },
  {
    num: '06',
    title: 'Compounding Scaling & Revenue Automation',
    desc: 'We continuously test hooks, creatives, and offers while setting up automated email and retargeting loops to maximize Customer Lifetime Value.',
    icon: 'fa-users-gear',
    image: 'https://fobetmedia.com/wp-content/uploads/2026/01/06.jpg'
  }
];

// 16 Behind The Scenes Production & Lab Shots
const btsItems = [
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-16h02m14s592-1.png', caption: 'Campaign Architecture', tag: 'Strategy' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-16h02m05s548-1.png', caption: 'Creative Lab & Shoot', tag: 'Production' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-16h01m56s659-1.png', caption: 'Live Ad Account Sync', tag: 'Paid Media' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-16h01m48s651-1.png', caption: 'High-Retention Video Cut', tag: 'Post-Production' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-16h01m30s064-1.png', caption: 'Behind The Lens', tag: 'Directing' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-15h58m27s295-1.png', caption: 'Growth War Room', tag: 'Collaboration' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-15h58m15s601-1.png', caption: 'On-Camera Direction', tag: 'Studio Set' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-15h56m34s794-1.png', caption: 'Funnel Wireframing', tag: 'UX / CRO' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-15h56m17s472-1.png', caption: 'Hook & Copy Workshop', tag: 'Scripting' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-15h55m02s210-1.png', caption: 'Performance Monitoring', tag: 'Analytics' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-15h56m07s074.png', caption: 'Server-Side CAPI Setup', tag: 'Technical' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-15h54m33s746-1.png', caption: 'Sprint Planning Session', tag: 'Execution' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-15h53m53s957-2.png', caption: 'Focused Optimization', tag: 'Scaling' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-15h53m08s940-1.png', caption: 'Team Growth Huddle', tag: 'Planning' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-08-16h29m19s205-1.png', caption: 'Creative Production Day', tag: 'Content' },
  { img: 'https://fobetmedia.com/wp-content/uploads/2026/01/vlcsnap-2026-01-09-15h52m58s949.png', caption: 'Final Touches & Launch', tag: 'Deployment' }
];

// Video Testimonials & Deep Dives Data
const testimonialVideos = [
  {
    handle: '@xntrova.client_1',
    clientName: 'D2C Natural Wellness',
    url: 'https://fobetmedia.com/wp-content/uploads/2026/01/4.mp4',
    link: 'https://www.instagram.com/xntrova.agency/',
    metrics: '4.8x Meta ROAS • ₹38L Net Revenue Added',
    tactics: 'Server-Side CAPI, Direct Hook Iteration, Omnichannel Retargeting',
    quote: 'Xntrova stabilized our ad spend within 3 weeks. We went from burning cash to generating consistent 4.8x blended ROAS!'
  },
  {
    handle: '@xntrova.client_2',
    clientName: 'Enterprise SaaS Solution',
    url: 'https://fobetmedia.com/wp-content/uploads/2026/01/1.mp4',
    link: 'https://www.instagram.com/xntrova.agency/',
    metrics: '1,400+ Inbound Signups • 42% Lower CAC',
    tactics: 'High-Intent Google Ads, CRO Landing Page Engine, Demo Funnels',
    quote: 'Demo bookings quadrupled in under 90 days. Their data attribution and reporting are unrivaled.'
  },
  {
    handle: '@xntrova.client_3',
    clientName: 'Luxury Jewelry & Lifestyle',
    url: 'https://fobetmedia.com/wp-content/uploads/2026/01/2.mp4',
    link: 'https://www.instagram.com/xntrova.agency/',
    metrics: '₹48L Monthly GMV • 5.1x Peak ROAS',
    tactics: 'Broad Audience Targeting, High-Hook UGC Reels, VIP Upsells',
    quote: 'Our revenue went from ₹5L to ₹48L/month. The growth protocol is as scientific as it gets.'
  },
  {
    handle: '@xntrova.client_4',
    clientName: 'Doctor & Healthcare Network',
    url: 'https://fobetmedia.com/wp-content/uploads/2026/01/3.mp4',
    link: 'https://www.instagram.com/xntrova.agency/',
    metrics: '+250% Organic Traffic • #1 Google Rankings',
    tactics: 'Technical SEO, Contextual Backlinks, Schema Architecture',
    quote: 'We now dominate Google rankings for all top medical keywords in Delhi NCR.'
  },
  {
    handle: '@xntrova.client_5',
    clientName: 'Fintech Mobile App',
    url: 'https://fobetmedia.com/wp-content/uploads/2026/01/5.mp4',
    link: 'https://www.instagram.com/xntrova.agency/',
    metrics: '250K+ Installs • ₹18 Cost Per Install',
    tactics: 'Meta App Campaigns, Dynamic Creative Testing, Retention Loops',
    quote: 'Scaled installs 3x without increasing our blended cost per install.'
  },
  {
    handle: '@xntrova.client_6',
    clientName: 'Modern Home & Mattress Brand',
    url: 'https://fobetmedia.com/wp-content/uploads/2026/01/6.mp4',
    link: 'https://www.instagram.com/xntrova.agency/',
    metrics: '₹1.8Cr Annual Run Rate • 4.2x ROAS',
    tactics: 'Shopify CRO, Dynamic Retargeting, Klaviyo Automation',
    quote: 'Cart abandonment recovery alone paid for the entire retainer 5 times over.'
  },
  {
    handle: '@xntrova.client_7',
    clientName: 'Specialist Skincare D2C',
    url: 'https://fobetmedia.com/wp-content/uploads/2026/01/7.mp4',
    link: 'https://www.instagram.com/xntrova.agency/',
    metrics: '340% Traffic Spike • 3.9x Blended ROAS',
    tactics: 'Creator Partnerships, Viral Hook Reels, High-AOV Bundles',
    quote: 'Working with Xntrova felt like having an elite Silicon Valley growth team in our office.'
  }
];

// Interactive Ad Simulator Formats & Hooks
const adFormats = [
  { id: 'meta-feed', name: 'Meta Feed (1:1)', icon: 'fa-brands fa-facebook' },
  { id: 'reels', name: 'Instagram Reels (9:16)', icon: 'fa-brands fa-instagram' },
  { id: 'google', name: 'Google High-Intent Search', icon: 'fa-brands fa-google' }
];

const adHooks = [
  {
    id: 'pain',
    tag: 'Pain-Point Direct Hook',
    title: 'Burning ₹1.5L+/month with sub-1.8x ROAS?',
    desc: 'Stop letting client-side pixel blind spots leak 40% of your sales data. Switch to Server-Side CAPI tracking today.',
    ctaText: 'Fix My Signal Loss',
    retainRate: '48.5%',
    ctr: '3.82%',
    cpa: '₹285',
    roas: '5.2x',
    scalingCap: '₹15L+/mo',
    mediaImg: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_1200/v1787209759/xntrova-wp-media/xntrova-wp-media/Rectangle-4486-10-6264d1c8ec9d3fac.png',
    sponsor: 'Xntrova Paid Performance Lab',
    statsComparison: '3.4x Higher CTR than traditional ad templates'
  },
  {
    id: 'proof',
    tag: 'Social Proof & Case Study',
    title: 'How a Delhi D2C brand scaled ₹5L to ₹48L/mo in 90 days',
    desc: 'Full breakdown of the creative hook sprint and broad audience algorithmic scaling protocol we deployed.',
    ctaText: 'Read Full Case Study',
    retainRate: '52.1%',
    ctr: '4.15%',
    cpa: '₹240',
    roas: '4.8x',
    scalingCap: '₹25L+/mo',
    mediaImg: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_1200/v1787209735/xntrova-wp-media/xntrova-wp-media/Rectangle-4486-2-7ff366e812bb60d4.png',
    sponsor: 'Xntrova Case Studies',
    statsComparison: '500+ Happy Scaled Brands'
  },
  {
    id: 'myth',
    tag: 'Contrarian Industry Myth',
    title: 'Why boosting posts is costing you 70% of conversions',
    desc: 'Boosting posts trains Meta’s algorithm on vanity likes instead of bank-deposit checkouts. Here is the exact fix.',
    ctaText: 'Deploy Conversion Funnel',
    retainRate: '44.8%',
    ctr: '3.40%',
    cpa: '₹310',
    roas: '4.5x',
    scalingCap: '₹10L+/mo',
    mediaImg: 'https://res.cloudinary.com/di93stsbz/image/upload/f_auto,q_auto,c_limit,w_1200/v1787209740/xntrova-wp-media/xntrova-wp-media/Rectangle-4486-4-715a3dab082f4239.png',
    sponsor: 'Xntrova Creative Lab',
    statsComparison: '42% Lower Customer Acquisition Cost'
  }
];

// Categorized Xntrova FAQs
const faqsList = [
  {
    category: 'paid',
    q: "How fast can we expect to see measurable results with Xntrova?",
    a: "Most partners see initial traffic and lead improvements within the first 14 to 21 days of launching our campaign structure. Full compounding velocity typically hits between days 45 and 90 as creative testing identifies top-performing ad angles and audience cohorts."
  },
  {
    category: 'cro',
    q: "Can you work with our existing website and landing pages?",
    a: "Yes. We start by conducting a comprehensive CRO (Conversion Rate Optimisation) and analytics audit on your existing funnel to isolate friction points. We can either optimize your current pages or engineer dedicated, lightning-fast landing pages focused on maximum conversion."
  },
  {
    category: 'general',
    q: "What makes Xntrova different from traditional digital marketing agencies?",
    a: "Most agencies treat digital marketing as isolated silos (running ads without fixing the landing page or posting content without commercial strategy). At Xntrova, we connect positioning, high-converting creative, paid acquisition, and conversion tracking into a unified, high-ROI revenue engine."
  },
  {
    category: 'pricing',
    q: "What ad spend budget do we need to get started?",
    a: "We work with businesses starting at ad spends of ₹50,000/month up to enterprise brands spending ₹15,00,000+/month across Meta and Google Ads. Our management is structured to keep your blended ROAS healthy as spend scales."
  },
  {
    category: 'paid',
    q: "Do you handle creative ad production, copywriting, and design?",
    a: "Yes, completely. Our in-house team handles high-hook copywriting, stop-the-scroll motion graphics, video editing, and landing page designs so you don't have to hire multiple freelancers or agencies."
  },
  {
    category: 'cro',
    q: "How do you track conversions accurately after iOS 14 and privacy changes?",
    a: "We implement advanced server-side tracking via Meta Conversions API (CAPI), Google Enhanced Conversions, and custom GA4 data streams to ensure zero signal loss and optimal algorithmic ad delivery."
  },
  {
    category: 'general',
    q: "Which industries does Xntrova deliver the best results for?",
    a: "We have proven track records in D2C & E-Commerce, B2B SaaS, Professional & Financial Services, Health & MedTech, EdTech, Real Estate, and High-Ticket Consulting brands."
  },
  {
    category: 'general',
    q: "What is the onboarding process and time investment required from our team?",
    a: "Onboarding takes less than 48 hours. After our initial discovery workshop and access handover, our team handles all research, strategy, creative assets, and campaign management with weekly syncs."
  },
  {
    category: 'pricing',
    q: "Do you provide transparent reporting and performance dashboards?",
    a: "Yes. Every client gets access to a live, 24/7 custom performance dashboard tracking Spend, Impressions, CTR, CPA, ROAS, and Net Revenue, paired with weekly strategic debriefs."
  },
  {
    category: 'pricing',
    q: "How do we get started with Xntrova?",
    a: "Click 'Get Free Digital Audit' or contact us directly on WhatsApp at +91 868-382-8646. We will review your current digital footprint and present a tailored 90-day growth blueprint."
  }
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [founderSlide, setFounderSlide] = useState(0); // 0: Paid Media Engine, 1: Creative & CRO
  const [openFaq, setOpenFaq] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '', service: 'Performance Marketing' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Web Audio API Sound Synthesizer State
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef(null);

  const initAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } catch (e) {}
  };

  const playCyberClick = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  };

  const playSuccessChord = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.25);
      });
    } catch (e) {}
  };

  // Interactive Services Tab State
  const [activeServiceTab, setActiveServiceTab] = useState(0);

  // Interactive Live ROI Calculator State
  const [adSpend, setAdSpend] = useState(150000);
  const [targetRoas, setTargetRoas] = useState(4.5);

  // Interactive Ad Simulator State
  const [simFormat, setSimFormat] = useState('meta-feed');
  const [simHook, setSimHook] = useState(0);

  // Interactive Live URL Scanner State
  const [scannerUrl, setScannerUrl] = useState('');
  const [scannerIndustry, setScannerIndustry] = useState('D2C E-Commerce');
  const [isScanning, setIsScanning] = useState(false);
  const [scanLogs, setScanLogs] = useState([]);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanScore, setScanScore] = useState(null);

  // Video Lightbox Modal State
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // FAQ Search & Filter State
  const [faqCategory, setFaqCategory] = useState('all');
  const [faqSearch, setFaqSearch] = useState('');

  // Case Studies Category Filter State
  const [caseFilter, setCaseFilter] = useState('all');

  // Interactive Comparison Filter (Chaos vs Xntrova)
  const [comparisonMode, setComparisonMode] = useState('both'); // 'both', 'chaos', 'xntrova'

  // Interactive Instant Growth Diagnostic Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({ bottleneck: '', budget: '' });

  // Social Proof Toast State
  const [toastIndex, setToastIndex] = useState(0);
  const [toastVisible, setToastVisible] = useState(true);

  // Interactive Cursor Light Follower
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sticky Navbar & Laser Progress Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercent(progress);
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate Hero Showcase Slides
  useEffect(() => {
    const interval = setInterval(() => {
      setFounderSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Social proof toast rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setToastIndex((prev) => (prev + 1) % socialProofToasts.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    playCyberClick();
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      playSuccessChord();
      setTimeout(() => {
        setModalOpen(false);
        setFormSubmitted(false);
        setLeadForm({ name: '', email: '', phone: '', company: '', service: 'Performance Marketing' });
      }, 2500);
    }, 1000);
  };

  const runScanner = (e) => {
    e.preventDefault();
    if (!scannerUrl) return;
    playCyberClick();
    setIsScanning(true);
    setScanComplete(false);
    setScanLogs([]);
    setScanScore(null);

    const cleanUrl = scannerUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

    setTimeout(() => {
      setScanLogs((prev) => [
        ...prev,
        {
          badge: 'FAIL',
          badgeClass: 'fail',
          text: `[01/04] Checking ${cleanUrl} Meta Conversions API (CAPI) & Pixel signals... Found: 38% signal loss post-iOS 14.5.`
        }
      ]);
    }, 600);

    setTimeout(() => {
      setScanLogs((prev) => [
        ...prev,
        {
          badge: 'WARN',
          badgeClass: 'warn',
          text: `[02/04] Testing Google Core Web Vitals on Mobile... Warning: 3.4s LCP detected (causes ~41% visitor drop-off).`
        }
      ]);
    }, 1300);

    setTimeout(() => {
      setScanLogs((prev) => [
        ...prev,
        {
          badge: 'OPP',
          badgeClass: 'pass',
          text: `[03/04] Scanning Google Search Organic Keyword Gaps... Opportunity: 28 high-intent commercial keywords on page 2.`
        }
      ]);
    }, 2000);

    setTimeout(() => {
      setScanLogs((prev) => [
        ...prev,
        {
          badge: 'WARN',
          badgeClass: 'warn',
          text: `[04/04] Analyzing Ad Creative & Hook Velocity in ${scannerIndustry}... Stale creative fatigue identified.`
        }
      ]);
      setIsScanning(false);
      setScanComplete(true);
      setScanScore(58);
      playSuccessChord();
    }, 2800);
  };

  // Filter FAQs by Category and Search Term
  const filteredFaqs = faqsList.filter((f) => {
    const matchesCat = faqCategory === 'all' || f.category === faqCategory;
    const matchesSearch =
      faqSearch === '' ||
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Calculator calculations
  const projectedRevenue = Math.round(adSpend * targetRoas);
  const projectedProfit = Math.round(projectedRevenue - adSpend);
  const estimatedConversions = Math.round(projectedRevenue / 2200);
  const annualRunRate = Math.round(projectedRevenue * 12);

  // Filter Case Studies
  const filteredGridClients = caseFilter === 'all'
    ? gridClients
    : gridClients.filter((c) => c.category === caseFilter);

  const activeService = xntrovaServices[activeServiceTab];
  const activeToast = socialProofToasts[toastIndex];
  const activeAdHook = adHooks[simHook];

  return (
    <div className="site-wrapper">
      {/* Scroll Laser Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollPercent}%` }} />

      {/* Interactive Cursor Light Glow */}
      <div
        className="cursor-light"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* ========================================================
          SITE HEADER / NAVBAR (XNTROVA BRANDING)
          ======================================================== */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <a href="#home" className="header-logo" aria-label="Xntrova Home" onClick={playCyberClick}>
            <img
              src={XNTROVA_LOGO}
              alt="Xntrova Digital Marketing Agency"
              className="brand-logo-img"
            />
          </a>

          <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}>
            <ul className="nav-menu">
              <li>
                <a href="#home" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  Home
                </a>
              </li>
              <li>
                <a href="#services" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  Services
                </a>
              </li>
              <li>
                <a href="#stats" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  Stats
                </a>
              </li>
              <li>
                <a href="#calculator" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  ROI Calculator
                </a>
              </li>
              <li>
                <a href="#scanner" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  URL Scan
                </a>
              </li>
              <li>
                <a href="#ad-simulator" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  Ad Lab
                </a>
              </li>
              <li>
                <a href="#comparison" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  Why Us
                </a>
              </li>
              <li>
                <a href="#quiz" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  Growth Scan
                </a>
              </li>
              <li>
                <a href="#results" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  Results
                </a>
              </li>
              <li>
                <a href="#protocol" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  Protocol
                </a>
              </li>
              <li>
                <a href="#packages" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  Packages
                </a>
              </li>
              <li>
                <a href="#faq" onClick={() => { playCyberClick(); setMobileMenuOpen(false); }}>
                  FAQ
                </a>
              </li>
            </ul>

            <button
              className={`sfx-toggle-btn ${soundEnabled ? 'active' : ''}`}
              onClick={() => {
                initAudio();
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) setTimeout(playCyberClick, 50);
              }}
              aria-label="Toggle sound feedback"
              title="Toggle futuristic sound feedback"
            >
              <i className={`fa-solid ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
              <span>{soundEnabled ? 'SFX ON' : 'SFX'}</span>
              {soundEnabled && (
                <div className="sfx-waves-wrap">
                  <span className="sfx-wave-bar"></span>
                  <span className="sfx-wave-bar"></span>
                  <span className="sfx-wave-bar"></span>
                </div>
              )}
            </button>

            <button
              onClick={() => {
                playCyberClick();
                setMobileMenuOpen(false);
                setModalOpen(true);
              }}
              className="header-cta"
            >
              Get Digital Audit <i className="fa-solid fa-arrow-right"></i>
            </button>
          </nav>

          <button
            className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* ========================================================
          HERO SECTION (XNTROVA POSITIONING & FOBET UI/UX)
          ======================================================== */}
      <div className="fobet-hero-wrapper" id="home">
        <div className="noise-overlay"></div>

        <section className="hero-redesigned">
          <div className="particles"></div>
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>

          <div className="bg-elements">
            <i className="fa-solid fa-sparkles bg-icon icon-1"></i>
            <i className="fa-solid fa-rocket bg-icon icon-3"></i>
            <i className="fa-solid fa-chart-line bg-icon icon-8"></i>
          </div>

          <div className="hero-container">
            {/* Left Content */}
            <div className="content-wrapper">
              <div className="logo-badge hero-fade-in delay-1">
                <div className="logo-icon">
                  <i className="fa-solid fa-bolt"></i>
                </div>
                <span className="logo-text">XNTROVA &bull; BEST DIGITAL MARKETING IN DELHI NCR</span>
              </div>

              <div className="hero-headline hero-fade-in delay-2">
                Driven By Ideas.<br />
                <span className="gradient-text">Focused on</span>{' '}
                <span className="underline-wrapper">
                  <span className="gradient-text">Results.</span>
                  <svg
                    className="svg-underline"
                    viewBox="0 0 200 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2.00025 6.99997C25.7501 2.99991 74.8003 7.50002 99.0003 4.49997C124 1.50002 150.908 -0.999992 198.001 2.50001"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>

              <div className="hero-fade-in delay-3" style={{ marginBottom: '35px' }}>
                <h1 className="hero-description" style={{ marginBottom: '12px' }}>
                  Scale your business with Delhi NCR's top performance marketing &amp; digital growth agency.
                </h1>
                <p className="hero-description">
                  We engineer predictable paid acquisition across Meta &amp; Google Ads, unassailable SEO authority, and high-retention creative funnels that turn strangers into high-paying, repeat customers.
                </p>
              </div>

              <div className="cta-wrapper hero-fade-in delay-4">
                <button onClick={() => setModalOpen(true)} className="btn-primary">
                  <span>Get Free Digital Audit</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
                <a href="#services" className="btn-secondary">
                  <i className="fa-solid fa-layer-group"></i>
                  <span>Explore Services</span>
                </a>
              </div>
            </div>

            {/* Right Showcase Stage & Switcher */}
            <div className="founder-section hero-fade-in delay-3" id="founder-slider">
              <div className="founder-stage-container">
                <div className="founder-glow"></div>
                <div className="founder-arch"></div>

                <div className="founder-slider-wrapper">
                  {/* Slide 0: Paid Media Engine */}
                  <div className={`founder-slide ${founderSlide === 0 ? 'active' : ''}`}>
                    <img
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=85"
                      alt="Xntrova Performance Marketing Engine"
                      className="founder-img riya"
                    />
                  </div>

                  {/* Slide 1: Creative & CRO Strategy */}
                  <div className={`founder-slide ${founderSlide === 1 ? 'active' : ''}`}>
                    <img
                      src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=85"
                      alt="Xntrova Full-Funnel Conversion Strategy"
                      className="founder-img vibhav"
                    />
                  </div>
                </div>

                {/* Slide 0 Floating Cards: Performance Engine */}
                {founderSlide === 0 && (
                  <>
                    <div className="float-card card-stats-riya" style={{ display: 'flex' }}>
                      <div className="stat-icon">
                        <i className="fa-solid fa-bolt"></i>
                      </div>
                      <div className="stat-content">
                        <h4>Paid Acquisition</h4>
                        <p>4.8x Average ROAS</p>
                      </div>
                    </div>

                    <div className="float-card card-social-riya" style={{ display: 'flex' }}>
                      <div className="social-links">
                        <a
                          href="https://www.instagram.com/xntrova.agency/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                          aria-label="Xntrova Instagram"
                        >
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a
                          href="https://www.linkedin.com/company/xntrova/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                          aria-label="Xntrova LinkedIn"
                        >
                          <i className="fa-brands fa-linkedin"></i>
                        </a>
                      </div>
                    </div>

                    <div className="float-card card-views-riya" style={{ display: 'flex' }}>
                      <div className="stat-icon stat-icon-green">
                        <i className="fa-solid fa-chart-line"></i>
                      </div>
                      <div className="stat-content">
                        <h4>₹15Cr+</h4>
                        <p>
                          <i className="fa-solid fa-caret-up"></i> Client Revenue
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* Slide 1 Floating Cards: Creative & CRO */}
                {founderSlide === 1 && (
                  <>
                    <div className="float-card card-stats-vibhav" style={{ display: 'flex' }}>
                      <div className="stat-content-text">
                        <strong>Conversion Architecture</strong>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#cbd5e1' }}>+250% Organic Traffic Surge</p>
                      </div>
                    </div>

                    <div className="float-card card-stats-vibhav-2" style={{ display: 'flex' }}>
                      <div className="stat-content-text">
                        <strong>500+ Happy Clients</strong>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#4ade80' }}>120+ Projects Delivered</p>
                      </div>
                    </div>

                    <div className="float-card card-social-vibhav" style={{ display: 'flex' }}>
                      <div className="social-links">
                        <a
                          href="https://www.facebook.com/xntrova/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                          aria-label="Xntrova Facebook"
                        >
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a
                          href="https://x.com/xntrova"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                          aria-label="Xntrova X / Twitter"
                        >
                          <i className="fa-brands fa-x-twitter"></i>
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Showcase Label & Indicators */}
              <div className="founder-info-container hero-fade-in delay-5">
                <div className={`info-slide ${founderSlide === 0 ? 'active' : ''}`}>
                  <p className="founder-label">CORE REVENUE ENGINE</p>
                  <h3 className="founder-name">Paid Media &amp; Performance</h3>
                </div>
                <div className={`info-slide ${founderSlide === 1 ? 'active' : ''}`}>
                  <p className="founder-label">ORGANIC CONVERSION LAB</p>
                  <h3 className="founder-name">SEO, Content &amp; Full-Funnel CRO</h3>
                </div>
              </div>

              <div className="slider-controls hero-fade-in delay-5">
                <button
                  className={`slider-dot ${founderSlide === 0 ? 'active' : ''}`}
                  onClick={() => setFounderSlide(0)}
                  aria-label="Show Paid Media Engine"
                />
                <button
                  className={`slider-dot ${founderSlide === 1 ? 'active' : ''}`}
                  onClick={() => setFounderSlide(1)}
                  aria-label="Show Funnel Strategy"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================
          TRUST & REVIEW PLATFORMS MARQUEE (XNTROVA CREDIBILITY)
          ======================================================== */}
      <section className="trust-ticker-section">
        <div className="trust-ticker-container">
          <div className="trust-ticker-label">
            <span>RATED 4.9/5 ACROSS TOP PLATFORMS</span>
            <div className="trust-stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>

          <div className="trust-logos-row">
            <div className="trust-badge-item">
              <i className="fa-solid fa-award"></i>
              <span>Clutch</span>
              <span className="rating-val">4.9/5</span>
            </div>
            <div className="trust-badge-item">
              <i className="fa-solid fa-shield-halved"></i>
              <span>Trustpilot</span>
              <span className="rating-val">5.0 ★</span>
            </div>
            <div className="trust-badge-item">
              <i className="fa-solid fa-circle-check"></i>
              <span>GoodFirms</span>
              <span className="rating-val">Verified</span>
            </div>
            <div className="trust-badge-item">
              <i className="fa-solid fa-trophy"></i>
              <span>DesignRush</span>
              <span className="rating-val">Top Agency</span>
            </div>
            <div className="trust-badge-item">
              <i className="fa-brands fa-google"></i>
              <span>Google Partner</span>
              <span className="rating-val">Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE SERVICES TAB SHOWCASE (XNTROVA 6 CORE PILLARS)
          ======================================================== */}
      <section className="services-showcase-section" id="services">
        <div className="services-showcase-container">
          <div className="services-header">
            <div className="section-badge">
              <i className="fa-solid fa-layer-group"></i> &nbsp; CORE CAPABILITIES
            </div>
            <h2 className="timeline-title">
              Best Digital Marketing Services <span className="gradient-text">in Delhi NCR</span>
            </h2>
            <p className="timeline-desc">
              Being the premier creative &amp; performance digital marketing agency, we offer complete end-to-end solutions that unlock sustainable, compounding growth.
            </p>
          </div>

          {/* 6-Tab Animated Switcher */}
          <div className="service-tabs-nav">
            {xntrovaServices.map((srv, idx) => (
              <button
                key={srv.id}
                className={`service-tab-btn ${activeServiceTab === idx ? 'active' : ''}`}
                onClick={() => setActiveServiceTab(idx)}
              >
                <i className={`fa-solid ${srv.icon}`}></i>
                <span>{srv.shortName}</span>
              </button>
            ))}
          </div>

          {/* Active Service Panel Card */}
          <div className="service-panel-card" key={activeService.id}>
            <div>
              <div className="service-badge-pill">
                <i className="fa-solid fa-bolt"></i> {activeService.tag}
              </div>
              <h3 className="service-panel-title">{activeService.title}</h3>
              <p className="service-panel-desc">{activeService.desc}</p>

              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '14px' }}>
                Key Strategic Deliverables:
              </h4>
              <ul className="service-features-list">
                {activeService.deliverables.map((item, i) => (
                  <li key={i} className="service-feature-item">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="service-impact-row">
                <div className="service-stat-chip">
                  <span className="val">{activeService.metricVal}</span>
                  <span className="label">{activeService.metricLabel}</span>
                </div>

                <button
                  className="service-cta-btn"
                  onClick={() => {
                    setLeadForm({ ...leadForm, service: activeService.title });
                    setModalOpen(true);
                  }}
                >
                  <span>Audit My {activeService.shortName}</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* Visual Side */}
            <div className="service-panel-visual">
              <img src={activeService.image} alt={activeService.title} loading="lazy" />
              <div className="service-visual-overlay">
                <span className="service-visual-tag">
                  <i className="fa-solid fa-chart-line"></i> {activeService.headline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          STATS DECK: 30-DAY GROWTH ACCELERATION
          ======================================================== */}
      <section className="two-day-section" id="stats">
        <div className="two-day-container">
          <div className="two-day-text">
            <div className="section-badge">
              <i className="fa-solid fa-rocket"></i> &nbsp; Full-Stack Growth Engine
            </div>
            <h2>30-Day Growth Acceleration</h2>
            <h3 className="sub-heading">for creating dominant, scalable category leaders</h3>
            <h3 className="sub-heading" style={{ marginTop: '12px' }}>
              <strong className="gradient-text">
                Generate Revenue, Increase Qualified Customers, Gain Massive Reach
              </strong>
            </h3>
          </div>

          <div className="stats-deck">
            {/* Revenue Card */}
            <div className="glass-card stat-card-side purple">
              <div>
                <h4 className="stat-value">₹15Cr+</h4>
                <p className="stat-label">Client Revenue Generated</p>
              </div>
              <i className="fa-solid fa-dollar-sign icon-float" style={{ color: '#fbbf24' }}></i>
              <svg className="sparkline" viewBox="0 0 100 40">
                <path d="M0 30 Q 20 25 40 10 T 80 15 T 100 5" stroke="#c084fc" />
              </svg>
            </div>

            {/* Followers & Reach Hero Card with Progress Ring */}
            <div className="glass-card stat-card-center">
              <div className="progress-ring">
                <div className="stat-text-center">
                  <h3>+250%</h3>
                  <p>Organic Traffic Surge</p>
                </div>
              </div>
            </div>

            {/* Qualified Conversions Card */}
            <div className="glass-card stat-card-side blue">
              <div>
                <h4 className="stat-value">500+</h4>
                <p className="stat-label">Happy Scaled Brands</p>
              </div>
              <i className="fa-solid fa-bullseye icon-float" style={{ color: '#22d3ee' }}></i>
              <svg className="sparkline" viewBox="0 0 100 40">
                <path d="M0 35 Q 25 30 50 15 T 100 10" stroke="#22d3ee" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE LIVE ROI & REVENUE GROWTH CALCULATOR
          ======================================================== */}
      <section className="roi-calculator-section" id="calculator">
        <div className="roi-calculator-container">
          <div className="services-header">
            <div className="section-badge">
              <i className="fa-solid fa-calculator"></i> &nbsp; LIVE FORECAST ENGINE
            </div>
            <h2 className="timeline-title">
              Interactive <span className="gradient-text">ROI &amp; Revenue Calculator</span>
            </h2>
            <p className="timeline-desc">
              Slide your current ad budget and expected ROAS to simulate your potential scaling velocity with Xntrova's proven media buying protocol.
            </p>
          </div>

          <div className="calculator-card-wrapper">
            {/* Sliders Column */}
            <div className="calc-sliders-column">
              {/* Ad Spend Slider */}
              <div className="calc-slider-block">
                <div className="calc-slider-header">
                  <span className="calc-slider-label">Monthly Ad Spend Budget:</span>
                  <span className="calc-slider-value">₹{adSpend.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="1000000"
                  step="25000"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="calc-presets-row">
                  <button
                    className={`calc-preset-pill ${adSpend === 50000 ? 'active' : ''}`}
                    onClick={() => setAdSpend(50000)}
                  >
                    ₹50K Startup
                  </button>
                  <button
                    className={`calc-preset-pill ${adSpend === 150000 ? 'active' : ''}`}
                    onClick={() => setAdSpend(150000)}
                  >
                    ₹1.5L Scale
                  </button>
                  <button
                    className={`calc-preset-pill ${adSpend === 500000 ? 'active' : ''}`}
                    onClick={() => setAdSpend(500000)}
                  >
                    ₹5L High Growth
                  </button>
                  <button
                    className={`calc-preset-pill ${adSpend === 1000000 ? 'active' : ''}`}
                    onClick={() => setAdSpend(1000000)}
                  >
                    ₹10L Market Leader
                  </button>
                </div>
              </div>

              {/* Target ROAS Slider */}
              <div className="calc-slider-block">
                <div className="calc-slider-header">
                  <span className="calc-slider-label">Target Return on Ad Spend (ROAS):</span>
                  <span className="calc-slider-value">{targetRoas.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="8.0"
                  step="0.1"
                  value={targetRoas}
                  onChange={(e) => setTargetRoas(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                  <span>2.0x Conservative</span>
                  <span style={{ color: '#ee82ee', fontWeight: 600 }}>4.8x Xntrova Average</span>
                  <span>8.0x Elite Scaling</span>
                </div>
              </div>
            </div>

            {/* Projected Outputs Column */}
            <div className="calc-results-column">
              <div className="calc-results-badge">
                <i className="fa-solid fa-chart-line"></i> Projected Growth Model
              </div>

              <div className="calc-highlight-metric">
                <span className="metric-title">Estimated Monthly Revenue</span>
                <span className="metric-number">₹{projectedRevenue.toLocaleString('en-IN')}</span>
              </div>

              <div className="calc-breakdown-grid">
                <div className="calc-mini-stat">
                  <span className="title">Net Gross Profit</span>
                  <span className="val" style={{ color: '#4ade80' }}>
                    +₹{projectedProfit.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="calc-mini-stat">
                  <span className="title">Est. Paying Customers</span>
                  <span className="val">{estimatedConversions.toLocaleString('en-IN')}+</span>
                </div>
                <div className="calc-mini-stat">
                  <span className="title">Annual Revenue Run-Rate</span>
                  <span className="val" style={{ color: '#fbbf24' }}>
                    ₹{(annualRunRate / 10000000).toFixed(2)} Cr/yr
                  </span>
                </div>
                <div className="calc-mini-stat">
                  <span className="title">Profit Multiple</span>
                  <span className="val">{targetRoas.toFixed(1)}x ROAS</span>
                </div>
              </div>

              <button
                className="calc-lock-btn"
                onClick={() => {
                  setLeadForm({
                    ...leadForm,
                    company: `Budget: ₹${adSpend.toLocaleString('en-IN')}/mo at ${targetRoas.toFixed(1)}x ROAS`,
                    service: 'Performance Marketing'
                  });
                  setModalOpen(true);
                }}
              >
                <span>Lock In This Scaling Plan</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          LIVE DIGITAL GROWTH & TRACKING SCANNER WIDGET
          ======================================================== */}
      <section className="scanner-section" id="scanner">
        <div className="scanner-container">
          <div className="services-header">
            <div className="section-badge">
              <i className="fa-solid fa-radar"></i> &nbsp; LIVE 60-SECOND AUDIT
            </div>
            <h2 className="timeline-title">
              Instant Growth &amp; <span className="gradient-text">Tracking Signal Scanner</span>
            </h2>
            <p className="timeline-desc">
              Scan your domain against 4 critical scaling pillars: CAPI Server Signal Loss, Mobile Core Web Vitals, Google SEO Authority Gaps, and Ad Creative Saturation.
            </p>
          </div>

          <div className="scanner-terminal-card">
            <div className="terminal-top-bar">
              <div className="terminal-dots">
                <span className="terminal-dot-btn red"></span>
                <span className="terminal-dot-btn yellow"></span>
                <span className="terminal-dot-btn green"></span>
              </div>
              <span className="terminal-title-text">XNTROVA-TERMINAL-V4.8 // SIGNAL-ANALYZER.EXE</span>
              <span style={{ fontSize: '11px', color: '#4ade80' }}>
                <i className="fa-solid fa-circle"></i> SYSTEM READY
              </span>
            </div>

            <form onSubmit={runScanner} className="scanner-input-deck">
              <input
                type="text"
                placeholder="Enter your website or brand URL (e.g. yourbrand.in)..."
                value={scannerUrl}
                onChange={(e) => setScannerUrl(e.target.value)}
                className="scanner-url-field"
                required
              />
              <select
                value={scannerIndustry}
                onChange={(e) => setScannerIndustry(e.target.value)}
                className="scanner-industry-select"
              >
                <option value="D2C E-Commerce">D2C E-Commerce</option>
                <option value="B2B & SaaS">B2B &amp; SaaS</option>
                <option value="Healthcare & Wellness">Healthcare &amp; Wellness</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Education & EdTech">Education &amp; EdTech</option>
                <option value="High-Ticket Professional">High-Ticket Services</option>
              </select>
              <button type="submit" className="scanner-run-btn" disabled={isScanning}>
                {isScanning ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>Analyzing Signals...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-bolt"></i>
                    <span>Run Growth Scan</span>
                  </>
                )}
              </button>
            </form>

            <div className="terminal-logs-view">
              {scanLogs.length === 0 && !isScanning && (
                <div style={{ color: '#64748b', fontStyle: 'italic', padding: '20px 0' }}>
                  &gt; Ready. Enter your URL above and click "Run Growth Scan" to diagnose signal health, pixel leaks, and revenue bottlenecks...
                </div>
              )}

              {scanLogs.map((log, index) => (
                <div key={index} className="terminal-log-line">
                  <span className={`terminal-log-badge ${log.badgeClass}`}>{log.badge}</span>
                  <span>{log.text}</span>
                </div>
              ))}

              {isScanning && (
                <div className="terminal-log-line" style={{ color: '#38bdf8' }}>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Executing algorithmic scan and cross-referencing industry benchmarks...</span>
                </div>
              )}

              {scanComplete && (
                <div className="terminal-score-result">
                  <div className="terminal-score-dial">
                    <div className="score-number-badge">{scanScore}</div>
                    <div className="score-text-meta">
                      <h4>Digital Health Score: 58 / 100</h4>
                      <p>Moderate-to-High Scaling Friction Detected for {scannerUrl}</p>
                    </div>
                  </div>

                  <button
                    className="terminal-claim-fix-btn"
                    onClick={() => {
                      playCyberClick();
                      setLeadForm({
                        ...leadForm,
                        company: `${scannerUrl} (Scan Score: 58/100, ${scannerIndustry})`,
                        service: 'Growth Diagnostic & Audit'
                      });
                      setModalOpen(true);
                    }}
                  >
                    <span>Claim Full Fix Protocol &amp; Audit</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BEFORE VS AFTER COMPARISON MATRIX (THE XNTROVA DIFFERENCE)
          ======================================================== */}
      <section className="comparison-section" id="comparison">
        <div className="comparison-container">
          <div className="services-header">
            <div className="section-badge">
              <i className="fa-solid fa-code-compare"></i> &nbsp; THE ARCHITECTURE DIFFERENCE
            </div>
            <h2 className="timeline-title">
              Traditional Agency Chaos <span className="gradient-text">vs. The Xntrova Engine</span>
            </h2>
            <p className="timeline-desc">
              Why 92% of brands switching to Xntrova experience dramatic revenue improvements within their first 60 days.
            </p>
          </div>

          <div className="comparison-toggle-bar">
            <button
              className={`comp-toggle-btn ${comparisonMode === 'both' ? 'active xntrova' : ''}`}
              onClick={() => setComparisonMode('both')}
            >
              Side-By-Side Comparison
            </button>
            <button
              className={`comp-toggle-btn ${comparisonMode === 'chaos' ? 'active chaos' : ''}`}
              onClick={() => setComparisonMode('chaos')}
            >
              Traditional Agencies ⚠️
            </button>
            <button
              className={`comp-toggle-btn ${comparisonMode === 'xntrova' ? 'active xntrova' : ''}`}
              onClick={() => setComparisonMode('xntrova')}
            >
              The Xntrova Engine ⚡
            </button>
          </div>

          <div className="comparison-grid">
            {/* Traditional Agency Chaos Column */}
            {(comparisonMode === 'both' || comparisonMode === 'chaos') && (
              <div className="comparison-column chaos-col">
                <div className="comp-col-header">
                  <h3 className="comp-col-title">Traditional Marketing Silos</h3>
                  <span className="comp-status-pill">High Burn, Low ROAS</span>
                </div>

                <div className="comp-items-list">
                  {comparisonPoints.map((item, idx) => (
                    <div key={idx} className="comp-item-row">
                      <div className="comp-item-icon">
                        <i className="fa-solid fa-xmark"></i>
                      </div>
                      <div className="comp-item-body">
                        <h5>{item.chaosTitle}</h5>
                        <p>{item.chaosDesc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* The Xntrova Growth Engine Column */}
            {(comparisonMode === 'both' || comparisonMode === 'xntrova') && (
              <div className="comparison-column xntrova-col">
                <div className="comp-col-header">
                  <h3 className="comp-col-title">The Xntrova Growth Engine</h3>
                  <span className="comp-status-pill">Predictable 4.8x Scale</span>
                </div>

                <div className="comp-items-list">
                  {comparisonPoints.map((item, idx) => (
                    <div key={idx} className="comp-item-row">
                      <div className="comp-item-icon">
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <div className="comp-item-body">
                        <h5>{item.xntrovaTitle}</h5>
                        <p>{item.xntrovaDesc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE INSTANT GROWTH DIAGNOSTIC QUIZ (3-STEP SCANNER)
          ======================================================== */}
      <section className="quiz-section" id="quiz">
        <div className="quiz-container">
          <div className="services-header">
            <div className="section-badge">
              <i className="fa-solid fa-wand-magic-sparkles"></i> &nbsp; 60-SECOND DIAGNOSTIC
            </div>
            <h2 className="timeline-title">
              Interactive Growth <span className="gradient-text">Bottleneck Scanner</span>
            </h2>
            <p className="timeline-desc">
              Answer 2 simple questions to diagnose your #1 revenue barrier and reveal your tailored 90-day scaling roadmap.
            </p>
          </div>

          <div className="quiz-card">
            {/* Progress Bar */}
            <div className="quiz-progress-track">
              <div
                className="quiz-progress-fill"
                style={{ width: quizStep === 0 ? '35%' : quizStep === 1 ? '70%' : '100%' }}
              ></div>
            </div>

            {/* Step 0: Identify Bottleneck */}
            {quizStep === 0 && (
              <div>
                <p className="quiz-step-label">Step 1 of 2: Current Priority</p>
                <h3 className="quiz-question-title">{quizQuestions[0].question}</h3>

                <div className="quiz-options-grid">
                  {quizQuestions[0].options.map((opt, i) => (
                    <button
                      key={i}
                      className={`quiz-opt-btn ${quizAnswers.bottleneck === opt.label ? 'selected' : ''}`}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, bottleneck: opt.label, targetService: opt.targetService });
                        setQuizStep(1);
                      }}
                    >
                      <i className={`fa-solid ${opt.icon}`}></i>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Select Budget */}
            {quizStep === 1 && (
              <div>
                <p className="quiz-step-label">Step 2 of 2: Growth Velocity</p>
                <h3 className="quiz-question-title">{quizQuestions[1].question}</h3>

                <div className="quiz-options-grid">
                  {quizQuestions[1].options.map((opt, i) => (
                    <button
                      key={i}
                      className={`quiz-opt-btn ${quizAnswers.budget === opt.budget ? 'selected' : ''}`}
                      onClick={() => {
                        setQuizAnswers({ ...quizAnswers, budget: opt.budget });
                        setQuizStep(2);
                      }}
                    >
                      <i className={`fa-solid ${opt.icon}`}></i>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>

                <div className="quiz-nav-btns">
                  <button className="quiz-back-btn" onClick={() => setQuizStep(0)}>
                    <i className="fa-solid fa-arrow-left"></i> Previous Question
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Instant Generated Custom Blueprint */}
            {quizStep === 2 && (
              <div>
                <p className="quiz-step-label" style={{ color: '#4ade80' }}>
                  <i className="fa-solid fa-circle-check"></i> Analysis Complete
                </p>
                <h3 className="quiz-question-title">Your Tailored 90-Day Scaling Blueprint</h3>

                <div className="quiz-result-box">
                  <h4>
                    <i className="fa-solid fa-rocket"></i> Recommended Protocol:{' '}
                    {quizAnswers.targetService || 'Performance Marketing Engine'}
                  </h4>
                  <p>
                    Based on your objective (<em>{quizAnswers.bottleneck}</em>) and spend tier (<em>{quizAnswers.budget}</em>), our strategists recommend deploying our <strong>Server-Side CAPI Tracking Audit</strong> alongside an <strong>Omnichannel Paid Media Creative Sprint</strong>.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: '#e2e8f0' }}>
                      <i className="fa-solid fa-check" style={{ color: '#4ade80' }}></i> Immediate unit economics &amp; funnel friction audit
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: '#e2e8f0' }}>
                      <i className="fa-solid fa-check" style={{ color: '#4ade80' }}></i> Deployment of 10+ high-retention video creative hook variations
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: '#e2e8f0' }}>
                      <i className="fa-solid fa-check" style={{ color: '#4ade80' }}></i> Target baseline: Scale to 4.2x - 4.8x blended ROAS within 60 days
                    </li>
                  </ul>
                </div>

                <div className="quiz-nav-btns">
                  <button className="quiz-back-btn" onClick={() => setQuizStep(1)}>
                    <i className="fa-solid fa-rotate-left"></i> Retake Scan
                  </button>

                  <button
                    className="quiz-next-btn"
                    onClick={() => {
                      setLeadForm({
                        ...leadForm,
                        service: quizAnswers.targetService || 'Performance Marketing',
                        company: `Scan Goal: ${quizAnswers.bottleneck} (${quizAnswers.budget})`
                      });
                      setModalOpen(true);
                    }}
                  >
                    <span>Claim This Exact Blueprint</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          DUAL INFINITE CLIENT LOGOS & TOOLS MARQUEES
          ======================================================== */}
      <section className="dual-marquee-section">
        {/* Row 1: Real Xntrova Partner Brands */}
        <p className="marquee-header-label">TRUSTED BY 500+ FAST-GROWING BRANDS WORLDWIDE</p>
        <div className="infinite-marquee-wrapper">
          <div className="infinite-marquee-track">
            {clientLogos.concat(clientLogos).map((client, idx) => (
              <div key={idx} className="client-logo-chip" title={client.name}>
                <img src={client.url} alt={client.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Technologies & Tools */}
        <p className="marquee-header-label" style={{ marginTop: '20px', color: '#38bdf8' }}>
          ENTERPRISE MARKETING &amp; ANALYTICS STACK
        </p>
        <div className="infinite-marquee-wrapper">
          <div className="infinite-marquee-track reverse">
            {techTools.concat(techTools).map((tool, idx) => (
              <div key={idx} className="tool-chip-item">
                <i className={tool.icon} style={{ color: tool.color }}></i>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          CASE STUDIES / CLIENT RESULTS SECTION
          ======================================================== */}
      <section className="results-section" id="results">
        <div className="section-badge">PROVEN RESULTS</div>
        <h2 className="results-title">
          Client <span className="gradient-text">Transformation Results</span>
        </h2>
        <p className="results-subtext">
          Real performance data from e-commerce brands, B2B companies, and high-growth category leaders.
        </p>

        {/* Category Filter Pills */}
        <div className="case-filter-pills-row">
          <button
            className={`case-filter-pill ${caseFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCaseFilter('all')}
          >
            All Milestones (12)
          </button>
          <button
            className={`case-filter-pill ${caseFilter === 'd2c' ? 'active' : ''}`}
            onClick={() => setCaseFilter('d2c')}
          >
            D2C &amp; E-Commerce
          </button>
          <button
            className={`case-filter-pill ${caseFilter === 'b2b' ? 'active' : ''}`}
            onClick={() => setCaseFilter('b2b')}
          >
            B2B &amp; SaaS
          </button>
          <button
            className={`case-filter-pill ${caseFilter === 'paid' ? 'active' : ''}`}
            onClick={() => setCaseFilter('paid')}
          >
            Paid Ads Scaling
          </button>
          <button
            className={`case-filter-pill ${caseFilter === 'seo' ? 'active' : ''}`}
            onClick={() => setCaseFilter('seo')}
          >
            SEO &amp; Authority
          </button>
        </div>

        {/* Featured Milestone Profiles with Glowing Confetti Cards */}
        <div className="featured-wrapper">
          {featuredClients.map((client, idx) => (
            <div key={idx} className="featured-card">
              <div className="featured-image-container">
                <img src={stockImages[idx]} alt={`${client.handle} placeholder`} loading="lazy" />
              </div>
              <div className="featured-info">
                <div className="featured-badge-congrats">
                  <i className="fas fa-crown"></i>
                  {client.badge}
                </div>
                <h3 className="featured-handle">{client.handle}</h3>
                <p className="featured-achievement">
                  <span className="featured-highlight">{client.highlight}</span>
                  <br />
                  {client.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Grid of Results (Filterable) */}
        <div className="results-grid">
          {filteredGridClients.map((item, index) => (
            <div key={index} className="result-card">
              <div className={`card-tag ${item.tagClass}`}>{item.tag}</div>
              <div className="result-static">
                <img src={stockImages[(index + 2) % stockImages.length]} alt={`${item.handle} placeholder`} className="result-static-img" loading="lazy" />
              </div>
            </div>
          ))}
        </div>

        <p className="many-more-text">
          <span className="gradient-text">&amp;</span> 120+ More Client Case Studies
        </p>
      </section>

      {/* ========================================================
          INTERACTIVE AD CREATIVE & HOOK SIMULATOR (XNTROVA AD LAB)
          ======================================================== */}
      <section className="ad-simulator-section" id="ad-simulator">
        <div className="ad-simulator-container">
          <div className="services-header">
            <div className="section-badge">
              <i className="fa-solid fa-flask-vial"></i> &nbsp; XNTROVA AD LAB
            </div>
            <h2 className="timeline-title">
              Meta &amp; Google <span className="gradient-text">Ad Performance Simulator</span>
            </h2>
            <p className="timeline-desc">
              Experience the science behind our high-converting ad campaigns. Test different creative hooks, formats, and angles to see real-time shifts in CTR, CPA, and blended ROAS.
            </p>
          </div>

          <div className="ad-sim-grid">
            {/* Left Controls Card */}
            <div className="ad-sim-controls-card">
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '12px' }}>
                1. Select Ad Placement &amp; Format:
              </p>
              <div className="ad-format-selector">
                {adFormats.map((fmt) => (
                  <button
                    key={fmt.id}
                    className={`ad-format-pill ${simFormat === fmt.id ? 'active' : ''}`}
                    onClick={() => {
                      playCyberClick();
                      setSimFormat(fmt.id);
                    }}
                  >
                    <i className={fmt.icon}></i>
                    <span>{fmt.name}</span>
                  </button>
                ))}
              </div>

              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '12px' }}>
                2. Test Creative Angle &amp; Psychological Hook:
              </p>
              <div className="ad-hook-options-list">
                {adHooks.map((hk, idx) => (
                  <div
                    key={hk.id}
                    className={`ad-hook-option-btn ${simHook === idx ? 'selected' : ''}`}
                    onClick={() => {
                      playCyberClick();
                      setSimHook(idx);
                    }}
                  >
                    <span className="hook-tag">
                      <i className="fa-solid fa-wand-magic-sparkles"></i> {hk.tag}
                    </span>
                    <h4>{hk.title}</h4>
                    <p>{hk.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '12px', color: '#ee82ee', fontWeight: 700 }}>
                  <i className="fa-solid fa-chart-simple"></i> Benchmark Insight:
                </span>
                <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '4px 0 0' }}>
                  {activeAdHook.statsComparison}
                </p>
              </div>
            </div>

            {/* Right Live Ad Preview & Telemetry */}
            <div className="ad-preview-cockpit">
              <div className="ad-preview-mockup-frame">
                <div className="ad-mockup-header">
                  <div className="ad-mockup-sponsor">
                    <div className="ad-mockup-avatar">X</div>
                    <div>
                      <h5>Xntrova &bull; Sponsored <i className="fa-solid fa-circle-check" style={{ color: '#38bdf8' }}></i></h5>
                      <p>Delhi NCR &bull; Paid Acquisition</p>
                    </div>
                  </div>
                  <i className="fa-solid fa-ellipsis" style={{ color: '#94a3b8' }}></i>
                </div>

                <div className="ad-mockup-body">
                  <img
                    src={activeAdHook.mediaImg}
                    alt={activeAdHook.title}
                    className="ad-mockup-media"
                  />
                  <div className="ad-mockup-overlay-hook">
                    <p>{activeAdHook.title}</p>
                  </div>
                </div>

                <div className="ad-mockup-cta-bar">
                  <div>
                    <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>xntrova.com</span>
                    <strong style={{ fontSize: '13px', color: '#ffffff' }}>Scale with Xntrova</strong>
                  </div>
                  <button
                    className="ad-mockup-cta-btn"
                    onClick={() => {
                      playCyberClick();
                      setLeadForm({ ...leadForm, service: 'Performance Marketing', company: `Hook Interest: ${activeAdHook.tag}` });
                      setModalOpen(true);
                    }}
                  >
                    {activeAdHook.ctaText} &rarr;
                  </button>
                </div>
              </div>

              {/* Live Telemetry Metrics Grid */}
              <div className="ad-telemetry-grid">
                <div className="ad-telemetry-card">
                  <span className="telem-title">Hook Retain (3s)</span>
                  <span className="telem-val pink">{activeAdHook.retainRate}</span>
                  <div className="telem-benchmark">vs 14% industry avg</div>
                </div>

                <div className="ad-telemetry-card">
                  <span className="telem-title">Click-Through Rate</span>
                  <span className="telem-val cyan">{activeAdHook.ctr}</span>
                  <div className="telem-benchmark">3.4x higher than standard</div>
                </div>

                <div className="ad-telemetry-card">
                  <span className="telem-title">Average Cost / CAC</span>
                  <span className="telem-val green">{activeAdHook.cpa}</span>
                  <div className="telem-benchmark">42% lower customer cost</div>
                </div>

                <div className="ad-telemetry-card">
                  <span className="telem-title">Blended ROAS</span>
                  <span className="telem-val green">{activeAdHook.roas}</span>
                  <div className="telem-benchmark">Scalable to {activeAdHook.scalingCap}</div>
                </div>
              </div>

              <button
                className="calc-lock-btn"
                onClick={() => {
                  playCyberClick();
                  setLeadForm({
                    ...leadForm,
                    service: 'Performance Marketing',
                    company: `Target ROAS: ${activeAdHook.roas}, Ad Hook: ${activeAdHook.tag}`
                  });
                  setModalOpen(true);
                }}
              >
                <span>Deploy This Ad Creative Angle</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          VERIFIED GOOGLE REVIEWS SECTION (XNTROVA REAL CLIENTS)
          ======================================================== */}
      <section className="google-reviews-section">
        <div className="google-reviews-container">
          <div className="services-header">
            <div className="section-badge">
              <i className="fa-brands fa-google"></i> &nbsp; VERIFIED REVIEWS
            </div>
            <h2 className="timeline-title">
              Words From Our <span className="gradient-text">Valued Partners</span>
            </h2>
            <p className="timeline-desc">
              Discover why founders and marketing directors choose Xntrova as their primary growth partner.
            </p>
          </div>

          <div className="reviews-grid-deck">
            {googleReviews.map((rev, idx) => (
              <div key={idx} className="google-review-card">
                <div>
                  <div className="reviewer-header">
                    <div className="reviewer-meta">
                      <div className="reviewer-avatar-circle" style={{ backgroundColor: rev.bg }}>
                        {rev.avatar}
                      </div>
                      <div>
                        <h4 className="reviewer-name">{rev.name}</h4>
                        <p className="reviewer-role">{rev.role}</p>
                      </div>
                    </div>
                    {/* Google Icon SVG */}
                    <svg className="google-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"></path>
                      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z"></path>
                      <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.11Z"></path>
                      <path fill="#EA4335" d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75Z"></path>
                    </svg>
                  </div>

                  <div className="review-stars-row">
                    {[...Array(rev.stars)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>

                  <p className="review-quote-text">"{rev.text}"</p>
                </div>

                <div className="review-verified-tag">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>{rev.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          AGENCY PROTOCOL SECTION (THE XNTROVA PROTOCOL)
          ======================================================== */}
      <section className="timeline-section" id="protocol">
        <div className="timeline-header">
          <div className="section-badge">THE XNTROVA PROTOCOL</div>
          <h2 className="timeline-title">
            Our Scientific <span className="gradient-text">Performance Growth Protocol</span>
          </h2>
          <p className="timeline-desc">
            We don't guess with ad spend. Our performance strategists deploy a calibrated 6-phase growth framework to reliably scale your brand.
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line-bg"></div>
          <div className="timeline-line-fill"></div>

          {protocolSteps.map((step, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-content-side">
                <div className="timeline-glass-card">
                  <div className="step-number">{step.num}</div>
                  <div className="step-details">
                    <div className="step-icon">
                      <i className={`fa-solid ${step.icon}`}></i>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>

              <div className="timeline-dot"></div>

              <div className="timeline-empty-side">
                <div className="timeline-image-card">
                  <img src={stockImages[(idx + 1) % stockImages.length]} alt={`${step.title} placeholder`} loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          BEHIND THE SCENES (BTS MASONRY GALLERY)
          ======================================================== */}
      <section className="bts-section" id="bts">
        <div className="bts-glow glow-top"></div>
        <div className="bts-glow glow-bottom-left"></div>
        <div className="bts-glow glow-bottom-right"></div>

        <div className="bts-header">
          <div className="bts-badge">BEHIND THE MACHINE</div>
          <h2 className="bts-title">
            Inside The <span className="gradient-text">Growth Lab</span>
          </h2>
          <p className="bts-desc">
            Take a peek inside the Xntrova engine: campaign control rooms, creative studio sets, and late-night scaling sessions behind 8-figure brands.
          </p>
        </div>

        <div className="bts-container">
          <div className="bts-grid">
            {btsItems.map((item, index) => (
              <div className="bts-item" key={index}>
                <img src={stockImages[(index + 3) % stockImages.length]} alt={`${item.caption} placeholder`} loading="lazy" />
                <div className="bts-overlay">
                  <div className="bts-overlay-content">
                    <p className="bts-caption">{item.caption}</p>
                    <span className="bts-tag">{item.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          TWO PATHS → ONE PEAK (INTERACTIVE MOUNTAIN STORY)
          ======================================================== */}
      <section className="peak-story-section" id="peak-story">
        <div className="fps-header">
          <div className="section-badge">
            <span className="fps-eyebrow-dot"></span> TWO PATHS. ONE PEAK.
          </div>
          <h2 className="fps-title">
            Organic Authority + Paid Performance ={' '}
            <span className="fps-gradient">Maximum Growth</span>
          </h2>
          <p className="fps-intro">
            Organic builds compounding trust and zero-CAC brand equity from one side. Paid Performance injects immediate velocity, qualified reach, and scalable acquisition from the other.
            Watch what happens when both meet at the peak.
          </p>
        </div>

        <div className="fps-stage">
          <div className="fps-atmosphere"></div>

          {/* SVG Animated Mountain */}
          <svg className="fps-svg" viewBox="0 0 1500 690" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="fpsOrganicGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff39da" />
                <stop offset="60%" stopColor="#ff58df" />
                <stop offset="100%" stopColor="#ff9bed" />
              </linearGradient>
              <linearGradient id="fpsPaidGradient" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#8d57ff" />
                <stop offset="60%" stopColor="#a963ff" />
                <stop offset="100%" stopColor="#df86ff" />
              </linearGradient>
              <linearGradient id="fpsMountainFill" x1="0%" y1="100%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="#0b060d" />
                <stop offset="55%" stopColor="#1b0b21" />
                <stop offset="100%" stopColor="#461747" />
              </linearGradient>
              <filter id="fpsOrganicGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="fpsPaidGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Mountain Body Fill */}
            <path
              id="fpsMountainBody"
              className="fps-final-mountain"
              style={{ opacity: 0.28 }}
              d="M 105 555 C 240 550, 330 525, 410 480 C 500 430, 565 360, 625 286 C 675 225, 716 178, 750 150 C 784 178, 825 225, 875 286 C 935 360, 1000 430, 1090 480 C 1170 525, 1260 550, 1395 555 L 1395 606 L 105 606 Z"
            />

            {/* Topology Ridges */}
            <path
              className="fps-final-ridge"
              style={{ opacity: 0.8 }}
              d="M 260 548 C 390 510, 560 390, 750 170 C 940 390, 1110 510, 1240 548"
            />
            <path
              className="fps-final-ridge"
              style={{ opacity: 0.8 }}
              d="M 365 552 C 485 490, 625 345, 750 190 C 875 345, 1015 490, 1135 552"
            />

            {/* Soft Route Shadows */}
            <path
              className="fps-route-shadow fps-organic-shadow"
              style={{ opacity: 1 }}
              d="M 105 555 C 235 550, 315 527, 405 480 C 505 428, 565 359, 625 286 C 675 225, 716 178, 750 150"
            />
            <path
              className="fps-route-shadow fps-paid-shadow"
              style={{ opacity: 1 }}
              d="M 1395 555 C 1265 550, 1185 527, 1095 480 C 995 428, 935 359, 875 286 C 825 225, 784 178, 750 150"
            />

            {/* Actual Animated Curves */}
            <path
              id="fpsOrganicPath"
              className="fps-route fps-organic-route"
              style={{ opacity: 1, strokeWidth: 5 }}
              d="M 105 555 C 235 550, 315 527, 405 480 C 505 428, 565 359, 625 286 C 675 225, 716 178, 750 150"
            />
            <path
              id="fpsPaidPath"
              className="fps-route fps-paid-route"
              style={{ opacity: 1, strokeWidth: 5 }}
              d="M 1395 555 C 1265 550, 1185 527, 1095 480 C 995 428, 935 359, 875 286 C 825 225, 784 178, 750 150"
            />
          </svg>

          {/* Summit Crown Node */}
          <div className="fps-summit" style={{ opacity: 1 }}>
            <div className="fps-peak-core">
              <i className="fa-solid fa-mountain-sun"></i>
            </div>
            <div className="fps-summit-title">
              Maximum <span>Growth</span>
            </div>
            <p style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '6px' }}>
              Organic Authority + Paid Performance
            </p>
          </div>

          {/* Start Cards */}
          <div className="fps-start-card fps-organic-card">
            <div className="fps-start-head">
              <div className="fps-start-icon icon-pink">
                <i className="fa-solid fa-seedling"></i>
              </div>
              <div>
                <div className="fps-start-title">Organic Engine</div>
                <div className="fps-start-meta">Compounding SEO &amp; Authority</div>
              </div>
            </div>
            <p className="fps-start-desc">
              Content, SEO, and community compounding into zero-CAC brand equity over time.
            </p>
          </div>

          <div className="fps-start-card fps-paid-card">
            <div className="fps-start-head">
              <div className="fps-start-icon icon-purple">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div>
                <div className="fps-start-title">Paid Performance</div>
                <div className="fps-start-meta">High-Velocity Acquisition</div>
              </div>
            </div>
            <p className="fps-start-desc">
              Algorithmic Meta &amp; Google Ads delivering immediate, profitable revenue scaling.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PRICING & PACKAGES SECTION (XNTROVA OFFERS)
          ======================================================== */}
      <section className="packages-section" id="packages">
        <div className="packages-header">
          <div className="section-badge">PRICING PLANS</div>
          <h2 className="packages-title">
            Our Growth <span className="gradient-text">Packages</span>
          </h2>
          <p className="packages-desc">
            Build organic market authority or combine it with a full-funnel <strong>paid acquisition</strong> engine.
          </p>
        </div>

        <div className="packages-row">
          {/* Card 1: Growth Diagnostic & Audit */}
          <div className="package-card">
            <div className="package-name">Growth Diagnostic &amp; Audit</div>
            <div className="package-price">₹49,000</div>
            <p className="package-desc">A deep-dive tactical audit to identify the bottlenecks choking your revenue.</p>
            <div className="package-line"></div>

            <div className="highlight-text">With Senior Growth Strategist</div>

            <ul className="package-features">
              <li>
                <i className="fa-solid fa-check"></i> Complete Meta &amp; Google Ad account teardown
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Funnel &amp; landing page conversion rate (CRO) audit
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Tracking, pixel &amp; Conversions API (CAPI) validation
              </li>
              <li>
                <i className="fa-solid fa-check"></i> Competitor reverse-engineering &amp; creative gap analysis
              </li>
              <li>
                <i className="fa-solid fa-check"></i> 90-day prioritized scaling roadmap with exact targets
              </li>
              <li>
                <i className="fa-solid fa-check"></i> 60-minute strategic executive walkthrough session
              </li>
            </ul>

            <div className="highlight-text" style={{ marginTop: 'auto' }}>
              A tailored commercial blueprint for immediate scaling.
            </div>

            <a
              href="https://wa.me/918683828646?text=Hi%20Xntrova,%20I%20would%20like%20to%20book%20a%20Growth%20Diagnostic%20&%20Audit%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="package-btn btn-outline"
            >
              Book Audit
            </a>
          </div>

          {/* Card 2: Performance Growth Engine */}
          <div className="package-card">
            <div className="package-tag tag-value">Paid Engine</div>
            <div className="package-name">Performance Growth Engine</div>
            <div className="package-price">
              ₹1,75,000
              <span style={{ fontSize: '15px', color: '#94a3b8', fontWeight: 500 }}>/month</span>
            </div>
            <p className="package-desc">Done-for-you paid acquisition across Meta &amp; Google Ads to generate high-intent customers.</p>
            <div className="package-line"></div>

            <div className="highlight-text">We handle end-to-end:</div>

            <ul className="package-features">
              <li><i className="fa-solid fa-check"></i> <strong>Meta &amp; Google Ads Management</strong></li>
              <li><i className="fa-solid fa-check"></i> <strong>High-Retention Ad Copywriting &amp; Creative Angles</strong></li>
              <li><i className="fa-solid fa-check"></i> <strong>A/B Testing for Hooks, Creatives &amp; Audiences</strong></li>
              <li><i className="fa-solid fa-check"></i> <strong>ROAS &amp; Customer Acquisition Cost (CAC) Optimization</strong></li>
              <li><i className="fa-solid fa-check"></i> <strong>Weekly Sprint Reviews &amp; 24/7 Live Analytics Dashboard</strong></li>
            </ul>

            <div className="highlight-text" style={{ marginTop: 'auto' }}>
              Engineered to scale ad spend up to ₹10L/month with predictable profitability.
            </div>

            <a
              href="https://wa.me/918683828646?text=Hi%20Xntrova,%20I'm%20interested%20in%20the%20Performance%20Growth%20Engine%20retainer."
              target="_blank"
              rel="noopener noreferrer"
              className="package-btn btn-filled"
            >
              Get Started
            </a>
          </div>

          {/* Card 3: Xntrova 360 Full-Stack Flagship */}
          <div className="package-card featured">
            <div className="package-tag tag-popular">Flagship</div>
            <div className="package-name">Xntrova 360 Full-Stack</div>
            <div className="package-price">
              ₹3,50,000
              <span style={{ fontSize: '15px', color: '#94a3b8', fontWeight: 500 }}>/month</span>
            </div>
            <p className="package-desc">
              The complete <strong>Organic Authority + Paid Performance</strong> growth engine for ambitious brands scaling past 8 figures.
            </p>
            <div className="package-line"></div>

            <div className="highlight-text">
              <strong>Everything in Performance Engine</strong> + full-stack omnichannel dominance:
            </div>

            <ul className="package-features">
              <li><i className="fa-solid fa-check"></i> Omnichannel Ads (Meta, Google Search/PMax &amp; YouTube)</li>
              <li><i className="fa-solid fa-check"></i> Custom High-Converting Landing Page Design &amp; Development</li>
              <li><i className="fa-solid fa-check"></i> End-to-End Creative Direction, UGC &amp; Video Production</li>
              <li><i className="fa-solid fa-check"></i> SEO &amp; Organic Authority Strategy to build zero-CAC traffic</li>
              <li><i className="fa-solid fa-check"></i> Automated Email &amp; SMS Conversion Nurture Sequences</li>
              <li><i className="fa-solid fa-check"></i> Dedicated Fractional Growth Director &amp; Private Slack Channel</li>
              <li><i className="fa-solid fa-check"></i> Ad-spend management scaled up to ₹25L+/month</li>
            </ul>

            <div className="package-note-box">
              <div className="package-note-title">
                <i className="fa-solid fa-circle-info"></i> Direct Partnership
              </div>
              <div className="package-note-text">
                Limited to 3 new brands per quarter to guarantee dedicated executive focus.
              </div>
            </div>

            <a
              href="https://wa.me/918683828646?text=Hi%20Xntrova,%20I%20want%20to%20explore%20the%20Xntrova%20360%20Full-Stack%20Flagship%20partnership."
              target="_blank"
              rel="noopener noreferrer"
              className="package-btn btn-filled"
            >
              Explore Xntrova 360
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          LIMITED BONUS SECTION (HOLOGRAPHIC TICKET)
          ======================================================== */}
      <section className="bonus-section">
        <div className="ticket-container">
          <div className="ticket-left">
            <span className="bonus-label">LIMITED STRATEGY CALL BONUS</span>
            <h2 className="bonus-title">
              1-on-1 Growth Diagnostic <span className="gradient-text">&amp; Roadmap</span>
            </h2>
            <p className="bonus-desc">
              An exclusive <strong>strategy session with an Xntrova Lead Strategist</strong> to teardown your current funnels and engineer an unfair market advantage.
            </p>

            <ul className="bonus-list">
              <li>
                <div className="check-icon"><i className="fa-solid fa-check"></i></div>
                Ad Account &amp; ROAS Teardown
              </li>
              <li>
                <div className="check-icon"><i className="fa-solid fa-check"></i></div>
                90-Day Scaling Blueprint
              </li>
              <li>
                <div className="check-icon"><i className="fa-solid fa-check"></i></div>
                Funnel Bottleneck Diagnosis
              </li>
              <li>
                <div className="check-icon"><i className="fa-solid fa-check"></i></div>
                High-ROI Creative Roadmap
              </li>
            </ul>
          </div>

          <div className="ticket-right">
            <h4 className="roadmap-title">YOUR ROADMAP</h4>
            <div className="roadmap-steps">
              <div className="step-item">
                <div className="step-num">1</div>
                <div className="step-text">Fix Funnel Leaks &amp; Server Tracking</div>
              </div>
              <div className="step-item">
                <div className="step-num">2</div>
                <div className="step-text">Deploy Winning Creative Testing</div>
              </div>
              <div className="step-item">
                <div className="step-num">3</div>
                <div className="step-text">Scale Spend with Predictable ROAS</div>
              </div>
            </div>

            <button onClick={() => setModalOpen(true)} className="bonus-btn">
              Claim Your Free Session <i className="fa-solid fa-arrow-right"></i>
            </button>
            <div className="barcode"></div>
          </div>
        </div>
      </section>

      {/* ========================================================
          VIDEO TESTIMONIALS & CASE BREAKDOWNS (3D GRID)
          ======================================================== */}
      <section className="testimonials-section" id="testimonials">
        <div className="bg-grid-wrap">
          <div className="bg-grid"></div>
        </div>

        <div className="testimonials-header">
          <div className="section-badge">CLIENT PROOF</div>
          <h2 className="testimonials-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="testimonials-desc">Real founder results and video breakdowns from scaled campaigns.</p>
        </div>

        <div className="videos-grid">
          {testimonialVideos.map((item, index) => (
            <div className="video-card" key={index}>
              <div className="video-wrapper">
                <video controls preload="metadata">
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 8px' }}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-handle"
                  >
                    {item.handle}
                  </a>
                  <button
                    className="sfx-toggle-btn active"
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                    onClick={() => {
                      playCyberClick();
                      setActiveVideoModal(item);
                    }}
                  >
                    <i className="fa-solid fa-expand"></i> Case Dossier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="many-more-text" style={{ marginTop: '50px' }}>
          <span className="gradient-text">&amp;</span> 500+ Satisfied Clients Worldwide
        </p>
      </section>

      {/* ========================================================
          FREQUENTLY ASKED QUESTIONS
          ======================================================== */}
      <section className="faq-section" id="faq">
        <div className="faq-header">
          <div className="section-badge">GOT QUESTIONS?</div>
          <h2 className="faq-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="faq-desc">Everything you need to know about partnering with Xntrova</p>
        </div>

        {/* Real-Time FAQ Search Bar */}
        <div className="faq-search-wrapper">
          <i className="fa-solid fa-magnifying-glass faq-search-icon"></i>
          <input
            type="text"
            placeholder="Search FAQs (e.g. ROAS, budget, CAPI, timeline)..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            className="faq-search-input"
          />
        </div>

        {/* FAQ Category Filter Pills */}
        <div className="faq-filter-pills-row">
          <button
            className={`faq-filter-pill ${faqCategory === 'all' ? 'active' : ''}`}
            onClick={() => { playCyberClick(); setFaqCategory('all'); }}
          >
            All Questions ({faqsList.length})
          </button>
          <button
            className={`faq-filter-pill ${faqCategory === 'paid' ? 'active' : ''}`}
            onClick={() => { playCyberClick(); setFaqCategory('paid'); }}
          >
            Paid Ads &amp; ROAS
          </button>
          <button
            className={`faq-filter-pill ${faqCategory === 'cro' ? 'active' : ''}`}
            onClick={() => { playCyberClick(); setFaqCategory('cro'); }}
          >
            CRO &amp; Server CAPI
          </button>
          <button
            className={`faq-filter-pill ${faqCategory === 'pricing' ? 'active' : ''}`}
            onClick={() => { playCyberClick(); setFaqCategory('pricing'); }}
          >
            Pricing &amp; Retainers
          </button>
          <button
            className={`faq-filter-pill ${faqCategory === 'general' ? 'active' : ''}`}
            onClick={() => { playCyberClick(); setFaqCategory('general'); }}
          >
            Agency Partnership
          </button>
        </div>

        <div className="faq-container">
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
              <i className="fa-solid fa-circle-question" style={{ fontSize: '32px', marginBottom: '10px', display: 'block', color: '#ee82ee' }}></i>
              No questions found matching "{faqSearch}". Click below to ask our team directly on WhatsApp!
              <div style={{ marginTop: '16px' }}>
                <a
                  href="https://wa.me/918683828646?text=Hi%20Xntrova,%20I%20have%20a%20question%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="package-btn btn-filled"
                  style={{ display: 'inline-flex', padding: '10px 20px' }}
                >
                  <i className="fa-brands fa-whatsapp"></i> Ask Us on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${openFaq === idx ? 'active' : ''}`}
              >
                <div
                  className="faq-summary"
                  onClick={() => {
                    playCyberClick();
                    setOpenFaq(openFaq === idx ? -1 : idx);
                  }}
                >
                  <span>{faq.q}</span>
                  <div className="faq-icon">
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </div>
                {openFaq === idx && (
                  <div className="faq-content">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* ========================================================
          CONTACT US SECTION (WITH 3D CYBER GRID)
          ======================================================== */}
      <section className="contact-grid-proof" id="contact">
        <div className="bg-grid-wrap">
          <div className="bg-grid"></div>
        </div>

        <div className="grid">
          <div className="img-wrap">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
              alt="Xntrova Digital Marketing Agency Team"
            />
          </div>

          <div className="text">
            <div className="badge">GET IN TOUCH</div>
            <h2>
              Ready to <span className="gradient-text">Scale?</span>
            </h2>
            <p>
              Have questions about our performance packages, ad management, or want to audit your current funnel? We're available <strong>24/7</strong> to help you scale.
              <br /><br />
              Reach us anytime directly on WhatsApp or book a free discovery call.
            </p>

            <a
              href="https://wa.me/918683828646?text=Hi%20Xntrova,%20I'd%20like%20to%20discuss%20scaling%20my%20business%20with%20your%20agency."
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>

            <div className="note">
              <i className="fa-solid fa-location-dot"></i>
              <span>Address: <strong>A107, 2nd Floor, Sector 8, Dwarka, New Delhi - 110077</strong></span>
            </div>
            <div className="note" style={{ marginTop: '10px' }}>
              <i className="fa-solid fa-phone"></i>
              <span>Phone / WhatsApp: <strong>+91 868-382-8646</strong></span>
            </div>
            <div className="note" style={{ marginTop: '10px' }}>
              <i className="fa-solid fa-envelope"></i>
              <span>Email: <strong>info@xntrova.com</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FOOTER (XNTROVA BRANDING)
          ======================================================== */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img
              src={XNTROVA_LOGO}
              alt="Xntrova Digital Marketing Agency"
              className="brand-logo-img"
            />
            <p>
              Xntrova is the premier digital marketing and performance growth agency based in Delhi NCR, serving clients worldwide. We combine creative authority, paid media architecture, and conversion systems to build enduring category leaders.
            </p>
          </div>

          <div className="footer-nav">
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Our Services</a></li>
                <li><a href="#stats">Performance Stats</a></li>
                <li><a href="#calculator">ROI Calculator</a></li>
                <li><a href="#comparison">Why Us</a></li>
                <li><a href="#quiz">Growth Scan</a></li>
                <li><a href="#results">Case Studies</a></li>
                <li><a href="#protocol">Our Protocol</a></li>
                <li><a href="#packages">Pricing Packages</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Core Services</h4>
              <ul>
                <li><a href="#services">Search Engine Optimization (SEO)</a></li>
                <li><a href="#services">Paid Advertising (PPC)</a></li>
                <li><a href="#services">Social Media Marketing</a></li>
                <li><a href="#services">E-Commerce Marketing</a></li>
                <li><a href="#services">Content Marketing</a></li>
                <li><a href="#services">Website Development</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="https://wa.me/918683828646" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-whatsapp"></i> WhatsApp: +91 868-382-8646
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/xntrova/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i> LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/xntrova.agency/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram"></i> Instagram (@xntrova.agency)
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/xntrova/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f"></i> Facebook
                  </a>
                </li>
                <li>
                  <a href="https://x.com/xntrova" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-x-twitter"></i> X / Twitter (@xntrova)
                  </a>
                </li>
                <li>
                  <a href="mailto:info@xntrova.com">
                    <i className="fa-solid fa-envelope"></i> info@xntrova.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Xntrova. All rights reserved. Driven by Ideas. Focused on Results.</p>
          <p>A107, 2nd Floor, Sector 8, Dwarka, New Delhi - 110077 &bull; Serving Global Brands</p>
        </div>
      </footer>

      {/* ========================================================
          LIVE SOCIAL PROOF NOTIFICATION TOAST (BOTTOM-LEFT)
          ======================================================== */}
      {toastVisible && (
        <div className="live-toast-feed">
          <div className="toast-dot-radar"></div>
          <div className="toast-content-text">
            <strong>{activeToast.brand}</strong> {activeToast.action} &bull;{' '}
            <span>{activeToast.metric}</span>
          </div>
          <button
            className="toast-close-btn"
            onClick={() => setToastVisible(false)}
            aria-label="Close notification"
          >
            &times;
          </button>
        </div>
      )}

      {/* ========================================================
          FLOATING WHATSAPP ACTION BEACON
          ======================================================== */}
      <a
        href="https://wa.me/918683828646?text=Hi%20Xntrova,%20I'd%20like%20to%20learn%20more%20about%20your%20digital%20marketing%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Chat with Xntrova on WhatsApp"
      >
        <span className="whatsapp-pulse-ring"></span>
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* ========================================================
          STICKY LUXURY BOTTOM ACTION DOCK
          ======================================================== */}
      <div className={`sticky-bottom-dock ${scrolled ? 'visible' : ''}`}>
        <div className="dock-status-label">
          <span className="dock-live-pulse"></span>
          <span>🟢 2 Free Growth Audit Slots Available This Week</span>
        </div>

        <div className="dock-actions-row">
          <a
            href="https://wa.me/918683828646?text=Hi%20Xntrova,%20I'm%20interested%20in%20scaling%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="dock-call-btn"
          >
            <i className="fa-brands fa-whatsapp" style={{ color: '#25d366' }}></i>
            <span>WhatsApp Us</span>
          </a>

          <a href="tel:+918683828646" className="dock-call-btn">
            <i className="fa-solid fa-phone" style={{ color: '#38bdf8' }}></i>
            <span>+91 868-382-8646</span>
          </a>

          <button onClick={() => setModalOpen(true)} className="dock-cta-btn">
            <span>Get Free Digital Audit</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* ========================================================
          THEATRICAL VIDEO LIGHTBOX MODAL
          ======================================================== */}
      {activeVideoModal && (
        <div className="video-lightbox-overlay active" onClick={() => setActiveVideoModal(null)}>
          <div className="video-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setActiveVideoModal(null)}
              aria-label="Close Case Video"
            >
              &times;
            </button>

            {/* Video Player Side */}
            <div className="video-lightbox-player-col">
              <video controls autoPlay preload="auto">
                <source src={activeVideoModal.url} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>

            {/* Case Dossier Side */}
            <div className="video-lightbox-dossier">
              <div>
                <div className="section-badge" style={{ marginBottom: '14px' }}>
                  <i className="fa-solid fa-crown" style={{ color: '#fbbf24' }}></i> VERIFIED CASE DOSSIER
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                  {activeVideoModal.clientName}
                </h3>
                <span style={{ fontSize: '13px', color: '#ee82ee', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
                  {activeVideoModal.handle}
                </span>

                <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '18px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                    Milestone Delivered:
                  </span>
                  <strong style={{ fontSize: '16px', color: '#4ade80' }}>
                    {activeVideoModal.metrics}
                  </strong>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                    Strategy &amp; Systems Deployed:
                  </span>
                  <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>
                    {activeVideoModal.tactics}
                  </p>
                </div>

                <blockquote style={{ fontSize: '13px', fontStyle: 'italic', color: '#e2e8f0', borderLeft: '2px solid #ee82ee', paddingLeft: '12px', margin: '0 0 20px' }}>
                  "{activeVideoModal.quote}"
                </blockquote>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={`https://wa.me/918683828646?text=Hi%20Xntrova,%20I%20watched%20the%20case%20breakdown%20for%20${encodeURIComponent(activeVideoModal.clientName)}%20and%20want%20to%20scale%20my%20business.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dock-cta-btn"
                  style={{ justifyContent: 'center', width: '100%', padding: '12px 20px' }}
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>Scale Like This (Chat on WhatsApp)</span>
                </a>

                <button
                  className="dock-call-btn"
                  style={{ justifyContent: 'center', width: '100%' }}
                  onClick={() => {
                    playCyberClick();
                    setLeadForm({
                      ...leadForm,
                      company: `Inspired by Case Study: ${activeVideoModal.clientName}`,
                      service: 'Performance Marketing'
                    });
                    setActiveVideoModal(null);
                    setModalOpen(true);
                  }}
                >
                  <i className="fa-solid fa-bolt"></i>
                  <span>Get Strategy Roadmap</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LEAD CAPTURE MODAL / DIGITAL AUDIT POPUP
          ======================================================== */}
      <div className={`lead-modal-overlay ${modalOpen ? 'active' : ''}`}>
        <div className="lead-modal-content">
          <button
            className="fobet-close-btn"
            onClick={() => setModalOpen(false)}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="fobet-modal-header">
            <h3>
              Ready to <span className="fobet-gradient-text">Scale?</span>
            </h3>
            <p>Request a Free Digital Audit &amp; 90-Day Growth Roadmap.</p>
          </div>

          <form onSubmit={handleLeadSubmit}>
            <div className="fobet-input-group">
              <input
                type="text"
                placeholder="Your Full Name*"
                value={leadForm.name}
                onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                required
              />
            </div>
            <div className="fobet-input-group">
              <input
                type="email"
                placeholder="Business Email Address*"
                value={leadForm.email}
                onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                required
              />
            </div>
            <div className="fobet-input-group">
              <input
                type="tel"
                placeholder="Phone / WhatsApp Number*"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                required
              />
            </div>
            <div className="fobet-input-group">
              <input
                type="text"
                placeholder="Company Name or Website URL"
                value={leadForm.company}
                onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
              />
            </div>
            <div className="fobet-input-group">
              <select
                value={leadForm.service}
                onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
              >
                <option value="Performance Marketing">Performance Marketing (Meta &amp; Google Ads)</option>
                <option value="Search Engine Optimization">Search Engine Optimization (SEO)</option>
                <option value="Social Media Optimization">Social Media Optimization (SMO)</option>
                <option value="E-Commerce Marketing">E-Commerce Marketing</option>
                <option value="Content Marketing">Content Marketing</option>
                <option value="Website Development">Website Development</option>
                <option value="Full-Stack Growth (Xntrova 360)">Full-Stack Growth (Xntrova 360)</option>
                <option value="Growth Diagnostic & Audit">Growth Diagnostic &amp; Audit</option>
              </select>
            </div>

            <button type="submit" className="fobet-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                <>
                  <span>Claim Free Digital Audit</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </>
              )}
            </button>

            {formSubmitted && (
              <p className="fobet-success-msg" style={{ display: 'block' }}>
                <i className="fa-solid fa-circle-check"></i> Thank you! An Xntrova strategist will contact you shortly.
              </p>
            )}

            <p className="fobet-privacy-text">
              🔒 Your information is 100% confidential. No spam ever.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
