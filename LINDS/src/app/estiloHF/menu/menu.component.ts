import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  empresas(){
    this.router.navigate(['/empresa']);
  }

  sucursales(){
    this.router.navigate(['/sucursal']);
  }

  usuarios(){
    this.router.navigate(['/usuario']);
  }

}
