import { z } from 'zod';

const schema = z.object({
    title_en: z.string(),
    title_km: z.string(),
    paragraph_en: z.string(),
    paragraph_km: z.string()
})

export default schema;