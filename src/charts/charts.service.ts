import { HttpException, HttpService, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Charts } from './charts.class';
import { CacheService } from '../cache/cache.service';

// TODO: investigate
// For some reason iconv is not working with import
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconv = require('iconv-lite');

@Injectable()
export class ChartsService {
  private readonly logger = new Logger(ChartsService.name);

  constructor(private http: HttpService,
              private readonly cache: CacheService) {
  }

  getForICAO(icao: string): Promise<Charts> {
    const icaoCode = icao.toUpperCase();
    this.logger.debug(`Searching for ICAO ${icaoCode}`);

    return this.handleFaa(icaoCode).toPromise();
  }

  // FAA
  private handleFaa(icao: string): Observable<Charts> {
    return this.http.get<any>('https://nfdc.faa.gov/nfdcApps/services/ajv5/airportDisplay.jsp?airportId=' + icao)
      .pipe(
        tap(response => this.logger.debug(`Response status ${response.status} for FAA charts request`)),
        map(response => {
          if (response.data.hasOwnProperty('error')) {
            throw this.generateNotAvailableException(response.data, icao);
          }

          const regexp = /<span class="chartLink"><i class="icon-cog"><[\/]i> <a href="(.*)" /g;
          const matches = [...response.data.matchAll(regexp)];

          const charts: Charts = {
            icao
          };
          let urls = [];

          for (const match of matches) {
            urls.push(match[1]);
          }

          charts.charts = urls 

          return charts;
        }),
        catchError(
          err => {
            throw this.generateNotAvailableException(err, icao);
          },
        ),
      );
  }

  private generateNotAvailableException(err: any, icao: string) {
    const exception = new HttpException('Charts not available for ICAO: ' + icao, 404);
    this.logger.error(err);
    this.logger.error(exception);
    return exception;
  }
}
