import { z } from 'zod';

const userValidatioonSchema = z.object({
  id: z.string(),
  password: z
    .string({ invalid_type_error: 'password must be string' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});

export const UserValidation = {
  userValidatioonSchema,
};
