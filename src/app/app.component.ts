import { Component, Input } from '@angular/core';
import { DataService } from './services/data.service';
// import { DataService } from 'src/assets/service/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pqr';
  currentData: any;
  dataArray: any

  constructor(public data: DataService) {
    console.log(this.data.clear);
    this.data.get().subscribe((info)=>{
      this.data.dataArray = info
    })
  }

  editData(i: any) {
    this.data.findOne(i).subscribe((info)=>{
      this.data.formData = info;
      this.data.flag = true;
      this.data.clear = false;
    })
  }

  deletedata(i: String) {
    this.data.delete(i).subscribe((res)=>{
      this.data.get().subscribe((info)=>{
        this.data.dataArray = info
      })  
    })
  }
}
