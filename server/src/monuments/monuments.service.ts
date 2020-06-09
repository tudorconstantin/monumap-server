import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as csv from 'csvtojson';
import * as fs from 'fs';
import * as GeoJSON from 'geojson';
import * as glob from 'glob-promise';

@Injectable()
export class MonumentsService implements OnModuleInit {
  private readonly logger = new Logger(MonumentsService.name);
  private monuments = [];
  private polygonsGeoJSON = {};
  private geoJSON = {
    type: '',
    features: [],
  };

  async onModuleInit() {

    try {
      const path = `${__dirname}/../data/lmi_bucuresti.csv`;
      if (fs.existsSync(path)) {
        const monuments = await csv({ delimiter: ';' }).fromFile(path);

        const poly = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                coordinates: [
                  [
                    [26.08598705027825, 44.43048833459946],
                    [26.085110016697172, 44.42500804090048],
                    [26.09066456270895, 44.424486081369565],
                    [26.091322337893843, 44.43007080649548],
                    [26.08598705027825, 44.43048833459946],
                  ],
                ],
                type: 'Polygon',
              },
              properties: {
                cod_lmi: 'B-II-m-B-1792900',
                SIRSUP: '403',
                rang: 'municipiu',
                UAT: 'BUCUREȘTI',
                SIRUTA: '179132',
                localitate: 'BUCUREȘTI',
                SIRINF: '179178',
                sector: 'Sector 4',
                adresa: 'Str. 11 Iunie 2 sector 4',
                strada_nume: 'Str. 11 iunie',
                strada_numar: '2',
                cod_lmi_jud: 'B',
                cod_lmi_nat: 'II',
                cod_lmi_grupa: 'm',
                cod_lmi_val: 'B',
                cod_lmi_num: '17929',
                tip_patrimoniu: 'Patrimoniu domestic urban',
                program_arhitectura: 'Clădire de locuit (unifamilială, colectivă ș.a.)',
                tip_monument: 'Locuire civilă',
                denumire: 'Casă Nifon Mitropolitul',
                observatii_adresa: '',
                fotografiat: 'DA',
                Inexistent: 'NU',
                constructie_noua: 'NU',
                stare: 'DEGRADAT',
                observatii: '.',
                observatii_corina: 'a fost adăugat ulterior în baza de date',
                datare: 'sf. sec. XIX',
                x: '26.0950825395198',
                y: '44.424931110043',
                icon_code: 'DOMESTIC_URBAN',
              },
            },
          ],
        };

        this.polygonsGeoJSON = poly;

        this.monuments = monuments;
        monuments.forEach(m => m.icon_code = m.tip_patrimoniu.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace('PATRIMONIU ', '').replace(/\s+/g, '_'));
        const includedProps = Object.keys(this.monuments[0]);

        this.geoJSON = GeoJSON.parse(this.monuments.filter(m => m.x && m.y), { Point: ['y', 'x'], include: includedProps });
        this.geoJSON.features.unshift(poly.features[0]);

      } else {
        this.logger.debug(`???? ${path}, ${__dirname}`);
      }
    } catch (err) {
      this.logger.error(err);
    }

  }
  findAll(): any {
    return this.monuments;
  }

  getGeoJSON(): any {
    return this.geoJSON;
  }

  getPolygonsGeoJSON(): any {
    return this.polygonsGeoJSON;
  }

  getMonumentTypes(prop): any {
    const monumentTypes = {};
    this.geoJSON.features.map(f => {
      monumentTypes[f.properties[prop]] = monumentTypes[f.properties[prop]] || 0;
      monumentTypes[f.properties[prop]]++;
    });
    return monumentTypes;
  }

  async listMonumentImages(monumentPath: string): Promise<string[]> {

    const safePath = monumentPath.replace(/\.\./gi, '');
    // console.log(`safePath: ${safePath}`);
    const monumentImages = await glob('**', { cwd: `/tmp/images/${safePath}/` });
    return monumentImages || [];
  }
}
