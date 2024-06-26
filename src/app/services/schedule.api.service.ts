import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICountry, ISearchData, ISuggest } from '../types/schedule.interface';
import { LoadingService } from './loading.service';

export interface ISearchStationsParams {
  from: string;
  to: string;
  date?: string;
  transportType?: string;
}

@Injectable({ providedIn: 'root' })
export class ScheduleApiService {
  private baseUrl = `https://api.rasp.yandex.net/v3.0`;
  private suggestUrl = `https://suggests.rasp.yandex.net/all_suggests?client_city=11508&field=to&format=old&lang=ru&national_version=ru&other_point=s9600421&part=`;
  public searchData$: Subject<ISearchData> = new Subject<ISearchData>();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
  ) {}

  getUrlString(serviceName: string, params = ''): string {
    return `${this.baseUrl}/${serviceName}/?apikey=${environment.yandexApi.scheduleToken}&${params}`;
  }

  getStationsList(): Observable<ICountry[]> {
    const response = this.http.get<{ countries: ICountry[] }>(this.getUrlString('stations_list'));
    return response.pipe(map((res) => res.countries));
  }

  getSuggest(city: string): Observable<ISuggest[]> {
    const response = this.http.get<any[]>(this.suggestUrl + city);
    return response.pipe<ISuggest[]>(map((res) => res[1]));
  }

  searchStationsData(searchParams: ISearchStationsParams): Observable<ISearchData> {
    // const date = searchParams.date ? searchParams.date : '';
    this.loadingService.loadingOn();

    const response = this.http.get<ISearchData>(
      this.getUrlString(
        'search',
        `from=${searchParams.from}&to=${searchParams.to}&date=${searchParams.date}&transport_types=${searchParams.transportType}`,
      ),
    );

    response.subscribe((res) => {
      this.searchData$.next(res);
      this.loadingService.loadingOff();
    });
    return response;
  }
}
