import { Component, Input } from '@angular/core';
import { SummaryPipe } from '../../pipes/summary.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'blog-item-text',
  standalone: true,
  imports: [SummaryPipe, RouterModule],
  templateUrl: './blog-item-text.component.html',
  styleUrl: './blog-item-text.component.scss'
})
export class BlogItemTextComponent {
  @Input() title?: string;
  @Input() text?: string;
  @Input() id?: number;
}
