import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const questionRouter = createTRPCRouter({
	createStudent: publicProcedure
		.input(
			z.object({
				nickname: z.string(),
				question: z.object({
					question: z.string(),
					skill: z.string(),
					difficulty: z.number()
				})
			})
		)
		.mutation(
			async ({
				input: {
					nickname,
					question: { question, skill, difficulty }
				},
				ctx
			}) => {
				const newStudent = await ctx.prisma.student.create({
					data: {
						nickname,
						Question: {
							create: {
								question,
								skill,
								difficulty
							}
						}
					}
				});
				return newStudent;
			}
		)
});
