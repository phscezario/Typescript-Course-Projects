import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent {
    product: Product = {
        name: '',
        price: null,
    };

    constructor(private productService: ProductService, private router: Router) {}

    ngOnInit(): void {}

    createProduct(): void {
        this.productService.create(this.product).subscribe(() => {
            this.productService.showMessage('Product Created');
            this.router.navigate(['/products']);
        });
    }

    cancel(): void {
        this.router.navigate(['/products']);
    }
}