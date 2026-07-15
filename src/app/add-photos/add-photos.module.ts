import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPhotosPageRoutingModule } from './add-photos-routing.module';

import { AddPhotosPage } from './add-photos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPhotosPageRoutingModule
  ],
  declarations: [AddPhotosPage]
})
export class AddPhotosPageModule {}
