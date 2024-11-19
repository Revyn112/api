import { ApiProperty } from '@nestjs/swagger';

export class SayIntentionsValidate {
    @ApiProperty({ description: 'API Key Valid Status', example: true })
    isValid: boolean;

    @ApiProperty({ description: 'Active Flight Id', example: '320380' })
    flightId: string;

    constructor(isValid: number, flightId: string) {
        this.isValid = Boolean(isValid);
        this.flightId = flightId;
    }
}