import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";

export enum TransaccionTypes{
    DEPOSITO = 'deposito',
    RETIRO = 'retiro'
}


@Entity("transacciones")
export class Transaccion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: TransaccionTypes
    })
    type: string;

    @Column({
        type: "numeric",
        name: "cantidad"
    })
    amount: number;

    @ManyToOne(
        () => Cliente, //función que devuelve clientes de la clase Cliente
        cliente => cliente.transacciones, //devuelve las transacciones del cliente
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({
        name: "cliente_id"
    })
    cliente: Cliente
}