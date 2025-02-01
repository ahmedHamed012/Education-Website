import { Component } from '@angular/core';
import { LandingNavbarComponent } from './components/landing-navbar/landing-navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../Shared/footer/footer.component';

@Component({
    standalone: true,
    selector: 'app-landing',
    imports: [LandingNavbarComponent, RouterModule, FooterComponent],
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent { }
