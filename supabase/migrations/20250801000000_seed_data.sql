
INSERT INTO public.pages (slug, title, description, content)
VALUES
    ('home', 'Insurance Plaza | Your Trusted Insurance Partner', 'Welcome to Insurance Plaza. We offer a wide range of insurance products with the best coverage to protect you and your family. Get a free quote today!', '{
        "hero": {
            "title": "Protecting What Matters Most to You",
            "subtitle": "Comprehensive insurance solutions tailored to your unique needs. Get peace of mind knowing you''re covered for life''s unexpected moments.",
            "image": "https://placehold.co/1920x700.png"
        },
        "about": {
            "title": "About Insurance Plaza",
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
    ('services', 'Our Services | Insurance Plaza', 'Explore our wide range of insurance services, including life, health, auto, and home insurance. Find the perfect plan to protect what matters most to you.', '{
        "hero": {
            "title": "Our Insurance Services",
            "subtitle": "We offer a comprehensive suite of insurance products designed to provide you with security and peace of mind. Browse our offerings to find the coverage that''s right for you.",
            "image": "https://placehold.co/1920x400.png"
        }
    }'),
    ('blog', 'Blog | Insurance Plaza', 'Read the latest news, articles, and insights on insurance from the experts at Insurance Plaza. Stay informed to make the best decisions for your protection.', '{
        "hero": {
            "title": "Insurance Insights",
            "subtitle": "Our collection of articles and guides to help you understand the world of insurance and make informed decisions.",
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
    }');

INSERT INTO public.site_settings (key, value)
VALUES
    ('site_name', 'Insurance Plaza'),
    ('site_logo_url', ''),
    ('site_favicon_url', ''),
    ('contact_address', '123 Insurance Ave, Suite 456\nToronto, ON M5H 2N2\nCanada'),
    ('contact_phone', '1-800-555-PLAZA'),
    ('contact_email', 'contact@insuranceplaza.com'),
    ('facebook_enabled', 'false'),
    ('facebook_url', ''),
    ('twitter_enabled', 'false'),
    ('twitter_url', ''),
    ('linkedin_enabled', 'false'),
    ('linkedin_url', ''),
    ('instagram_enabled', 'false'),
    ('instagram_url', ''),
    ('whatsapp_enabled', 'true'),
    ('whatsapp_recipient_number', '1234567890'),
    ('notification_recipient_email', 'you@example.com'),
    ('smtp_host', 'your-smtp-host.com'),
    ('smtp_port', '587'),
    ('smtp_user', 'your-smtp-user'),
    ('smtp_password', '');

INSERT INTO public.services (
    slug, title, image, short_description, long_description, 
    show_benefits, benefits, 
    show_target_audience, target_audience,
    show_plans, plans,
    show_steps, steps,
    show_faqs, faqs,
    show_related_services, related_services
) VALUES (
    'life-insurance', 
    'Life Insurance', 
    'https://placehold.co/1920x400.png', 
    'Protect your family''s financial future with comprehensive life insurance plans that provide security and peace of mind.',
    'Life insurance is a fundamental component of financial planning. It provides a tax-free, lump-sum payment to your beneficiaries in the event of your passing. This can help them cover living expenses, pay off debts like a mortgage, and fund future needs such as education. We offer a variety of life insurance products, including Term Life, Whole Life, and Universal Life, each designed to meet different needs and goals. Our experienced advisors can help you navigate the options and find a policy that provides the right level of protection for your loved ones at a price you can afford.',
    true,
    '[
        {"title": "Financial Security", "description": "Ensure your family''s financial stability by providing a tax-free cash payment."},
        {"title": "Debt Coverage", "description": "Cover outstanding debts like mortgages, loans, and final expenses, so they don''t become a burden."},
        {"title": "Affordable Premiums", "description": "We offer a wide range of options to find a plan that fits your budget."},
        {"title": "Peace of Mind", "description": "Rest easy knowing your loved ones are protected against the unexpected."}
    ]',
    true,
    'This service is ideal for individuals with dependents, homeowners with a mortgage, business owners, or anyone who wants to leave a financial legacy and ensure their loved ones are cared for financially after they are gone.',
    false, null,
    true,
    '[
        {"title": "Consultation", "description": "We start with a free, no-obligation consultation to understand your unique needs and financial situation."},
        {"title": "Compare Quotes", "description": "We source competitive quotes from Canada''s top insurance providers to find the best rates for you."},
        {"title": "Application", "description": "Our advisors guide you through the application process, making it simple and straightforward."},
        {"title": "Approval & Coverage", "description": "Once approved, your policy is active, and your family is protected."}
    ]',
    true,
    '[
        {"question": "What''s the difference between term and whole life insurance?", "answer": "Term life insurance covers you for a specific period (e.g., 10, 20 years), and is generally more affordable. Whole life insurance provides lifelong coverage and includes a cash value investment component, which grows over time."},
        {"question": "How much life insurance do I need?", "answer": "The amount depends on your individual circumstances, including your income, debts, mortgage, and future family needs (like education). A common rule of thumb is 10-12 times your annual income, but our advisors can provide a personalized assessment."},
        {"question": "Are the payouts taxable?", "answer": "In Canada, the death benefit paid from a life insurance policy is paid to your beneficiaries tax-free."}
    ]',
    false, null
);

INSERT INTO public.blog_posts (slug, title, author, published_at, excerpt, content, image)
VALUES
    ('understanding-life-insurance', 'Understanding Life Insurance: A Beginner''s Guide', 'Admin', '2025-07-02 10:00:00+00', 'Explore different life insurance policies and learn how to choose the right coverage to protect your loved ones.', '<p>Life insurance is a crucial financial tool, but it can often seem daunting. This guide will walk you through the fundamentals, including the different types of policies, how to determine the right amount of coverage, and what to look for in a provider. We believe that with the right information, everyone can make a choice that brings them peace of mind.</p><p>We will cover term life, whole life, and universal life insurance policies, explaining the pros and cons of each. Understanding these differences is the first step toward securing your family''s financial future.</p>', 'https://placehold.co/600x400.png'),
    ('travel-insurance-tips', '5 Essential Tips for Canadian Travelers', 'Admin', '2025-06-28 10:00:00+00', 'Learn how to select the right travel insurance for your next international trip and avoid common pitfalls.', '<p>Choosing a health insurance plan is one of the most important decisions you can make. In this article, we share five key tips to consider, from understanding network options (HMO, PPO, etc.) to evaluating deductibles and out-of-pocket maximums. We''ll equip you with the knowledge to choose wisely.</p>', 'https://placehold.co/600x400.png');

INSERT INTO public.testimonials (name, role, quote, image)
VALUES
    ('Sarah Mitchell', 'Life Insurance Client', 'Insurance Plaza made finding the right life insurance policy so easy. Their advisor took the time to understand my family''s needs and found us the perfect coverage at a great rate. Highly recommend!', 'https://i.pravatar.cc/100?u=sarah'),
    ('Raj Patel', 'Supervisa Insurance Client', 'When my parents were planning to visit from India, Insurance Plaza helped us secure their Super Visa insurance quickly and efficiently. The process was smooth, and their team was very knowledgeable.', 'https://i.pravatar.cc/100?u=raj'),
    ('Michael Thompson', 'Financial Services Client', 'I''ve been working with Insurance Plaza for both my RRSP and TFSA accounts. Their financial advisor created a personalized plan that''s already showing great results. Their expertise has been invaluable.', 'https://i.pravatar.cc/100?u=michael');

INSERT INTO public.team_members (name, role, image)
VALUES
    ('John Carter', 'Founder & CEO', 'https://i.pravatar.cc/150?u=john'),
    ('Emily Stone', 'Lead Insurance Advisor', 'https://i.pravatar.cc/150?u=emily'),
    ('David Lee', 'Financial Services Expert', 'https://i.pravatar.cc/150?u=david'),
    ('Jessica Miller', 'Client Support Manager', 'https://i.pravatar.cc/150?u=jessica');
