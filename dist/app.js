"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const server = (0, express_1.default)();
server.use(express_1.default.json());
const buildServer = () => {
    server.get("/", (req, res) => {
        res.status(200).json({
            message: "First Success",
        });
    });
    server.use("/api", (0, cors_1.default)({ credentials: true, origin: ["http://localhost:3000"] }), routes_1.default);
    return server;
};
exports.default = buildServer;
//# sourceMappingURL=app.js.map