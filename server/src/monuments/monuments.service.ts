import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as csv from 'csvtojson';
import * as fs from 'fs';
import * as GeoJSON from 'geojson';
import * as glob from 'glob-promise';

@Injectable()
export class MonumentsService implements OnModuleInit {
  private readonly logger = new Logger(MonumentsService.name);
  private monuments = [];
  private geoJSON = {
    type: '',
    features: [],
  };

  async onModuleInit () {

    try {
      const path = `${__dirname}/../data/lmi_bucuresti.csv`;
      if (fs.existsSync(path)) {
        const monuments = await csv({ delimiter: ';' }).fromFile(path);

        this.monuments = monuments;
        const includedProps = Object.keys(this.monuments[0]);

        this.geoJSON = GeoJSON.parse(this.monuments.filter( m => m.x && m.y), {Point: ['y', 'x'], include: includedProps});

      } else {
        this.logger.debug(`???? ${path}, ${__dirname}`);
      }
    } catch (err) {
      this.logger.error(err);
    }

  }
  findAll (): any {
    return this.monuments; // .slice(0, 100);
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
    return this.geoJSON;
  }

  getMonumentTypes(prop): any {
    const monumentTypes = {};
    this.geoJSON.features.map( f => {
      monumentTypes[ f['properties'][prop] ] = monumentTypes[ f['properties'][prop] ] || 0;
      monumentTypes[ f['properties'][prop] ]++;
    });
    return monumentTypes;
  }

  async listMonumentImages (monumentPath: string): Promise<string[]> {

    const safePath = monumentPath.replace(/\.\./gi, '');
    // console.log(`safePath: ${safePath}`);
    const monumentImages = await glob('**', { cwd: `/tmp/images/${safePath}/` });
    return monumentImages || [];
  }
}
