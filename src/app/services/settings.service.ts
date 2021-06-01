import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';

export interface Setting {
  key: string; value: string;
}

export interface Configuration {
  scope: string;
  settings: Setting[];
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settingsApiUrl = '/api/config';
  private getConfigurations: Observable<Configuration[]>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.getConfigurations = this.httpClient.get<Configuration[]>(`${this.settingsApiUrl}`).pipe(share());
  }

  reloadSettings(): Observable<Configuration[]> {
    return new Observable<Configuration[]>(subscriber => {
      this.getConfigurations.subscribe((settings: Configuration[]) => {

        for (const setting of settings) {
          localStorage.setItem(setting.scope, JSON.stringify(setting.settings));
        }

        subscriber.next(settings);
        subscriber.complete();
      });
    });
  }

  getConfiguration(scope: string): Observable<Setting[]> {
    return new Observable<Setting[]>((subscriber) => {
      const settings: Setting[] = JSON.parse(localStorage.getItem(scope));

      if (settings) {
        subscriber.next(settings);
        subscriber.complete();
      } else {
        this.reloadSettings().subscribe((configurations) => {
          configurations.forEach((config) => {
            if (config.scope === scope) {
              subscriber.next(config.settings);
              subscriber.complete();
            }
          });
        });
      }

    });
  }

  getSetting<T extends string | boolean>(scope: string, settingKey: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      this.getConfiguration(scope).subscribe((settings) => {
        if (settings) {
          const stringValue = settings.filter(s => s.key === settingKey)[0].value;
          let value;

          if (stringValue === 'true' || stringValue === 'false') {
            value = (stringValue === 'true');
          } else {
            value = stringValue;
          }

          console.log(`getSetting(${scope}, ${settingKey}) = ${value}`);

          subscriber.next(value);
          subscriber.complete();
        } else {
          subscriber.next(null);
          subscriber.complete();
        }
      });
    });
  }

  saveConfiguration(scope: string, settings: Setting[]): Observable<boolean> {
    const config: Configuration = { scope, settings };

    return new Observable<boolean>((subscriber) => {
      this.httpClient.post<Configuration>(this.settingsApiUrl, config).subscribe((savedConfig) => {
        localStorage.setItem(scope, JSON.stringify(savedConfig.settings));
        subscriber.next(true);
        subscriber.complete();
      }, () => {
        subscriber.next(false);
        subscriber.complete();
      });
    });
  }



  getForumName(): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.getConfiguration('forum-config').subscribe((forumConfig) => {
        if (forumConfig) {
          try {
            subscriber.next(forumConfig.filter(config => config.key === 'forum-title')[0].value);
          } catch (e) {}
          subscriber.complete();
        } else {
          subscriber.next('');
          subscriber.complete();
        }
      });
    });

    // return this.getConfigurastion<string>('forum-config', 'forum-title');
  }

  isDarkTheme(): Observable<boolean> {
    // return this.getConfiguration<boolean>('theme-config', 'dark-theme');
    return this.getSetting<boolean>('display-config', 'dark-theme');

    // return new Observable<boolean>(subscriber => {
    //   subscriber.next();
    //   subscriber.complete();
    // });
  }
}
