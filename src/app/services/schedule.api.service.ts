import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICountry, ISuggest } from '../types/schedule.interface';

@Injectable({ providedIn: 'root' })
export class ScheduleApiService {
  private baseUrl = `https://api.rasp.yandex.net/v3.0`;
  private suggestUrl = `https://suggests.rasp.yandex.net/all_suggests?client_city=11508&field=to&format=old&lang=ru&national_version=ru&other_point=s9600421&part=`;

  constructor(private http: HttpClient) {}

  getUrlString(serviceName: string, params = ''): string {
    return `${this.baseUrl}/${serviceName}/?apikey=${environment.yandexApi.scheduleToken}`;
  }

  getStationsList(): Observable<ICountry[]> {
    const response = this.http.get<{ countries: ICountry[] }>(this.getUrlString('stations_list'));
    return response.pipe(map((res) => res.countries));
  }

  getSuggest(city: string): Observable<ISuggest[]> {
    const response = this.http.get<any[]>(this.suggestUrl + city);
    return response.pipe<ISuggest[]>(map((res) => res[1]));
  }
}
