import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as csv from "csvtojson";
import * as fs from "fs";

@Injectable()
export class MonumentsService implements OnModuleInit{
  private readonly logger = new Logger(MonumentsService.name);
  private monuments = [];

  async onModuleInit(){
    
    try {
      const path = `${__dirname}/../data/monuments.csv`;
      if (fs.existsSync(path)) {
        this.monuments = await csv().fromFile(path);
      } else {
        this.logger.debug(`WTFFF ${path}, ${__dirname}`);
      }
    } catch(err) {
      this.logger.error(err);
    }
    
    
  }
  findAll(): any{
    return this.monuments;
  }
}
