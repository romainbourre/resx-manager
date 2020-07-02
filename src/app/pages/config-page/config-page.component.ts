import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {GoogleTranslateService} from '../../services/google-translate/google-translate.service';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent implements OnInit {
  keyForm: FormControl;
  saved = false;

  constructor(private googleTranslateService: GoogleTranslateService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (this.keyForm.valid) {
      this.googleTranslateService.setGoogleKey(this.keyForm.value);
      this.saved = true;
      this.initForm();
    }
  }

  onKeyChange(): void {
    this.saved = false;
  }

  private initForm(): void {
    this.keyForm = new FormControl(this.googleTranslateService.getGoogleKey(), [Validators.required]);
  }
}
