import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'init',
    loadChildren: () =>
      import('./init-module/init.module').then((m) => m.InitModule),
  },
  {
    path: 'compare',
    loadChildren: () =>
      import('./compare-module/compare.module').then((m) => m.CompareModule),
  },
  {
    path: '**',
    component: LandingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
