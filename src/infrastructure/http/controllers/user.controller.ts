import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../../../application/useCases/user/createUser.useCase';
import { CreateUserDto } from '../../../interfaces/dtos';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.createUserUseCase.execute(createUserDto);

    return {
      success: true,
      data: result,
      message: 'User created successfully',
    };
  }
}
