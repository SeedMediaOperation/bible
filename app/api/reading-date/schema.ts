import { z } from 'zod';

const schema = z.object({
    title_en: z.string(),
    title_km: z.string()
})

export default schema;