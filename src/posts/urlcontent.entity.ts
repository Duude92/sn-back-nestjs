import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Posts } from './posts.entity';

@Entity({ name: 'UrlContents' })
export class UrlContents {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  url: string;

  @ManyToOne(() => Posts, (post) => post.id)
  @Column({ type: 'integer', name: 'postModelId' })
  PostModel: number;
}
