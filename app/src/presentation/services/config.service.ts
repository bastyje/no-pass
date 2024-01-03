import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export type Config = {
  apiUri: string
}

@Injectable()
export class ConfigService {
  private _config: Config;

  public get config(): Config {
    return this._config;
  }

  constructor(private http: HttpClient) {}

  public async init(): Promise<void> {
    this._config = await lastValueFrom(this.http.get<Config>('static/config.json'));
  }
}
