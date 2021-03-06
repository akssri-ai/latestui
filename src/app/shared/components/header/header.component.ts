import { Component, OnInit, Output, EventEmitter,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {UserDetailModelService} from '../../user-detail-model.service';
import { AuthService } from '../../../auth.service';
import {RMIAPIsService} from '../../rmiapis.service';
import '../../../../../node_modules/chargebee/lib/chargebee.js';
import {UrlConfigService} from '../../url-config.service';
declare var Chargebee: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
 
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  myControl = new FormControl();
  options: string[] = [];
  
  nickname:any;
  email:any;
  picture:any;
  filteredOptions: Observable<string[]>;
  @ViewChild('script') script: ElementRef;
  

  constructor( private apiService:RMIAPIsService,
    private urlConfig:UrlConfigService,public auth: AuthService) {
	//	this.loadScripts()
	}
	
	
	
  ngOnInit() {
	  this.auth.userProfileSubject$.subscribe((res:any)=>{
      console.log("res for profile",res);
      localStorage.setItem('nickname',res.nickname);
      localStorage.setItem('email',res.email);
      localStorage.setItem('picture',res.picture);
    });
    this.nickname = localStorage.getItem('nickname');
    this.email = localStorage.getItem('email');
    this.picture = localStorage.getItem('picture');
	  
	  
	  
    //this.auth.profileSubscriber.subscribe(() => {
      //this.picture = localStorage.getItem('picture');
    //})
    //this.filteredOptions = this.myControl.valueChanges.pipe(
     // startWith(''),
      //map(value => this._filter(value))
    //);
      }
	    subscribe() {
    // see https://www.chargebee.com/checkout-portal-docs/drop-in-tutorial.html#simulating-drop-in-script-functionality-with-your-button
     let cbInstance = Chargebee.getInstance();
    let cart = cbInstance.getCart();
    let product = cbInstance.initializeProduct("accounting-firms");
    cart.replaceProduct(product);
    cart.proceedToCheckout();
  }
   SmallBusiness() {
    // see https://www.chargebee.com/checkout-portal-docs/drop-in-tutorial.html#simulating-drop-in-script-functionality-with-your-button
     let cbInstance = Chargebee.getInstance();
    let cart = cbInstance.getCart();
    let product = cbInstance.initializeProduct("small-business-owner");
    cart.replaceProduct(product);
    cart.proceedToCheckout();
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  

  
}
