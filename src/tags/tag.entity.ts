import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 25,
    nullable: false,
    unique: true,
    comment: 'Name of the Tag',
  })
  name: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: 'Last creation date of the tag',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'Last updation date of the tag',
  })
  updatedAt: Date;
}
