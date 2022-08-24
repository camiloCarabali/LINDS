import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserLindsDatabase } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFirebase: AngularFireAuth) { }

  login(correo: string, password: string){
    return this.authFirebase.signInWithEmailAndPassword(correo, password);
  }

  logout(){
    this.authFirebase.signOut();
  }

  registrarUserLindsDatabase(datos: UserLindsDatabase){
    return this.authFirebase.createUserWithEmailAndPassword(datos.correo, datos.password);
  }

  stateUser() {
    return this.authFirebase.authState
  }


}
