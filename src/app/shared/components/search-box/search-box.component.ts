import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter()

  public emitValue(term:string){
    if (term.length===0) return
    this.onValue.emit(term)
  }

}
