import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/data/static';
import { BlogPostCard } from '@/components/blog-post-card';
import Image from 'next/image';
import { getPageBySlug } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('blog');
  return {
    title: page?.title || 'Blog | Insurance Plaza',
    description: page?.description || 'Read the latest news, articles, and insights on insurance from the experts at Insurance Plaza. Stay informed to make the best decisions for your protection.',
  };
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const page = await getPageBySlug('blog');
  const content = page?.content || {};
  
  return (
    <div className="bg-background">
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={content.hero?.image || "https://placehold.co/1920x400.png"}
            alt="Blog"
            layout="fill"
            objectFit="cover"
            className="z-0"
            data-ai-hint="person writing notebook"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/20" />
        </div>
        <div className="relative min-h-[400px] flex items-center justify-center">
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">{content.hero?.title || "Insurance Insights"}</h1>
                    <p className="text-xl text-white/90">{content.hero?.subtitle || "Our collection of articles and guides to help you understand the world of insurance and make informed decisions."}</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
