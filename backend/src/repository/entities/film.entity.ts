import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'films' })
export class FilmEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'float' })
  rating: number;

  @Column({ type: 'varchar' })
  director: string;

  @Column({ type: 'text' })
  tags: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  cover: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  about: string;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film)
  schedule: ScheduleEntity[];
}
