// auto updater

import { pool } from "./db";


const autoBookingStatusUpdater = async () => {
    const endDates = await pool.query(`SELECT vehicle_id, rent_end_date FROM bookings`)
    const today = new Date();
    for (let endDate of endDates.rows) {
        const newEndDate = new Date(endDate.rent_end_date)

        const vehicleId = endDate.vehicle_id
        const status = "returned";
        const  availabilityStatus ="available"
        if (newEndDate < today) {
            // await pool.query(`
            // UPDATE vehicles v
            // SET availability_status = $1
            // FROM bookings b
            // WHERE v.id = b.vehicle_id;
            // `, [status])
            await pool.query(`
            UPDATE bookings 
            SET status = $1
            WHERE rent_end_date::date = $2;
            `, [status, newEndDate])

            await pool.query(`
                UPDATE vehicles 
                SET availability_status =$1
                WHERE id = $2
            `,[availabilityStatus, vehicleId])
        }
    }
}

export default autoBookingStatusUpdater;