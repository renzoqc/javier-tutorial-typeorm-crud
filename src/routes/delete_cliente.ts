import express from "express";
import { Cliente } from "../entities/Cliente";

const router = express.Router();

router.delete("/api/cliente/:clienteId", async (req, res) => {
    const { clienteId } = req.params;

    const response = await Cliente.delete({id: parseInt(clienteId)});

    return res.json(response)
})

export { router as deleteClienteRouter }