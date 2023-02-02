import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable, of, map } from "rxjs";
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

  // Main-List
  employees$: Observable<Employee[]> = of([]);

  // Revised-List 
  employees$2: Observable<Employee[]> = of([]);

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    // this.employees$2 = this.employees$
    this.fetchData();
    this.employees$2 = this.employees$;
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
      "firstName": this.employeeFirstname.nativeElement.value,
      "lastName": this.employeeLastname.nativeElement.value,
      "street": this.employeeStreet.nativeElement.value,
      "postcode": this.employeePostcode.nativeElement.value,
      "city": this.employeeCity.nativeElement.value,
      "phone": this.employeePhone.nativeElement.value,
    }

    const head = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    }

    if (this.employeePopup.edit) {
      this.http.put<Employee>('/backend/' + this.editEmployeeID, body, head).subscribe(data => {
        this.fetchData();
      });
    } else {
      this.http.post<Employee>('/backend', body, head).subscribe(data => {
        this.fetchData();
      });
    }
  }

  deleteEmployee(): void {
    this.createEmployeeFirstname = "";
    this.createEmployeeLastname = "";
    this.createEmployeeStreet = "";
    this.createEmployeePostcode = "";
    this.createEmployeeCity = "";
    this.createEmployeePhone = "";

    this.employeePopup.open = false;

    this.http.delete<Employee>('/backend/' + this.editEmployeeID, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    }).subscribe(data => {
      this.fetchData();
    });
  }

  onInputChange(event: any) {
    var input = event.target.value;

    var regex = new RegExp("^" + input);

    this.employees$2 = this.employees$

    this.employees$2.subscribe(employees => {
      const filtered = employees.filter(obj => obj.firstName && regex.test(obj.firstName)
        || obj.lastName && regex.test(obj.lastName)
        || obj.city && regex.test(obj.city)
        || obj.id && regex.test(obj.id.toString())
        || obj.phone && regex.test(obj.phone)
        || obj.postcode && regex.test(obj.postcode)
        || obj.firstName && obj.lastName && regex.test(obj.firstName + " " + obj.lastName)
        || obj.street && regex.test(obj.street));

      this.employees$2 = of(filtered);
    })
  }

  sortEmployeesLastnameAZ(): void {
    this.sortEmployees('lastName', false);
  }

  sortEmployeesLastnameZA(): void {
    this.sortEmployees('lastName', true);
  }

  sortEmployeesFirstnameAZ(): void {
    this.sortEmployees('firstName', false);
  }

  sortEmployeesFirstnameZA(): void {
    this.sortEmployees('firstName', true);
  }

  sortEmployeesPostcodeUp(): void {
    this.sortEmployees('postcode', false);
  }

  sortEmployeesPostcodeDown(): void {
    this.sortEmployees('postcode', true);
  }

  sortEmployeesLocationAZ(): void {
    this.sortEmployees('city', false);
  }

  sortEmployeesLocationZA(): void {
    this.sortEmployees('city', true);
  }



  private sortEmployees(field: keyof Employee, desc: boolean): void {

    this.employees$2.pipe(
      map(employees => employees.sort((a, b) => {

        const valueA = a ? a[field] : undefined;
        const valueB = b ? b[field] : undefined;

        if (valueA && valueB && valueA < valueB) { return desc ? 1 : -1; }
        if (valueA && valueB && valueA > valueB) { return desc ? -1 : 1; }

        return 0;
      }))
    ).subscribe(sortedEmployees => this.employees$2 = of(sortedEmployees));
  }



  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}
