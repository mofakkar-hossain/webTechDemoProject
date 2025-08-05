import {Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';

@Entity("admin")
export class AdminEntity
{
    @PrimaryColumn()
    id:string;
    
    @Column({length: 100, unique: true})
    userName: string;
    
    @Column({length: 150})
    fullName: string;
    
    @Column({default: false})
    isActive: boolean;
    
    @BeforeInsert()
    generateId()
    {
        const randomNUm = Math.floor(Math.random()*1000);
        this.id = `adm-${randomNUm}`;
    }
}