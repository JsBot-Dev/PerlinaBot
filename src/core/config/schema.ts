import z from 'zod'

export const PerlinaBotBasicConfigSchema = z.object({
    config: z.object({
        name: z.string() //占位符
    }),
})
export type PerlinaBotBasicConfig = z.infer<typeof PerlinaBotBasicConfigSchema>
