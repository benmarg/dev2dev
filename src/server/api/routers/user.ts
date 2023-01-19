import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
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
		),

	fetchQuestions: publicProcedure.query(async ({ ctx }) => {
		const questions = await ctx.prisma.question.findMany({
			include: {
				Student: true
			}
		});
		return questions;
	}),

	deleteQuestion: publicProcedure
		.input(
			z.object({
				id: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const question = await ctx.prisma.question.delete({
				where: {
					id: input.id
				}
			});
			return question;
		})
});
