import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [SearchBarComponent, BlogComponent, CommonModule],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.scss'
})
export class BlogHomeComponent implements OnInit {
  public filterText: string = '';

  constructor() {

  }

  ngOnInit(): void {
  
  }

  getName($event: string): void {
    this.filterText = $event;
  }
}
