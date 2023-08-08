import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent {
  isAuthorized!: boolean;

  constructor(private router: Router, private auth: AuthService) {
    //Подписываемся на Observable, чтобы следить за изменениями, авторизован ли пользователь
    this.auth
      .getIsAuthorized()
      .subscribe((isAuthorized) => (this.isAuthorized = isAuthorized));
  }

  logout(): void {
    //Переходим на страницу входа
    this.router.navigate(['login']);
    this.auth.logout();
  }
}
