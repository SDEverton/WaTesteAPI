import { ApiProperty } from '@nestjs/swagger';
import { float } from 'aws-sdk/clients/lightsail';
import { Model } from 'objection';

import { IRequests } from '../interfaces/requests';

export class Requests extends Model implements IRequests {
  @ApiProperty({ type: 'integer' })
  public id: number;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'integer' })
  public quantity: number;
  @ApiProperty({ type: 'integer' })
  public price: float;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Requests';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
}
