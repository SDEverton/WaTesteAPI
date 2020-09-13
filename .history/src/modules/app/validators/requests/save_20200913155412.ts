import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IRequests } from 'modules/database/interfaces/requests';

export class SaveValidator implements IRequests {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 150 })
  public description: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public quantity?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: true, type: 'float' })
  public price?: number;
}
