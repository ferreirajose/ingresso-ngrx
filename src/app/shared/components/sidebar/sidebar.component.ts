import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.logout().then(res => {
      this.router.navigate(['/login']);
    }).catch(erro => {
      console.log(erro);
    });
  }

}
