import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {GoogleTranslateService} from '../../services/google-translate/google-translate.service';
import {concatMap, finalize} from 'rxjs/operators';
import {InitializedResource, Key} from '../../pages/home-page/home-page.component';
import {GoogleTranslateRequest} from '../../services/google-translate/models/google-translate-request.model';
import {GoogleTranslateResponse} from '../../services/google-translate/models/google-translate-response.model';

@Component({
  selector: 'app-translator-editor',
  templateUrl: './translator-editor.component.html',
  styleUrls: ['./translator-editor.component.scss']
})
export class TranslatorEditorComponent implements OnInit {
  @Input() resource: InitializedResource;

  availableLanguages: string[] = [];
  selectedLanguage: FormControl = this.fb.control(null);
  loadingTranslation = false;
  awaitTranslation = false;

  constructor(private fb: FormBuilder,
              private googleTranslateService: GoogleTranslateService) { }

  ngOnInit(): void {
    this.googleTranslateService.getAvailableLanguages().subscribe((result: any) => {
      this.availableLanguages = result.data.languages.map(l => l.language);
    });
  }

  isAvailableTranslateService(): boolean {
    return this.googleTranslateService.hasGoogleKey();
  }

  translateEdited(): void {
    if (!this.resource || !this.selectedLanguage.value) {
      return;
    }

    this.loadingTranslation = true;
    this.awaitTranslation = false;

    const notTranslatedKeys = this.resource.keys.filter(k => !k.translated);
    const requests: Observable<GoogleTranslateRequest> = this.generateTranslateRequests(notTranslatedKeys);

    requests
      .pipe(
        concatMap((req: GoogleTranslateRequest) => this.googleTranslateService.translate(req)),
        finalize(() => this.loadingTranslation = false))
      .subscribe((data: GoogleTranslateResponse) => {
        this.resource.content[data.key.name].setValue(data.result.data.translations[0].translatedText);
        data.key.translated = true;
      }, _ => {
        this.awaitTranslation = true;
      });
  }

  get totalKeysNumber(): number {
    if (!this.resource) {
      return 0;
    }
    return this.resource.keys.length;
  }

  get translatedPercent(): number {
    if (this.totalKeysNumber === 0) {
      return 0;
    }

    const percent = this.traducedKeysNumber / this.totalKeysNumber * 100;
    return Math.floor(percent);
  }

  private get traducedKeysNumber(): number {
    if (!this.resource || !this.resource.keys) {
      return 0;
    }
    return this.resource.keys.filter(k => k.translated).length;
  }

  private generateTranslateRequests(keys: Key[]): Observable<GoogleTranslateRequest> {
    return of(...keys.map(k => {
      return {
        key: k,
        obj: {
          q: [this.resource.content[k.name].value],
          target: this.selectedLanguage.value
        }
      };
    }));
  }
}
