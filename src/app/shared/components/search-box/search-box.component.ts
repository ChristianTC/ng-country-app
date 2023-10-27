import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer:Subject<string> = new Subject<string>()
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter()

  @Output()
  public onDebounce = new EventEmitter<string>()

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }

  public emitValue(term:string){
    if (term.length===0) return
    this.onValue.emit(term)
  }

  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm)
  }

}
