import { createTestimonial } from '@/lib/actions';
import { TestimonialForm } from '../testimonial-form';

export default function NewTestimonialPage() {
  return (
    <TestimonialForm 
      formAction={createTestimonial}
      title="Create New Testimonial"
      buttonText="Create Testimonial"
    />
  );
}
