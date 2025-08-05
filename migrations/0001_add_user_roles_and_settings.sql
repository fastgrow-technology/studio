-- Enable the pgcrypto extension if it's not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL
);

-- Create a view to easily query users with their roles
CREATE OR REPLACE VIEW users_with_roles_view AS
SELECT 
    u.id,
    u.email,
    u.last_sign_in_at,
    r.role
FROM 
    auth.users u
LEFT JOIN 
    user_roles r ON u.id = r.user_id;
    

-- Create the site_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- Insert default settings if they don't exist
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'Insurance Plaza'),
  ('site_description', 'Your trusted partner for comprehensive insurance solutions.'),
  ('site_logo_url', ''),
  ('site_footer_logo_url', ''),
  ('site_favicon_url', ''),
  ('contact_address', '123 Insurance Ave, Suite 100, Toronto, ON, Canada M5B 2L8'),
  ('contact_phone', '+1 (416) 555-0123'),
  ('contact_email', 'contact@insuranceplaza.com'),
  ('contact_map_html', '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22155289.037592396!2d-105.70889426604336!3d47.32404598768217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce05b25f5113af%3A0x70f8425629621e09!2sOntario%2C%20Canada!5e0!3m2!1sen!2sin!4v1752248222327!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'),
  ('facebook_enabled', 'true'),
  ('facebook_url', 'https://facebook.com'),
  ('twitter_enabled', 'true'),
  ('twitter_url', 'https://twitter.com'),
  ('linkedin_enabled', 'true'),
  ('linkedin_url', 'https://linkedin.com'),
  ('instagram_enabled', 'true'),
  ('instagram_url', 'https://instagram.com'),
  ('whatsapp_enabled', 'true'),
  ('whatsapp_recipient_number', '15551234567'),
  ('robots_txt', 'User-agent: *' || chr(10) || 'Allow: /' || chr(10) || 'Sitemap: https://yourdomain.com/sitemap.xml'),
  ('google_analytics_id', ''),
  ('google_tag_manager_id', ''),
  ('facebook_pixel_id', ''),
  ('notification_recipient_email', 'admin@example.com'),
  ('smtp_host', 'smtp.example.com'),
  ('smtp_port', '587'),
  ('smtp_user', 'user@example.com'),
  ('smtp_password', 'your_password')
ON CONFLICT (key) DO NOTHING;

-- Create the pages table if it doesn't exist
CREATE TABLE IF NOT EXISTS pages (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB
);

-- Insert default page content if it doesn't exist
INSERT INTO pages (slug, title, description, content) VALUES
  ('home', 'Insurance Plaza | Your Trusted Insurance Partner', 'Welcome to Insurance Plaza. We offer a wide range of insurance products with the best coverage to protect you and your family. Get a free quote today!', '{"hero": {"title": "Protecting What Matters Most to You", "subtitle": "Comprehensive insurance solutions tailored to your unique needs. Get peace of mind knowing you''re covered for life''s unexpected moments.", "image": "https://placehold.co/1920x700.png"}, "about": {"title": "About Insurance Plaza", "text": "For over 15 years, Insurance Plaza has been a trusted name in the Canadian insurance industry. We specialize in providing personalized insurance and financial solutions that protect what matters most to our clients.", "image": "https://placehold.co/800x600.png"}}'),
  ('about', 'About Us | Insurance Plaza', 'Learn about Insurance Plaza, our mission, our values, and the dedicated team working to protect your future.', '{"hero": {"title": "About Insurance Plaza", "subtitle": "Your dedicated partner in navigating the world of insurance with confidence and ease.", "image": "https://placehold.co/1920x400.png"}, "story": {"title": "Our Story", "text_1": "Founded in 2010, Insurance Plaza was born from a desire to simplify the insurance process and put people first. We saw a need for an insurance provider that was transparent, trustworthy, and genuinely cared about its clients'' well-being.", "text_2": "Over the past decade, we have grown into a leading provider, serving thousands of individuals and families. Our commitment to our founding principles remains unwavering as we continue to innovate and adapt to the evolving needs of our clients.", "image": "https://placehold.co/600x400.png"}, "mission_vision": {"title": "Our Mission & Values", "subtitle": "Our principles guide every decision we make and every interaction we have.", "mission_title": "Our Mission", "mission_text": "To provide accessible, affordable, and comprehensive insurance solutions, empowering our clients to live their lives with financial security and peace of mind.", "values_title": "Our Values", "values_text": "We operate with integrity, empathy, and a commitment to excellence. We build lasting relationships based on trust and mutual respect.", "commitment_title": "Our Commitment", "commitment_text": "We are committed to being there for our clients when they need us most, providing swift, fair, and compassionate support through every claim."}}'),
  ('services', 'Our Services | Insurance Plaza', 'Explore our wide range of insurance services, including life, health, auto, and home insurance. Find the perfect plan to protect what matters most to you.', '{"hero": {"title": "Our Insurance Services", "subtitle": "We offer a comprehensive suite of insurance products designed to provide you with security and peace of mind. Browse our offerings to find the coverage that''s right for you.", "image": "https://placehold.co/1920x400.png"}}'),
  ('blog', 'Blog | Insurance Plaza', 'Read the latest news, articles, and insights on insurance from the experts at Insurance Plaza. Stay informed to make the best decisions for your protection.', '{"hero": {"title": "Insurance Insights", "subtitle": "Our collection of articles and guides to help you understand the world of insurance and make informed decisions.", "image": "https://placehold.co/1920x400.png"}}'),
  ('contact', 'Contact Us | Insurance Plaza', 'Get in touch with Insurance Plaza. Whether you have a question or need a quote, our team is ready to help. Contact us via form, phone, or email.', '{"hero": {"title": "Contact Us", "subtitle": "We''re here to help. Reach out to us with any questions or to get started on your personalized insurance plan.", "image": "https://placehold.co/1920x400.png"}, "form_section": {"title": "Get in Touch", "subtitle": "Our team is available to assist you during our business hours. We look forward to hearing from you."}}'),
  ('get-a-quote', 'Get Your Free Quote - Insurance Plaza | Quick & Easy', 'Get a free, personalized insurance quote from Insurance Plaza. Quick online form, expert advice, and competitive rates for all your insurance needs.', '{"hero": {"title": "Get Your Free Insurance Quote", "subtitle": "Quick, easy, and personalized quotes from Canada''s trusted insurance experts. No obligation, no hidden fees.", "image": "https://placehold.co/1920x600.png"}, "benefits": {"benefit_1": "Get quotes in 5 minutes", "benefit_2": "100% secure & confidential", "benefit_3": "No fees or obligations"}}')
ON CONFLICT (slug) DO NOTHING;

-- Create the services table if it doesn't exist
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    image TEXT,
    short_description TEXT,
    long_description TEXT,
    show_benefits BOOLEAN DEFAULT FALSE,
    benefits JSONB,
    show_target_audience BOOLEAN DEFAULT FALSE,
    target_audience TEXT,
    show_plans BOOLEAN DEFAULT FALSE,
    plans JSONB,
    show_steps BOOLEAN DEFAULT FALSE,
    steps JSONB,
    show_faqs BOOLEAN DEFAULT FALSE,
    faqs JSONB,
    show_related_services BOOLEAN DEFAULT FALSE,
    related_services TEXT[]
);

-- Insert default services if the table is empty
INSERT INTO services (slug, title, image, short_description, long_description, show_benefits, benefits, show_target_audience, target_audience, show_plans, plans, show_steps, steps, show_faqs, faqs, show_related_services, related_services) VALUES
('life-insurance', 'Life Insurance', 'https://placehold.co/400x300.png', 'Secure your family''s future with comprehensive life insurance coverage.', 'Our life insurance policies provide a financial safety net for your loved ones in the event of your passing. This tax-free benefit can be used to cover final expenses, pay off debts, fund education, or simply maintain your family''s standard of living. We offer various types of life insurance, including Term, Whole Life, and Universal Life, each with unique features to suit your long-term financial goals.', true, '[{"title": "Financial Security", "description": "Provide a tax-free lump sum to your beneficiaries."}, {"title": "Debt Coverage", "description": "Ensure mortgages, loans, and other debts are paid off."}, {"title": "Income Replacement", "description": "Replace your income to support your family''s lifestyle."}, {"title": "Final Expenses", "description": "Cover funeral costs and other end-of-life expenses."}]', true, 'Individuals and families looking to protect their loved ones financially from the unexpected.', true, '[{"name": "Basic Term", "price": "$30/mo", "features": ["$250,000 coverage", "20-year term", "Fixed premiums"]}, {"name": "Family Protect", "price": "$55/mo", "features": ["$500,000 coverage", "30-year term", "Includes child rider"]}, {"name": "Permanent", "price": "$120/mo", "features": ["$250,000 coverage", "Lifelong protection", "Cash value growth"]}]', true, '[{"title": "Consultation", "description": "We start with a free, no-obligation consultation to understand your needs and financial situation."}, {"title": "Quotation", "description": "We provide you with personalized quotes from Canada''s top insurance providers."}, {"title": "Application", "description": "We guide you through the application process, making it simple and straightforward."}, {"title": "Approval", "description": "Once approved, your policy is active, and your family is protected."}]', true, '[{"question": "What is the difference between term and whole life insurance?", "answer": "Term life insurance covers you for a specific period (e.g., 20 years), while whole life insurance provides coverage for your entire life and includes a cash value component."}, {"question": "How much life insurance do I need?", "answer": "The amount depends on various factors like your income, debts, and future family needs. A common rule of thumb is 7-10 times your annual income, but we recommend a personalized assessment."}]', true, '{"visitor-insurance", "supervisa-insurance", "health-dental"}'),
('visitor-insurance', 'Visitor Insurance', 'https://placehold.co/400x300.png', 'Comprehensive medical coverage for visitors to Canada.', 'Protect your visiting friends and family with our flexible visitor insurance plans. Covering unforeseen medical emergencies, our plans ensure your guests have access to healthcare without facing significant out-of-pocket expenses. Coverage is available for single trips or multiple entries, providing peace of mind for both you and your visitors.', true, '[{"title": "Emergency Medical", "description": "Up to $1 million in coverage for medical emergencies."}, {"title": "24/7 Assistance", "description": "Access to multilingual support anytime, anywhere."}, {"title": "Flexible Plans", "description": "Coverage for single trips or multiple visits throughout the year."}, {"title": "Direct Billing", "description": "We can often bill medical providers directly, reducing paperwork."}]', true, 'Tourists, business travelers, and individuals visiting family in Canada who are not covered by provincial health plans.', false, null, true, '[{"title": "Get a Quote", "description": "Provide visitor details like age and trip duration to get a personalized quote."}, {"title": "Choose Your Plan", "description": "Select the coverage amount and deductible that best fits your needs and budget."}, {"title": "Purchase Online", "description": "Buy your policy securely online and receive your documents instantly via email."}]', true, '[{"question": "Is visitor insurance mandatory in Canada?", "answer": "While not always mandatory, it is highly recommended as healthcare costs in Canada can be very high for non-residents."}, {"question": "Does this cover pre-existing conditions?", "answer": "Coverage for pre-existing conditions depends on the plan and the stability of the condition. Please contact us for a detailed assessment."}]', true, '{"supervisa-insurance", "travel-insurance", "life-insurance"}'),
('supervisa-insurance', 'Super Visa Insurance', 'https://placehold.co/400x300.png', 'Required medical insurance for Super Visa applicants.', 'Our Super Visa insurance plans meet and exceed the requirements set by Immigration, Refugees and Citizenship Canada (IRCC). We provide at least $100,000 in medical coverage, valid for 365 days from entry, ensuring your application process is smooth and your visiting parents or grandparents are well-protected during their extended stay in Canada.', true, '[{"title": "IRCC Compliant", "description": "Meets all requirements for the Canadian Super Visa application."}, {"title": "Comprehensive Coverage", "description": "Includes hospitalization, prescription drugs, and specialist visits."}, {"title": "Monthly Payment Options", "description": "Flexible payment plans to make coverage more affordable."}, {"title": "Easy Renewals", "description": "Simple process to renew or extend the policy if needed."}]', true, 'Parents and grandparents of Canadian citizens or permanent residents applying for a Super Visa.', true, '[{"name": "Standard", "price": "$180/mo", "features": ["$100,000 coverage", "$1,000 deductible", "Stable pre-existing conditions"]}, {"name": "Enhanced", "price": "$250/mo", "features": ["$200,000 coverage", "$500 deductible", "Broader pre-existing condition coverage"]}, {"name": "Premium", "price": "$320/mo", "features": ["$300,000 coverage", "$0 deductible", "Comprehensive coverage"]}]', false, null, false, null, true, '{"visitor-insurance", "health-dental", "financial-services"}')
ON CONFLICT (slug) DO NOTHING;

-- Create blog_posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    author TEXT,
    published_at TIMESTAMPTZ,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default blog posts if the table is empty
INSERT INTO blog_posts (slug, title, author, published_at, excerpt, content, image) VALUES
('understanding-life-insurance', 'Understanding Life Insurance: A Beginner''s Guide', 'Admin', '2025-07-02 10:00:00+00', 'Explore different life insurance policies and learn how to choose the right coverage to protect your loved ones.', '<p>Life insurance is a crucial financial tool, but it can often seem daunting. This guide will walk you through the fundamentals, including the different types of policies, how to determine the right amount of coverage, and what to look for in a provider. We believe that with the right information, everyone can make a choice that brings them peace of mind.</p><p>We will cover term life, whole life, and universal life insurance policies, explaining the pros and cons of each. Understanding these differences is the first step toward securing your family''s financial future.</p>', 'https://placehold.co/600x400.png'),
('travel-insurance-tips', '5 Essential Tips for Canadian Travelers', 'Admin', '2025-06-28 10:00:00+00', 'Learn how to select the right travel insurance for your next international trip and avoid common pitfalls.', '<p>Choosing a health insurance plan is one of the most important decisions you can make. In this article, we share five key tips to consider, from understanding network options (HMO, PPO, etc.) to evaluating deductibles and out-of-pocket maximums. We''ll equip you with the knowledge to choose wisely.</p>', 'https://placehold.co/600x400.png')
ON CONFLICT (slug) DO NOTHING;

-- Create testimonials table if it doesn't exist
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    quote TEXT,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO testimonials (name, role, quote, image) VALUES
('Sarah Mitchell', 'Life Insurance Client', 'Insurance Plaza made finding the right life insurance policy so easy. Their advisor took the time to understand my family''s needs and found us the perfect coverage at a great rate. Highly recommend!', 'https://i.pravatar.cc/100?u=sarah'),
('Raj Patel', 'Supervisa Insurance Client', 'When my parents were planning to visit from India, Insurance Plaza helped us secure their Super Visa insurance quickly and efficiently. The process was smooth, and their team was very knowledgeable.', 'https://i.pravatar.cc/100?u=raj'),
('Michael Thompson', 'Financial Services Client', 'I''ve been working with Insurance Plaza for both my RRSP and TFSA accounts. Their financial advisor created a personalized plan that''s already showing great results. Their expertise has been invaluable.', 'https://i.pravatar.cc/100?u=michael')
ON CONFLICT (id) DO NOTHING;

-- Create team_members table if it doesn't exist
CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO team_members (name, role, image) VALUES
('John Carter', 'Founder & CEO', 'https://i.pravatar.cc/150?u=john'),
('Emily Chen', 'Lead Insurance Advisor', 'https://i.pravatar.cc/150?u=emily'),
('David Lee', 'Financial Services Specialist', 'https://i.pravatar.cc/150?u=david'),
('Maria Garcia', 'Client Support Manager', 'https://i.pravatar.cc/150?u=maria')
ON CONFLICT (id) DO NOTHING;

-- Create contact_submissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
