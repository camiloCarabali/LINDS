import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserLindsDatabase, Usuario } from '../models/models';
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authFirebase: AngularFireAuth) {}

  async login(correo: string, password: string) {
    const auth = getAuth();
    await setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, correo, password);
      })
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

  register(usuario: Usuario) {
    return this.authFirebase.createUserWithEmailAndPassword(
      usuario.correo,
      usuario.password
    );
  }

  stateUser() {
    return this.authFirebase.authState;
  }
}
