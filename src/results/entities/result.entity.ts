// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { Assignment } from 'src/assignments/entities/assignment.entity';
// import { User } from 'src/users/entities/user.entity';

// @Entity('results')
// export class Result {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   userId: number;

//   @Column()
//   grade: number;

//   @ManyToOne(() => Assignment, (assignment) => assignment.results, {
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'assignmentId' })
//   assignment: Assignment;

//   @ManyToOne(() => User, (user) => user.results, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'userId' })
//   user: User;
// }

import { User } from 'src/users/entities/user.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  grade: number;

  @ManyToOne(() => User, (user) => user.results, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Assignment, (assignment) => assignment.results, {
    onDelete: 'CASCADE',
  })
  assignment: Assignment;
}
