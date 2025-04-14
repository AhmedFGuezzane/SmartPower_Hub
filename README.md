# ⚡ SmartPower Hub

SmartPower Hub is a modern web application dedicated to the **centralized management of electrical devices**. It allows users to add, view, edit, and delete devices while visualizing their energy consumption data.

🇫🇷 Lire en français : [README.fr.md](./README.fr.md)

---

## 🚀 Quick Overview

- Modern React interface (light/dark mode)
- Consumption data visualization (kWh, Watts)
- Dynamic device search
- Full REST API (CRUD)
- MongoDB database

---

## 🛠️ Technologies Used

- **Frontend**: React, TailwindCSS, React Router
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB (MongoDB Atlas)
- **Dev tools**: Vite, concurrently, MongoDB Compass

---

## ▶️ Run the Project

> Run this command from the root of the project:

```bash
npm run dev
```
---

## 🔌 API REST

GET /api/devices : list all devices

GET /api/devices/:id : get details of a device

POST /api/devices : create a new device

PUT /api/devices/:id : update a device

DELETE /api/devices/:id : delete a device

---

## 📄 Technical Report

See the document docs/Rapport_Technique_SmartPower_Hub.docx for more details about:

- Express.js architecture

- MongoDB/Mongoose structure

- React components and their roles

- Suggestions for future improvements

---

## 💡 Coming Soon

- JWT authentication

- Graph-based dashboard

- Data export (CSV, PDF)

- Admin interface with advanced filters

---

## 👤 Author

Ahmed-Fateh Guezzane

Project completed as part of course 420-A17-BB

---

## 📷 Preview

### Home Page  
Displays a summary of features and guides the user from the start.
![image](https://github.com/user-attachments/assets/c068e778-0765-4f1e-81e9-dcc34cd66fc1)  
![image](https://github.com/user-attachments/assets/05b3a036-83bb-4eb4-841b-3cbeb8ac9a7a)


### Device List and Device Details  
Displays all devices with a search bar to filter by name, type, or brand. Also shows details of a selected device, with consumption data visualized as colored circles.
![image](https://github.com/user-attachments/assets/74807aeb-4302-4aab-a9d6-9ea484c55d20)  
![image](https://github.com/user-attachments/assets/4567fa17-bfd0-458e-82b4-364ed158a770)


### Creation Form  
Allows adding a new device with clear and automatically validated input fields.
![image](https://github.com/user-attachments/assets/73461838-bf6c-42b9-a200-9e5f4f789f20)  
![image](https://github.com/user-attachments/assets/fc7626d3-3f6f-49ec-abda-fe59089c51fe)


### Update Form  
A pre-filled form to update an existing device, with a cancel option.
![image](https://github.com/user-attachments/assets/20d9718e-7fa1-4330-8270-7f76e705ccba)  
![image](https://github.com/user-attachments/assets/276bf5e3-2e8c-4819-bfd1-7314a5210b2d)  










