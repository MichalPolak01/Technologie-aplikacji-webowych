import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextFormatDirective } from '../../directives/text-format.directive';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, TextFormatDirective, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {
  public filterText: string = '';

  @Output() name =  new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.filterText = params['name'];
      this.sendFilter();
    });
  }

  sendFilter() {
    this.router.navigate(['/'], {queryParams: {name: this.filterText?.toLowerCase()}});
    this.name.emit(this.filterText);
  }
}