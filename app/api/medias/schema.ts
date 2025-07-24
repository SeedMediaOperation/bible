import { z } from 'zod';

const schema = z.object({
    pro_name_En: z.string(),
    pro_name_Km: z.string(),
    video_url: z.string()
})

export default schema;