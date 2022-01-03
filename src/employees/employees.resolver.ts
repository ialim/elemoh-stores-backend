import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CreateDepartmentOutput,
  CreateDepartmentInput,
} from './dtos/create-department.dto';
import {
  CreateEmployeeOutput,
  CreateEmployeeInput,
} from './dtos/create-employee.dto';
import {
  DeleteDepartmentOutput,
  DeleteDepartmentInput,
} from './dtos/delete-department.dto';
import {
  DeleteEmployeeOutput,
  DeleteEmployeeInput,
} from './dtos/delete-employee.dto';
import {
  EditDepartmentOutput,
  EditDepartmentInput,
} from './dtos/edit-department.dto';
import {
  EditEmployeeOutput,
  EditEmployeeInput,
} from './dtos/edit-employee.dto';
import { AllDepartmentOutput } from './dtos/find-all-department.dto';
import { AllEmployeeOutput } from './dtos/find-all-employee.dto';
import {
  FindDepartmentOutput,
  FindDepartmentInput,
} from './dtos/find-department.dto';
import {
  FindEmployeeOutput,
  FindEmployeeInput,
} from './dtos/find-employee.dto';
import { EmployeesService } from './employees.service';

@Resolver()
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation((returns) => CreateEmployeeOutput)
  async createEmployee(
    @Args('input') createEmployeeInput: CreateEmployeeInput,
  ): Promise<CreateEmployeeOutput> {
    return await this.employeesService.createEmployee(createEmployeeInput);
  }

  @Mutation((returns) => EditEmployeeOutput)
  async editEmployee(
    @Args('input') editEmployeeInput: EditEmployeeInput,
  ): Promise<EditEmployeeOutput> {
    return await this.employeesService.editEmployee(editEmployeeInput);
  }

  @Mutation((returns) => DeleteEmployeeOutput)
  async deleteEmployee(
    @Args() deleteEmployeeInput: DeleteEmployeeInput,
  ): Promise<DeleteEmployeeOutput> {
    return await this.employeesService.deleteEmployee(deleteEmployeeInput);
  }

  @Mutation((returns) => FindEmployeeOutput)
  async findEmployee(
    @Args() findEmployeeInput: FindEmployeeInput,
  ): Promise<FindEmployeeOutput> {
    return await this.employeesService.findEmployee(findEmployeeInput);
  }

  @Mutation((returns) => AllEmployeeOutput)
  async findAllEmployee(): Promise<AllEmployeeOutput> {
    return await this.employeesService.findAllEmployee();
  }

  @Mutation((returns) => CreateDepartmentOutput)
  async createGroupEmployee(
    @Args('input') createDepartmentInput: CreateDepartmentInput,
  ): Promise<CreateDepartmentOutput> {
    return await this.employeesService.createDepartment(createDepartmentInput);
  }

  @Mutation((returns) => EditDepartmentOutput)
  async editDepartment(
    @Args('input') editDepartmentInput: EditDepartmentInput,
  ): Promise<EditDepartmentOutput> {
    return await this.employeesService.editDepartment(editDepartmentInput);
  }

  @Mutation((returns) => DeleteDepartmentOutput)
  async deleteDepartment(
    @Args() deleteDepartmentInput: DeleteDepartmentInput,
  ): Promise<DeleteDepartmentOutput> {
    return await this.employeesService.deleteDepartment(deleteDepartmentInput);
  }

  @Mutation((returns) => FindDepartmentOutput)
  async findDepartment(
    @Args() findDepartmentInput: FindDepartmentInput,
  ): Promise<FindDepartmentOutput> {
    return await this.employeesService.findDepartment(findDepartmentInput);
  }

  @Mutation((returns) => AllDepartmentOutput)
  async findAllDepartment(): Promise<AllDepartmentOutput> {
    return await this.employeesService.findAllDepartment();
  }
}
