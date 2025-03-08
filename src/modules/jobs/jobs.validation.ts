import { z } from 'zod';

const createJobValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(3, 'Title must be at least 3 characters long'),

    description: z
      .string({ required_error: 'Description is required' })
      .min(10, 'Description must be at least 10 characters long'),

    company: z
      .string({ required_error: 'Company name is required' })
      .min(2, 'Company name must be at least 2 characters long'),

    location: z
      .string({ required_error: 'Location is required' })
      .min(2, 'Location must be at least 2 characters long'),
  }),
});

export const JobValidation = {
  createJobValidationSchema,
};
