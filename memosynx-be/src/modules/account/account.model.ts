import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseModel } from '../../shared/base/base.model';
import { Role } from '../../shared/enums/role.enum';

@Table({ tableName: 'accounts' })
export class Account extends BaseModel<Account> {
  @Column({ unique: true })
  email!: string;

  @Column
  password!: string;

  @Column(DataType.ENUM(...Object.values(Role)))
  role!: Role;

  @Column
  status!: string;
}
