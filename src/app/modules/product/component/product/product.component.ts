import { Component, OnInit } from '@angular/core';
import { Product } from '../../_model/product';
import { Category } from '../../_model/category';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';
import { FormBuilder, Validators} from '@angular/forms';
import { ProductImage } from '../../_model/productImage';
import { Cart } from '../../../../shared/cart'
import { ProductImageService } from '../../_service/product-image.service';
import { Router } from '@angular/router';

declare var $: any;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {  
  // Datos del producto
  products: Product[] = [];
  product1: Product = new Product();
  productsCat: Product[] = [];
  products2: Product[] = [];
  gtin: any = null;

  // Categorías asociadas al producto
  categories: Category[] = [];
  category: Category = new Category();

  // Imagenes del producto
  images: ProductImage[] = [];
  image: ProductImage = new ProductImage();
  imagesFirst: ProductImage[] = [];
  file: any;
  imageChangedEvent: any;
  base64: any;

  // Formulario para registrar los datos el producto
  formulario = this.formBuilder.group({
    id_product: [''],
    gtin: ['', Validators.required],
    product: ['', Validators.required],
    description: [''],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    id_category: ['', Validators.required],
    status: [''],
  });

  // Validación de envío de información al registrar
  submitted = false;

  constructor(
    private product_service: ProductService,
    private product_image_service: ProductImageService,
    private category_service: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
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
  // Read, Create y Delete de Producto --------------------------------------------------
  getProduct(gtin: string){
    this.product_service.getProduct(gtin).subscribe(
      res => {
        this.product1 = res;        
        this.getCategory(this.product1.id_category); 
        this.getProductImages(this.product1.id_product);       
        let temp = res;
        this.products2.push(temp);        
      },
      err => console.log(err)
    )
  }
  getProducts(){
    this.product_service.getProducts().subscribe(
      res => {
        this.products = res;        
        for(let p of this.products){
          this.getProduct(p.gtin);                      
        }
        this.products2 = this.shuffleProducts(this.products2);                                       
      },
      err => console.log(err)
    )
    
  }

  shuffleProducts(array: Product[]){
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;       
  }

  getProductImages(id_product: number){
    this.product_image_service.getProductImages(id_product).subscribe(
      res => {
        this.images = res;
        this.imagesFirst.push(this.images[0])  
        console.log(this.imagesFirst)      
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
    if (this.formulario.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Faltan campos obligatorios por llenar',
      })
      return;
    }
    this.product_service.createProduct(this.formulario.value).subscribe(
      res => {
        this.getProducts();
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
          text: 'El producto no puede ser registrado',
        })
      }
    )
  }

  createProduct(){
    this.getCategories();
    this.formulario.reset();
    this.formulario.controls['id_category'].setValue(0);
    $("#product_modal").modal("show");
  }

  closeModal(){
    $("#product_modal").modal("hide");
    this.submitted = false;
  }

  get f() {
    return this.formulario.controls;
  }

  deleteProduct(id_product: number){
    Swal.fire({
      title: 'Deseas eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.product_service.deleteProduct(id_product).subscribe(
          res => {
            this.getProducts();
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
              text: 'El producto no puede ser eliminado',
            })
          }
        )
      }
    })
  }

  // Read de Categoría del Producto --------------------------------------------------

  getCategories(){
    this.category_service.getCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => console.log(err)
    )
  }

  // Redireccionar a detalle del producto --------------------------------------------------

  productDetail(gtin: string){
    this.router.navigate(['product-detail/'+gtin]);
  }

}