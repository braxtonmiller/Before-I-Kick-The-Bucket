import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPhotosPage } from './add-photos.page';

const routes: Routes = [
  {
    path: '',
    component: AddPhotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPhotosPageRoutingModule {}
