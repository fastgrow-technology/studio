
-- Add founder section to about page content
update public.pages
set content = content || '{
  "founder": {
    "title": "A Message from Our Founder",
    "image": "https://placehold.co/600x600.png",
    "paragraph": "Welcome to Insurance Plaza. When I started this company, my goal was simple: to bring clarity and trust to an industry that often feels complicated. We are committed to being your partner in protection, providing not just policies, but peace of mind. Thank you for trusting us with what matters most."
  }
}'
where slug = 'about';

-- Add dynamic sections to home page content
update public.pages
set content = content || '{
  "stats": {
    "background_image": "https://placehold.co/1920x400.png",
    "items": [
      { "value": "15+", "label": "Years of Experience" },
      { "value": "5,000+", "label": "Happy Clients" },
      { "value": "9", "label": "Insurance Products" },
      { "value": "24/7", "label": "Customer Support" }
    ]
  },
  "newsletter": {
      "title": "Stay Updated with Insurance Tips & News",
      "subtitle": "Subscribe to our newsletter for the latest insights, exclusive offers, and updates delivered straight to your inbox."
  },
   "testimonials": {
      "title": "What Our Clients Say",
      "subtitle": "Hear from our satisfied clients about their experience with Insurance Plaza."
  },
  "blog": {
      "title": "Latest Insurance Insights",
      "subtitle": "Stay informed with our latest articles on insurance trends, financial planning, and tips to protect what matters most."
  },
  "contact": {
      "title": "Contact Us",
      "subtitle": "Have questions about our insurance services? Get in touch with our team of experts today."
  },
  "services": {
    "title": "Our Insurance Services",
    "subtitle": "Discover our comprehensive range of insurance and financial solutions designed to protect you and your loved ones."
  }
}'
where slug = 'home';
