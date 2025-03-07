import { z } from 'zod';

const createJobValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long'),
    company: z
      .string()
      .min(2, 'Company name must be at least 2 characters long'),
    location: z.string().min(2, 'Location must be at least 2 characters long'),
  }),
});

export const JobValidation = {
  createJobValidationSchema,
};
