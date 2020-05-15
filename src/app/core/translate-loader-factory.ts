import { HttpClient } from '@angular/common/http';

import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export const createTranslateLoader = (http: HttpClient): TranslateLoader =>
  new TranslateHttpLoader(http, '../../assets/i18n/', '.json');