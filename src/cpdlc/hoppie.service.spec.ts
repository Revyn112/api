import { Test, TestingModule } from '@nestjs/testing';
import { HoppieService } from './hoppie.service';

describe('HoppieService', () => {
    let service: HoppieService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [HoppieService] }).compile();

        service = module.get<HoppieService>(HoppieService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
