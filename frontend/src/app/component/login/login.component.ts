import { Component } from "@angular/core";
import { SelectItem } from "primeng/api";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  username: string;
  password: string;
  message: string;
  constructor(private authService: AuthService, private router: Router) {}
  async onSubmit(username: string, password: string) {
    try {
      this.message = null;
      await this.authService.login(username, password);
      if (this.authService.redirectUrl) {
        this.router.navigate([this.authService.redirectUrl]);
      } else {
        this.router.navigate(["/"]);
      }
    } catch (e) {
      this.message = "Probáld újra";
      console.log(this.message);
    }
  }
}
