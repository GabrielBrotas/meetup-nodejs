import express from 'express'
import { meetingsRouter } from 'infra/meeting/server/http/routes'
import { hostname } from 'os'
import { sync_db } from '../db'

const app = express()

app.use(express.json())

sync_db()

app.use('/meetings', meetingsRouter)

app.get('/health-check', (req, res) => {
  return res.status(200).json({
    success: true,
    hostname: hostname()
  })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`App running on port 4000`)
})