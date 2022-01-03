import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';

@Module({
  providers: [EmployeesService, EmployeesResolver],
})
export class EmployeesModule {}
