import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IRequests } from 'modules/database/interfaces/requests';
import { Requests } from 'modules/database/models/requests';
import { Page, Transaction } from 'objection';

@Injectable()
export class RequestsRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Requests>> {
    let query = Requests.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      if (params.orderBy !== 'description') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      } else {
        query = query.orderBy('description', params.orderDirection).orderBy('description', params.orderDirection);
      }
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('description', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async count(transaction?: Transaction): Promise<Number> {
    const result: any = await Requests.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async findById(id: number, transaction?: Transaction): Promise<Requests> {
    return Requests.query(transaction)
      .where({ id })
      .first();
  }

  public async insert(model: IRequests, transaction?: Transaction): Promise<Requests> {
    return Requests.query(transaction).insert(model);
  }

  public async update(model: IRequests, transaction?: Transaction): Promise<Requests> {
    return Requests.query(transaction).updateAndFetchById(model.id, <Requests>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Requests.query(transaction)
      .del()
      .where({ id });
  }
}
