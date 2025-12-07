import { Pool } from "pg";
import { config } from ".";

export const pool = new Pool({
    connectionString: config.connectionString
})

const initDb = async () => {
    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS users( 
            id SERIAL PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            email VARCHAR(200) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone VARCHAR(20) NOT NULL,
            role VARCHAR(20),
            CONSTRAINT email_lower CHECK (email=LOWER(email))
        )
        `
    )

    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(100) NOT NULL,
            type VARCHAR(10),
            registration_number VARCHAR(100) UNIQUE NOT NULL, 
            daily_rent_price INT,
            availability_status VARCHAR(20)
        )
        `
    )

    await pool.query(
        `
        CREATE TABLE IF NOT EXISTS bookings(
            id SERIAL PRIMARY KEY,
            customer_id INT REFERENCES users(id),
            vehicle_id INT REFERENCES vehicles(id),
            rent_start_date VARCHAR(100),
            rent_end_date VARCHAR(100),
            total_price INT NOT NULL,
            status VARCHAR(20)
        )
        `
    )
};



export default initDb