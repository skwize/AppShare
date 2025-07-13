import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AppsModule } from './apps/apps.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [AppsModule, AuthModule, UsersModule, IssuesModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
