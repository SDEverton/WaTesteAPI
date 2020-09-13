import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ProfileController } from './controllers/profile';
import { RequestsController } from './controllers/requests';
import { DeviceRepository } from './repositories/device';
import { RequestsRepository } from './repositories/requests';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { RequestsService } from './services/requests';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, RequestsController],
  providers: [AuthService, UserService, UserRepository, DeviceRepository, RequestsService, RequestsRepository]
})
export class AppModule {}
