import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from '../../infrastructure/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { MailService } from '../../infrastructure/mail/mail.service';
import { RolesService } from '../role/role.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verfications: Repository<Verification>,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createAccount({
    email,
    password,
    roleId,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      const roleResult = await this.rolesService.findRole({ roleId });
      if (!roleResult) {
        return { ok: false, error: "Couldn't find role" };
      }
      const user = await this.users.save(
        this.users.create({ email, password, role: roleResult.role }),
      );
      const verification = await this.verfications.save(
        this.verfications.create({ user }),
      );
      this.mailService.sendVerificationEmail(user.email, verification.code);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
          token: null,
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
          token: null,
        };
      }
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        error: null,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error: error,
      };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOne({ id }, { relations: ['role'] });
      if (user) {
        return {
          ok: true,
          user,
        };
      }
      return { ok: false, error: 'User does not exist' };
    } catch (error) {
      return {
        ok: false,
        error: 'Something went wrong, user cannot be found at this time',
      };
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne(userId);
      if (email) {
        const existingUserEmail = await this.users.findOne({ email });
        if (existingUserEmail) {
          return {
            ok: false,
            error: 'A user already exist with that email',
          };
        }
        user.email = email;
        user.verified = false;
        const verification = await this.verfications.findOne({ user });
        if (Verification) {
          await this.verfications.delete(verification.id);
        }
        const verfication = await this.verfications.save(
          this.verfications.create({ user }),
        );
        this.mailService.sendVerificationEmail(user.email, verfication.code);
      }
      if (password) {
        user.password = password;
      }
      await this.users.save(user);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn't update profile" };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verfications.findOne(
        { code },
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        await this.users.save(verification.user);
        await this.verfications.delete(verification.id);
        return {
          ok: true,
        };
      }
      return { ok: false, error: 'Verification not found' };
    } catch (error) {
      return {
        ok: false,
        error: 'email could not be verified at this time',
      };
    }
  }
}
