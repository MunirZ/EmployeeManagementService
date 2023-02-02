import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  logout(): void {
    window.location.href = "http://keycloak.szut.dev/auth/realms/szut/protocol/openid-connect/logout?redirect_uri=encodedRedirectUri";
  }
}
