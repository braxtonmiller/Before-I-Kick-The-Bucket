import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard'
import { TabBarComponent } from './components/tab-bar/tab-bar.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToProfile = () => redirectLoggedInTo(['tabs/profile']);

const routes: Routes = [
  {
    path: 'tabs',
    component: TabBarComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },

      {
        path: 'bucket',
        loadChildren: () => import('./bucket/bucket.module').then(m => m.BucketPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'add-photos',
        loadChildren: () => import('./add-photos/add-photos.module').then(m => m.AddPhotosPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: 'community',
        loadChildren: () => import('./community/community.module').then(m => m.CommunityPageModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToProfile)
  },
  {
    path: '',
    redirectTo: 'tabs/profile',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tabs/profile'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
