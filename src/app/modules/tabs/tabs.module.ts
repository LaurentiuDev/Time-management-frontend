import { NgModule } from '@angular/core';
import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs.routes';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage],
})
export class TabsPageModule { }
