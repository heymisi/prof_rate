import { Component } from "@angular/core";
import { SelectItem } from "primeng/api/selectitem";
import { AuthService } from "src/app/service/auth.service";
import { Router } from "@angular/router";
interface University {
  name: string;
  code: string;
}

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent {
  unis: SelectItem[];
  selectedUnis: University[];
  message: string;
  username: string;
  password: string;
  name: string;
  email: string;

  constructor(private authService: AuthService, private router: Router) {
    this.unis = [
      {
        label: "ELTE",
        value: { id: 1, name: "EÖTVÖS LORÁND TUDOMÁNYEGYETEM", code: "ELTE" },
      },
      {
        label: "SZTE",
        value: { id: 2, name: "SZEGEDI TUDOMÁNY EGYETEM", code: "SZTE" },
      },
      {
        label: "BME",
        value: { id: 3, name: "BUDAPESTI MŰSZAKI EGYETEM", code: "BME" },
      },
      {
        label: "BGE",
        value: { id: 4, name: "BUDAPESTI GAZDASÁGI EGYETEM", code: "BGE" },
      },
    ];
  }
  async registration(
    username: string,
    password: string,
    name: string,
    email: string
  ) {
    try {
      this.message = null;
      await this.authService.register(username, password, name, email, null);
      if (this.authService.redirectUrl) {
        this.router.navigate(["/login"]);
      } else {
        this.router.navigate(["/login"]);
      }
    } catch (e) {
      console.log("d");
      this.message = "Cannot Register!";
    }
  }
}
