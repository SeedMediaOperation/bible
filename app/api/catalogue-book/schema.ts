import { z } from 'zod';

const schema = z.object({
    name_en: z.string(),
    name_km: z.string(),
})

export default schema;