import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { UserGuard } from 'src/auth/guards/UserGuard.guard';



describe('JwtGuard', () => {
  let guard: UserGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = moduleRef.get<UserGuard>(UserGuard);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});