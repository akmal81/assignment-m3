
### Vehicle Rental System 
Vehicle Rental System is a backend API  manage the operations of vehicle rental service.
It handles vehicle inventory, customer profiles, bookings, authentication,status updates.

🔗 Live API: https://assignment-m3.vercel.app/

---
#### ✨ Features

##### 🚘 Vehicles
- Add Vehicles
- update Vehicles
- delete vehicles
- Track vehicle availability (available / booked )
- Store price, status, registration number.

#### 👤 Customers
- Customer account creation and manage profile 
- Customer info stored with password hashing and minimum length 6

#### 📅 Bookings
- Rent vehicle
- Return  vehicle 
- Cancle vehicle booking 
- Self rent calculation based on rental start date and end date
- Prevent booking of the vehicle that already booked

#### 🔐 Authentication & Authorization
- JWT-based secure authentication
- Role-based access control:
- Admin (Full access)
- Customer (Limited access)

#### 🔄 Automatic Updates
- Uses Node Cron to auto-update booking  status (daily)
- System automatically marks bookings as "returned" when rent_end_date has passed
- Vehicle availability status is updated to available accordingly

---
#### 🛠️ Technology Stack 

| Category       | Tech                         |
| -------------- | ---------------------------- |
| Runtime        | Node.js, TypeScript          |
| Framework      | Express.js                   |
| Database       | PostgreSQL + pg              |
| Authentication | bcrypt, JSON Web Token (JWT) |
| Automation     | Node Cron                    |
| Deployment     | Vercel   |

---
#### ⚙️ Installation & Setup

1️⃣ Clone the Repository from github 

git clone https://github.com/akmal81/assignment-m3.git

2️⃣ Install Dependencies
```
npm install
```
3️⃣ Create .env

    PORT=5000
    CONNECTIONSTR=postgresql://user:password@localhost:5432/vehiclerental
    SECRET=yourSecretKey
   
4️⃣ Build the Project
```
npm run build
```
5️⃣ Start the Server
```
npm run dev
```

---


#### 📜 Live Testing email and password
---

__Admin Credential__
```
{
"email": "admin@gmail.com",
"password": "admin123"
}
```
__User Credential__
```
{
"email": "customer@gmail.com",
"password": "customer123"
}
```
---


##### 📌 Author
**Akmal Hossain**  
Front-end Developer | React | Node.js | PostgreSQL

---

##### 📞 Contact
- Email: akmalforu@gmail.com 
- GitHub: https://github.com/akmal81 
- LinkedIn: https://www.linkedin.com/in/akmalhossain/ 

---

##### 📜 License
This project is licensed under the **MIT License** — feel free to use it however you want.

---

##### ⭐ Support
If you found this project helpful, please give it a **star** ⭐ on GitHub!

---

