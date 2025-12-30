import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './account.model';
import { Role } from '../../shared/enums/role.enum';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account)
    private readonly accountModel: typeof Account,
  ) {}

  async findById(id: number): Promise<Account | null> {
    return this.accountModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<Account | null> {
    return this.accountModel.findOne({ where: { email } });
  }

  async create(payload: {
    email: string;
    password: string;
    role: Role;
    status: string;
  }): Promise<Account> {
    return this.accountModel.create(payload);
  }
}
