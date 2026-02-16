# 💼 Employee Payroll System (EPS)

> A Dynamic Server-Side Payroll Management Application  
> Built with ❤️ using Node.js, Express & EJS

---

## 🚀 Project Overview

Employee Payroll System (EPS) is a full-featured server-side web application that allows organizations to:

✔ Manage employee records  
✔ Automatically calculate payroll  
✔ Perform full CRUD operations  
✔ Store data persistently using JSON  

This project demonstrates backend architecture, file handling, dynamic templating, and clean MVC-style organization.

---

## 🛠 Tech Stack

- 🟢 Node.js
- ⚡ Express.js
- 🎨 EJS (Embedded JavaScript Templates)
- 📁 File System (fs.promises)
- 🗂 JSON-based Data Storage

---

## ✨ Features

### 🏠 Dashboard
- Displays all employees in a clean table
- Shows:
  - Basic Salary
  - Tax (12%)
  - Net Salary
- Edit & Delete options for each employee

---

### ➕ Add Employee
- Register new employees with:
  - Name
  - Department
  - Basic Salary
- Automatic unique ID generation using `Date.now()`
- Input validation (no empty names, no negative salary)

---

### 🧮 Payroll Calculation
Tax and Net Salary are calculated dynamically inside EJS:

