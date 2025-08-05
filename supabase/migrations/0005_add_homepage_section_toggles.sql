
INSERT INTO site_settings (key, value)
VALUES
    ('homepage_section_services_enabled', 'true'),
    ('homepage_section_about_enabled', 'true'),
    ('homepage_section_testimonials_enabled', 'true'),
    ('homepage_section_stats_enabled', 'true'),
    ('homepage_section_blog_enabled', 'true'),
    ('homepage_section_newsletter_enabled', 'true'),
    ('homepage_section_contact_enabled', 'true')
ON CONFLICT (key) DO NOTHING;
