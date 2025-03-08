export type IApplication = {
  id?: number;
  job_id: number;
  applicant_name: string;
  applicant_email: string;
  cover_letter: string;
  submitted_at?: Date;
};
