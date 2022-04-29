import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from "typeorm";
import { Banker } from "./Banker";
import { Transaccion } from "./Transacciones";
import { Person } from "./utils/Person";

@Entity('cliente') //declaramos una entidad y también el nombre de la tabla (opcional)
export class Cliente extends Person {
    
    @Column({
        type: "numeric"
    })
    balance: number;

    @Column({
        default: true,
        name: "active"
    })
    is_active: boolean;

    @Column({
        type: "simple-json",
        nullable: true //no es necesario declarar esta información
    })
    adittional_info: {
        age: number,
        hair_color: string
    }

    @Column({
        type: "simple-array",
        default: []
    })
    family_members: string[];

    @OneToMany(
        () => Transaccion,
        transaccion => transaccion.cliente
    )
    transacciones: Transaccion[];

    @ManyToMany(
        () => Banker
    )
    banqueros: Banker[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}