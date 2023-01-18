import { ApiProperty } from "@nestjs/swagger";

export class SignTransactionDto{
    @ApiProperty()
    from_seed: string

    @ApiProperty()
    from_address: string

    @ApiProperty()
    to_address: string

    @ApiProperty()
    amount: string
}