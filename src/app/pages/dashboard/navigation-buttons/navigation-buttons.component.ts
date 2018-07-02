import { Component, Output, EventEmitter} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
//import {MachinesTableService } from '../../../@core/data/machines-table.service';
import {DashboardService } from '../../../@core/data/dashboard.service';

@Component({
  selector: 'navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent  {
  position_data: any[];
  source: LocalDataSource = new LocalDataSource();
  ort: string="<Auswählen>";
  ort_obj: any ; 
  @Output() send= new EventEmitter();

  constructor( private httpService: DashboardService) {
    this.checkPositions();
  }
  checkPositions(){
  	this.httpService.sendData(["get_benutzer_tag", null, null]).subscribe(res => {
      try{
        this.position_data = [res];
        this.source.load(this.position_data);
      }
      catch(e){

      }
    });
   
  }

  httpSend(){
    if(this.ort_obj) {
      this.send.emit(this.ort_obj.machineName); 
      }
  }
  httpSendTag(){
    this.send.emit("Tag"); 
  }

}
