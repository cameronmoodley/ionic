import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  // misc
  name: string;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker: any;
  location: any;
  info_window: any;
  service: any;

  constructor(public navCtrl: NavController,
              private geolocation: Geolocation) {
    if (localStorage.getItem('name') == null || localStorage.getItem('name') == undefined) {
      this.navCtrl.push(HelloIonicPage);
    }
    else {
      this.name = localStorage.getItem('name');
    }

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.initMap(resp.coords.latitude, resp.coords.longitude);
    })
      .catch((error) => {
        console.log(error);
      });
  }

  initMap(lat,long){
    this.location = {lat: lat, long: long};
     this.map = new google.maps.Map(document.getElementById('map'),{
       center: this.location,
       zoom: 15
     })

    this.info_window = new google.maps.InfoWindow();
    this.service = new google.maps.places.PlacesService(this.map);
    this.service.nearbySearch({
      location: this.location,
      radius: 500,
      type: [ 'store' ],
    });
  }

  callback(results, status){
    if(status === google.maps.places.PlacesServiceStatus.OK)
    {
      for(let i = 0; i < results.length; i++){
        this.createMaker(results[i]);
      }
    }
  }

  createMaker(place){
    console.log(place);
  }

  // loadMap(lat, long) {
  //   let latLng  = new google.maps.LatLng(lat,long);
  //
  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 13,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }
  //
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //
  //   this.marker = new google.maps.Marker({
  //     position: latLng,
  //     map: this.map,
  //     draggable:true
  //   });
  //
  // }
}
