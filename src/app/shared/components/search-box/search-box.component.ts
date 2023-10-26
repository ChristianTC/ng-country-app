import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {

  private debouncer:Subject<string> = new Subject<string>()

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter()

  @Output()
  public onDebounce = new EventEmitter<string>()

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit(value)
    })
  }

  public emitValue(term:string){
    if (term.length===0) return
    this.onValue.emit(term)
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm)
  }

}
