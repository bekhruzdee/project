/* eslint-disable @typescript-eslint/no-unused-vars */
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Result } from 'src/results/entities/result.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: `varchar` })
  username: string;
  @Column({ unique: true, type: 'varchar', nullable: true })
  email: string;
  @Column({ type: `varchar` })
  password: string;
  @Column({ type: 'varchar', default: 'student' })
  role: string;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Result, (result) => result.user)
  results: Result[];
}
