import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { Cliente } from "./Cliente";
import { Person } from "./utils/Person";

@Entity('banker')
export class Banker extends Person {
    
    @Column({
        unique: true,
        length: 10
    })
    employee_number: string;

    @ManyToMany(
        () => Cliente
    )
    @JoinTable({
        name: "banqueros_clientes",
        joinColumn: {
            name: "banquero",
            referencedColumnName: "id" //hace referencia al id del banquero
        },
        inverseJoinColumn: {
            name: "cliente",
            referencedColumnName: "id" //hace referencia al id del cliente
        }
    })
    clientes: Cliente[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}