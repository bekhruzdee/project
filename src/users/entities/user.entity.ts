/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: `varchar` })
    username: string;
    @Column({ unique: true, type:"varchar", nullable:true })
    email: string;
    @Column({ type: `varchar` })
    password: string;
    @Column({type: 'varchar', default: 'student'})
    role: string
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date
  }
  