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
     const hash = {};
    //  this.monuments.forEach( m => hash[m['denumire']] = (hash[m['denumire']] || 0) + 1);
    //  const res = [];
    //  for (const denumire in hash){
    //    res.push([denumire, hash[denumire]]);
    //  }
    //  return res.sort( (a, b) => {
    //    if (a[1] < b[1]) return 1;
    //    if (a[1] > b[1]) return -1;
    //    return 0;
    //  });
  }

  getGeoJSON(): any{
    const includedProps = Object.keys(this.monuments[0]);
    return GeoJSON.parse(this.monuments.filter( m => m.x && m.y), {Point: ['y', 'x'], include: includedProps});
  }

  async listMonumentImages(monumentPath: string): Promise<string[]>{

    const safePath = monumentPath.replace(/\.\./gi,'');
    const monumentImages = await glob('**', {cwd: `/tmp/images/${safePath}/`});
    return monumentImages || [];
  }
}
