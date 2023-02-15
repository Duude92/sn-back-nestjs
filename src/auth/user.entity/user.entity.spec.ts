import { Users } from './user.entity';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new Users({  email: 'a@b.c',
      password: 'abc',
      UserName: 'abc'})).toBeDefined();
  });
});
