import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  // http: any;

constructor(private http: HttpClient) { }

  getCurrentLocation(): Observable<LatLngLiteral>{
    return new Observable((observer) => {
      if(!navigator.geolocation) return;

      return navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        (error) => {
          observer.error(error);
        }
      )
    })
  }
  getAddressFromCoordinates(lat: number, lng: number): Observable<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
    return this.http.get<any>(url).pipe(
      map((response: any) => response.display_name as string)
    );
  }
 
}
