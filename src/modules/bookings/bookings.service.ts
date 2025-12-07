import { pool } from "../../config/db";
import { utility } from "../../utils/utility";

const createBooking = async (payload: Record<string, unknown>) => {

    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    const vehicleInfo = await utility.vehicleStatus(vehicle_id as string);

    if (vehicleInfo === null) {
        return null
    }

    const daily_rent_price = vehicleInfo?.rows[0]?.daily_rent_price;

    const vehicle_name = vehicleInfo?.rows[0]?.vehicle_name;

    const totalPrice = utility.totalDayCalculator(rent_start_date as string, rent_end_date as string, daily_rent_price)

    if (totalPrice === null) {
        return false
    }
    if (totalPrice === "invalidDate") {
        return totalPrice
    }

    const status = "active"

    const result = await pool.query(
        `INSERT INTO bookings(customer_id, 
        vehicle_id, 
        rent_start_date, 
        rent_end_date, 
        total_price, status 
        ) 
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            totalPrice,
            status]
    )

    if (result.rows.length !== 0) {
        await utility.updateVehecleStatus(result.rows[0].vehicle_id)
    }

    const { rows } = result
    const vehicle = { vehicle_name, daily_rent_price }

    return { ...rows[0], vehicle };
}


const getBookings = async (role: string, id: string) => {

    if (role === "admin") {
        const booking = await pool.query(`
        SELECT 
        b.*, 
        c.name, 
        c.email, 
        v.vehicle_name,
        v.registration_number,
        v.type
        FROM bookings b 
        INNER JOIN users c ON b.customer_id = c.id
        INNER JOIN vehicles v ON b.customer_id = v.id
        `)
        const retult = booking.rows.map(row => ({
            id: row.id,
            customer_id: row.customer_id,
            vehicle_id: row.vehicle_id,
            rent_start_date: row.rent_start_date,
            rent_end_date: row.rent_end_date,
            total_price: row.total_price,
            status: row.status,
            customer: {
                name: row.name,
                email: row.email
            },
            vehicle: {
                vehicle_name: row.vehicle_name,
                registration_number: row.registration_number
            }
        }))
        return retult
    }
    if (role === "customer") {
        const booking = await pool.query(`
        SELECT 
        b.*, 
        v.vehicle_name,
        v.registration_number,
        v.type
        FROM bookings b 
        INNER JOIN vehicles v ON b.vehicle_id = v.id
        WHERE b.customer_id = $1
        `, [id])
        const retult = booking.rows.map(row => ({
            id: row.id,
            customer_id: row.customer_id,
            vehicle_id: row.vehicle_id,
            rent_start_date: row.rent_start_date,
            rent_end_date: row.rent_end_date,
            total_price: row.total_price,
            status: row.status,
            vehicle: {
                vehicle_name: row.vehicle_name,
                registration_number: row.registration_number
            }
        }))
        return retult
    }
}


const updateBookings = async (userId: string, bookingId: string, status: string, role: string) => {

if (status !== "cancelled" && role === "customer") {

return false
}
    
    if (role === 'customer' && status==="cancelled") {
        
        const dateChecker = await utility.checkBookingStartDate(userId, bookingId)
        
        if (dateChecker === true) {
            return true
        }
        const result = await pool.query(`UPDATE bookings SET status=$1 WHERE id = $2 AND customer_id =$3 RETURNING *`, [status, bookingId, userId])
        // update vehicle availability_status
        const vehicleId = result.rows[0].vehicle_id 
        const availabilityStatus = "available"
        await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id = $2 RETURNING *`, [availabilityStatus, vehicleId]);
        
        
        return result
    }

    if (role === 'admin' && status === "returned") {

        const updateVehicleStatus = await pool.query(`UPDATE bookings SET status=$1 WHERE id = $2 RETURNING *`, [status, bookingId]);

        // update vehicle status
        const vehicleId = updateVehicleStatus.rows[0].vehicle_id
        const vehicleStatus = "available"
        const vehicle = await pool.query(`
                UPDATE vehicles SET availability_status = $1 WHERE id = $2
            RETURNING availability_status`, [vehicleStatus, vehicleId])

        const FormatResult = updateVehicleStatus.rows.map(row => ({
            id: row.id,
            customer_id: row.customer_id,
            vehicle_id: row.vehicle_id,
            rent_start_date: row.rent_start_date,
            rent_end_date: row.rent_end_date,
            total_price: row.total_price,
            status: row.status,
            vehicle: vehicle.rows[0], 
        }
        )
        )
        const result ={rows:[...FormatResult]}

        return result
    }
}

export const bookingsService = {
    createBooking,
    getBookings,
    updateBookings
}