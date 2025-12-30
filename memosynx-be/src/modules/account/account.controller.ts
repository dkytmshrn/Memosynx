import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { Role } from '../../shared/enums/role.enum';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.accountService.findById(Number(id));
  }

  @Post()
  async create() {
    // DUMMY payload
    return this.accountService.create({
      email: 'dummy@example.com',
      password: 'hashed-password',
      role: Role.STUDENT,
      status: 'ACTIVE',
    });
  }
}
