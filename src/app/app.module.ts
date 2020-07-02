import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CheckBoxListComponent} from './components/check-box-list/check-box-list.component';
import {ResourceFileImporterComponent} from './components/resource-file-importer/resource-file-importer.component';
import {ResourceFileEditorComponent} from './components/resource-file-editor/resource-file-editor.component';
import {TranslatorEditorComponent} from './components/translator-editor/translator-editor.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { ConfigPageComponent } from './pages/config-page/config-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckBoxListComponent,
    ResourceFileImporterComponent,
    ResourceFileEditorComponent,
    TranslatorEditorComponent,
    HomePageComponent,
    ConfigPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
