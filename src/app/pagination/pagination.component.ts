import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() pagesToShow: number;
  @Input() loading: boolean;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }
  onNext(): void {
    this.goNext.emit(true);
  }
  onPage(n: number): void {
    this.goPage.emit(n);
  }

  totalPages(): number{
    return Math.ceil(this.count / this.perPage) || 0;
  }

  isLastPage(): boolean{
    return this.perPage * this.page >= this.count;
  }

  getMin(): Number {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }

  getMax(): Number {
    if (this.count < this.perPage * this.page) return(this.count)
    return (this.perPage * this.page);
  }

  getPages(): number[]{
    const pagesList: number[] = [];
    const thisTotalPages = Math.ceil(this.count / this.perPage);
    const thispage = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    pagesList.push(thispage)
    
    for (let i = 0; i < pagesToShow - 1; i++) {
      
      if (pagesList.length < pagesToShow){
        if (Math.min.apply(null, pagesList) > 1){
          pagesList.push(Math.min.apply(null,pagesList) - 1);
        }
      }

      if (pagesList.length < pagesToShow){
        if (Math.max.apply(null, pagesList) < thisTotalPages){
          pagesList.push(Math.max.apply(null,pagesList) + 1);
        }
      }
    }
    pagesList.sort((a, b) => a - b);
    return pagesList;
  }
}
