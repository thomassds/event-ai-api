import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/database/repositories/user/user.repository';
import {
  BusinessErrorCode,
  BusinessException,
} from 'src/infrastructure/exceptions';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
}

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDto): Promise<CreateUserResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw BusinessException.create(
        BusinessErrorCode.USER_ALREADY_EXISTS,
        'createUser',
      );
    }

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      emailVerified: false,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    };
  }
}
