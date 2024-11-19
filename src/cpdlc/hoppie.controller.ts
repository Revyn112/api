import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiTags,
} from '@nestjs/swagger';
import { HoppieService } from './hoppie.service';
import { CpdlcMessageDto } from './dto/cpdlc-message.dto';
import { Cpdlc } from './cpdlc.class';

@ApiTags('CPDLC')
@Controller('api/v1/hoppie')
export class HoppieController {
    constructor(private hoppieService: HoppieService) {
    }

    @Post()
    @ApiBody({ description: 'The message to send', type: CpdlcMessageDto })
    @ApiCreatedResponse({ description: 'The message could be addressed', type: Cpdlc })
    @ApiNotFoundResponse({ description: 'The sender or recipient flight number could not be found' })
    async requestData(@Body() body: CpdlcMessageDto): Promise<Cpdlc> {
        return this.hoppieService.getData(body);
    }
}
