import { LoginComponent } from './component/login/login.component';
import { SubjectComponent } from './component/subject/subject.component';
import { ProfComponent } from './component/prof/prof.component';
import { MenuBarComponent } from './component/menu-bar/menu-bar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profs',
    component: ProfComponent,
  },
  {
    path: 'subjects',
    component: SubjectComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
