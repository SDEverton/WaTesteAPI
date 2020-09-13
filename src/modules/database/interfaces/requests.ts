import { float } from 'aws-sdk/clients/lightsail';

export interface IRequests {
  id?: number;
  description: string;
  quantity?: number;
  price?: float;

  createdDate?: Date;
  updatedDate?: Date;
}
