import { z } from "zod";

export const meditationTypeSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
});

export type MeditationType = z.infer<typeof meditationTypeSchema>;
