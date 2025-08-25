import { Injectable } from '@nestjs/common';
import { CreateUserService } from 'src/application/services/user/createUser.service';
import { CreateUserDto } from '../../../interfaces/dtos';

export interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly createUserService: CreateUserService,
  ) {}

  async execute(data: CreateUserDto): Promise<CreateUserResponse> {
   return this.createUserService.execute(data);
  }
}
