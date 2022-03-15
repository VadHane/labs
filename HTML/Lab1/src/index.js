import Express from "express";
import Path from "path";

const PORT = 3000;
const server = Express();
const __dirname = Path.resolve();

server.use(Express.static(Path.join(__dirname, "static/")));

server.listen(PORT, () => {
    console.log("Сервер запустився!");
});

server.get("/", (req, res) => {
    res.status(200).sendFile(Path.join(__dirname, "views", "mainPage.html"));
});

server.get("/contacts/", (req, res) => {
    res.status(200).sendFile(Path.join(__dirname, "views", "contacts.html"));
});

server.get("/tasks/", (req, res) => {
    res.status(200).sendFile(Path.join(__dirname, "views", "tasks.html"));
});