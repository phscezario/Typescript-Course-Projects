import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
    selector: 'app-product-crud',
    templateUrl: './product-crud.component.html',
    styleUrls: ['./product-crud.component.css'],
})
export class ProductCrudComponent {
    constructor(private headerService: HeaderService, private router: Router) {
        headerService.headerData = {
            title: 'Product registration',
            icon: 'storefront',
            routeUrl: '/products',
        };
    }

    navigateToProductCreate(): void {
        this.router.navigate(['/products/create']);
    }
}
