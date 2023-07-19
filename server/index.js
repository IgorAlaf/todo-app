import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import router from './routes/index.js'
import { errorMiddleware } from './middlewares/error-middleware.js'
import path from 'path'
import { fileURLToPath } from 'url'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
)
app.use('/api', router)
app.use(errorMiddleware)

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'docs.yaml'))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
async function start() {
  app.listen(process.env.PORT || 4300, () =>
    console.log('Server is connection')
  )
}

start()
