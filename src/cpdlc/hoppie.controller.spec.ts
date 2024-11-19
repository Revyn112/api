import { Test, TestingModule } from '@nestjs/testing';
import { HoppieController } from './hoppie.controller';

describe('HoppieController', () => {
    let controller: HoppieController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ controllers: [HoppieController] }).compile();

        controller = module.get<HoppieController>(HoppieController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
