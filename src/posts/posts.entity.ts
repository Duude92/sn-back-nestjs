import { execArgv } from 'process';
import { Users } from 'src/auth/user.entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
  Tree,
  TreeParent,
  TreeChildren,
} from 'typeorm';
import { UrlContents } from './urlcontent.entity';

export enum ContentType {
  NONE,
  PICTURE,
  VIDEO,
  MUSIC,
  LINK,
  STREAM,
}

@Entity()
@Tree('adjacency-list')
export class Posts {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  PostMessage: string;

  @Column({ type: 'integer' })
  ContentType: ContentType;

  @OneToMany(() => UrlContents, (url) => url.PostModel, {
    eager: true,
    cascade: true,
  })
  @JoinTable({ name: 'UrlContents' })
  url: UrlContents[];

  @Column({ type: 'text', nullable: true })
  CreatedAt: string;

  @Column({ type: 'text', name: 'userId' })
  UserId: string;

  @ManyToOne(() => Users, (user) => user.Id, { eager: true })
  // @Column({ type: 'text', name: 'userId' })
  User: Users;

  @ManyToOne(() => Posts, (post) => post.id)
  @Column({ type: 'integer', name: 'answerId', nullable: true })
  @TreeParent()
  Answer: number;

  @OneToMany(() => Posts, (post) => post.Answer)
  @TreeChildren()
  Answers: Posts[];
}

export class SendPostModel {
  constructor(model: Posts) {
    this.id = model.id;
    this.postMessage = model.PostMessage;
    this.contentType = model.ContentType;
    this.url = model.url;
    this.createdAt = model.CreatedAt;
    this.answerId = model.Answer;
    this.authorName = model.User.UserName;
    this.authorFullName = model.User.FullName;
    this.authorPicture = model.User.ProfileImage;
    this.answers = model.Answers?.map((answer) => new SendPostModel(answer));
  }
  id: number;
  postMessage: string;
  contentType: ContentType;
  url: UrlContents[];
  createdAt: string;
  answerId: number;
  authorName: string;
  authorFullName: string;
  authorPicture: string;
  answers: SendPostModel[];
}
