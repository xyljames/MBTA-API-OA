import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchServiceService {

  routesURL="https://api-v3.mbta.com/routes"
  stopsURL ="https://api-v3.mbta.com/stops"
  predictionsURL = `https://api-v3.mbta.com/predictions?filter[stop]=`
  constructor(private http:HttpClient){
  }
   fetchRoutes =()=>this.http.get(this.routesURL)
   fetchStops =()=>this.http.get(this.stopsURL)
   fetchPredictions = (id:string)=>this.http.get(this.predictionsURL+id)
}
