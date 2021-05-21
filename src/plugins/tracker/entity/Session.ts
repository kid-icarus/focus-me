import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  startTime!: number;

  @Column()
  endTime!: number;

  @Column()
  completed!: boolean;
}
