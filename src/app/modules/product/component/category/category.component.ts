import { Component, OnInit } from '@angular/core';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { ProductService } from '../../_service/product.service';
import { Cart } from '../../../../shared/cart';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';


declare var $: any;

import Swal from 'sweetalert2';
import { Product } from '../../_model/product';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  category: Category = new Category();
  products: Product[] = [];
  product1: Product = new Product();
  products2: Product[] = [];
  formulario = this.formBuilder.group({
    id_category: [''],
    category: ['', Validators.required]
  });
  post_category = false;
  submitted = false;

  constructor(
    private category_service: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router, 
    private product_service: ProductService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  //Add products to cart
  addToCart(product: Product){
    Cart.cart.push	(product);
    console.log(Cart.cart);
  }
  
  get1Product(id: number){
    for(let prod of this.products2){
      if(prod.id_product == id){
        this.addToCart(prod);
      }
    }
  }

  getCategories(){
    this.category_service.getCategories().subscribe(
      res => {
        this.categories = res;    
      },
      err => console.log(err)
    )
  }

  getProductsByCategory(idCat: number){
    let result: Product[] = [];
    for (let prod of this.products2){
      if (prod.id_category == idCat) result.push(prod);      
    }
    return result;
  }

  getProducts(){
    this.product_service.getProducts().subscribe(
      res => {
        this.products = res;        
        for(let p of this.products){
          this.getProduct(p.gtin);                      
        }                                                     
      },
      err => console.log(err)
    )
    
  }

  getProduct(gtin: string){
    this.product_service.getProduct(gtin).subscribe(
      res => {
        this.product1 = res;        
        this.getCategory(this.product1.id_category);                
        let temp = res;
        this.products2.push(temp);
        console.log(this.products2);          
      },
      err => console.log(err)
    )
  }

  getCategory(id_category: number){
    this.category_service.getCategory(id_category).subscribe(
      res => {
        this.category = res;
        
      },
      err => console.log(err)
    )
  }


  onSubmit(){
    this.submitted = true;
    if(this.post_category){
      this.category_service.createCategory(this.formulario.value).subscribe(
        res => {
          this.getCategories();
          this.closeModal();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro exitoso!',
            showConfirmButton: false,
            timer: 1500
          })
        },
        err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'La categoría no puede ser registrada',
          })
        }
      )
    }else{
      this.category_service.updateCategory(this.formulario.value).subscribe(
        res => {
          this.getCategories();
          this.closeModal();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actualización exitosa!',
            showConfirmButton: false,
            timer: 1500
          })
        },
        err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'La categoría no puede ser actualizada',
          })
        }
      )
    }
  }

  createCategory(){
    this.post_category = true;
    this.formulario.reset();
    $("#category_modal").modal("show");
  }

  updateCategory(category: Category){
    this.post_category = false;
    this.formulario.controls['id_category'].setValue(category.id_category);
    this.formulario.controls['category'].setValue(category.category);
    $("#category_modal").modal("show");
  }

  deleteCategory(id_category: number){
    Swal.fire({
      title: 'Deseas eliminar la Región?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.category_service.deleteCategory(id_category).subscribe(
          res => {
            this.getCategories();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Eliminación exitosa!',
              showConfirmButton: false,
              timer: 1500
            })
          },
          err => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'La región no puede ser eliminada',
            })
          }
        )
      }
    })
  }

  get f() {
    return this.formulario.controls;
  }

  closeModal(){
    $("#category_modal").modal("hide");
    this.submitted = false;
  }

  productDetail(gtin: string){
    this.router.navigate(['product-detail/'+gtin]);
  }

}
