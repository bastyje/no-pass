import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceResponse } from '../../models/service-response.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly _baseUri: string;

  constructor(private configService: ConfigService, private http: HttpClient) {
    this._baseUri = this.configService.config.apiUri;
  }

  public get<T>(path: string): Observable<ServiceResponse<T>> {
    return this.http.get<ServiceResponse<T>>(`${this._baseUri}/${path}`, { withCredentials: true });
  }

  public post<TBody, TResponse>(path: string, body: TBody): Observable<ServiceResponse<TResponse>> {
    return this.http.post<ServiceResponse<TResponse>>(`${this._baseUri}/${path}`, body, { withCredentials: true });
  }

  public put<TBody, TResponse>(path: string, body: TBody): Observable<ServiceResponse<TResponse>> {
    return this.http.put<ServiceResponse<TResponse>>(`${this._baseUri}/${path}`, body, { withCredentials: true });
  }
}
