"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Socket.io para manejar las conexiones
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
// Crear instancia de Express
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Habilitar CORS si es necesario
app.use((0, cors_1.default)());
// Inicializar Socket.io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Cambia esto para restringir orígenes
    },
});
// Socket.io conexión
io.on("connection", (socket) => {
    console.log("Cliente conectado", socket.id);
    // Emitir mensajes cuando cambien los estados de las órdenes
    socket.on("orderStatusChanged", (data) => {
        io.emit("statusUpdate", data);
    });
    socket.on("disconnect", () => {
        console.log("Cliente desconectado", socket.id);
    });
});
// Escuchar en el puerto 3001
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
