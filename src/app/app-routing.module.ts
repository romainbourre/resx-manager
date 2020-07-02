import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {ConfigPageComponent} from './pages/config-page/config-page.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomePageComponent},
  {path: 'configuration', pathMatch: 'full', component: ConfigPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
