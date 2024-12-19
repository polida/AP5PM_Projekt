import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppStorageService } from 'src/app/app-storage.service';

 

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  username: string = '';
  password: string = '';;

  constructor(private navCtrl: NavController, private storage: AppStorageService) {
  }


  async ionViewWillEnter() {
    this.username = await this.storage.get('username');
    this.password = await this.storage.get('password');
  }
  async saveCredentials() {
    await this.storage.set('username', this.username);
    await this.storage.set('password', this.password);
    console.log('Credentials saved');
  }

  cancel() {
    // Navigate back or reset the form
    this.navCtrl.back();
  }
}