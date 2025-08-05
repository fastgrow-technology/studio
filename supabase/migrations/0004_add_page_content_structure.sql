
-- Update Home Page Content Structure
UPDATE pages
SET content = '{
  "hero": {
    "title": "Protecting What Matters Most to You",
    "subtitle": "Comprehensive insurance solutions tailored to your unique needs. Get peace of mind knowing you''re covered for life''s unexpected moments.",
    "image": "https://placehold.co/1920x700.png"
  },
  "services": {
    "title": "Our Insurance Services",
    "subtitle": "Discover our comprehensive range of insurance and financial solutions designed to protect you and your loved ones."
  },
  "about": {
    "title": "About Insurance Plaza",
    "text": "For over 15 years, Insurance Plaza has been a trusted name in the Canadian insurance industry. We specialize in providing personalized insurance and financial solutions that protect what matters most to our clients.",
    "image": "https://placehold.co/800x600.png",
    "features": [
      { "text": "Travel Protection" },
      { "text": "24/7 Support" },
      { "text": "Convertible Policies" },
      { "text": "Easy Claims" }
    ]
  },
  "testimonials": {
    "title": "What Our Clients Say",
    "subtitle": "Hear from our satisfied clients about their experience with Insurance Plaza."
  },
  "stats": {
    "background_image": "https://placehold.co/1920x400.png",
    "items": [
      { "value": "15+", "label": "Years of Experience" },
      { "value": "5,000+", "label": "Happy Clients" },
      { "value": "9", "label": "Insurance Products" },
      { "value": "24/7", "label": "Customer Support" }
    ]
  },
  "blog": {
    "title": "Latest Articles",
    "subtitle": "Stay informed with our latest news, tips, and articles from the world of insurance."
  },
  "newsletter": {
    "title": "Stay Updated",
    "subtitle": "Subscribe to our newsletter to get the latest news and updates."
  },
  "contact": {
    "title": "Get In Touch",
    "subtitle": "Have a question? We’d love to hear from you. Send us a message and we’ll respond as soon as possible."
  }
}'
WHERE slug = 'home';

-- Update About Page Content Structure to include Founder section
UPDATE pages
SET content = '{
    "hero": {
        "title": "About Insurance Plaza",
        "subtitle": "Your dedicated partner in navigating the world of insurance with confidence and ease.",
        "image": "https://placehold.co/1920x400.png"
    },
    "story": {
        "title": "Our Story",
        "text_1": "Founded in 2010, Insurance Plaza was born from a desire to simplify the insurance process and put people first. We saw a need for an insurance provider that was transparent, trustworthy, and genuinely cared about its clients'' well-being.",
        "text_2": "Over the past decade, we have grown into a leading provider, serving thousands of individuals and families. Our commitment to our founding principles remains unwavering as we continue to innovate and adapt to the evolving needs of our clients.",
        "image": "https://placehold.co/600x400.png"
    },
    "mission_vision": {
        "title": "Our Mission & Values",
        "subtitle": "Our principles guide every decision we make and every interaction we have.",
        "mission_title": "Our Mission",
        "mission_text": "To provide accessible, affordable, and comprehensive insurance solutions, empowering our clients to live their lives with financial security and peace of mind.",
        "values_title": "Our Values",
        "values_text": "We operate with integrity, empathy, and a commitment to excellence. We build lasting relationships based on trust and mutual respect.",
        "commitment_title": "Our Commitment",
        "commitment_text": "We are committed to being there for our clients when they need us most, providing swift, fair, and compassionate support through every claim."
    },
    "founder": {
        "title": "A Message from Our Founder",
        "paragraph": "When I started Insurance Plaza, my goal was simple: to create an insurance company that people could actually trust. We’ve grown a lot since then, but our core mission of putting clients first has never changed. Thank you for being part of our journey.",
        "image": "https://placehold.co/600x600.png"
    }
}'
WHERE slug = 'about';

