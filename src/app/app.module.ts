import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';

@NgModule({
  declarations: [AppComponent, TabBarComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({ projectId: "beforeikickthebucket-deb97", appId: "1:1091591402298:web:1ccf0e4d3b1fe8436dd603", storageBucket: "beforeikickthebucket-deb97.firebasestorage.app", apiKey: "AIzaSyBCur74Bla3-Wj2ljxpqi-fOD-qRVYEeLs", authDomain: "beforeikickthebucket-deb97.firebaseapp.com", messagingSenderId: "1091591402298", measurementId: "G-LYMQP44NMV"})), provideFirestore(() => getFirestore()), provideAuth(() => getAuth())],
  bootstrap: [AppComponent],
})
export class AppModule {}
