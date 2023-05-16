import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabezaheader',
  templateUrl: './cabezaheader.component.html',
  styleUrls: ['./cabezaheader.component.scss'],
})
export class CabezaheaderComponent  implements OnInit {

  constructor(private router: Router) { }

  irViaje() {
    this.router.navigate(['viaje']);
  }

  ngOnInit() {}

}
