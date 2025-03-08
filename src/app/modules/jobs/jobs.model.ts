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

const getById = async (id: number): Promise<IJob | null> => {
  const parsedId = Number(id);
  const { rows } = await pool.query('SELECT * FROM jobs WHERE id = $1', [
    parsedId,
  ]);
  return rows[0] || null;
};

export const JobModel = {
  create,
  getAll,
  getById,
};
