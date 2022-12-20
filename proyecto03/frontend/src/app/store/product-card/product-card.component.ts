import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductResponse } from 'src/app/shared/model/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input('product') product!: ProductResponse;

  constructor(private router: Router) {}

  searchProduct(id: string) {
    this.router.navigate(['/product', id]);
  }
}
