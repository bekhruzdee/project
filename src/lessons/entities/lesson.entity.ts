import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'int', nullable: false })
  moduleId: number;

  @ManyToOne(() => Modules, (module) => module.lessons, { onDelete: 'CASCADE' })
  module: Modules;
}
