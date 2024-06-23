import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [DataService, AuthService],
  templateUrl: './blog-add-post.component.html',
  styleUrl: './blog-add-post.component.scss'
})
export class BlogAddPostComponent implements OnInit{
  postForm: FormGroup;
  imagePreview: string | null = null;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postForm.get('image')?.valueChanges.subscribe(value => {
      this.imagePreview = value;
    })
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.dataService.createPost(this.postForm.value).subscribe(response => {
        console.log('Post added succesfuly!');
        this.router.navigate(['/blog']);
      }, error => {
        console.error('Error creating post', error);
      })
    }
  }

}
