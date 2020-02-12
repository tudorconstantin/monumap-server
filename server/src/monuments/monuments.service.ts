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
      const path = `${__dirname}/../data/lmi_bucuresti.csv`;
      if (fs.existsSync(path)) {
        let monuments = await csv({delimiter: ";"}).fromFile(path);
        monuments.forEach( m => {
          m.lmi = m['cod LMI'];
          m.monumentType = m['tipul patrimoniului'];
          m.position = m['nr'];
        });

        this.monuments = monuments;
        
      } else {
        this.logger.debug(`???? ${path}, ${__dirname}`);
      }
    } catch(err) {
      this.logger.error(err);
    }
    
    
  }
  findAll(): any{
    return this.monuments;//.slice(0, 100);
    // const res = {};
    // this.monuments.forEach( m => res[m['tipul patrimoniului']] = (res[m['tipul patrimoniului']] || 0) + 1);
    // return res;
  }

  getGeoJSON(): any{
    return GeoJSON.parse(this.monuments.filter( m => m.x && m.y), {Point: ['y', 'x'], include: ['cod_lmi', 'SIRINF']});
  }

  async listMonumentImages(monumentPath: string): Promise<string[]>{

    const safePath = monumentPath.replace(/\.\./gi,'');
    const monumentImages = await glob('**', {cwd: `/tmp/images/${safePath}/`});
    return monumentImages || [];
  }
}
