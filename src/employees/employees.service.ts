import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PeopleService } from 'src/people/people.service';
import { Repository } from 'typeorm';
import {
  CreateDepartmentInput,
  CreateDepartmentOutput,
} from './dtos/create-department.dto';
import {
  CreateEmployeeInput,
  CreateEmployeeOutput,
} from './dtos/create-employee.dto';
import {
  DeleteDepartmentInput,
  DeleteDepartmentOutput,
} from './dtos/delete-department.dto';
import {
  DeleteEmployeeInput,
  DeleteEmployeeOutput,
} from './dtos/delete-employee.dto';
import {
  EditDepartmentInput,
  EditDepartmentOutput,
} from './dtos/edit-department.dto';
import {
  EditEmployeeInput,
  EditEmployeeOutput,
} from './dtos/edit-employee.dto';
import { AllDepartmentOutput } from './dtos/find-all-department.dto';
import { AllEmployeeOutput } from './dtos/find-all-employee.dto';
import {
  FindDepartmentInput,
  FindDepartmentOutput,
} from './dtos/find-department.dto';
import {
  FindEmployeeInput,
  FindEmployeeOutput,
} from './dtos/find-employee.dto';
import { Department } from './entities/department.entity';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly peopleService: PeopleService,
    @InjectRepository(Department)
    private readonly departments: Repository<Department>,
    @InjectRepository(Employee)
    private readonly employees: Repository<Employee>,
  ) {}

  async createDepartment(
    createDepartmentInput: CreateDepartmentInput,
  ): Promise<CreateDepartmentOutput> {
    try {
      const department = await this.departments.findOne({
        name: createDepartmentInput.name,
      });
      if (!department) {
        await this.departments.save(
          this.departments.create(createDepartmentInput),
        );
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: false,
        error: 'Department already exist',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editDepartment({
    name,
    employees,
    departmentId,
  }: EditDepartmentInput): Promise<EditDepartmentOutput> {
    try {
      const department = await this.departments.findOne({
        id: departmentId,
      });
      if (!department) {
        return {
          ok: false,
          error: 'Employee group not found',
        };
      }
      name && (department.name = name);
      if (employees) {
        const findEmployees = await this.employees.findByIds(employees);
        department.employees = findEmployees;
      }
      await this.departments.save(department);
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteDepartment({
    departmentId,
  }: DeleteDepartmentInput): Promise<DeleteDepartmentOutput> {
    try {
      const department = await this.departments.findOne({
        id: departmentId,
      });
      if (!Department) {
        return {
          ok: false,
          error: 'Employee Groupsnot found',
        };
      }
      await this.departments.remove(department);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findDepartment({
    departmentId,
  }: FindDepartmentInput): Promise<FindDepartmentOutput> {
    try {
      const department = await this.departments.findOne({
        id: departmentId,
      });
      if (!department) {
        return {
          ok: false,
          error: 'Department not found',
        };
      }
      return {
        ok: true,
        department,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllDepartment(): Promise<AllDepartmentOutput> {
    try {
      const departments = await this.departments.find({
        relations: ['Employees'],
      });
      if (!departments) {
        return {
          ok: false,
          error: 'Departments not found',
        };
      }
      return {
        ok: true,
        departments,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async createEmployee({
    personId,
    departmentId,
  }: CreateEmployeeInput): Promise<CreateEmployeeOutput> {
    try {
      const department = await this.departments.findOne({ id: departmentId });
      const profile = await this.peopleService.findPerson({ personId });
      if (profile.ok) {
        await this.employees.save(
          this.employees.create({
            profile: profile.person,
            department,
          }),
        );
        return {
          ok: true,
          error: null,
        };
      }
      return {
        ok: false,
        error: profile.error,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editEmployee({
    employeeId,
    departmentId,
  }: EditEmployeeInput): Promise<EditEmployeeOutput> {
    try {
      const employee = await this.employees.findOne(
        {
          id: employeeId,
        },
        {
          relations: ['profile'],
        },
      );
      if (!employee) {
        return {
          ok: false,
          error: 'Employee not found',
        };
      }

      if (departmentId) {
        const department = await this.departments.findOne({ id: departmentId });
        department && (employee.department = department);
      }

      await this.employees.save(employee);
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteEmployee({
    employeeId,
  }: DeleteEmployeeInput): Promise<DeleteEmployeeOutput> {
    try {
      const employee = await this.employees.findOne({ id: employeeId });
      if (!employee) {
        return {
          ok: false,
          error: 'Employee not found',
        };
      }
      await this.employees.remove(employee);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findEmployee({
    employeeId,
  }: FindEmployeeInput): Promise<FindEmployeeOutput> {
    try {
      const employee = await this.employees.findOne(
        { id: employeeId },
        { relations: ['department', 'profile'] },
      );
      if (!employee) {
        return {
          ok: false,
          error: 'Employee not found',
        };
      }
      return {
        ok: true,
        employee,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllEmployee(): Promise<AllEmployeeOutput> {
    try {
      const employees = await this.employees.find({
        relations: ['department', 'profile'],
      });
      if (!employees) {
        return {
          ok: false,
          error: 'Employees not found',
        };
      }
      return {
        ok: true,
        employees,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
