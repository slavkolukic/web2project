import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-register-rac-company',
  templateUrl: './register-rac-company.component.html',
  styleUrls: ['./register-rac-company.component.css'],
})
export class RegisterRacCompanyComponent implements OnInit {
  registerRacAdminForm: FormGroup;
  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.registerRacAdminForm = this.fb.group({
      CompanyName: ['', Validators.required],
      OwnerEmail: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  registerRacAdmin() {
    if (
      this.registerRacAdminForm.get('CompanyName').value == '' ||
      this.registerRacAdminForm.get('OwnerEmail').value == ''
    ) {
      alert('Fields must not be empty!');
    } else {
      this.adminService
        .registerNewRacAdmin(this.registerRacAdminForm.value)
        .subscribe((data) => {
          alert(data.message);
        });
    }
  }
}
