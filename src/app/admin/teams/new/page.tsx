import { createTeamMember } from '@/lib/actions';
import { TeamForm } from '../team-form';

export default function NewTeamMemberPage() {
  return (
    <TeamForm
      formAction={createTeamMember}
      title="Create New Team Member"
      buttonText="Create Member"
    />
  );
}
