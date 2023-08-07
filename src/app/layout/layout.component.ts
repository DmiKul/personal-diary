import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IsAuthorizedService } from '../shared/services/is-authorized.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent {
  isAuthorized!: boolean

  constructor(private router: Router, private auth: AuthService) {
    this.auth.getIsAuthorized().subscribe(isAuthorized => this.isAuthorized = isAuthorized)
    console.log(this.isAuthorized)
  }

  logout(): void {
    this.router.navigate(['login'])
    this.auth.logout()
  }
}
