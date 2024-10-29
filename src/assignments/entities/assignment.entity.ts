import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';
import { Result } from 'src/results/entities/result.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', default: 'auto' })
  gradingType: string;

  @ManyToOne(() => Modules, (module) => module.assignments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'moduleId' })
  module: Modules;

  @OneToMany(() => Result, (result) => result.assignment, { cascade: true })
  results: Result[];
}
