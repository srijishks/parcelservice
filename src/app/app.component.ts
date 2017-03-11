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
		    	console.log(frmvalue);
		    	if(frmvalue.length!="" && frmvalue.breadth!="" &&frmvalue.hight!="" &&frmvalue.weight!=""){
		    		console.log('enter');
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
		    // console.log(event);
		    // console.log(this.parselCheckingForm.value);

		   /* if(parseFloat(this.parselCheckingForm.value.weight) >= parseFloat(this.globals.measuremnt.maxweight)){
				console.log( 'max weight limit exceeds');
		    	return false;

		    }*/
		    // Send to a service here

			   /*
    			this._parcelservice.checkmeasurement(this.parselCheckingForm.value)
                     .subscribe(
                       parcel => this.parcel = parcel,
                       error =>  this.errorMessage = <any>error);
  				
                     
  				this._parcelservice.checkmeasurement(this.parselCheckingForm.value)
				      .then(parcel => this.parcel = parcel);
*/
				      this._parcelservice.checkmeasurement(this.parselCheckingForm.value)
				      .subscribe(
                               parcel => this.parcelmanagement(parcel, this.parselCheckingForm.value) , //Bind to view
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });

		    // this.parselCheckingForm.value.breadth < this.globals.measuremnt.small.l
		  }

		   parcelmanagement(defultValue, formValue){
		   	console.log(defultValue.maxweight);
		   	console.log(formValue.weight);
		   	this.showmsg = "";


console.log( 'defultValue l '+defultValue.large.l);
console.log( 'defultValue b '+defultValue.large.b);
console.log( 'defultValue h '+defultValue.large.h);
console.log( 'formValue l '+formValue.length);
console.log( 'formValue b '+formValue.breadth);
console.log( 'formValue h '+formValue.hight);


		   	if(parseFloat(defultValue.maxweight) < parseFloat(formValue.weight)){
				console.log( 'max weight limit exceeds');
				this.showmsg = 'max weight limit exceeds';
		    	return;

		    }else 

		    if(parseFloat(defultValue.small.l) >= parseFloat(formValue.length) &&
		    	parseFloat(defultValue.small.b) >= parseFloat(formValue.breadth) &&
		    	parseFloat(defultValue.small.h) >= parseFloat(formValue.hight) 
		    	){
				console.log( 'small package');
				this.showmsg = 'small package: '+defultValue.small.price+'Applies';
		    	return;

		    }else

		    if(parseFloat(defultValue.medium.l) >= parseFloat(formValue.length) &&
		    	parseFloat(defultValue.medium.b) >= parseFloat(formValue.breadth) &&
		    	parseFloat(defultValue.medium.h) >= parseFloat(formValue.hight) 
		    	){
				console.log( 'medium package');
				this.showmsg = 'medium package: '+defultValue.medium.price+'Applies';
		    	return;

		    }else

		      if(parseFloat(defultValue.large.l) >= parseFloat(formValue.length) &&
		    	parseFloat(defultValue.large.b) >= parseFloat(formValue.breadth) &&
		    	parseFloat(defultValue.large.h) >= parseFloat(formValue.hight) 
		    	){
				console.log( 'large package');
				this.showmsg = 'large package: '+defultValue.large.price+'Applies';
		    	return;

		    } else 
		    {
		    	console.log( ' limit exceeds');
				this.showmsg = ' limit exceeds';
		    	return;
		    }

		   }
}
