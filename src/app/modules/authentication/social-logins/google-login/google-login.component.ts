import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseLoginComponent } from '../base-login.component';
import { PwaHelper } from 'src/app/shared/helpers/pwa.helper';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent extends BaseLoginComponent implements OnInit, OnDestroy {

  constructor(pwaHelper: PwaHelper) {
    super('Google', pwaHelper);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dispose();
  }

}
