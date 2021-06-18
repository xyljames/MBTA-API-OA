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
 
  formValue ={route:'',stop:'',direction:''}
  constructor(private fetchService:FetchServiceService ) { }
  ngOnInit(): void {
   this.fetchService.fetchRoutes().subscribe((res:any)=>
   this.originRoutesList = res.data.filter((item:any)=>
   item.attributes.description =="Rapid Transit" || item.attributes.description=="Commuter Rail" ))
 

   this.fetchService.fetchStops().subscribe((res:any) => this.originStopList = res.data)
  }

   
  form = new FormGroup({
    route: new FormControl('', Validators.required),
    stop: new FormControl('', Validators.required),
    direction: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  showList(){
    console.log(this.originRoutesList)
  }
  
  submit(){

    this.formValue =this.form.value
    this.formValue.route = this.formValue.route.substring(this.formValue.route.indexOf(':')+1,this.formValue.route.length)
    this.formValue.stop = this.formValue.stop.substring(0,this.formValue.stop.length)

    let stopId = this.formValue.stop.substring(0,this.formValue.stop.indexOf(':'))
    console.log('id for time',stopId)
    
   
  }

  selectRoute(e:any){
    let index = e.target.value.indexOf('=>')
    console.log("e.target.value",e.target.value)
    let realRoute = e.target.value.slice(index+2)
  
    console.log(realRoute)
    this.selectStopByRoute(realRoute)

    let getIndexFromValue = e.target.value.substring(0,1)
    this.selectDirections( getIndexFromValue )
  }

  selectStopByRoute(routeValue:any) {

    console.log(routeValue)
     let a = this.originStopList
     this.filteredStopList = this.originStopList.filter((stop:any) =>
     (stop.attributes.name.includes(routeValue)))
     this.filteredStopList = [...new Set(this.filteredStopList)]
     console.log('xxx',this.filteredStopList)
 
  }
  selectDirections( index:number) {
  this.filteredDirections = this.originRoutesList[index].attributes.direction_names
  console.log(this.filteredDirections)
  }

  
 
}
