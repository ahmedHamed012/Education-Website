import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
import { NavbarComponent } from '../../Shared/navbar/navbar.component';
import { FooterComponent } from '../../Shared/footer/footer.component';

@Component({
  selector: 'app-watch-course',
  standalone: true,
  imports: [
    CommonModule,
    AvatarGroupModule,
    AvatarModule,
    DividerModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './watch-course.component.html',
  styleUrl: './watch-course.component.scss',
})
export class WatchCourseComponent {
  itemsArray = Array(4);
}
