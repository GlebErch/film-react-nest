import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity({ name: 'schedules' })
export class ScheduleEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ name: 'filmId', type: 'uuid', nullable: true })
  filmId: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'filmId' })
  film: FilmEntity;

  @Column({ type: 'varchar' })
  daytime: string;

  @Column({ type: 'integer' })
  hall: number;

  @Column({ type: 'integer' })
  rows: number;

  @Column({ type: 'integer' })
  seats: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text', default: '' })
  taken: string;
}
