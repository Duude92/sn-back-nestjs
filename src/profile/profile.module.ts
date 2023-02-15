import { ProfileService } from './profile.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity/user.entity';
import { Posts } from 'src/posts/posts.entity';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Posts])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
