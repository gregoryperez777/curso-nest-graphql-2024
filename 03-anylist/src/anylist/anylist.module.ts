import { Module } from '@nestjs/common';
import { AnylistResolver } from './anylist.resolver';

@Module({
  providers: [AnylistResolver]
})
export class AnylistModule {}
