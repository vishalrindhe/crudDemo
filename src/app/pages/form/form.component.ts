import { Component,Input,OnChanges,OnInit,SimpleChanges} from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule,Validators} from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() i: any;

  item: any;
  f = 'male';
  userForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]{4,8}$'),
    ]),
    gender: new FormControl(this.f, [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '[^0-9]([a-zA-Z0-9+_.-])+[@]+[a-zA-Z0-9]+[.]+[a-z]{2,4}$'
      ),
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('^[6-9][0-9]{9}$'),
    ]),
    about: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });

  constructor(public data: DataService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    setTimeout(() => {
      this.data.flag = false;
    }, 0);
    this.userForm.get('name')?.setValue(this.data.formData?.name);
    this.userForm.get('email')?.setValue(this.data.formData?.email);
    this.userForm.get('mobile')?.setValue(this.data.formData?.phone);
    this.userForm.get('about')?.setValue(this.data.formData?.message);
    this.userForm.get('gender')?.setValue(this.data.formData?.gender);
  }

  ngOnInit(): void { }

  addNewItem() {
    let data = {
      name: this.userForm.value.name,
      message: this.userForm.value.about,
      gender: this.userForm.value.gender,
      email: this.userForm.value.email,
      phone: this.userForm.value.mobile,
    };
    if (this.data.clear == true) {
      this.data.addData(data).subscribe((info) => {
        console.log('data added successfully:', info);
        this.data.get().subscribe((allData) => {
          this.data.dataArray = allData;
          this.reset();
        });
      });
    } else if (this.data.clear == false) {
      this.data.update(this.data.formData._id, data).subscribe((info) => {
        console.log('data added successfully:', info);
        this.data.get().subscribe((allData) => {
          this.data.dataArray = allData;
          this.reset();
        });
      });
    }
  }

  reset() {
    this.i = null;
    this.userForm.reset();
    this.data.clear = true;
  }
}
