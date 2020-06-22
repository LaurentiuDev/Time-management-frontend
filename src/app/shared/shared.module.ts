import { NgModule, ModuleWithProviders } from '@angular/core';
import { EnumKeyValuePipe } from './pipes/enum-key-value.pipe';

@NgModule({
  imports: [],
  declarations: [EnumKeyValuePipe],
  providers: [],
  exports: [EnumKeyValuePipe]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
