import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [PanelModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FAQComponent {
  items = [
    {
      label: 'What courses do you offer on the platform?',
      expanded: false, // Ensures the item is collapsed by default
    },
    {
      label: 'Who can enroll in the courses?',
      expanded: false,
    },
    {
      label: 'Are the courses self-paced or instructor-led?',
      expanded: false,
    },
    {
      label: 'How can I access the courses after enrolling?',
      expanded: false,
    },
    {
      label: 'What payment methods do you accept?',
      expanded: false,
    },
    {
      label: 'How do I contact support if I face an issue?',
      expanded: false,
    },
    {
      label: 'Can I get a refund if I’m not satisfied?',
      expanded: false,
    },
    {
      label: 'Can I upgrade or change my course after enrolling?',
      expanded: false,
    },
    {
      label: 'Can I preview a course before enrolling?',
      expanded: false,
    },
  ];
}
