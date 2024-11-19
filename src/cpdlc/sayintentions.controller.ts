import {Body, CacheTTL, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { SayIntentionsService } from './sayintentions.service';
import { CpdlcMessageDto } from './dto/cpdlc-message.dto';
import { Cpdlc } from './cpdlc.class';
import {Airport} from "../airport/dto/airport.dto";
import {SayIntentionsValidate} from "./sayintententionsvalidate.class";
import {TelexSearchResult} from "../telex/dto/telex-search-result.dto";

@ApiTags('CPDLC')
@Controller('api/v1/sayintentions')
export class SayIntentionsController {
    constructor(private sayIntentionsService: SayIntentionsService) {
    }

    @Post()
    @ApiBody({ description: 'The message to send', type: CpdlcMessageDto })
    @ApiCreatedResponse({ description: 'The message could be addressed', type: Cpdlc })
    @ApiNotFoundResponse({ description: 'The sender or recipient flight number could not be found' })
    async requestData(@Body() body: CpdlcMessageDto): Promise<Cpdlc> {
        return this.sayIntentionsService.getData(body);
    }

    @Get('_validate')
    @ApiQuery({ name: 'key', description: 'The API Key to be validate', example: 'xxxxxxxxxxxx' })
    @ApiOkResponse({ description: 'Validate for API Key is found', type: SayIntentionsValidate })
    @ApiNotFoundResponse({ description: 'Validate for API Key not found' })
    async getValidate(@Query('key') key: string): Promise<SayIntentionsValidate> {
        return this.sayIntentionsService.getValidate(key);
    }
}
