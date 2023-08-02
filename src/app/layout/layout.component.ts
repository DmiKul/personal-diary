import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IsAuthorizedService } from '../shared/services/is-authorized.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent {
  isAuthorized!: boolean

  constructor(private router: Router, private isAuthorizedService: IsAuthorizedService) {
    this.isAuthorizedService.getIsAuthorized().subscribe(isAuthorized => this.isAuthorized = isAuthorized)
    console.log(this.isAuthorized)
  }

  logOut(): void {
    this.router.navigate(['login'])
    this.isAuthorizedService.setIsAuthorized(false)
  }
}
