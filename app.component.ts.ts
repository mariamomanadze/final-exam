import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common'; 
import {HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo';

  tasks:any=[];

  APIURL="http://localhost:800/";

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.get_tasks();
  }

  get_tasks(){
    this.http.get(this.APIURL+"get_tasks").subscribe((res)=>{
      this.tasks=res;
    })
  }

  add_task(){
    let body=new FormData();
    body.append('task', this.newtask);
    this.http.post(this.APIURL+"add_task",body).subscribe((res)=>{
      alert(res)
      this.newtask="";
      this.get_tasks();
    })
  }

  delete_task(id:any){
    let body=new FormData();
    body.append('id',id);
    this.http.post(this.APIURL+"delete_task",body).subscribe((res)=>{
      alert(res)
      this.get_tasks();
    })
  }

}
