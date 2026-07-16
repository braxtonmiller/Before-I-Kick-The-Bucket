import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

async signOut() {
    await this.authService.logout();
    this.router.navigateByUrl('login');
  }

  ngOnInit() {}
}
