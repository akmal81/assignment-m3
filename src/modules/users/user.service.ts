import { pool } from "../../config/db"

const getAllUsers = async () => {
    const result = await pool.query(
        `SELECT id, name, email, phone, role FROM users`
    )
    return result
}

const updateUser = async (payload: Record<string, unknown>, id: string) => {

    const { name, email, phone, role } = payload;
    const result = await pool.query(`
        UPDATE users 
        SET name=$1, email=$2, phone=$3, role=$4
        WHERE id = $5
        RETURNING  id, name, email, phone, role
        `, [name, email, phone, role, id])

    return result
}


const deleteUser = async (id: string) => {

    const checkActiveBooking = await pool.query(`SELECT status FROM bookings WHERE customer_id= $1`, [id])

    if (checkActiveBooking.rows.length > 0) {
        return false
    }

    const result = pool.query(`DELETE FROM users WHERE id = $1`, [id])
    return result;
}
export const userServices = {
    getAllUsers,
    updateUser,
    deleteUser
}