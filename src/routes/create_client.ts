import express from "express";
import { Cliente } from "../entities/Cliente";

const router = express.Router();

router.post('/api/cliente', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        cardNumber,
        balance
    } = req.body;

    const cliente = Cliente.create({
        first_name: firstName,
        last_name: lastName,
        email,
        card_number: cardNumber,
        balance
    });

    await cliente.save(); //lo guarda en la base de datos

    return res.json(cliente)
});

export {
    router as createClienteRouter
}