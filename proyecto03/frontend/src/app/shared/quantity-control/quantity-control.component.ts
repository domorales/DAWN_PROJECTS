import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-quantity-control',
  templateUrl: './quantity-control.component.html',
  styleUrls: ['./quantity-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantityControlComponent {
  @Input() quantity: number = 1;
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubtract: EventEmitter<any> = new EventEmitter<any>();

  add() {
    this.onAdd.emit();
  }

  subtract() {
    if (this.quantity > 1) {
      this.onSubtract.emit();
    }
  }
}
