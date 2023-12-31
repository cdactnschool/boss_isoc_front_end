 import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServicesService } from 'src/app/services/common-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-localadmin',
  templateUrl: './localadmin.component.html',
  styleUrls: ['./localadmin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LocaladminComponent {
  passwordVisible: boolean = false;
  cpasswordVisible: boolean = false;
  secondFormGroup: FormGroup;
  unitName: any;
  unitType: any;

  constructor(
    private fb: FormBuilder,
    private common: CommonServicesService,
    private spinner: NgxSpinnerService
  ) {
    this.secondFormGroup = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^.{0,10}$/)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/),
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,16}$/)],
      ],
      cpassword: ['', Validators.required],
      unitid: ['', Validators.required],
      usertype: ['', Validators.required],
    }, 
    {
      validator: this.matchPasswordValidator('password', 'cpassword')
    }
    );
  }

  ngOnInit(): void {
    this.unitNameLocalAdminfun();
    this.unitTypeLocalAdminfun();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  togglecPasswordVisibility() {
    this.cpasswordVisible = !this.cpasswordVisible;
  }

  unitNameLocalAdminfun() {
    this.spinner.show();
    this.common.unitNameLocalAdmin().subscribe((res: any) => {
      if (res.api_status === true) {
        this.spinner.hide();
        this.unitName = res.data;
      } else {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        });
      }
    }, error => {
      this.spinner.hide();
      console.log("Error: ", error);
    });
  }

  unitTypeLocalAdminfun() {
    this.spinner.show();
    this.common.unitTypeLocalAdmin().subscribe((res: any) => {
      if (res.api_status === true) {
        this.spinner.hide();
        this.unitType = res.data;
      } else {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: `${res.message}`,
        });
      }
    }, error => {
      this.spinner.hide();
      console.log("Error: ", error);
    });
  }

  matchPasswordValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control.get(passwordKey);
      const confirmPassword = control.get(confirmPasswordKey);
  
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        control.get('cpassword')?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
  
      control.get('cpassword')?.setErrors(null);
      return null; // Return null if there's no error
    };
  }
  

  submit(action: string) {
    if (action === 'create') {
      this.spinner.show();
      this.common.createLocalAdmin(this.secondFormGroup.value).subscribe(
        (res) => {
          if (res.api_status) {
            this.spinner.hide();
            Swal.fire({
              icon: 'success',
              title: `${res.message}`,
            }).then(() => {
              // this.secondFormGroup.reset();
            });
          } else {
            this.spinner.hide();
            Swal.fire({
              icon: 'error',
              title: `${res.message}`,
            });
          }
        },
        (err) => {
          this.spinner.hide();
          console.log('Error: ', err);
        }
      );

      this.resetForm();


    }
  }

  resetForm() {
    this.secondFormGroup.reset();

        // Clear validation errors for each form control
        Object.keys(this.secondFormGroup.controls).forEach(controlName => {
          const control = this.secondFormGroup.get(controlName);
          if (control) {
            control.setErrors(null);
          }
        });
  }
}

