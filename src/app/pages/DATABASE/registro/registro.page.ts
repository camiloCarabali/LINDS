import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLindsDatabase } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  datos: UserLindsDatabase = {
    nombre: null,
    correo: null,
    uid: null,
    password: null,
    perfil: 'administrador',
  };

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private interaction: UiServiceService,
    private router: Router
  ) {}

  ngOnInit() {}

  async registrar() {
    this.interaction.showLoading('registrando...');
    const res = await this.auth
      .registrarUserLindsDatabase(this.datos)
      .catch((error) => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Error al registrar');
      });
    if (res) {
      const path = 'UsuariosLidnsDatabase';
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = null;
      await this.firestore.create(this.datos, path);
      this.interaction.closeLoading();
      this.interaction.presentToast('Registrado con exito');
      this.router.navigate(['/database']);
    }
  }
}
