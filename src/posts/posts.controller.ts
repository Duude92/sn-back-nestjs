import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { Posts, SendPostModel } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async Post(@Request() request, @Body() body) {
    return await this.postsService.create(request.user, body);
  }

  @Get()
  async GetPosts(): Promise<SendPostModel[]> {
    return this.postsService.getAllPosts();
  }
  @Get('/:id')
  async GetPostById(@Param('id') id: number): Promise<SendPostModel> {
    return await this.postsService.getPostById(id);
  }
}
