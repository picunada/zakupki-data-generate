import type { Nitro } from 'nitropack'
import * as mongoDB from 'mongodb'

const config = useRuntimeConfig()

export const collections: { reports223?: mongoDB.Collection; reports44?: mongoDB.Collection; reports615?: mongoDB.Collection } = {}

export default async (_nitroApp: Nitro) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.mongoUri)
  await client.connect()
  const db: mongoDB.Db = client.db(config.db)
  const reportCollection223: mongoDB.Collection = db.collection(config.collection223)
  const reportCollection44: mongoDB.Collection = db.collection(config.collection44)
  const reportCollection615: mongoDB.Collection = db.collection(config.collection615)

  console.log(`Connected to db: ${db.databaseName} to collections ${reportCollection615.collectionName} ${reportCollection44.collectionName} ${reportCollection223.collectionName}`)

  collections.reports223 = reportCollection223
  collections.reports44 = reportCollection44
  collections.reports615 = reportCollection615
}
