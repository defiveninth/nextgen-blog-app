import { Pool } from 'pg'

const pool = new Pool({
	user: process.env.DB_USERNAME,
	host: process.env.DB_URL,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: 5432,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 20000,
})

pool.on('error', (err) => {
	console.error('Unexpected error on idle PostgreSQL client', err)
	process.exit(-1)
})

export default pool
