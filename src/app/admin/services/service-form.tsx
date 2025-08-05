
'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceFormSchema } from '@/lib/validators';
import type { Service, ServiceBenefit, ServiceFAQ, ServicePlan, ServiceStep } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaPicker } from '../media/media-picker';
import { Trash } from 'lucide-react';

interface ServiceFormProps {
  formAction: (data: Service) => void;
  initialData?: Service | null;
  title: string;
  buttonText: string;
}

export function ServiceForm({ formAction, initialData, title, buttonText }: ServiceFormProps) {
  const { register, handleSubmit, control, setValue, watch } = useForm<Service>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: initialData || {
      slug: '',
      title: '',
      image: '',
      icon_svg: '',
      short_description: '',
      long_description: '',
      show_benefits: false,
      benefits: [],
      show_target_audience: false,
      target_audience: '',
      show_plans: false,
      plans: [],
      show_steps: false,
      steps: [],
      show_faqs: false,
      faqs: [],
      show_related_services: false,
      related_services: [],
    },
  });

  const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: "benefits" });
  const { fields: planFields, append: appendPlan, remove: removePlan } = useFieldArray({ control, name: "plans" });
  const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({ control, name: "steps" });
  const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({ control, name: "faqs" });

  const watchShowBenefits = watch('show_benefits');
  const watchShowPlans = watch('show_plans');
  const watchShowSteps = watch('show_steps');
  const watchShowFaqs = watch('show_faqs');

  return (
    <form onSubmit={handleSubmit(formAction)}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Fill out the form to {buttonText.toLowerCase()}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register('title')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" {...register('slug')} />
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <MediaPicker onImageSelect={(url) => setValue('image', url)} />
            <Input {...register('image')} placeholder="Image URL will be populated here" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon_svg">Icon SVG</Label>
            <Textarea id="icon_svg" {...register('icon_svg')} rows={5} placeholder="Paste your SVG code here" />
            <p className="text-sm text-muted-foreground">If provided, this will override the default icon on the service card.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="short_description">Short Description</Label>
            <Textarea id="short_description" {...register('short_description')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="long_description">Long Description</Label>
            <Textarea id="long_description" {...register('long_description')} rows={5} />
          </div>

          {/* Dynamic Sections */}
          <div className="flex items-center space-x-2">
            <Controller name="show_benefits" control={control} render={({ field }) => <Switch id="show_benefits" checked={field.value} onCheckedChange={field.onChange} />} />
            <Label htmlFor="show_benefits">Show Benefits Section</Label>
          </div>
          {watchShowBenefits && (
            <div className="border p-4 rounded-md space-y-4">
              {benefitFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <div className="flex-grow space-y-2">
                    <Label>Benefit Title</Label>
                    <Input {...register(`benefits.${index}.title` as const)} />
                  </div>
                  <div className="flex-grow space-y-2">
                    <Label>Benefit Description</Label>
                    <Input {...register(`benefits.${index}.description` as const)} />
                  </div>
                  <Button type="button" variant="destructive" onClick={() => removeBenefit(index)}><Trash /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => appendBenefit({ title: '', description: '' })}>Add Benefit</Button>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Controller name="show_faqs" control={control} render={({ field }) => <Switch id="show_faqs" checked={field.value} onCheckedChange={field.onChange} />} />
            <Label htmlFor="show_faqs">Show FAQs Section</Label>
          </div>
          {watchShowFaqs && (
            <div className="border p-4 rounded-md space-y-4">
              {faqFields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-end">
                  <div className="flex-grow space-y-2">
                    <Label>Question</Label>
                    <Input {...register(`faqs.${index}.question` as const)} />
                  </div>
                  <div className="flex-grow space-y-2">
                    <Label>Answer</Label>
                    <Textarea {...register(`faqs.${index}.answer` as const)} />
                  </div>
                  <Button type="button" variant="destructive" onClick={() => removeFaq(index)}><Trash /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => appendFaq({ question: '', answer: '' })}>Add FAQ</Button>
            </div>
          )}

          <Button type="submit">{buttonText}</Button>
        </CardContent>
      </Card>
    </form>
  );
}
