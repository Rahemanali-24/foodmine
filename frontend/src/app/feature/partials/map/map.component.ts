import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LatLng, LatLngExpression, LatLngLiteral, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { MapService } from 'src/app/services/map.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Input()
  order!:Order;
  @Input()
  readonly = false;
  @Input() checkoutForm!: FormGroup; // Add checkoutForm as an input


  @Output() locationFound: EventEmitter<{ location: LatLngLiteral, address: string }> = new EventEmitter<{ location: LatLngLiteral, address: string }>();


  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', {static:true})
  mapRef!: ElementRef;
  map!:Map;
  currentMarker!:Marker;

  constructor(private locationService: MapService) { }

  ngOnChanges(): void {
    if(!this.order || !this.checkoutForm) return;
    this.initializeMap();

    if(this.readonly && this.addressLatLng){
      this.showLocationOnReadonlyMode();
    }
  }
  showLocationOnReadonlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  initializeMap(){
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation() {
    if (!this.checkoutForm) return;
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.locationService.getAddressFromCoordinates(latlng.lat, latlng.lng).subscribe({
          next: (address) => {
            // Emit the location and address data
            const locationData = { location: latlng, address: address };
            this.locationFound.emit(locationData);
  
            // Update the text input with the current address
            this.checkoutForm.get('address')?.setValue(address);
  
            // Set the marker and update the map view
            this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
            this.setMarker(latlng);
          },
          error: (error) => {
            console.error('Error getting address:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error getting current location:', error);
      }
    });
  }
  
  setMarker(latlng:LatLngExpression){
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker)
    {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);


    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }

  set addressLatLng(latlng: LatLng){
    if(!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }
}
