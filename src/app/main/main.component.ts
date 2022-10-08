import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from 
  '@angular/core';

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

   @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    map: google.maps.Map;
    lat = 0;
    lng = 0;

    coordinates = new google.maps.LatLng(this.lat, this.lng);

    mapOptions: google.maps.MapOptions = {
     center: this.coordinates,
     zoom: 8
    };

    marker = new google.maps.Marker({
      position: this.coordinates,
    });

    ngAfterViewInit() {
      this.mapInitializer();
    }

    mapInitializer() {
      this.map = new google.maps.Map(this.gmap.nativeElement, 
      this.mapOptions);
      this.marker.setMap(this.map);
    }
  



 
  fetchInfo() {
   const response = this.http.get(`${this.baseUrl}${this.search}&appid=${this.api_key}`);
   response.subscribe(
     (res) => {
       this.data = res;
       this.lat = res['coord']['lat']
       this.lng = res['coord']['lon']
       this.cityName =  this.search
       this.search = ""
     }, 
     (err) => {
       alert("not working")
     }
   )
  }

}
