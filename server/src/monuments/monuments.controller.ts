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

@Controller()
export class MonumentsController {
  private readonly logger = new Logger(MonumentsService.name);
  constructor(private readonly monumentsService: MonumentsService){}
  @Get('/api/monuments')
  async findAll(): Promise<any> {
    return this.monumentsService.findAll();
  }
  @Get('/api/monuments.geojson')
  async getGeoJSON(): Promise<any> {
    return this.monumentsService.getGeoJSON();
  }
}
