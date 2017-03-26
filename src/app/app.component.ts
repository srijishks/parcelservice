import { Component , OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Globals } from './globals';
import { ParcelService } from './parcel.service';

@Component({
  selector: 'app-root',
  providers: [ Globals, ParcelService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	getData: String;
	msg: Boolean;
	parcel:any;
	errorMessage:String;
	showmsg: String;

		public parselCheckingForm = this.fb.group({
		    length: ["", Validators.required],
		    breadth: ["", Validators.required],
		    hight: ["", Validators.required],
		    weight: ["", [<any>Validators.required,  <any>Validators.pattern(`[+-]?([0-9]*[.])?[0-9]+`) ]]
		  });

	  constructor(public fb: FormBuilder, private globals: Globals, private _parcelservice : ParcelService) {}
		  
		
		 ngOnInit() {
		    this.parselCheckingForm.valueChanges.subscribe(frmvalue => {
		    	// console.log(this.parselCheckingForm.valid);
		    	if(this.parselCheckingForm.valid){
		    		this._parcelservice.checkmeasurement(this.parselCheckingForm.value)
			      .subscribe(
	                       parcel => this.parcelmanagement(parcel, this.parselCheckingForm.value) , //Bind to view
	                        err => {
	                            // Log errors if any
	                            console.log(err);
	                        });
		  		}
		     
		    });
		  }
		  doCheck(event) {
		    	      this._parcelservice.checkmeasurement(this.parselCheckingForm.value)
				      .subscribe(
                               parcel => this.parcelmanagement(parcel, this.parselCheckingForm.value) , //Bind to view
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });
		  }

		   parcelmanagement(defultValue, formValue){
		   	
		   	console.log(formValue.weight);
		   	this.showmsg = "";
		   	if(parseFloat(defultValue.maxweight) < parseFloat(formValue.weight)){
				console.log( 'max weight limit exceeds');
				this.showmsg = 'Sorry, We are not handling this much big parcels at the moment';
		    	return;

		    }else 

		    if(parseFloat(defultValue.small.l) >= parseFloat(formValue.length) &&
		    	parseFloat(defultValue.small.b) >= parseFloat(formValue.breadth) &&
		    	parseFloat(defultValue.small.h) >= parseFloat(formValue.hight) 
		    	){ 
				this.showmsg = 'This is a small package: rate $'+defultValue.small.price+' applies';
		    	return;

		    }else

		    if(parseFloat(defultValue.medium.l) >= parseFloat(formValue.length) &&
		    	parseFloat(defultValue.medium.b) >= parseFloat(formValue.breadth) &&
		    	parseFloat(defultValue.medium.h) >= parseFloat(formValue.hight) 
		    	){
				this.showmsg = 'This is a medium package: rate $'+defultValue.medium.price+' applies';
		    	return;

		    }else

		      if(parseFloat(defultValue.large.l) >= parseFloat(formValue.length) &&
		    	parseFloat(defultValue.large.b) >= parseFloat(formValue.breadth) &&
		    	parseFloat(defultValue.large.h) >= parseFloat(formValue.hight) 
		    	){ 
				this.showmsg = 'This is a large package: rate $'+defultValue.large.price+' applies';
		    	return;

		    } else 
		    {
		    	// console.log( ' limit exceeds');
				this.showmsg = 'Sorry, We are not handling this much big parcels at the moment';
		    	return;
		    }

		   }
}
