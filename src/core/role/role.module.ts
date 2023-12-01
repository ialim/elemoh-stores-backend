import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolesResolver } from './role.resolver';
import { RolesService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [RolesResolver, RolesService],
  exports: [RolesService],
})
export class RoleModule {}
