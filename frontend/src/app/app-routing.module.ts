import { LoginComponent } from "./component/login/login.component";
import { SubjectComponent } from "./component/subject/subject.component";
import { ProfComponent } from "./component/prof/prof.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/profs",
    pathMatch: "full",
  },
  {
    path: "profs",
    component: ProfComponent,
  },
  {
    path: "subjects",
    component: SubjectComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
