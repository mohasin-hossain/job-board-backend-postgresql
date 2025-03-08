import pool from '../../config/database';
import { IJob } from './jobs.interface';

const create = async (job: IJob): Promise<IJob> => {
  const { rows } = await pool.query(
    `INSERT INTO jobs (title, description, company, location)
         VALUES ($1, $2, $3, $4) RETURNING *`,
    [job.title, job.description, job.company, job.location],
  );
  return rows[0];
};

const getAll = async (): Promise<IJob[]> => {
  const { rows } = await pool.query(
    'SELECT * FROM jobs ORDER BY created_at DESC',
  );
  return rows;
};

export const JobModel = {
  create,
  getAll
};
