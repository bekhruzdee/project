import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({type: 'varchar'})
  name: string; 

  @Column({type: 'varchar'})
  description: string; 

  @Column({type: 'numeric'})
  price: number; 

  @Column({type: 'varchar'})
  teacher: string; 

  @Column({type: 'varchar'})
  category: string; 

  @Column({type: 'varchar'})
  level: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; 

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
