import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cityName="Kolkata";
  search="";
  data;
  api_key="b326d0250896b8840d30cb1bdd5fcf80";
  baseUrl = "https://api.openweathermap.org/data/2.5/weather?q="
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.search = this.cityName;
    this.fetchInfo();
  }

  fetchInfo() {
   const response = this.http.get(`${this.baseUrl}${this.search}&appid=${this.api_key}`);
   response.subscribe(
     (res) => {
       this.data = res;
       this.cityName =  this.search
       this.search = ""
     }, 
     (err) => {
       alert("not working")
     }
   )
  }

}
