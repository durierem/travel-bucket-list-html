import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: process.env.PORT ?? 3000,
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    url: process.env.DB_URL,
    name: process.env.DB_NAME
  }
}
