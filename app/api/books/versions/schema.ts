import { z } from 'zod';

const schema = z.object({
    titleEn: z.string(),
    titleKm: z.string()
})

export default schema;