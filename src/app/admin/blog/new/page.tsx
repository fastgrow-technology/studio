import { createBlogPost } from '@/lib/actions';
import { BlogPostForm } from '../blog-post-form';

export default function NewBlogPostPage() {
  return (
    <BlogPostForm 
      formAction={createBlogPost}
      title="Create New Blog Post"
      buttonText="Create Post"
    />
  );
}
