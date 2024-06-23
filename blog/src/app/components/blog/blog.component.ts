import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { BlogItemComponent } from '../blog-item/blog-item.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { FilterTextPipe } from '../../pipes/filter-text.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [FilterTextPipe, HttpClientModule, BlogItemComponent, CommonModule, SearchBarComponent],
  providers: [DataService, AuthService],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})

export class BlogComponent implements OnInit{
  @Input() filterText: string = '';
  public items$: any;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(response => {
      if (Array.isArray(response)) {
        this.items$ = response.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      } else {
        console.error('Unexpected response format:', response);
      }
    }, error => {
      console.error('Error fetching items:', error);
    });
  }
}
