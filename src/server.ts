import http from 'http'
import express, { Response } from 'express'
import QueueRouter from './modules/queue/QueueRouter'
import StoreRouter from './modules/store/StoreRouter'

const app = express()
const apiRouter = express.Router()
const port = process.env.port || 8080

QueueRouter(apiRouter)
StoreRouter(apiRouter)

app
    .use(express.json())
    .use('/api', apiRouter)

http.createServer(app)
    .listen(port, () => {
        console.log(`Worker ${process.pid} started on port ` + port)
    })
    .on('error', (err) => {
        throw err
    })