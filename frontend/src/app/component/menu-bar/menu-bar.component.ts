import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
@Component({
  selector: "app-menu-bar",
  templateUrl: "./menu-bar.component.html",
  styleUrls: ["./menu-bar.component.css"],
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: "Home", icon: "pi pi-fw pi-home", routerLink: ["/home"] },
      { label: "Professors", icon: "pi pi-fw pi-user", routerLink: ["/profs"] },
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
}
