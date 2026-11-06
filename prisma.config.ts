import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Connexion directe Neon (sans -pooler), utilisée pour les migrations
    url: process.env.DATABASE_URL_UNPOOLED,
  },
})
