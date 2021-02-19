import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getConnection, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Verification } from 'src/users/entities/verification.entity';

jest.mock('got', () => {
  return {
    post: jest.fn(),
  };
});

const GRAPHQL_ENDPOINT = '/graphql';

const testUser = {
  email: 'era@iai.com',
  password: '15096',
};

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let usersRepository: Repository<User>;
  let verificationRepository: Repository<Verification>;
  let jwtToken: string;

  const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);
  const publicTest = (query: string) => baseTest().send({ query });
  const privateTest = (query: string) =>
    baseTest().set('X-JWT', jwtToken).send({ query });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
    verificationRepository = moduleFixture.get<Repository<Verification>>(
      getRepositoryToken(Verification),
    );
    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    app.close();
  });

  describe('createAccount', () => {
    it('should create account', () => {
      return publicTest(`
        mutation {
          createAccount(input:{
            email: "${testUser.email}"
            password: "${testUser.password}"
            role: Delivery
          }){
            ok
            error
          }
        }`)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { createAccount },
            },
          } = res;
          expect(createAccount.ok).toBe(true);
          expect(createAccount.error).toBe(null);
        });
    });

    it('should fail if account already exist', () => {
      return publicTest(`
        mutation {
          createAccount(input:{
            email: "${testUser.email}"
            password: "${testUser.password}"
            role: Delivery
          }){
            ok
            error
          }
        }`)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { createAccount },
            },
          } = res;
          expect(createAccount.ok).toBe(false);
          expect(createAccount.error).toBe(
            'There is a user with that email already',
          );
        });
    });
  });

  describe('login', () => {
    it('should login with the right credentials', () => {
      return publicTest(`
        mutation {
          login(input: {
            email: "${testUser.email}"
            password: "${testUser.password}"
          }) {
            ok
            token
            error
          }
        }`)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(true);
          expect(login.error).toBe(null);
          expect(login.token).toEqual(expect.any(String));
          jwtToken = login.token;
        });
    });
    it('should fail if credentials are incorrect', () => {
      return publicTest(`
        mutation {
          login(input: {
            email: "${testUser.email}"
            password: "34513"
          }) {
            ok
            token
            error
          }
        }`)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(false);
          expect(login.error).toBe('Wrong password');
          expect(login.token).toEqual(null);
        });
    });
  });

  describe('userProfile', () => {
    let userId: number;
    beforeAll(async () => {
      const [user] = await usersRepository.find();
      userId = user.id;
    });

    it("should find a user's profile", () => {
      return privateTest(`{
        userProfile(userId:${userId}){
          ok
          error
          user {
            id
          }
        }
      }
        `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                userProfile: {
                  ok,
                  error,
                  user: { id },
                },
              },
            },
          } = res;
          console.log(res.body);
          expect(ok).toBe(true);
          expect(error).toBe(null);
          expect(id).toBe(userId);
        });
    });
    it('Should not find a user profile', () => {
      return privateTest(`{
        userProfile(userId: 3){
          ok
          error
          user {
            id
          }
        }
      }
        `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                userProfile: { ok, error, user },
              },
            },
          } = res;
          console.log(res.body);
          expect(ok).toBe(false);
          expect(error).toBe('User does not exist');
          expect(user).toBe(null);
        });
    });
  });

  describe('me', () => {
    it('Should find logged in user profile', () => {
      return privateTest(`
        {
          me {
            email
          }
        }
        `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                me: { email },
              },
            },
          } = res;
          expect(email).toBe(testUser.email);
        });
    });

    it('Should not return user profile if user is not logged in', () => {
      return publicTest(`
        {
          me {
            email
          }
        }
        `)
        .expect(200)
        .expect((res) => {
          const {
            body: { errors, data },
          } = res;
          const [error] = errors;
          expect(data).toBe(null);
          expect(error.message).toBe('Forbidden resource');
        });
    });
  });
  describe('editProfile ', () => {
    it('should change user profile details', () => {
      return privateTest(`
            mutation{
              editProfile(input:{
                email: "lala@uiu.com"
              }){
                ok
                error
              }
            }
        `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                editProfile: { ok, error },
              },
            },
          } = res;
          expect(ok).toBe(true);
          expect(error).toBe(null);
        });
    });
  });
  describe('verifyEmail', () => {
    let VerificationCode: string;
    beforeAll(async () => {
      const [Verification] = await verificationRepository.find();
      VerificationCode = Verification.code;
    });
    it('Should verify email', () => {
      return publicTest(`
          mutation{
            verifyEmail(input: {code: "${VerificationCode}"}){
              ok
              error
            }
          }
        `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                verifyEmail: { ok, error },
              },
            },
          } = res;
          expect(ok).toBe(true);
          expect(error).toBe(null);
        });
    });
    it('should fail if wrong verification code is passed', () => {
      return publicTest(`
          mutation{
            verifyEmail(input: {code: "hjoddjllhaslj"}){
              ok
              error
            }
          }
        `)
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                verifyEmail: { ok, error },
              },
            },
          } = res;
          expect(ok).toBe(false);
          expect(error).toBe('Verification not found');
        });
    });
  });
});
