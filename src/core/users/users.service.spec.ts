import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/infrastructure/jwt/jwt.service';
import { MailService } from 'src/infrastructure/mail/mail.service';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UsersService } from './users.service';

const mockRespository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(() => 'signed-token'),
  verify: jest.fn(),
});

const mockMailService = () => ({
  sendVerificationEmail: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UsersService;
  let userRepository: MockRepository<User>;
  let verificationRepository: MockRepository<Verification>;
  let mailService: MailService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRespository(),
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRespository(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService(),
        },
        {
          provide: MailService,
          useValue: mockMailService(),
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    mailService = module.get<MailService>(MailService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get(getRepositoryToken(User));
    verificationRepository = module.get(getRepositoryToken(Verification));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAccount', () => {
    const createAccountArgs = {
      email: 'qui@ehj.com',
      password: '2324',
      role: UserRole.Cashier,
    };
    it('should fail if user exists', async () => {
      userRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'aaa@iaiai.com',
      });
      const result = await service.createAccount(createAccountArgs);
      expect(result).toMatchObject({
        ok: false,
        error: 'There is a user with that email already',
      });
    });

    it('should create a new user', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      userRepository.create.mockReturnValue(createAccountArgs);
      userRepository.save.mockResolvedValue(createAccountArgs);

      verificationRepository.create.mockReturnValue({
        user: createAccountArgs,
      });
      verificationRepository.save.mockResolvedValue({
        code: 'code',
      });

      const result = await service.createAccount(createAccountArgs);

      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith(createAccountArgs);

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(createAccountArgs);

      expect(verificationRepository.create).toHaveBeenCalledTimes(1);
      expect(verificationRepository.create).toHaveBeenCalledWith({
        user: createAccountArgs,
      });
      expect(verificationRepository.save).toHaveBeenCalledTimes(1);
      expect(verificationRepository.save).toHaveBeenCalledWith({
        user: createAccountArgs,
      });

      expect(mailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
      expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
      );

      expect(result).toEqual({ ok: true });
    });

    it('should fail on exception', async () => {
      userRepository.findOne.mockRejectedValue(new Error());
      const result = await service.createAccount(createAccountArgs);
      expect(result).toEqual({ ok: false, error: "Couldn't create account" });
    });
  });

  describe('Login', () => {
    const loginArgs = {
      email: 'thdu@rtry.com',
      password: '22333',
    };

    const mockedUser = {
      id: 1,
      checkPassword: jest.fn(),
    };

    it('should fail if user does not exist', async () => {
      userRepository.findOne.mockResolvedValue(null);

      const result = await service.login(loginArgs);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
      );
      expect(result).toEqual({
        ok: false,
        error: 'User not found',
        token: null,
      });
    });

    it('should fail if password is incorrect', async () => {
      userRepository.findOne.mockResolvedValue(mockedUser);
      mockedUser.checkPassword.mockReturnValue(false);

      const result = await service.login(loginArgs);

      expect(mockedUser.checkPassword).toHaveBeenCalledTimes(1);
      expect(mockedUser.checkPassword).toHaveBeenCalledWith(loginArgs.password);

      expect(result).toEqual({
        ok: false,
        error: 'Wrong password',
        token: null,
      });
    });

    it('should login successfully', async () => {
      userRepository.findOne.mockResolvedValue(mockedUser);
      mockedUser.checkPassword.mockReturnValue(true);

      const result = await service.login(loginArgs);

      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith(expect.any(Number));

      expect(result).toEqual({
        ok: true,
        error: null,
        token: 'signed-token',
      });
    });

    it('should fail on exception', async () => {
      userRepository.findOne.mockRejectedValue(new Error());
      const result = await service.login(loginArgs);
      expect(result).toEqual({
        ok: false,
        error: null,
      });
    });
  });

  describe('findById', () => {
    const mockUser = {
      id: 1,
      email: '',
    };
    it('should fail if user does not exist', async () => {
      userRepository.findOne.mockResolvedValue(null);

      const result = await service.findById(mockUser.id);

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith(expect.any(Object));

      expect(result).toEqual({ ok: false, error: 'User does not exist' });
    });

    it('should find a user if user exist', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findById(mockUser.id);

      expect(userRepository.findOne).toHaveBeenCalledWith(expect.any(Object));
      expect(result).toEqual({
        ok: true,
        user: mockUser,
      });
    });

    it('should fail on exception', async () => {
      userRepository.findOne.mockRejectedValue(new Error());
      const result = await service.findById(mockUser.id);
      expect(result).toEqual({
        ok: false,
        error: 'Something went wrong, user cannot be found at this time',
      });
    });
  });

  describe('editProfile', () => {
    const mockUserId = {
      id: 1,
    };
    const editProfileArgs = {
      email: 'eiheih',
      password: '1233',
    };

    const mockUser = {
      email: 'ihwhiwihn',
      password: '4563',
      verified: true,
    };

    const exisitingUserEmail = {
      email: 'eiheih',
    };

    const mockVerification = {
      id: 2,
      code: 'hdhjdjskksk',
    };

    it('should fail if provided email already exist', async () => {
      userRepository.findOne.mockResolvedValue(exisitingUserEmail);

      const result = await service.editProfile(mockUserId.id, editProfileArgs);

      expect(userRepository.findOne).toBeCalledTimes(2);
      expect(userRepository.findOne).toHaveBeenNthCalledWith(2, {
        email: editProfileArgs.email,
      });

      expect(result).toEqual({
        ok: false,
        error: 'A user already exist with that email',
      });
    });

    it('should update user details', async () => {
      userRepository.findOne.mockResolvedValueOnce(mockUser);
      userRepository.findOne.mockResolvedValueOnce(undefined);
      verificationRepository.findOne.mockResolvedValue(mockVerification);
      verificationRepository.create.mockReturnValue({
        user: mockUser,
      });
      verificationRepository.save.mockResolvedValue({
        code: 'code',
      });

      const result = await service.editProfile(mockUserId.id, editProfileArgs);

      expect(userRepository.findOne).toBeCalledTimes(2);
      expect(userRepository.findOne).toHaveBeenNthCalledWith(2, {
        email: editProfileArgs.email,
      });

      expect(verificationRepository.findOne).toHaveBeenCalledTimes(1);
      expect(verificationRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object),
      );

      expect(verificationRepository.delete).toHaveBeenCalledTimes(1);
      expect(verificationRepository.delete).toHaveBeenCalledWith(
        mockVerification.id,
      );

      expect(verificationRepository.create).toHaveBeenCalledTimes(1);
      expect(verificationRepository.create).toHaveBeenCalledWith({
        user: mockUser,
      });

      expect(verificationRepository.save).toHaveBeenCalledTimes(1);
      expect(verificationRepository.save).toHaveBeenCalledWith({
        user: mockUser,
      });

      expect(mailService.sendVerificationEmail).toHaveBeenCalledTimes(1);
      expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(
        editProfileArgs.email,
        expect.any(String),
      );

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);

      expect(result).toEqual({ ok: true });
    });

    it('should fail on exception', async () => {
      userRepository.findOne.mockRejectedValue(new Error());
      const result = await service.editProfile(mockUserId.id, editProfileArgs);
      expect(result).toEqual({ ok: false, error: "Couldn't update profile" });
    });
  });

  describe('verifyEmail', () => {
    const verifyEmailArgs = {
      code: 'code',
    };

    const mockVerfication = {
      id: 1,
      code: 'code',
      user: {
        id: 2,
        verified: false,
      },
    };

    const mockVerified = {
      id: 1,
      code: 'code',
      user: {
        id: 2,
        verified: true,
      },
    };

    it('should verify email if code exist', async () => {
      verificationRepository.findOne.mockResolvedValue(mockVerfication);

      const result = await service.verifyEmail(verifyEmailArgs.code);

      expect(verificationRepository.findOne).toHaveBeenCalledTimes(1);
      expect(verificationRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
      );

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith(mockVerified.user);

      expect(verificationRepository.delete).toHaveBeenCalledTimes(1);
      expect(verificationRepository.delete).toHaveBeenCalledWith(
        mockVerfication.id,
      );

      expect(result).toEqual({
        ok: true,
      });
    });

    it('should fail if code does not exist', async () => {
      verificationRepository.findOne.mockResolvedValue(null);

      const result = await service.verifyEmail(verifyEmailArgs.code);

      expect(
        verificationRepository.findOne,
      ).toHaveBeenCalledWith(verifyEmailArgs, { relations: ['user'] });

      expect(result).toEqual({ ok: false, error: 'Verification not found' });
    });

    it('should fail on exception', async () => {
      verificationRepository.findOne.mockRejectedValue(new Error());

      const result = await service.verifyEmail(verifyEmailArgs.code);

      expect(result).toEqual({
        ok: false,
        error: 'email could not be verified at this time',
      });
    });
  });
});
