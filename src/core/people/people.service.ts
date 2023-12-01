import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePersonInput,
  CreatePersonOutput,
} from './dtos/create-person.dto';
import {
  DeletePersonInput,
  DeletePersonOutput,
} from './dtos/delete-person.dto';
import { EditPersonInput, EditPersonOutput } from './dtos/edit-person.dto';
import { AllPersonOutput } from './dtos/find-all-person.dto';
import { FindPersonInput, FindPersonOutput } from './dtos/find-person.dto';
import { Person } from './entities/people.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person) private readonly people: Repository<Person>,
  ) {}

  async createPerson(
    createPersonInput: CreatePersonInput,
  ): Promise<CreatePersonOutput> {
    try {
      const person = await this.people.findOne(createPersonInput.emailAddress);
      if (!person) {
        const createdPerson = await this.people.save(
          this.people.create(createPersonInput),
        );
        return {
          ok: true,
          error: null,
          person: createdPerson,
        };
      }
      return {
        ok: false,
        error: 'Record Already Exist',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editPerson({
    personId,
    emailAddress,
    phoneNumber,
    firstName,
    lastName,
    title,
  }: EditPersonInput): Promise<EditPersonOutput> {
    try {
      const person = await this.people.findOne({ id: personId });
      if (!person) {
        return {
          ok: false,
          error: 'Record does not exist',
        };
      }
      emailAddress && (person.emailAddress = emailAddress);
      phoneNumber && (person.phoneNumber = phoneNumber);
      firstName && (person.firstName = firstName);
      lastName && (person.lastName = lastName);
      title && (person.title = title);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deletePerson({
    personId,
  }: DeletePersonInput): Promise<DeletePersonOutput> {
    try {
      const person = await this.people.findOne({ id: personId });
      if (!person) {
        return {
          ok: false,
          error: 'Person not found',
        };
      }
      await this.people.remove(person);
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

  async findPerson({ personId }: FindPersonInput): Promise<FindPersonOutput> {
    try {
      const person = await this.people.findOne(
        { id: personId },
        { relations: ['user', 'addresses'] },
      );
      if (!person) {
        return {
          ok: false,
          error: 'Person not found',
        };
      }
      return {
        ok: true,
        person,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findAllPerson(): Promise<AllPersonOutput> {
    try {
      const people = await this.people.find({
        relations: ['user', 'addresses'],
      });
      if (!people) {
        return {
          ok: false,
          error: 'Persons not found',
        };
      }
      return {
        ok: true,
        people,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
