import { z } from "zod";

export const meditationSessionSchema = z
  .object({
    id: z.string().trim().min(1),
    meditationType: z.string().trim().min(1),
    startTime: z.date(),
    endTime: z.date(),
    duration: z.number().nonnegative(),
    completed: z.boolean(),
    notes: z.string(),
  })
  .refine(({ startTime, endTime }) => endTime >= startTime, {
    message: "End time must be after or equal to start time",
    path: ["endTime"],
  });

export type MeditationSession = z.infer<typeof meditationSessionSchema>;
