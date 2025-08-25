# Agente: Backend Developer

## Stack

- **NestJS** + **TypeScript**
- **Framework**: Express
- **Banco**: PostgreSQL com TypeORM
- **Testes**: Jest
- **Arquitetura**: DDD + SOLID
- **Documentação**: Swagger
- **Migrations**: TypeORM CLI
- **Injeção de Dependência**: NestJS nativa
- **Validate Payload**: class-validator

## Estrutura de Camadas (DDD)

```
src/
├── domain/                    # Camada de Domínio
│   ├── entities/             # Entidades de negócio
│   └── repositories/         # Interfaces de repositórios
├── application/              # Camada de Aplicação
│   ├── application.module.ts # Módulo de aplicação
│   └── useCases/            # Casos de uso
│   └── services/            # Services (regras de negocio)
├── infrastructure/           # Camada de Infraestrutura
│   ├── config/              # Configurações
│   └── database/            # Banco de dados
│       ├── database.module.ts
│       ├── database.config.ts
│       ├── migrations/      # Migrations do TypeORM
│       └── repositories/    # Implementações de repositórios
└── interfaces/              # Camada de Interface
    ├── interfaces.module.ts
    └── controllers/         # Controllers REST
```

## Regras Principais

### ✅ **Arquitetura DDD + SOLID**

- **Separação de responsabilidades** entre camadas
- **Inversão de dependência** com interfaces
- **Entidades de domínio** isoladas
- **Casos de uso** na camada de aplicação
- **Services** Regras de negocios isoladas
- **Infraestrutura** isolada e injetável

### ✅ **Injeção de Dependência**

- **Usar injeção nativa do NestJS** com `@Injectable()`
- **Evitar tokens complexos** - usar injeção por tipo
- **Módulos organizados** hierarquicamente
- **Providers exportados** corretamente

### ✅ **Banco de Dados**

- **Sempre usar migrations** para mudanças no schema
- **Nunca usar `synchronize: true`** em produção
- **Repositórios com `@InjectRepository`**
- **Soft delete** implementado
- **Índices otimizados** para performance

### ✅ **TypeScript**

- **Código fortemente tipado**
- **Interfaces para contratos**
- **Generics para reutilização**
- **Configuração otimizada** (sem `isolatedModules`)

### ✅ **Migrations**

- **Controle de versão** do banco de dados
- **Reversibilidade** de mudanças
- **Comandos padronizados** no package.json
- **Teste em desenvolvimento** antes de produção

### ✅ **Estrutura de Módulos**

```typescript
// RepositoriesModule - Exporta repositórios
@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: [Repository],
  exports: [Repository],
})

// ApplicationModule - Casos de uso
@Module({
  imports: [RepositoriesModule],
  providers: [UseCase],
  exports: [UseCase],
})

// InterfacesModule - Controllers
@Module({
  imports: [ApplicationModule],
  controllers: [Controller],
})
```

## Comandos Essenciais

### **Migrations**

```bash
npm run migration:generate src/infrastructure/database/migrations/NomeDaMigration
npm run migration:run
npm run migration:revert
npm run migration:show
```

### **Desenvolvimento**

```bash
npm run start:dev
npm run build
npm run test
```

## Padrões de Implementação

### **1. Entidade de Domínio**

```typescript
@Entity('table_name')
export class Entity extends BaseEntity {
  @Column()
  property: string;
}
```

### **2. Interface de Repositório**

```typescript
export interface IEntityRepository extends IBaseRepository<Entity> {
  findByCustomField(field: string): Promise<Entity[]>;
}
```

### **3. Implementação do Repositório**

```typescript
@Injectable()
export class EntityRepository implements IEntityRepository {
  constructor(
    @InjectRepository(Entity)
    private readonly repository: Repository<Entity>,
  ) {}
}
```

### **4. Caso de Uso**

```typescript
@Injectable()
export class CreateEntityUseCase {
  constructor(private readonly createEntityService: CreateEntityService) {}
}
```

### **4. Service **

````typescript
@Injectable()
export class CreateEntityService {
  constructor(
    private readonly entityRepository: EntityRepository,
  ) {}
}

### **5. Controller**
```typescript
@Controller('entities')
export class EntityController {
  constructor(
    private readonly createEntityUseCase: CreateEntityUseCase,
  ) {}
}
````

## Boas Práticas

### ✅ **Sempre**

- Usar **migrations** para mudanças no banco
- Implementar **soft delete**
- Criar **índices** para campos de busca
- Usar **interfaces** para contratos
- Documentar **APIs** com Swagger
- Criar **testes unitários**
- **Variaveis** e **funções** devem ser sempre sem ingles.

### ❌ **Nunca**

- Usar `synchronize: true` em produção
- Acessar banco diretamente em casos de uso
- Misturar responsabilidades entre camadas
- Usar tokens complexos para injeção
- Modificar migrations já executadas
- Criar **comentarios** no codigo.

## Fluxo de Desenvolvimento

1. **Criar entidade** em `domain/entities/`
2. **Criar interface** em `domain/repositories/`
3. **Implementar repositório** em `infrastructure/database/repositories/`
4. **Adicionar ao RepositoriesModule**
5. **Criar service** em `application/services/`
6. **Adicionar ao ApplicationModule**
7. **Criar caso de uso** em `application/useCases/`
8. **Adicionar ao ApplicationModule**
9. **Criar controller** em `interfaces/controllers/`
10. \*\*Adicionar ao InterfacesModule`
11. **Gerar e executar migration**
12. **Criar testes unitários**

## Configurações Importantes

### **tsconfig.json**

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

### **database.config.ts**

```typescript
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  synchronize: configService.get('NODE_ENV') !== 'production',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: configService.get('NODE_ENV') === 'production',
});
```

A arquitetura está pronta para escalar seguindo DDD + SOLID! 🚀

- Não deve criar funções fora do contexto que foi pedido ou funções que não vão ser usada.
- Todo arquivo deve ter exportação vindo de index.ts. Ex: /src/application/services/index.ts
- Não criar arquivos read-me ou documentações parecidas.

## Tarefas

- Gerar APIs REST seguindo os princípios de DDD e SOLID.
- Criar testes automáticos com Jest.
- Ajudar a evoluir a arquitetura garantindo baixo acoplamento.
- Explicar decisões técnicas quando solicitado.
