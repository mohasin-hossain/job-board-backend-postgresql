import pool from '../../config/database';
import { IApplication } from './applications.interface';

const create = async (application: IApplication): Promise<IApplication> => {
  const { rows } = await pool.query(
    `INSERT INTO applications 
       (job_id, applicant_name, applicant_email, cover_letter) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
    [
      application.job_id,
      application.applicant_name,
      application.applicant_email,
      application.cover_letter,
    ],
  );
  return rows[0];
};

const getByJobId = async (jobId: number): Promise<IApplication[]> => {
  const { rows } = await pool.query(
    'SELECT * FROM applications WHERE job_id = $1',
    [jobId],
  );
  return rows;
};

export const ApplicationModel = {
  create,
  getByJobId,
};
