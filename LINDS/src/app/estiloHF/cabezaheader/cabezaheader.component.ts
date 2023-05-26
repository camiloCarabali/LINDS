import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-cabezaheader',
  templateUrl: './cabezaheader.component.html',
  styleUrls: ['./cabezaheader.component.scss'],
})
export class CabezaheaderComponent implements OnInit {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private service: SharedService
  ) {}

  irViaje() {
    this.router.navigate(['viaje']);
  }

  ngOnInit() {}

  logout() {
    localStorage.clear();
    this.cookieService.delete('jwt');
    this.service.logout().subscribe((data) => {});
    this.router.navigate(['/inicio']);
  }

  viajes() {
    this.router.navigate(['/viajes']);
  }
}
