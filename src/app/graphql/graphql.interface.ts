export interface IJobArgs {
  id: string;
}

export interface IApplicationArgs {
  job_id: string;
}

export interface ICreateJobArgs {
  input: {
    title: string;
    description: string;
    company: string;
    location: string;
  };
}

export interface ICreateApplicationArgs {
  input: {
    job_id: number;
    applicant_name: string;
    applicant_email: string;
    cover_letter: string;
  };
}
