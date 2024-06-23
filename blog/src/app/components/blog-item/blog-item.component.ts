import { Component, Input } from '@angular/core';
import { BlogItemImageComponent } from '../blog-item-image/blog-item-image.component';
import { BlogItemTextComponent } from '../blog-item-text/blog-item-text.component';

@Component({
  selector: 'blog-item',
  standalone: true,
  imports: [BlogItemImageComponent, BlogItemTextComponent],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.scss'
})

export class BlogItemComponent {
  @Input() image?: string;
  @Input() title?: string;
  @Input() text?: string;
  @Input() id?: number;
}
