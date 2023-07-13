import pkg from 'pg'
import { config } from 'dotenv'
config()
const { Pool } = pkg
const pool = new Pool({
  user: 'tododb',
  password: 'Igos2006',
  host: '2.59.41.2',
  port: 5432,
  database: 'todoapp'
})
export default pool
