import dotenv from "dotenv"

dotenv.config()

type MigrateConfig = {
  uri: string
  collection: string
  migrationsPath: string
  autosync: boolean
}

const DEFAULT_URI = "mongodb://localhost:27017/flash_sale"

const config: MigrateConfig = {
  uri: process.env.MONGO_URI ?? DEFAULT_URI,
  collection: process.env.MIGRATE_MONGO_COLLECTION ?? "migrations",
  migrationsPath: "./src/migrations",
  autosync: true,
}

console.log("Migration configuration:", config)

export default config
