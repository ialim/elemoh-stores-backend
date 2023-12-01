import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class SingleUploadAssetInput {
  @Field((type) => GraphQLUpload)
  file: FileUpload;
}

@ObjectType()
export class SingleUploadAssetOutput extends CoreOutput {}
