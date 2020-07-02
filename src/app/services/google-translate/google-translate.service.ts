import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {GoogleTranslateRequest} from './models/google-translate-request.model';
import {GoogleTranslateResponse} from './models/google-translate-response.model';


@Injectable({
  providedIn: 'root'
})
export class GoogleTranslateService {
  private readonly KeyTag = 'GoogleSecurityKey';

  private key: string = null;

  constructor(private http: HttpClient) {
    this.key = this.getGoogleKey();
  }

  getAvailableLanguages(): Observable<any> {
    return this.http.get(`${environment.google_translation_api}/languages?key=${this.key}`);
  }

  translate(obj: GoogleTranslateRequest): Observable<GoogleTranslateResponse> {
    return this.http.post(`${environment.google_translation_api}?key=${this.key}`, obj.obj)
      .pipe(map((result: any) => {
        return {key: obj.key, result};
      }));
  }

  hasGoogleKey(): boolean {
    return !!this.key;
  }

  setGoogleKey(key: string) {
    this.key = key;
    localStorage.setItem(this.KeyTag, key);
  }

  getGoogleKey(): string {
    if (!this.key) {
      this.key = localStorage.getItem(this.KeyTag);
    }
    return this.key;
  }
}
