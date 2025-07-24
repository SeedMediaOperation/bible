import { z } from 'zod';

const schema = z.object({
    nameEn: z.string(),
    nameKm: z.string(),
    versionId: z.string()
})

export default schema;