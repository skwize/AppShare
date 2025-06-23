import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppsModule } from './apps/apps.module';

@Module({
  imports: [AppsModule],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
