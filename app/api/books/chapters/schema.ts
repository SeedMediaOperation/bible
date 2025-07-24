import { z } from 'zod';

const schema = z.object({
    nameEn: z.string(),
    nameKm: z.string(),
    titleEn: z.string(),
    titleKm: z.string(),
    paragraphEn:z.json(),
    paragraphKm: z.json()
})

export default schema;