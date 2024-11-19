import { Test, TestingModule } from '@nestjs/testing';
import { SayIntentionsController } from './sayintentions.controller';

describe('SayIntentionsController', () => {
    let controller: SayIntentionsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ controllers: [SayIntentionsController] }).compile();

        controller = module.get<SayIntentionsController>(SayIntentionsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
