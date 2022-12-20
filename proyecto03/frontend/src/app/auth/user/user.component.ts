import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  isLoggedIn$ = this.authService.isLoggedIn$;
  userData$ = this.authService.userData$;

  constructor(private authService: AuthService) {
    this.authService.getUser();
  }
}
