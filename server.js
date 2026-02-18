const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 8000;

const FILE_PATH = path.join(__dirname, "employees.json");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
    const employees = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));
    res.render("index", { employees });
});

app.get("/register", (req, res) => {
    res.render("add");
});

app.get("/edit/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const employees = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));
    const employee = employees.find(emp => emp.id === id);
    if (!employee) return res.redirect("/");
    res.render("edit", { employee });
});

app.post("/register", async (req, res) => {
    const { name, position, salary, image } = req.body;
    const employees = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));

    const newEmployee = {
        id: Date.now(),
        name,
        position,
        salary,
        image
    };

    employees.push(newEmployee);
    await fs.writeFile(FILE_PATH, JSON.stringify(employees, null, 2));
    res.redirect("/");
});

app.post("/update/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, position, salary } = req.body;

    const employees = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));
    const index = employees.findIndex(emp => emp.id === id);

    if (index !== -1) {
        employees[index].name = name;
        employees[index].position = position;
        employees[index].salary = salary;
        await fs.writeFile(FILE_PATH, JSON.stringify(employees, null, 2));
    }

    res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const employees = JSON.parse(await fs.readFile(FILE_PATH, "utf-8"));
    const filtered = employees.filter(emp => emp.id !== id);
    await fs.writeFile(FILE_PATH, JSON.stringify(filtered, null, 2));
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
