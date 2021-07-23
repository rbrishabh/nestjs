import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Sone',
      username: 'sone',
      password: 'somepass',
    },
    {
      id: 2,
      name: 'lol',
      username: 'aha',
      password: 'somepass2',
    },
  ];

  findOne(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }
}
