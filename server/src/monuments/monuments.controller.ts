import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Logger,
} from '@nestjs/common';
import { MonumentsService } from "./monuments.service";

@Controller('/api/monuments')
export class MonumentsController {
  private readonly logger = new Logger(MonumentsService.name);
  constructor(private readonly monumentsService: MonumentsService){}
  @Get()
  async findAll(): Promise<any> {
    return this.monumentsService.findAll();
  }
}
