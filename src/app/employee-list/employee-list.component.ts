import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from "rxjs";
import { Employee } from "../Employee";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PopupComponent } from 'app/popup/popup.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  isDropDownOpen: boolean = false;
  isIDClicked: boolean = true;
  isPrenameClicked: boolean = false;
  isLastnameClicked: boolean = false;
  isTelefonClicked: boolean = false;
  isAddressClicked: boolean = false;

  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE2NzUyNDA4NDEsImlhdCI6MTY3NTIzNzI0MSwianRpIjoiMzcxMDllZTEtYmZkMS00NWViLWE4NWItODRlNzM4MTM2NmM2IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJhNzJlMTNjNS1jYjZjLTRkZGQtYmI4Yy1iNGRjZjAzMDM3YTMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.V7I_CIbeiXQ0NTC9JZApFOlBx7ZYjBmwGc7FkOUpepIkw_ZOnzXP5WBoWP4oI80q_nOQWPOLXrpi56LzHyodf6eLoUr7-tWL0iROZlOC5R28mkJ2boGSxTykomR9PRsrswxGxmv0a41S9wiOORj9-Auf3S9gaAlvJ7Bt8Y9phkBeK2PwNGeAGAZZT9urFNQDWguleLZTsdyAKTW9tvuFqNl1K-4A4Tkt9XKaBBgGTGvJr0s7pMQHrYK2oN9jFvV1zBVW03ovA_ns7dsG68EmyVHZIL_i871piFH53bdu55j5scAaxp3JGjWTjajcHeBquwFXMGI1gPBVox66umD1Mg';
  employeesDB$: Observable<Employee[]> = of([]);


  // Main-List
  employees$: Employee[] = [
    new Employee(0, "atierbeiner", "Ben", "Grenzweg 1", "27798", "Hude", "01627684681"),
    new Employee(1, "Stierbeiner", "Ben", "Arenzweg 1", "27798", "HRde", "01627684682"),
    new Employee(2, "ctierbeiner", "Ban", "GWenzweg 1", "27798", "Hude", "01627684683"),
    new Employee(3, "Atierbeiner", "Munir", "Rrenzweg 1", "27799", "Hude", "01627684680"),
    new Employee(3, "Btierbeiner", "Munir", "Rrenzweg 1", "27799", "Hude", "01627684680"),
    new Employee(3, "stierbeiner", "Munir", "Rrenzweg 1", "27799", "Hude", "01627684680"),
    new Employee(3, "stierbeiner", "Munir", "Rrenzweg 1", "27799", "Hude", "01627684680")
  ];

  // Revised-List 
  employees$2: Employee[] = this.employees$;

  constructor(private http: HttpClient) {
    this.employeesDB$ = of([]);
    // this.addEmployee();
    this.fetchData();
  }

  @ViewChild("employeePopup") employeePopup!: PopupComponent;
  @ViewChild("employeeFirstname") employeeFirstname!: ElementRef;
  @ViewChild("employeeLastname") employeeLastname!: ElementRef;
  @ViewChild("employeeStreet") employeeStreet!: ElementRef;
  @ViewChild("employeePostcode") employeePostcode!: ElementRef;
  @ViewChild("employeeCity") employeeCity!: ElementRef;
  @ViewChild("employeePhone") employeePhone!: ElementRef;
  createEmployeeFirstname: string = "";
  createEmployeeLastname: string = "";
  createEmployeeStreet: string = "";
  createEmployeePostcode: string = "";
  createEmployeeCity: string = "";
  createEmployeePhone: string = "";
  editEmployeeID: string = "";

  editEmployeePopup(e: any) {
    if (!this.employeePopup.edit) {
      this.createEmployeeFirstname = this.employeeFirstname.nativeElement.value;
      this.createEmployeeLastname = this.employeeLastname.nativeElement.value;
      this.createEmployeeStreet = this.employeeStreet.nativeElement.value;
      this.createEmployeePostcode = this.employeePostcode.nativeElement.value;
      this.createEmployeeCity = this.employeeCity.nativeElement.value;
      this.createEmployeePhone = this.employeePhone.nativeElement.value;
    }
    this.editEmployeeID = e.id;

    this.employeeFirstname.nativeElement.value = e.firstName;
    this.employeeLastname.nativeElement.value = e.lastName;
    this.employeeStreet.nativeElement.value = e.street;
    this.employeePostcode.nativeElement.value = e.postcode;
    this.employeeCity.nativeElement.value = e.city;
    this.employeePhone.nativeElement.value = e.phone;
    this.employeePopup.edit = true;
    this.employeePopup.open = true;
  }

  createEmployeePopup() {
    if (this.employeePopup.edit) {
      this.employeeFirstname.nativeElement.value = this.createEmployeeFirstname;
      this.employeeLastname.nativeElement.value = this.createEmployeeLastname;
      this.employeeStreet.nativeElement.value = this.createEmployeeStreet;
      this.employeePostcode.nativeElement.value = this.createEmployeePostcode;
      this.employeeCity.nativeElement.value = this.createEmployeeCity;
      this.employeePhone.nativeElement.value = this.createEmployeePhone;
      this.employeePopup.edit = false;
    }

    this.employeePopup.open = true;
  }

  createEmployee(): void {
    this.createEmployeeFirstname = "";
    this.createEmployeeLastname = "";
    this.createEmployeeStreet = "";
    this.createEmployeePostcode = "";
    this.createEmployeeCity = "";
    this.createEmployeePhone = "";

    this.employeePopup.open = false;

    const body = {
        "lastName": this.employeeFirstname.nativeElement.value,
        "firstName": this.employeeLastname.nativeElement.value,
        "street": this.employeeStreet.nativeElement.value,
        "postcode": this.employeePostcode.nativeElement.value,
        "city": this.employeeCity.nativeElement.value,
        "phone": this.employeePhone.nativeElement.value,
        "skillSet": [
          "string"
        ]
    }

    const head = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    }

    if (this.employeePopup.edit) {
      this.http.put<Employee>('/backend/'+this.editEmployeeID, body, head).subscribe(data => {
        this.fetchData();
      });
    } else {
      this.http.post<Employee>('/backend', body, head).subscribe(data => {
        this.fetchData();
      });
    }
  }

  onInputChange(event: any) {
    var input = event.target.value;

      var regex = new RegExp("^" + input);


      // this.emmployees$2.subscribe(employees => {})

      var filtered = this.employees$2.filter(obj => obj.firstName && regex.test(obj.firstName)
        || obj.lastName && regex.test(obj.lastName)
        || obj.city && regex.test(obj.city)
        || obj.id && regex.test(obj.id.toString())
        || obj.phone && regex.test(obj.phone)
        || obj.postcode && regex.test(obj.postcode)
        || obj.firstName && obj.lastName && regex.test(obj.firstName + " " + obj.lastName)
        || obj.street && regex.test(obj.street));
      this.employees$2 = filtered;
  }

  sortEmployeesLastnameAZ(): void {
    this.employees$.sort((a, b) => {
      if (a.lastName && b.lastName && a.lastName.toLowerCase() < b.lastName.toLowerCase()) { return -1; }
      if (a.lastName && b.lastName && a.lastName.toLowerCase() > b.lastName.toLowerCase()) { return 1; }
      return 0;
    });
  }

  sortEmployeesLastnameZA(): void {
    this.employees$.sort((a, b) => {
      if (a.lastName && b.lastName && a.lastName.toLowerCase() < b.lastName.toLowerCase()) { return 1; }
      if (a.lastName && b.lastName && a.lastName.toLowerCase() > b.lastName.toLowerCase()) { return -1; }
      return 0;
    });
  }

  sortEmployeesFirstnameAZ(): void {
    this.employees$.sort((a, b) => {
      if (a.firstName && b.firstName && a.firstName.toLowerCase() < b.firstName.toLowerCase()) { return -1; }
      if (a.firstName && b.firstName && a.firstName.toLowerCase() > b.firstName.toLowerCase()) { return 1; }
      return 0;
    });
  }

  sortEmployeesFirstnameZA(): void {
    this.employees$.sort((a, b) => {
      if (a.firstName && b.firstName && a.firstName.toLowerCase() < b.firstName.toLowerCase()) { return 1; }
      if (a.firstName && b.firstName && a.firstName.toLowerCase() > b.firstName.toLowerCase()) { return -1; }
      return 0;
    });
  }

  sortEmployeesPostcodeUp(): void {
    this.employees$.sort((a, b) => {
      if (a.postcode && b.postcode && a.postcode < b.postcode) { return -1; }
      if (a.postcode && b.postcode && a.postcode > b.postcode) { return 1; }
      return 0;
    });
  }

  sortEmployeesPostcodeDown(): void {
    this.employees$.sort((a, b) => {
      if (a.postcode && b.postcode && a.postcode < b.postcode) { return 1; }
      if (a.postcode && b.postcode && a.postcode > b.postcode) { return -1; }
      return 0;
    });
  }

  sortEmployeesLocationAZ(): void {
    this.employees$.sort((a, b) => {
      if (a.city && b.city && a.city < b.city) { return 1; }
      if (a.city && b.city && a.city > b.city) { return -1; }
      return 0;
    });
  }

  sortEmployeesLocationZA(): void {
    this.employees$.sort((a, b) => {
      if (a.city && b.city && a.city < b.city) { return -1; }
      if (a.city && b.city && a.city > b.city) { return 1; }
      return 0;
    });
  }

  fetchData() {
    this.employeesDB$ = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
    console.log(this.employeesDB$);
  }
}
