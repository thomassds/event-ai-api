# Injeção de Dependência Nativa do NestJS

## Estrutura Implementada

Agora estamos usando a injeção de dependência nativa do NestJS, que é mais simples e direta.

### **1. Repositório com @Injectable**

```typescript
// src/infrastructure/database/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  // Implementação dos métodos...
}
```

### **2. Módulo de Repositórios**

```typescript
// src/infrastructure/database/repositories/repositories.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoriesModule {}
```

### **3. Caso de Uso com Injeção Direta**

```typescript
// src/application/useCases/user/createUser.useCase.ts
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUserDto): Promise<CreateUserResponse> {
    // Implementação...
  }
}
```

### **4. Módulo de Aplicação**

```typescript
// src/application/application.module.ts
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './useCases/user/createUser.useCase';
import { RepositoriesModule } from '../infrastructure/database/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class ApplicationModule {}
```

### **5. Controller com Injeção**

```typescript
// src/interfaces/controllers/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/useCases/user/createUser.useCase';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.createUserUseCase.execute(createUserDto);
  }
}
```

## Estrutura de Módulos

```
src/
├── app.module.ts                    # Módulo principal
├── domain/                          # Camada de Domínio
│   ├── entities/
│   └── repositories/
├── application/                     # Camada de Aplicação
│   ├── application.module.ts       # Módulo de aplicação
│   └── useCases/
├── infrastructure/                  # Camada de Infraestrutura
│   ├── config/
│   └── database/
│       ├── database.module.ts
│       └── repositories/
│           ├── repositories.module.ts
│           └── user.repository.ts
└── interfaces/                      # Camada de Interface
    ├── interfaces.module.ts
    └── controllers/
```

## Fluxo de Injeção de Dependência

1. **RepositoriesModule** exporta `UserRepository`
2. **ApplicationModule** importa `RepositoriesModule` e exporta `CreateUserUseCase`
3. **InterfacesModule** importa `ApplicationModule` e usa `CreateUserUseCase`
4. **AppModule** importa todos os módulos

## Benefícios da Abordagem Nativa

### ✅ **Simplicidade**
- Sem tokens de injeção complexos
- Injeção automática por tipo
- Menos boilerplate

### ✅ **Type Safety**
- TypeScript infere tipos automaticamente
- Menos erros de runtime
- Melhor IntelliSense

### ✅ **Padrão NestJS**
- Segue as convenções do framework
- Mais fácil para outros desenvolvedores
- Melhor integração com ferramentas

### ✅ **Manutenibilidade**
- Código mais limpo e legível
- Fácil de testar
- Fácil de estender

## Como Adicionar Novos Repositórios

1. **Criar a entidade** em `domain/entities/`
2. **Criar a interface** em `domain/repositories/`
3. **Implementar o repositório** em `infrastructure/database/repositories/`
4. **Adicionar ao RepositoriesModule**
5. **Criar os casos de uso** em `application/useCases/`
6. **Adicionar ao ApplicationModule**
7. **Criar os controllers** em `interfaces/controllers/`

## Exemplo: Adicionando Product

```typescript
// 1. Entidade
@Entity('products')
export class Product extends BaseEntity {
  @Column()
  name: string;
  
  @Column('decimal')
  price: number;
}

// 2. Interface
export interface IProductRepository extends IBaseRepository<Product> {
  findByCategory(category: string): Promise<Product[]>;
}

// 3. Repositório
@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}
  
  // Implementação...
}

// 4. Adicionar ao RepositoriesModule
@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  providers: [UserRepository, ProductRepository],
  exports: [UserRepository, ProductRepository],
})
export class RepositoriesModule {}
```

## Testando a API

Após iniciar a aplicação:

```bash
# Criar usuário
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "123456",
    "phone": "11999999999"
  }'
```

A estrutura está pronta e seguindo as melhores práticas do NestJS! 🚀
