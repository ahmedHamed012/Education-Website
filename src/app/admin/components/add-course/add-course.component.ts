import { Component, signal  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent {
  courseForm: FormGroup;
  activeTab = signal(1);

  courseCategories: string[] = ['Programming', 'Math', 'Science', 'Arts']; 
  semesters: string[] = ['Semester 1', 'Semester 2'];
  courseLevels: string[] = ['Beginner', 'Intermediate', 'Advanced'];

  instructors: any[] = [];
  filteredInstructors: any[] = [];

  thumbnailPreview: string | ArrayBuffer | null = null;
  videoPreview: string | ArrayBuffer | null = null;

  lectures: { name: string; link: string }[] = [{ name: '', link: '' }];

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      semester: ['', Validators.required],
      level: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      instructor: ['']
    });

    this.loadInstructors();
  }

  loadInstructors() {
    this.courseService.getInstructors().subscribe((data) => {
      this.instructors = data;
      this.filteredInstructors = data;
    });
  }

  searchInstructors(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const query = inputElement.value.toLowerCase();
      this.filteredInstructors = this.instructors.filter(inst =>
        inst.name.toLowerCase().includes(query)
      );
    }
  }
  

  selectInstructor(instructor: any) {
    this.courseForm.patchValue({ instructor: instructor.name });
    this.filteredInstructors = []; // Hide search results after selection
  }

  setActiveTab(tab: number) {
    this.activeTab.set(tab);
  }

  nextStep(tab: number) {
    if (this.courseForm.valid) {
      this.setActiveTab(tab);
    } else {
      this.courseForm.markAllAsTouched(); 
    }
  }

  onThumbnailUpload(event: Event): void {
    this.handleFileUpload(event, 'image');
  }

  onVideoUpload(event: Event): void {
    this.handleFileUpload(event, 'video');
  }

  private handleFileUpload(event: Event, type: 'image' | 'video'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (type === 'image') {
          this.thumbnailPreview = reader.result;
        } else {
          this.videoPreview = reader.result;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  // Step 3
  addSection(): void {
    this.lectures.push({ name: '', link: '' });
  }

  removeSection(index: number): void {
    if (this.lectures.length > 1) {
      this.lectures.splice(index, 1);
    }
  }

  updateLecture(index: number, field: 'name' | 'link', event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.lectures[index][field] = inputElement.value;
  }

  submit(): void {
    if (this.courseForm.valid) {
      this.courseService.addCourse(this.courseForm.value).subscribe({
        next: () => {
          alert('Course added successfully!');
          this.submitLectures();
        },
        error: () => alert('Error adding course'),
      });
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
  
  submitLectures(): void {
    if (this.lectures.every(lecture => lecture.name.trim() !== '' && lecture.link.trim() !== '')) {
      console.log('Lectures:', this.lectures);
      alert('Lectures submitted successfully!');
    } else {
      alert('Please fill in all lecture names and links.');
    }
  }
  
}
