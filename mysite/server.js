const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

// Получить всех пользователей
app.get("/users", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Добавить пользователя
app.post("/users", (req, res) => {
    const { fio, email, phone, role_id } = req.body;
    db.run("INSERT INTO users (fio, email, phone, role_id) VALUES (?, ?, ?, ?)",
        [fio, email, phone, role_id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Получить товары
app.get("/products", (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Добавить товар
app.post("/products", (req, res) => {
    const { article, name, description, price, quantity, supplier } = req.body;
    db.run("INSERT INTO products (article, name, description, price, quantity, supplier) VALUES (?, ?, ?, ?, ?, ?)",
        [article, name, description, price, quantity, supplier],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

app.listen(3000, () => {
    console.log("Сервер запущен: http://localhost:3000");
});
