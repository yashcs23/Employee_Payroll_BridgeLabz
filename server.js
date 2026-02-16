const { render } = require("ejs");
const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 8000;

const FILE_PATH = path.join(__dirname, "employees.json");

app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const employees = JSON.parse(data || "[]");

    res.render("index", { employees });
  } catch (err) {
    console.error(err);
    res.send("Error loading employees");
  }
});
app.get("/register", (req, res) => {
  res.render("add");
});

app.post("/register", async (req, res) => {
  try {
    const { name, position, salary } = req.body;

    const data = await fs.readFile(FILE_PATH, "utf-8");
    const employees = JSON.parse(data || "[]");

    const newEmployee = {
      id: Date.now(),
      name,
      position,
      salary
    };

    employees.push(newEmployee);

    await fs.writeFile(FILE_PATH, JSON.stringify(employees, null, 2));

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error registering employee");
  }
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

