import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-normal',
  templateUrl: './header-normal.component.html',
  styleUrls: ['./header-normal.component.scss'],
})
export class HeaderNormalComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  outlogin(){
      this.router.navigate(['/inicio']);
  }

}
