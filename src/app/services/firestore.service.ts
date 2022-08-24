import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  async create(data: any, path: string) {
    try {
      return await this.firestore.collection(path).add(data);
    } catch (error) {
      console.log('Error en: create ', error);
    }
  }

  async read(path: string) {
    try {
      return await this.firestore.collection(path).snapshotChanges();
    } catch (error) {
      console.log('Error en: read ', error);
    }
  }

  async search(collection, id) {
    try {
      return await this.firestore.collection(collection).doc(id).get();
    } catch (error) {
      console.log('Error en: search ', error);
    }
  }

  async delete(path: string, id: string) {
    try {
      return await this.firestore.collection(path).doc(id).delete();
    } catch (error) {
      console.log('Error en: delete ', error);
    }
  }

  async update(data: any, path: string, id: string) {
    try {
      return await this.firestore.collection(path).doc(id).set(data);
    } catch (error) {
      console.log('Error en: update ', error);
    }
  }

}