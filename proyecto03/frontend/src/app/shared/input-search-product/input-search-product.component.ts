import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-input-search-product',
  templateUrl: './input-search-product.component.html',
  styleUrls: ['./input-search-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchProductComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEmpty: EventEmitter<void> = new EventEmitter<void>();

  item: string = '';

  searchProduct() {
    this.onSearch.emit(this.item);
  }

  keyPress() {
    if (this.item === '') {
      this.onEmpty.emit();
    }
  }
}
