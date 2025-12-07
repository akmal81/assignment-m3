import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config";

const singUpNewUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;

    const hashPassword = await bcrypt.hash(password as string, 12)
    const result = await pool.query(
        `INSERT INTO users(name, email, password, phone, role)
        VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role
        `, [name, email, hashPassword, phone, role]
    )
    return result;
}

const singinUser = async (email: string, password: string) => {
    
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];
    if (result.rows.length === 0) {
        return null;
    }
    const matchedPwd = await bcrypt.compare(password, user.password);
    if (!matchedPwd) {
        return false
    }

    const token = jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        config.secret as string, { expiresIn: "7d" }
    )

    delete user.password;
    return { token, user }

}

export const authService = {
    singUpNewUser,
    singinUser
}