import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';
import { APPROUTES } from 'src/app/app.routes.strings';

export const TABS_ROUTES: Routes = [
  {
    path: APPROUTES.tabs,
    component: TabsPage,
    children: [
      {
        path: APPROUTES.task,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../task/task.module').then(m => m.TaskPageModule)
          },
        ]
      },
      {
        path: APPROUTES.statistics,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../statistics/statistics.module').then(m => m.StatisticsPageModule)
          },
        ]
      },
      {
        path: APPROUTES.profile,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: APPROUTES.about,
            loadChildren: () =>
                  import('../profile/components/about/about.module').then(m => m.AboutPageModule)
          }
        ]
      },
      {
        path: APPROUTES.clasament,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../clasament/clasament.module').then(m => m.ClasamentPageModule)
          },
        ]
      },
      {
        path: APPROUTES.chat,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../chat/chat.module').then(m => m.ChatPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/task',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/task',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(TABS_ROUTES)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
