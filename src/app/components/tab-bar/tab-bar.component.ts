import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, listOutline, addCircle, people, personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  standalone: false
})
export class TabBarComponent  implements OnInit {

  constructor() { 
    addIcons({
      home,
      listOutline,
      addCircle,
      people,
      personCircle,
    })
  }

  ngOnInit() {}

}
