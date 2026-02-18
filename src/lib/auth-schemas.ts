import { z } from "zod";

export const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");

export const emailSchema = z.string().email("Please enter a valid email address");

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"), // Allow any password for sign-in to not block legacy users or reveal policy
});

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
