import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { PeopleModule } from 'src/core/people/people.module';
import { Department } from './entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department]), PeopleModule],
  providers: [EmployeesService, EmployeesResolver],
  exports: [EmployeesService],
})
export class EmployeesModule {}
