import { Test, TestingModule } from '@nestjs/testing';
import { Pbkdf2Service } from './pbkdf2.service';
import { PBKDF2_OPTIONS } from './constants';

describe('Pbkdf2Service', () => {
  let service: Pbkdf2Service;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        Pbkdf2Service,
        {
          provide: PBKDF2_OPTIONS,
          useValue: {
            hashBytes: 32,
            saltBytes: 16,
            digest: 'sha512',
            iterations: 65535,
            encoding: 'hex',
          },
        },
      ],
    }).compile();

    service = await moduleRef.resolve(Pbkdf2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Hash and Compare', () => {
    it('hash and compare a password', () => {
      const password = 'The password to hash';
      const hash = service.hashSync(password);

      expect(service.compareSync(password, hash)).toBeTruthy();
    });

    it('hash and compare a password async', async () => {
      const password = 'The password to hash';
      const hash = await service.hash(password);

      expect(await service.compare(password, hash)).toBeTruthy();
    });
  });
});
