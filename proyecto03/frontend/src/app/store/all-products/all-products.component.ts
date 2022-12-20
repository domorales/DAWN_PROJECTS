import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ProductResponse } from 'src/app/shared/model/Product';

import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductsComponent {
  products$ = this.productService.products$;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const category = params['id'] || '';
      localStorage.setItem('category', category);
      if (category) {
        this.productService.getAllProductsByCategory(category);
        return;
      }
      this.productService.getAllProducts();
    });
  }

  ngOnInit(): void {}

  seachProducts(value: string) {
    const category = localStorage.getItem('category');

    if (category) {
      this.productService.filterProductsByValue(value, category);
      return;
    }
    this.productService.filterAllProductsByValue(value);
  }

  emptySearch() {
    const category = localStorage.getItem('category');
    console.log(category);
    if (category) {
      this.productService.getAllProductsByCategory(category);
      return;
    }
    this.productService.getAllProducts();
  }

  trackByIndex(index: number, product: ProductResponse): any {
    return product._id;
  }
}
