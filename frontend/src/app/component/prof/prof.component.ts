import { Component, OnInit } from "@angular/core";
import { Prof } from "src/app/model/prof";
import { ProfService } from "src/app/service/prof.service";
import { SelectItem } from "primeng/api/selectitem";

@Component({
  selector: "app-prof",
  templateUrl: "./prof.component.html",
  styleUrls: ["./prof.component.css"],
})
export class ProfComponent implements OnInit {
  public profs: Prof[] = [];
  public sortOptions: SelectItem[];

  constructor(private profService: ProfService) {}

  async ngOnInit(): Promise<void> {
    this.profs = await this.profService.getProfs();
    this.sortOptions = [
      { label: "Best rated", value: "rate" },
      { label: "Worst rated", value: "!rate" },
      { label: "Most kawaii", value: "-" },
    ];
  }
}
