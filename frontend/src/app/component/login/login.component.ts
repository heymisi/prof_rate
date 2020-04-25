import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
interface University {
  name: string,
  code: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  unis : SelectItem[];
  selectedUnis: University[];
  constructor() {
    this.unis = [
      {label:'ELTE', value:{id:1, name: 'EÖTVÖS LORÁND TUDOMÁNYEGYETEM', code: 'ELTE'}},
      {label:'SZTE', value:{id:2, name: 'SZEGEDI TUDOMÁNY EGYETEM', code: 'SZTE'}},
      {label:'BME', value:{id:3, name: 'BUDAPESTI MŰSZAKI EGYETEM', code: 'BME'}},
      {label:'BGE', value:{id:4, name: 'BUDAPESTI GAZDASÁGI EGYETEM', code: 'BGE'}},
  ];
  }

  ngOnInit(): void {
  }

}
