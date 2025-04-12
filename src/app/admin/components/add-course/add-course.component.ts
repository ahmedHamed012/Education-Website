import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent {
  courseForm!: FormGroup;
  categories: any[] = [];
  instructors: any[] = [];
  filteredInstructors: any[] = [];
  searchQuery = new Subject<string>();
  searchControl = new FormControl('');
  selectedIndex = -1;
  semesters = ['semester1', 'semester2'];
  courseLevels = ['beginners', 'intermediate', 'advanced'];
  selectedImage: File | null = null;
  videoPreview: string | null = null;
  activeTab: number = 1;
  createdCourseId: number | null = null;

  constructor(private fb: FormBuilder, private courseService: CourseService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.setupInstructorSearch();
  }

  private initForm() {
    this.courseForm = this.fb.group({
      // Step 1 fields
      title: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      category_id: ['', Validators.required],
      major: ['', Validators.required],
      semester: ['', Validators.required],
      instructor_id: ['', Validators.required],
      courseLevel: ['', Validators.required],
      // Step 2 fields
      description: [''],
      prerequisite: [''],
      image: [null],
      introduction_video_path: [''],
        // Step 3 fields 
      lectures: this.fb.array([])
    });
  }

  // Step 1
  private loadCategories() {
    this.courseService.getCategories().subscribe(response => {
      this.categories = response.data;
    });
  }

  setupInstructorSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (!query) {
            this.filteredInstructors = [];
            return [];
          }
          return this.courseService.searchInstructors(query);
        })
      )
      .subscribe(response => {
        this.filteredInstructors = response.data.filter((instructor: any) =>
          instructor.name.toLowerCase().includes(this.searchControl.value!.toLowerCase())
        );
        this.selectedIndex = -1;
      });
  }

  selectInstructor(instructor: any) {
    this.courseForm.patchValue({ instructor_id: instructor.id });
    this.searchControl.setValue(instructor.name, { emitEvent: false });
    this.filteredInstructors = [];
  }

  navigateResults(event: KeyboardEvent) {
    if (this.filteredInstructors.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.filteredInstructors.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.filteredInstructors.length) % this.filteredInstructors.length;
    } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
      this.selectInstructor(this.filteredInstructors[this.selectedIndex]);
      event.preventDefault();
    }
  }

  // Step 2
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }  
  
  // onVideoUpload(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.courseForm.patchValue({ introduction_video_path: file });
  //     this.courseForm.get('introduction_video_path')?.updateValueAndValidity();

  //     // Generate a preview
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.videoPreview = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // Step 3 
  // Getter for lectures form array
  get lectures(): FormArray {
    return this.courseForm.get('lectures') as FormArray;
  }

  // Add a new lecture
  addSection() {
    const section = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [Validators.minLength(3), Validators.maxLength(500)]],
      lecture_attachments: this.fb.array([]),
      file: [null, Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      link: ['']
    });

    this.lectures.push(section);
  }


  // Remove a lecture
  removeSection(index: number) {
    if (this.lectures.length > 1) {
      this.lectures.removeAt(index);
    }
  }

  // Update lecture data on input change
  updateLecture(index: number, field: string, event: any) {
    this.lectures.at(index).patchValue({ [field]: event.target.value });
  }

  // Add lecture attachment
  addAttachment(index: number, attachment: any) {
    const attachments = this.lectures.at(index).get('lecture_attachments') as FormArray;
    attachments.push(this.fb.group({
      name: [attachment.name, Validators.required],
      file_extension: [attachment.file_extension, Validators.required],
      size: [attachment.size, Validators.required]
    }));
  }

  // Submit lectures data to backend
  submitLectures() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    if (!this.createdCourseId) {
      console.error('Course ID is missing!');
      return;
    }

    this.courseService.submitLectures(this.createdCourseId, this.courseForm.value).subscribe(
      response => console.log('Lectures added successfully', response),
      error => console.error('Error adding lectures', error)
    );
  }



  // next button
  nextStep(step: number) {
    console.log("Form Validity: ", this.courseForm.valid);
    console.log("Form Values: ", this.courseForm.value);

    if (this.activeTab === 1) {
      // Validate Step 1 fields
      if (this.courseForm.invalid) {
        this.courseForm.markAllAsTouched();
        console.error('Step 1 validation failed');
        return;
      }
    }

    if (this.activeTab === 2) {
      const formData = new FormData();
    const value = this.courseForm.value;

    formData.append('title', value.title);
    formData.append('description', value.description);
    formData.append('price', value.price.toString());
    formData.append('duration', value.duration.toString());
    formData.append('start_date', value.start_date);
    formData.append('end_date', value.end_date);
    formData.append('rate', value.rate || '0');
    formData.append('category_id', value.category_id);
    formData.append('instructor_id', value.instructor_id);
    formData.append('major', value.major);
    formData.append('prerequisite', value.prerequisite);
    formData.append('semester', value.semester);
    formData.append('introduction_video_path', value.introduction_video_path);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.courseService.createCourse(formData).subscribe({
      next: (res) => {
        console.log('Course created successfully:', res);
      },
      error: (err) => {
        console.error('Error creating course:', err);
      },
    });
  }
    this.setActiveTab(step);
  }


  // private applyStep2Validations() {
  //   const step2Controls = ['description', 'image', 'introduction_video_path', 'prerequisite'];
  //   step2Controls.forEach(control => {
  //     this.courseForm.get(control)?.setValidators(Validators.required);
  //     this.courseForm.get(control)?.updateValueAndValidity();
  //   });
  // }


  setActiveTab(tab: number): void {
    if (tab === 2 && !this.courseForm.valid) {
      return;
    }
    this.activeTab = tab;
  }
}