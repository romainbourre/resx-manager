import {Key} from '../../../pages/home-page/home-page.component';
import {GoogleObj} from './google-object.model';

export interface GoogleTranslateRequest {
  key: Key;
  obj: GoogleObj;
}
