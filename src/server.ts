import express, { Express } from 'express'
import { config } from 'dotenv'
config()
import './db'

const app: Express = express()
const PORT: number = parseInt(process.env.PORT!) ?? 5000

// Routes
app.use('/users', require('./routes/userRoutes'))

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
})
