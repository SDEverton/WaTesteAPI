import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Requests } from 'modules/database/models/requests';

import { ListValidator } from '../../app/validators/requests/list';
import { SaveValidator } from '../../app/validators/requests/save';
import { RequestsRepository } from '../repositories/requests';
import { RequestsService } from '../services/requests';

@ApiTags('Requests')
@Controller('requests')
export class RequestsController {
  constructor(private requestsRepository: RequestsRepository, private requestsService: RequestsService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Requests] })
  public async list(@Query() model: ListValidator) {
    return this.requestsRepository.list(model);
  }

  @Get(':requestsId')
  @ApiResponse({ status: 200, type: Requests })
  public async details(@Param('userId', ParseIntPipe) requestsId: number) {
    return this.requestsRepository.findById(requestsId);
  }

  @Delete(':requestsId')
  public async delete(@Param('userId', ParseIntPipe) requestsId: number) {
    return this.requestsService.remove(requestsId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Requests })
  public async save(@Body() model: SaveValidator) {
    return this.requestsService.save(model);
  }
}
