import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FetchServiceService } from 'src/app/service/fetch-service.service';
 

@Component({
  selector: 'app-planner-viwer',
  templateUrl: './planner-viwer.component.html',
  styleUrls: ['./planner-viwer.component.scss']
})
export class PlannerViwerComponent implements OnInit {
  originRoutesList:any = []  
  originStopList:any = []
  filteredStopList:any= []
  filteredDirections:any = []
  realRoute = ''
  tempPredics:any =[]
  formValue ={route:'',stop:'',direction:''}
  prediction = ''

  constructor(private fetchService:FetchServiceService ) { }
  ngOnInit(): void {
    
  //fetch route list only for "Rapid Transit" or "Commuter Rail"
   this.fetchService.fetchRoutes().subscribe((res:any)=>
   this.originRoutesList = res.data.filter((item:any)=>
   item.attributes.description =="Rapid Transit" || item.attributes.description == "Commuter Rail" ))

  // fetch original stop list
   this.fetchService.fetchStops().subscribe((res:any) => this.originStopList = res.data)
  }

  // Intialize form group
  form = new FormGroup({
    route: new FormControl('', Validators.required),
    stop: new FormControl('', Validators.required),
    direction: new FormControl('', Validators.required)
  });
  
 
  // form submit to get predicted depature time
  submit(){

    // data clean up 
    this.formValue =this.form.value
    this.formValue.route = this.formValue.route.substring(this.formValue.route.indexOf(':')+1,this.formValue.route.length)
    this.formValue.stop = this.formValue.stop.substring(0,this.formValue.stop.length)
    let stopId = this.formValue.stop.substring(0,this.formValue.stop.indexOf(':'))

    // pass stop id to fetch predictions
    this.fetchService.fetchPredictions(stopId).subscribe((res:any)=> {
      res.data.length=== 0? this.prediction = 'No Predicted Departure Time Found, Please Try Other Routes':res.data.map((item:any)=> {
        if( item.attributes.departure_time) {
                this.prediction = item.attributes.departure_time
             }
      })
    })
  }
 
  selectRoute(e:any){
    // data clean up, e,g: Orange=>Oak Grove return Oak Grove
    let index = e.target.value.indexOf('=>')
    let realRoute = e.target.value.slice(index+2)
  
    //get stop list by selected route
    this.selectStopByRoute(realRoute)

    let getIndexFromValue = e.target.value.substring(0,1)
    //get directions list by selected route
    this.selectDirections( getIndexFromValue )
  }

  selectStopByRoute(routeValue:any) {
  //remove duplicates for stop list
     this.filteredStopList = [...new Set( this.originStopList.filter((stop:any) =>
      (stop.attributes.name.includes(routeValue))))]
  }
  
  selectDirections( index:number) {
  this.filteredDirections = this.originRoutesList[index].attributes.direction_names
  }

  
 
}
