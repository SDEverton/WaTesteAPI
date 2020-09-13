import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
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
    const result: any = await User.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async isEmailAvailable(email: string, skipUserId?: number, transaction?: Transaction): Promise<boolean> {
    let query = User.query(transaction)
      .count('id as count')
      .where({ email })
      .first();

    if (skipUserId) {
      query = query.where('id', '!=', skipUserId);
    }

    const result: any = await query;
    return Number(result.count) === 0;
  }

  public async findById(id: number, transaction?: Transaction): Promise<User> {
    return User.query(transaction)
      .where({ id })
      .first();
  }

  public async findByEmail(email: string, transaction?: Transaction): Promise<User> {
    return User.query(transaction)
      .where({ email })
      .first();
  }

  public async insert(model: IUser, transaction?: Transaction): Promise<User> {
    return User.query(transaction).insert(model);
  }

  public async update(model: IUser, transaction?: Transaction): Promise<User> {
    return User.query(transaction).updateAndFetchById(model.id, <User>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await User.query(transaction)
      .del()
      .where({ id });
  }
}
