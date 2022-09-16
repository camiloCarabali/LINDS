import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserLindsDatabase, Usuario } from '../models/models';
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  User,
} from 'firebase/auth';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;

  constructor(public authFirebase: AngularFireAuth) {}

  /*obser(){
    this.user$ = this.authFirebase.authState.pipe(
      switchMap(usuario) => {
        if(usuario) {
          return this.afs.doc<User>(´users/${usuario.uid}´).valueChanges();
        }
        return of(null);
      } //35:48
    );
  }*/

  async login(correo: string, password: string) {
    const auth = getAuth();
    await setPersistence(auth, browserSessionPersistence)
      .then(() => signInWithEmailAndPassword(auth, correo, password))
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.authFirebase.signOut();
  }

  registrarUserLindsDatabase(datos: UserLindsDatabase) {
    return this.authFirebase.createUserWithEmailAndPassword(
      datos.correo,
      datos.password
    );
  }

  async register(usuario: Usuario) {

      try {
        const { user } = await this.authFirebase.createUserWithEmailAndPassword(
          usuario.correo, usuario.password);
          this.sendVerification();
          return user;

      } catch (error) {
        console.log('Error ->', error);
      }
  }

  stateUser() {
    return this.authFirebase.authState;
  }

  async sendVerification(){
    try {
      return (await this.authFirebase.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error ->', error);
    }
  }

 isEmailVerified(email: Usuario){
    return email.emailVerified === true ? true : false;
  }

  async resertPassword(email: string){
    try {
      return this.authFirebase.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error ->', error);
    }
  }
}
