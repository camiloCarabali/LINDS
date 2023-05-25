import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-header-normal',
  templateUrl: './header-normal.component.html',
  styleUrls: ['./header-normal.component.scss'],
})
export class HeaderNormalComponent implements OnInit {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private service: SharedService
  ) {}

  ngOnInit() {}

  outlogin() {
    localStorage.clear();
    this.cookieService.delete('jwt');
    this.service.logout().subscribe((data) => {});
    this.router.navigate(['/inicio']);
  }
}
