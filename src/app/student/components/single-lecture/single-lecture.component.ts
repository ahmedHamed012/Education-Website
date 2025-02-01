import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-single-lecture',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
  ],
  templateUrl: './single-lecture.component.html',
  styleUrl: './single-lecture.component.scss'
})
export class SingleLectureComponent {
  itemsArray = Array(4);
}
