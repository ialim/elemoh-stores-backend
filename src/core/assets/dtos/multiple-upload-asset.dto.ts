import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class MultipleUploadAssetInput {
  @Field((type) => [GraphQLUpload])
  files: FileUpload[];
}

@ObjectType()
export class MultipleUploadAssetOutput extends CoreOutput {}
