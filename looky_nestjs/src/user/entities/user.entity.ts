import { Column, Entity, BaseEntity } from 'typeorm';

@Entity({ name: 'user' }) // 指定实体与现有的'user'表映射
export class UserEntity extends BaseEntity {

  @Column({ type: 'int', name: 'id',  primary: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'email' })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'password' })
  password: string;

  @Column({ type: 'datetime', nullable: false, name: 'RegistrationDate' })
  RegistrationDate: Date;
}
