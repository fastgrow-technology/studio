
import { createService } from '@/lib/actions';
import { ServiceForm } from '../service-form';

export default function NewServicePage() {
  return (
    <ServiceForm 
      formAction={createService}
      title="Create New Service"
      buttonText="Create Service"
    />
  );
}
