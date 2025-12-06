import { pool } from "../config/db";

const checkCase = (str: string) => {
    const result = /[a-z]/.test(str) && /[A-Z]/.test(str);
    return result
}

const totalDayCalculator = (startDate: string, endDate: string, price: number) => {

    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)

    const today = new Date()
    
    if (newStartDate < today){
        return "invalidDate"
    }

    const dateValidation = (newEndDate.getTime() - newStartDate.getTime())
    
    if(dateValidation < 0){
        return null
    }
    const totalDays: number = (newEndDate.getTime() - newStartDate.getTime()) / (1000 * 60 * 60 * 24);
   const totalPrice:number = totalDays * price
    return totalPrice
}

const vehicleStatus = async (id:string) =>{
    const result = await pool.query(
        `SELECT vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id = $1`,[id]
    )

    if(result.rows[0].availability_status==='booked'){
        return null
    }
    return result;
}

const updateVehecleStatus = async (id:string) => {
    await pool.query(`UPDATE vehicles SET availability_status = $1 WHERE id =$2`,["booked", id]);
    return
}


// select customur 


export const utility = {
    checkCase,
    totalDayCalculator,
    vehicleStatus,
    updateVehecleStatus,
   
}