import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PeopleService } from './people.service';
import { AllPersonOutput } from './dtos/find-all-person.dto';
import {
  CreatePersonInput,
  CreatePersonOutput,
} from './dtos/create-person.dto';
import {
  DeletePersonInput,
  DeletePersonOutput,
} from './dtos/delete-person.dto';
import { EditPersonInput, EditPersonOutput } from './dtos/edit-person.dto';
import { FindPersonInput, FindPersonOutput } from './dtos/find-person.dto';
import { Person } from './entities/people.entity';

@Resolver((of) => Person)
export class PersonsResolver {
  constructor(private readonly peopleService: PeopleService) {}

  @Mutation((returns) => CreatePersonOutput)
  async createPerson(
    @Args('input') createPersonInput: CreatePersonInput,
  ): Promise<CreatePersonOutput> {
    return await this.peopleService.createPerson(createPersonInput);
  }

  @Mutation((returns) => EditPersonOutput)
  async editPerson(
    @Args('input') editPersonInput: EditPersonInput,
  ): Promise<EditPersonOutput> {
    return await this.peopleService.editPerson(editPersonInput);
  }

  @Mutation((returns) => DeletePersonOutput)
  async deletePerson(
    @Args() deletePersonInput: DeletePersonInput,
  ): Promise<EditPersonOutput> {
    return await this.peopleService.deletePerson(deletePersonInput);
  }

  @Query((returns) => AllPersonOutput)
  async allPersons(): Promise<AllPersonOutput> {
    return await this.peopleService.findAllPerson();
  }

  @Query((returns) => FindPersonOutput)
  async findPerson(
    @Args() findPersonInput: FindPersonInput,
  ): Promise<FindPersonOutput> {
    return await this.peopleService.findPerson(findPersonInput);
  }
}
