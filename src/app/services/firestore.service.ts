import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  coord(data: any, path: string, id: any) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  createViaje(data: any, path: string, id: any) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  async createUser(data: any, path: string, id: string) {
    try {
      return await this.firestore.collection(path).doc(id).set(data);
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
      return await this.firestore.collection(collection).doc(id);
    } catch (error) {
      console.log('Error en: search ', error);
    }
  }

  async searchCargo(position, uid) {
    try {
      return await this.firestore
        .collection('Usuarios', (ref) =>
          ref.where('perfil', '==', position).where('uid', '==', uid)
        )
        .valueChanges();
    } catch (error) {
      console.log('Error en: search cargo ', error);
    }
  }

  async searchConductor(branch) {
    try {
      return await this.firestore
        .collection('Usuarios', (ref) =>
          ref.where('sucursal', '==', branch).where('perfil', '==', 'conductor')
        )
        .snapshotChanges();
    } catch (error) {
      console.log('Error en: search conductor ', error);
    }
  }

  async searchViaje(uid) {
    try {
      return await this.firestore.collection('Viajes').doc(uid).get();
    } catch (error) {
      console.log('Error en: search viajes ', error);
    }
  }

  async searchSolicitud(uid) {
    try {
      return this.firestore.collection('Solicitudes').doc(uid).get();
    } catch (error) {
      console.log('Error en: search solicitudes ', error);
    }
  }

  async showSucursales(position) {
    try {
      return await this.firestore
        .collection('Sucursales', (ref) => ref.where('empresa', '==', position))
        .valueChanges();
    } catch (error) {
      console.log('Error en: show sucursal ', error);
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

  async createHistorial(data: any, path: string) {
    try {
      return await this.firestore.collection(path).add(data);
    } catch (error) {
      console.log('Error en: create ', error);
    }
  }

  async showHistorial(uid) {
    try {
      return await this.firestore
        .collection('Historial', (ref) => ref.where('uid', '==', uid))
        .snapshotChanges();
    } catch (error) {
      console.log('Error en: show historial ', error);
    }
  }

  async consultarIdHistorial(uid, inicio, llegada) {
    try {
      return await this.firestore
        .collection('Historial', (ref) =>
          ref
            .where('uid', '==', uid)
            .where('inicio', '==', inicio)
            .where('llegada', '==', llegada)
            .where('estado', '==', false)
        )
        .snapshotChanges();
    } catch (error) {
      console.log('Error en: consultar id historial ', error);
    }
  }

  getDoc<tipo>(path: string, id: any) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }
}
