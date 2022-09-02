import express from 'express'
import { setupMeetingListeners } from 'infra/meetings/server/http/listeners'
import { meetingsRouter } from 'infra/meetings/server/http/routes'
import { hostname } from 'os'
import { sync_db } from '../db'

async function main() {
  const app = express()
  app.use(express.json())

  await sync_db()

  app.use('/meetings', meetingsRouter())
  
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
}

main()
  .catch(err => {
    console.log('backend failed to start up ,', err)
    process.exit(1)
  })
