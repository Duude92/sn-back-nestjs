/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity/user.entity';
import { Posts, SendPostModel } from 'src/posts/posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
  ) {}
  async getProfile(username: string) {
    const profiledata: any = {};
    // const user = await this.usersRepository.findOne({
    //   where: { NormalizedUserName: username.toUpperCase() },
    //   join: {
    //     alias: 'Users',
    //     leftJoinAndSelect: {
    //       posts: 'Users.Posts',
    //     },
    //   },
    // });
    const user = await this.usersRepository.findOne({
      where: { NormalizedUserName: username.toUpperCase() },
    });
    const posts = (
      await this.postsRepository.find({
        where: {
          UserId: user.Id,
        },
      })
    ).map((post) => new SendPostModel(post));
    if (user) {
      profiledata.userName = user.UserName;
      profiledata.profileImage = user.ProfileImage;
      profiledata.fullName = user.FullName;
      profiledata.posts = posts;
    }
    return profiledata;
  }
}
