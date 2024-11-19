import { Test, TestingModule } from '@nestjs/testing';
import { SayIntentionsService } from './sayintentions.service';

describe('SayIntentionsService', () => {
    let service: SayIntentionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [SayIntentionsService] }).compile();

        service = module.get<SayIntentionsService>(SayIntentionsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
