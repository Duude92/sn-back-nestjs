/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Param } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { ProfileService } from './profile.service';

@Controller('api/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
    @Get(':username')
    async profile( @Param('username') username: string) {
        return await this.profileService.getProfile(username);


    }
  
}
