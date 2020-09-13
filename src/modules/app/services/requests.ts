import { Injectable, NotFoundException } from '@nestjs/common';
import { IRequests } from 'modules/database/interfaces/requests';
import { Requests } from 'modules/database/models/requests';

import { RequestsRepository } from '../repositories/requests';

@Injectable()
export class RequestsService {
  constructor(private requestsRepository: RequestsRepository) {}

  public async save(model: IRequests): Promise<Requests> {
    console.log(model);
    if (model.id) return this.update(model);
    return this.create(model);
  }

  public async remove(requestsId: number): Promise<void> {
    const request = await this.requestsRepository.findById(requestsId);

    if (!request) {
      throw new NotFoundException('not-found');
    }

    return this.requestsRepository.remove(requestsId);
  }

  private async create(model: IRequests): Promise<Requests> {
    const requestOne = await this.requestsRepository.insert(model);

    return requestOne;
  }

  private async update(model: IRequests): Promise<Requests> {
    const requestOne = await this.requestsRepository.findById(model.id);

    if (!requestOne) throw new NotFoundException('not-found');
    return this.requestsRepository.update({ ...requestOne, ...model });
  }
}
