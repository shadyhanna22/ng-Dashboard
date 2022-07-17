import { Component, OnInit } from '@angular/core';
import { Order } from "../../shared/order";
@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor() { }

  orders: Order[] = [
    {id: 1, 
      customer:{id: 1,name:'customer1',
      email:'customer1@gmai.com',provence:'ON'},
      total: 2,placed: new Date(2022,5,14),fulfilled:new Date(2022,6,12)},
    {id: 2, 
      customer:{id: 2,name:'customer2',
      email:'customer2@gmai.com',provence:'BC'},
      total: 7,placed: new Date(2022,5,14),fulfilled:new Date(2022,6,12)},
    {id: 3, 
      customer:{id: 3,name:'customer3',
      email:'customer3@gmai.com',provence:'MB'},
      total: 5,placed: new Date(2022,5,14),fulfilled:new Date(2022,6,12)}
  ];

  ngOnInit(): void {
  }

}
