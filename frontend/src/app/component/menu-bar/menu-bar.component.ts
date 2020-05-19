import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AuthService } from "src/app/service/auth.service";
@Component({
  selector: "app-menu-bar",
  templateUrl: "./menu-bar.component.html",
  styleUrls: ["./menu-bar.component.css"],
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[];

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.items = [
      {
        label: "Professors",
        icon: "pi pi-fw pi-user",
        routerLink: ["/profs"],
      },
      {
        label: "Subjects",
        icon: "pi pi-fw pi-bars",
        routerLink: ["/subjects"],
      },
      {
        label: "Sign in ",
        icon: "pi pi-fw pi-sign-in",
        routerLink: ["/login"],
      },
    ];
  }
  logout() {
    this.authService.logout();
  }
}
