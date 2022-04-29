import express from "express";
import { Cliente } from "../entities/Cliente";
import { createQueryBuilder } from "typeorm";

const router = express.Router();

router.get("/api/clientes", async (req, res) => {
    //const cliente = await Cliente.find();
    const cliente = await createQueryBuilder(
        'cliente'
    )
    .select('cliente')
    .from(Cliente, 'cliente')
    .where('cliente.id = :clienteId', {clienteId: 3})
    .getOne()


    return res.json(cliente)
})

export { router as fetchClienteRouter}