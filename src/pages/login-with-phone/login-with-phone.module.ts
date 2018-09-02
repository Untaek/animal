import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginWithPhonePage } from './login-with-phone';

@NgModule({
  declarations: [
    LoginWithPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginWithPhonePage),
  ],
})
export class LoginWithPhonePageModule {}
