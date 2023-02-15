import { Posts } from 'src/posts/posts.entity';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface RegistrationInfo {
  UserName:string;
  email:string;
  password:string;
 
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column({ type: 'integer' })
  AccessFailedCount: number;

  @Column({ type: 'text', nullable: true })
  ConcurrencyStamp: string;

  @Column({ type: 'text' })
  Email: string;

  @Column({ type: 'text' })
  NormalizedEmail: string;

  @Column({ type: 'integer' })
  EmailConfirmed: boolean;

  @Column({ type: 'integer' })
  LockoutEnabled: boolean;

  @Column({ type: 'text', nullable: true })
  LockoutEnd: Date;

  @Column({ type: 'text' })
  UserName: string;

  @Column({ type: 'text' })
  NormalizedUserName: string;

  @Column({ type: 'text' })
  PasswordHash: string;

  @Column({ type: 'text', nullable: true })
  PhoneNumber: string;

  @Column({ type: 'integer', nullable: true })
  PhoneNumberConfirmed: boolean;

  @Column({
    type: 'text',
    nullable: true,
    default: 'https://localhost:7216/api/content/ProfilePicture.jpg',
  })
  ProfileImage: string;

  @Column({ type: 'text', nullable: true })
  SecurityStamp: string;

  @Column({ type: 'integer' })
  TwoFactorEnabled: boolean;

  @Column({ type: 'text', nullable: true })
  FullName: string;

  @Column({ type: 'text', name: 'Name' })
  Name: string;

  @OneToMany(() => Posts, (post) => post.User)
  Posts: Posts[];

  constructor(regInfo: RegistrationInfo) {
    this.Id = undefined;
    this.AccessFailedCount = 0;
    this.ConcurrencyStamp = null;
    this.Email = regInfo?.email;
    this.NormalizedEmail = regInfo?.email.toUpperCase();
    this.EmailConfirmed = false;
    this.LockoutEnabled = false;
    this.LockoutEnd = null;
    this.UserName = null;
    this.NormalizedUserName = null;
    this.PasswordHash = null;
    this.PhoneNumber = null;
    this.PhoneNumberConfirmed = false;
    this.ProfileImage = null;
    this.SecurityStamp = null;
    this.TwoFactorEnabled = false;
    this.FullName = null;
    this.Name = '';
  }
}
