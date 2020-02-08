import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as csv from "csvtojson";
import * as fs from "fs";
import * as GeoJSON from "geojson";
import * as glob from 'glob-promise';

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
        this.logger.debug(`???? ${path}, ${__dirname}`);
      }
    } catch(err) {
      this.logger.error(err);
    }
    
    
  }
  findAll(): any{
    return this.monuments;//.slice(0, 100);
  }

  getGeoJSON(): any{
    return GeoJSON.parse(this.monuments.filter( m => m.latitudine && m.longitudine), {Point: ['latitudine', 'longitudine'], include: ['cod LMI', 'nr']});
  }

  async listMonumentImages(monumentPath: string): Promise<string[]>{

    const safePath = monumentPath.replace(/\.\./gi,'');
    const monumentImages = await glob('**', {cwd: `/tmp/images/${safePath}/`});
    return monumentImages || [];
  }
}
