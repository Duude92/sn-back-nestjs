import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationInfo, Users } from '../user.entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private Users: Repository<Users>,
    private jwt: JwtService,
  ) {}

  async signup(user: RegistrationInfo): Promise<Users> {
    console.log('signup', JSON.stringify(user));

    const salt = await bcrypt.genSalt();
    // const salt = '45XR4YA2XVC5L6YL46CJO552ZU7ERH36';
    const hash = await bcrypt.hash(user.password, salt);
    // user.password = hash;
    const newUser = new Users(user);
    newUser.Email = user.email;
    newUser.NormalizedEmail = user.email.toUpperCase();
    newUser.PasswordHash = hash;
    newUser.UserName = user.UserName;
    newUser.NormalizedUserName = user.UserName.toUpperCase();
    await this.Users.save(newUser).then((result) =>
      console.log('result', result),
    );
    return newUser;
  }
  async validateUser(email: string, password: string): Promise<any> {
    console.log('validate', email);

    const user = await this.Users.findOne({
      where: { NormalizedEmail: email.toUpperCase() },
    });
    if (!user) return null;
    if (await bcrypt.compare(password, user.PasswordHash)) {
      const { PasswordHash, ...result } = user;
      return result;
    }
  }
  async login(user: Users) {
    console.log('login', user);

    const payload = { username: user.UserName, sub: user.Id };
    return {
      userid: user.Id,
      username: user.UserName,
      access_token: this.jwt.sign(payload),
    };
  }
}
