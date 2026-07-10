import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity({ name: 'schedule' })
export class ScheduleEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ name: 'film_id', type: 'uuid' })
  filmId: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'film_id' })
  film: FilmEntity;

  @Column({ type: 'timestamptz' })
  daytime: Date;

  @Column({ type: 'text' })
  hall: string;

  @Column({ type: 'integer' })
  rows: number;

  @Column({ type: 'integer' })
  seats: number;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'text', array: true, default: '{}' })
  taken: string[];
}
