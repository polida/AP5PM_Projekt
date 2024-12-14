import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
 

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  username: string = '';
  password: string = '';;

  constructor(private navCtrl: NavController, private storage: Storage) {
    this.storage.create();
  }

  async saveCredentials() {
    await this.storage.set('username', this.username);
    await this.storage.set('password', this.password);
    console.log('Credentials saved');
    this.navCtrl.back();
  }

  cancel() {
    // Navigate back or reset the form
    this.navCtrl.back();
  }
}