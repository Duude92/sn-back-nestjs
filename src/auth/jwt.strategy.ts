import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Users } from './user.entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor() {
   super({
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     ignoreExpiration: false,
     secretOrKey: jwtConstants.secret,
   });
 }

 async validate(payload: any) {
   return { Id: payload.sub, UserName: payload.username, role: payload.role };
 }
}