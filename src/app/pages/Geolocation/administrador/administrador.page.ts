import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { FirestoreService } from 'app/services/firestore.service';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  today: number = Date.now();

  constructor(private firestore: FirestoreService, private auth: AuthService) { }

  ngOnInit() {
  }
  
  //async 

}
