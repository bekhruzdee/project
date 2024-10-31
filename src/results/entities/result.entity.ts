import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  grade: number;

  @ManyToOne(() => Assignment, (assignment) => assignment.results, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'assignmentId' })
  assignment: Assignment;

  @ManyToOne(() => User, (user) => user.results, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
