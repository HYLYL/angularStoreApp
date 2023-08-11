import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VALIDATORS_PROVIDERS } from './validators';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ...VALIDATORS_PROVIDERS
  ]
})
export class CoreModule { }
