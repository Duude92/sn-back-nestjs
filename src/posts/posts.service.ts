import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity/user.entity';
import { FindOptionsUtils, Repository } from 'typeorm';
import { ContentType, Posts, SendPostModel } from './posts.entity';

const TimeNow = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() +
    ':' +
    today.getMinutes() +
    ':' +
    today.getSeconds() +
    '.' +
    today.getMilliseconds();
  return date + ' ' + time;
};

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private posts: Repository<Posts>) {}

  async create(user: any, post: Posts): Promise<Posts> {
    const newPost = {
      // ...post,
      url: post.url,
      ContentType: post.ContentType,
      PostMessage: post.PostMessage,
      UserId: user.Id,
      CreatedAt: TimeNow().toString(),
    };
    const result = await this.posts.save(newPost);
    return result;
  }

  async getAllPosts(): Promise<SendPostModel[]> {
    const result = await this.posts.find();
    // const result2 = result.map(element=>element.ContentType!==ContentType.NONE&&element.url.)
    return result.map((element) => new SendPostModel(element));
  }
  async getPostById(id: number): Promise<SendPostModel> {
    const result = this.posts.findOne({
      where: {
        id: id,
      },
      join: {
        alias: 'posts',
        leftJoinAndSelect: {
          answers: 'posts.Answers',
          users: 'answers.User',
        },
      },
    });
    // const resultAnswers = result.Answers.map(
    //   (answer) => new SendPostModel(answer),
    // );
    const sendResult = new SendPostModel(await result);
    return sendResult;
    // this.posts.findOne({relations:{Answer:true}, where: {id:id})
  }
}
