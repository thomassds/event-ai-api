import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEventsTable1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'banner',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'startAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'endAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'startSaleAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'endSaleAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'openDoorAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'isPublic',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'showWebsite',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['DRAFT', 'ACTIVE', 'CANCELLED', 'FINISHED'],
            default: "'DRAFT'",
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('events');
  }
}
