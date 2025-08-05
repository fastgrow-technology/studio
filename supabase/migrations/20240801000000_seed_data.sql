
-- Seed data for the site_settings table
INSERT INTO public.site_settings (key, value) VALUES
('site_name', 'Insurance Plaza'),
('site_description', 'Your trusted partner for comprehensive insurance solutions.'),
('site_logo_url', 'https://storage.googleapis.com/stey-public-images/insurance_logo.png'),
('site_footer_logo_url', 'https://storage.googleapis.com/stey-public-images/insurance_logo_white.png'),
('site_favicon_url', 'https://storage.googleapis.com/stey-public-images/insurance_favicon.png'),
('contact_address', '123 Insurance Ave, Suite 456, Toronto, ON, M5B 2L8, Canada'),
('contact_phone', '+1 (416) 555-0123'),
('contact_email', 'contact!@insuranceplaza.ca'),
('contact_map_html', '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d369302.9754832924!2d-79.93278201264887!3d43.71736024641151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1626878892400!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'),
('facebook_enabled', 'true'),
('facebook_url', 'https://facebook.com'),
('twitter_enabled', 'true'),
('twitter_url', 'https://twitter.com'),
('linkedin_enabled', 'true'),
('linkedin_url', 'https://linkedin.com'),
('instagram_enabled', 'true'),
('instagram_url', 'https://instagram.com'),
('whatsapp_enabled', 'true'),
('whatsapp_recipient_number', '14165550123'),
('robots_txt', 'User-agent: *\nAllow: /'),
('google_analytics_id', ''),
('google_tag_manager_id', ''),
('facebook_pixel_id', ''),
('notification_recipient_email', 'admin@example.com'),
('smtp_host', 'smtp.example.com'),
('smtp_port', '587'),
('smtp_user', 'user@example.com'),
('smtp_password', 'your_password')
ON CONFLICT (key) DO NOTHING;


-- Seed data for the pages table
INSERT INTO public.pages (slug, title, description, content) VALUES
('home', 'Insurance Plaza | Your Trusted Insurance Partner', 'Welcome to Insurance Plaza. We offer a wide range of insurance products with the best coverage to protect you and your family. Get a free quote today!', '{
  "hero": {
    "title": "Protecting What Matters Most to You",
    "subtitle": "Comprehensive insurance solutions tailored to your unique needs. Get peace of mind knowing you''re covered for life''s unexpected moments.",
    "image": "https://placehold.co/1920x700.png"
  },
  "about": {
    "title": "Your Trusted Insurance Partner in Canada",
    "text": "For over 15 years, Insurance Plaza has been a trusted name in the Canadian insurance industry. We specialize in providing personalized insurance and financial solutions that protect what matters most to our clients.",
    "image": "https://placehold.co/800x600.png"
  }
}'),
('about', 'About Us | Insurance Plaza', 'Learn about Insurance Plaza, our mission, our values, and the dedicated team working to protect your future.', '{
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
  }
}'),
('contact', 'Contact Us | Insurance Plaza', 'Get in touch with Insurance Plaza. Whether you have a question or need a quote, our team is ready to help. Contact us via form, phone, or email.', '{
  "hero": {
    "title": "Contact Us",
    "subtitle": "We''re here to help. Reach out to us with any questions or to get started on your personalized insurance plan.",
    "image": "https://placehold.co/1920x400.png"
  },
  "form_section": {
    "title": "Get in Touch",
    "subtitle": "Our team is available to assist you during our business hours. We look forward to hearing from you."
  }
}'),
('blog', 'Blog | Insurance Plaza', 'Read the latest news, articles, and insights on insurance from the experts at Insurance Plaza. Stay informed to make the best decisions for your protection.', '{
  "hero": {
    "title": "Insurance Insights",
    "subtitle": "Our collection of articles and guides to help you understand the world of insurance and make informed decisions.",
    "image": "https://placehold.co/1920x400.png"
  }
}'),
('services', 'Our Services | Insurance Plaza', 'Explore our wide range of insurance services, including life, health, auto, and home insurance. Find the perfect plan to protect what matters most to you.', '{
  "hero": {
    "title": "Our Insurance Services",
    "subtitle": "We offer a comprehensive suite of insurance products designed to provide you with security and peace of mind. Browse our offerings to find the coverage that''s right for you.",
    "image": "https://placehold.co/1920x400.png"
  }
}'),
('get-in-touch', 'Get Your Free Quote - Insurance Plaza | Quick & Easy', 'Get a free, personalized insurance quote from Insurance Plaza. Quick online form, expert advice, and competitive rates for all your insurance needs.', '{
    "hero": {
        "title": "Get Your Free Insurance Quote",
        "subtitle": "Quick, easy, and personalized quotes from Canada''s trusted insurance experts. No obligation, no hidden fees.",
        "image": "https://placehold.co/1920x600.png"
    },
    "benefits": {
        "benefit_1": "Get quotes in 5 minutes",
        "benefit_2": "100% secure & confidential",
        "benefit_3": "No fees or obligations"
    }
}')
ON CONFLICT (slug) DO NOTHING;

-- Seed data for the services table
INSERT INTO public.services (slug, title, image, short_description, long_description, show_benefits, benefits, show_target_audience, target_audience, show_plans, plans, show_steps, steps, show_faqs, faqs, show_related_services, related_services) VALUES
('life-insurance', 'Life Insurance', 'https://placehold.co/400x300.png', 'Secure your family''s future with comprehensive life insurance coverage.', 'Our life insurance policies provide a financial safety net for your loved ones in the event of your passing. This tax-free benefit can be used to cover final expenses, pay off debts, fund education, or simply maintain your family''s standard of living. We offer various types of life insurance, including Term, Whole Life, and Universal Life, each with unique features to suit your long-term financial goals.', true, '[{"title": "Financial Security", "description": "Provide a tax-free lump sum to your beneficiaries."}, {"title": "Debt Coverage", "description": "Ensure mortgages, loans, and other debts are paid off."}, {"title": "Income Replacement", "description": "Replace your income to support your family''s lifestyle."}, {"title": "Final Expenses", "description": "Cover funeral costs and other end-of-life expenses."}]', true, 'Individuals and families looking to protect their loved ones financially from the unexpected.', true, '[{"name": "Basic Term", "price": "$30/mo", "features": ["$250,000 coverage", "20-year term", "Fixed premiums"]}, {"name": "Family Protect", "price": "$55/mo", "features": ["$500,000 coverage", "30-year term", "Includes child rider"]}, {"name": "Permanent", "price": "$120/mo", "features": ["$250,000 coverage", "Lifelong protection", "Cash value growth"]}]', true, '[{"title": "Consultation", "description": "We start with a free, no-obligation consultation to understand your needs and financial situation."}, {"title": "Quotation", "description": "We provide you with personalized quotes from Canada''s top insurance providers."}, {"title": "Application", "description": "We guide you through the application process, making it simple and straightforward."}, {"title": "Approval", "description": "Once approved, your policy is active, and your family is protected."}]', true, '[{"question": "What is the difference between term and whole life insurance?", "answer": "Term life insurance covers you for a specific period (e.g., 20 years), while whole life insurance provides coverage for your entire life and includes a cash value component."}, {"question": "How much life insurance do I need?", "answer": "The amount depends on various factors like your income, debts, and future family needs. A common rule of thumb is 7-10 times your annual income, but we recommend a personalized assessment."}]', true, '["visitor-insurance", "supervisa-insurance", "health-dental"]'),
('visitor-insurance', 'Visitor Insurance', 'https://placehold.co/400x300.png', 'Essential medical coverage for visitors to Canada.', 'Protect your visiting family and friends with our visitor insurance. This plan covers emergency medical expenses, hospitalization, prescription drugs, and more, ensuring they have access to quality healthcare without facing significant out-of-pocket costs during their stay in Canada.', true, '[{"title": "Emergency Medical", "description": "Up to $100,000 in coverage for unforeseen medical emergencies."}, {"title": "Hospitalization", "description": "Covers costs for hospital stays, including room and board."}, {"title": "24/7 Assistance", "description": "Access to multilingual emergency support anytime, anywhere."}, {"title": "Flexible Plans", "description": "Coverage available for various trip durations and ages."}]', true, 'Tourists, business travelers, new immigrants awaiting provincial health coverage, and families with visiting relatives.', false, null, true, '[{"title": "Get a Quote", "description": "Provide visitor''s age, trip duration, and desired coverage amount."}, {"title": "Compare Plans", "description": "Choose from a variety of plans that best suit your needs and budget."}, {"title": "Purchase Online", "description": "Buy your policy securely online and receive your documents instantly."}]', true, '[{"question": "Is visitor insurance mandatory for entering Canada?", "answer": "While not always mandatory, it is highly recommended by the Canadian government as foreign visitors are not covered by provincial health plans."}, {"question": "Can I buy insurance after the visitor has arrived?", "answer": "Yes, coverage can be purchased after arrival, but there may be a waiting period for illnesses. It''s best to buy before the trip begins."}]', true, '["supervisa-insurance", "travel-insurance", "life-insurance"]'),
('supervisa-insurance', 'Super Visa Insurance', 'https://placehold.co/400x300.png', 'Mandatory insurance for parents and grandparents visiting on a Super Visa.', 'A Super Visa allows parents and grandparents to visit family in Canada for up to two years at a time. A key requirement for the application is proof of Canadian medical insurance. Our Super Visa insurance plans meet and exceed all government requirements, providing comprehensive coverage for peace of mind.', true, '[{"title": "Govt. Compliant", "description": "Meets all IRCC requirements for Super Visa applications."}, {"title": "Comprehensive Coverage", "description": "$100,000 minimum medical coverage for one full year."}, {"title": "Flexible Payment", "description": "Option to pay in monthly installments or all at once."}, {"title": "Full Refunds", "description": "100% refund if the Super Visa application is denied."}]', true, 'Canadian citizens or permanent residents inviting their parents or grandparents to Canada on a Super Visa.', true, '[{"name": "Standard", "price": "$150/mo", "features": ["$100,000 coverage", "Pre-existing conditions covered for stable", "Direct billing with providers"]}, {"name": "Enhanced", "price": "$180/mo", "features": ["$150,000 coverage", "Higher benefit limits", "Includes trip interruption"]}]', false, null, true, '[{"question": "Why is Super Visa insurance required?", "answer": "It ensures that visitors have adequate medical coverage and will not be a financial burden on Canada''s healthcare system."}, {"question": "Can I get a refund if the visa is not approved?", "answer": "Yes, we provide a full refund of your premium if you provide proof of the visa denial."}]', true, '["visitor-insurance", "health-dental", "life-insurance"]'),
('health-dental', 'Health & Dental', 'https://placehold.co/400x300.png', 'Personal health and dental plans for individuals and families.', 'Bridge the gap left by provincial health coverage. Our personal health and dental plans cover everyday medical needs like prescription drugs, dental check-ups, vision care, physiotherapy, and more. Ideal for self-employed individuals, retirees, or anyone without a group benefits plan.', true, '[{"title": "Prescription Drugs", "description": "Coverage for a wide range of prescription medications."}, {"title": "Dental Care", "description": "Includes routine check-ups, cleanings, fillings, and major dental work."}, {"title": "Vision Care", "description": "Covers eye exams, glasses, and contact lenses."}, {"title": "Paramedical Services", "description": "Access to specialists like chiropractors, and massage therapists."}]', true, 'Self-employed professionals, contract workers, small business owners, retirees, and families seeking comprehensive health coverage.', false, null, false, null, false, null, true, '["life-insurance", "visitor-insurance", "financial-services"]'),
('travel-insurance', 'Travel Insurance', 'https://placehold.co/400x300.png', 'Travel with confidence with our comprehensive travel insurance.', 'Whether you''re traveling outside your province or outside of Canada, our travel insurance plans protect you from unexpected medical emergencies and travel mishaps. We offer single-trip, multi-trip annual plans, and all-inclusive packages to suit your travel style.', true, '[{"title": "Emergency Medical", "description": "Up to $10 million in coverage for medical emergencies abroad."}, {"title": "Trip Cancellation", "description": "Get reimbursed for non-refundable travel costs if your trip is cancelled."}, {"title": "Baggage Protection", "description": "Coverage for lost, stolen, or damaged baggage and personal effects."}, {"title": "All-Inclusive Plans", "description": "Combine medical, trip cancellation, and baggage for total peace of mind."}]', true, 'Canadians traveling outside their home province or country for vacation, business, or study.', false, null, false, null, false, null, true, '["visitor-insurance", "supervisa-insurance", "health-dental"]'),
('financial-services', 'RESP/RRSP/TFSA', 'https://placehold.co/400x300.png', 'Smart investment solutions for your financial goals.', 'Secure your future with our range of investment and savings plans. We offer Registered Education Savings Plans (RESPs) to save for your child''s education, Registered Retirement Savings Plans (RRSPs) to build your nest egg, and Tax-Free Savings Accounts (TFSAs) for flexible, tax-free growth.', true, '[{"title": "RESP", "description": "Save for education and benefit from government grants."}, {"title": "RRSP", "description": "Lower your taxable income and save for a comfortable retirement."}, {"title": "TFSA", "description": "Grow your savings tax-free for any goal you have in mind."}, {"title": "Expert Guidance", "description": "Our advisors help you choose the right investment mix."}]', true, 'Individuals and families planning for major life goals such as education, retirement, or general wealth accumulation.', false, null, false, null, false, null, true, '["life-insurance", "health-dental"]')
ON CONFLICT (slug) DO NOTHING;


-- Seed data for the blog_posts table
INSERT INTO public.blog_posts (slug, title, author, published_at, excerpt, content, image) VALUES
('understanding-life-insurance', 'Understanding the Basics of Life Insurance', 'John Doe', '2024-07-15 10:00:00', 'A comprehensive guide to help you understand the different types of life insurance and choose the one that''s right for you.', '<h2>What is Life Insurance?</h2><p>Life insurance is a contract between you and an insurer. In exchange for premium payments, the insurer provides a lump-sum payment, known as a death benefit, to your beneficiaries upon your death.</p><h3>Types of Life Insurance</h3><ul><li><strong>Term Life Insurance:</strong> Provides coverage for a specific term (e.g., 10, 20, or 30 years). It’s generally the most affordable option.</li><li><strong>Whole Life Insurance:</strong> A type of permanent insurance that covers you for your entire life and includes a savings component (cash value).</li><li><strong>Universal Life Insurance:</strong> Another type of permanent insurance offering more flexibility in premium payments and death benefits.</li></ul>', 'https://placehold.co/600x400.png'),
('top-5-travel-insurance-tips', 'Top 5 Tips for Buying Travel Insurance', 'Jane Smith', '2024-07-10 14:30:00', 'Don''t leave home without it! Here are five essential tips to ensure you get the best travel insurance coverage for your next trip.', '<h3>1. Buy Early</h3><p>Purchase your travel insurance as soon as you book your trip. This ensures you''re covered for trip cancellation if something unexpected happens before you depart.</p><h3>2. Understand the Policy</h3><p>Read the fine print. Know what is and isn''t covered, especially regarding pre-existing medical conditions.</p><h3>3. Choose Adequate Coverage</h3><p>Don''t just go for the cheapest plan. Make sure the medical coverage limit is sufficient for the country you''re visiting (e.g., at least $1 million for trips to the USA).</p><h3>4. Declare All Medical Conditions</h3><p>Be honest about your health history. Failing to disclose a pre-existing condition can void your policy when you need it most.</p><h3>5. Know Who to Call</h3><p>Keep the emergency contact number for your insurance provider handy. Save it in your phone and have a physical copy.</p>', 'https://placehold.co/600x400.png'),
('super-visa-insurance-explained', 'Super Visa Insurance: A Complete Guide for Applicants', 'Admin', '2024-07-05 09:00:00', 'Navigating the requirements for a Super Visa can be tricky. This guide breaks down everything you need to know about the mandatory medical insurance.', '<h2>Why is Insurance Mandatory?</h2><p>The Canadian government requires Super Visa applicants to have medical insurance to ensure they are covered for healthcare costs during their stay, preventing a burden on the Canadian healthcare system.</p><h3>Key Requirements:</h3><ul><li>Must be purchased from a Canadian insurance company.</li><li>Must provide a minimum of $100,000 in coverage.</li><li>Must be valid for at least one year from the date of entry to Canada.</li><li>Must cover healthcare, hospitalization, and repatriation.</li></ul><p>We offer a range of compliant plans and can provide the necessary documentation for your application. Contact us today to learn more.</p>', 'https://placehold.co/600x400.png'),
('resp-vs-tfsa', 'RESP vs. TFSA: Which is Better for Education Savings?', 'Emily White', '2024-06-28 11:00:00', 'Both are powerful savings tools, but they have different features. We compare RESPs and TFSAs to help you decide the best way to save for a child''s education.', '<p>Deciding how to save for a child''s post-secondary education is a significant financial decision. Let''s break down two popular options: the Registered Education Savings Plan (RESP) and the Tax-Free Savings Account (TFSA).</p><h3>RESP - The Education Specialist</h3><p><strong>Pros:</strong> The biggest advantage is the Canada Education Savings Grant (CESG), where the government matches 20% of your contributions, up to $500 per year. <br><strong>Cons:</strong> The funds must be used for qualified educational expenses. If the child doesn''t pursue post-secondary education, the grant portion must be returned.</p><h3>TFSA - The Flexible All-Rounder</h3><p><strong>Pros:</strong> The money can be used for anything, not just education, and all growth is tax-free. There are no contribution matching grants, but the flexibility is a major plus.<br><strong>Cons:</strong> You miss out on the "free money" from the CESG.</p><h3>Conclusion</h3><p>For dedicated education savings, the RESP is almost always the superior choice due to the CESG. However, a TFSA can be a great supplementary savings vehicle or an alternative if flexibility is your top priority.</p>', 'https://placehold.co/600x400.png'),
('personal-health-insurance-benefits', 'Why You Need Personal Health Insurance in Canada', 'Michael Brown', '2024-06-20 16:45:00', 'Provincial health plans are great, but they don''t cover everything. Learn how personal health insurance can protect you from significant out-of-pocket expenses.', '<p>Many Canadians believe their provincial health plan covers all their medical needs, but there are significant gaps. Personal health insurance is designed to fill these gaps.</p><h3>What''s Not Covered by Government Plans?</h3><ul><li><strong>Prescription Drugs:</strong> Outside of the hospital, most provinces offer limited or no coverage for prescription medications.</li><li><strong>Dental Care:</strong> Routine check-ups, cleanings, and major dental work are typically not covered.</li><li><strong>Vision Care:</strong> Eye exams, glasses, and contact lenses are paid for out-of-pocket.</li><li><strong>Paramedical Services:</strong> Services like physiotherapy, massage therapy, and chiropractic care are not included.</li></ul><p>A personal health insurance plan can save you thousands of dollars in the long run and ensure you have access to the care you need, when you need it.</p>', 'https://placehold.co/600x400.png'),
('how-to-save-money-on-insurance', '5 Simple Ways to Save Money on Your Insurance Premiums', 'Admin', '2024-06-12 09:20:00', 'Insurance is a necessity, but it doesn''t have to break the bank. Here are five practical tips to lower your costs without sacrificing coverage.', '<p>Everyone wants good value for their money. Here’s how you can get the right insurance coverage at a better price.</p><ol><li><strong>Bundle Your Policies:</strong> Most companies offer a discount if you buy multiple types of insurance from them, like home and auto.</li><li><strong>Increase Your Deductible:</strong> A higher deductible (the amount you pay before insurance kicks in) usually means a lower premium. Just make sure it''s an amount you can afford.</li><li><strong>Review Your Coverage Annually:</strong> Your needs change over time. Don''t pay for coverage you no longer need.</li><li><strong>Ask About Discounts:</strong> You might be eligible for discounts for being a non-smoker, having a good driving record, or installing a security system.</li><li><strong>Work With a Broker:</strong> An independent insurance broker can shop the market for you, comparing prices and plans from various companies to find you the best deal.</li></ol>', 'https://placehold.co/600x400.png')
ON CONFLICT (slug) DO NOTHING;


-- Seed data for the testimonials table
INSERT INTO public.testimonials (name, role, quote, image) VALUES
('Sarah Johnson', 'Client since 2015', 'The team at Insurance Plaza made getting life insurance so easy. They were patient, knowledgeable, and found a plan that fit my budget perfectly. I have complete peace of mind now.', 'https://i.pravatar.cc/150?u=sarah'),
('David Chen', 'Small Business Owner', 'As a self-employed individual, finding good health coverage was a nightmare. Insurance Plaza laid out all my options clearly and helped me pick a comprehensive plan. Highly recommended!', 'https://i.pravatar.cc/150?u=david'),
('Maria Garcia', 'Super Visa Applicant', 'I was so stressed about the Super Visa insurance requirement for my parents. The agent was incredibly helpful, explained everything, and we got the documents we needed for the application the same day.', 'https://i.pravatar.cc/150?u=maria'),
('Tom Wilson', 'Retired Teacher', 'I''ve been with them for my travel insurance for years. Their service is consistently excellent, and they were a lifesaver when I had a medical issue on a cruise. A truly trustworthy company.', 'https://i.pravatar.cc/150?u=tom')
ON CONFLICT (id) DO NOTHING;


-- Seed data for the team_members table
INSERT INTO public.team_members (name, role, image) VALUES
('Alex Thompson', 'Founder & CEO', 'https://i.pravatar.cc/150?u=alex'),
('Brenda Miller', 'Senior Life Insurance Advisor', 'https://i.pravatar.cc/150?u=brenda'),
('Charles Davis', 'Head of Visitor & Travel Insurance', 'https://i.pravatar.cc/150?u=charles'),
('Diana Rodriguez', 'Investment & Savings Specialist', 'https://i.pravatar.cc/150?u=diana')
ON CONFLICT (id) DO NOTHING;

    