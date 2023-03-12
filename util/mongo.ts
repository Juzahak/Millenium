import { MongoClient } from 'mongodb'

// Adicionar um índice de assinatura na definição de tipo `typeof globalThis`
declare global {
  interface Global {
    _mongoClientPromise?: Promise<MongoClient>;
  }
}

if (!process.env.MONGO_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGO_URL
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // Use `Promise<MongoClient>` como tipo da variável `_mongoClientPromise`
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
