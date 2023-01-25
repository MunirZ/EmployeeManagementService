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
  isIDClicked: boolean = false;
  isPrenameClicked: boolean = false;
  isLastnameClicked: boolean = false;
  isTelefonClicked: boolean = false;
  isAddressClicked: boolean = false;

  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE2NzI3NjgxMDgsImlhdCI6MTY3Mjc2NDUwOCwianRpIjoiNGIyYmIwYjMtOTFiZS00MGRjLTkyMjQtNmMxY2ZlYzJiZTc2IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIxN2I4MmNlYi1mZDQ3LTQzYjAtODBlYy0xNTRlYzk5N2VhNDMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.RwEfHQDiwzTXlvSma4HnRLMWpYORppIdugZFpJ1RpGIvT-xvY2vc6HlMjsIs36euYCMTZOd51x1Y8EJATEfzXiYNtef980DGlIbnX_vhLirA08FVJnkDSHt1YHfEjhYOMOY9DrsuIFkim80NaPPb1aNVFQ1PNNw_CZ7TLsnrPoO0oXCqKMH2tLUo-SgTablRsK30qJ4HzP58AHkmr0fyqSbwbu1il73ngxJ4JCfKgtYm8-F8O2KbHECOom9Q5O5ZSYPDKCNiVylbzrtdHGFpmOvgq5ZURIQk9qDexKcaEEoOr8YiIjDbqh1zNF-OpIeN8PnU2WFyU3XuaTQihjZDbg';
  //employees$: Observable<Employee[]> = {};

  employees$: Employee[] = [
    new Employee(0, "atierbeiner", "Ben", "Grenzweg 1", "27798", "Hude", "01627684681"),
    new Employee(1, "Stierbeiner", "Ben", "Arenzweg 1", "27798", "HRde", "01627684682"),
    new Employee(2, "ctierbeiner", "Ban", "GWenzweg 1", "27798", "Hude", "01627684683"),
    new Employee(3, "Stierbeiner", "Munir", "Rrenzweg 1", "27799", "Hude", "01627684680")
  ];

  employees$2: Employee[] = [
    new Employee(0, "atierbeiner", "Ben", "Grenzweg 1", "27798", "Hude", "01627684681"),
    new Employee(1, "Stierbeiner", "Ben", "Arenzweg 1", "27798", "HRde", "01627684682"),
    new Employee(2, "ctierbeiner", "Ban", "GWenzweg 1", "27798", "Hude", "01627684683"),
    new Employee(3, "Stierbeiner", "Munir", "Rrenzweg 1", "27799", "Hude", "01627684680")
  ];

  constructor(private http: HttpClient) {
    //this.employees$ = of([]);
    //this.fetchData();
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

  editEmployeePopup(e: any) {
    if (!this.employeePopup.edit) {
      this.createEmployeeFirstname = this.employeeFirstname.nativeElement.value;
      this.createEmployeeLastname = this.employeeLastname.nativeElement.value;
      this.createEmployeeStreet = this.employeeStreet.nativeElement.value;
      this.createEmployeePostcode = this.employeePostcode.nativeElement.value;
      this.createEmployeeCity = this.employeeCity.nativeElement.value;
      this.createEmployeePhone = this.employeePhone.nativeElement.value;
    }

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

    this.employees$.push(new Employee(1, this.employeeFirstname.nativeElement.value, this.employeeLastname.nativeElement.value, this.employeeStreet.nativeElement.value, this.employeePostcode.nativeElement.value, this.employeeCity.nativeElement.value, this.employeePhone.nativeElement.value));
  }

  onInputChange(event: any) {
    var input = event.target.value;
    if (input == "#") {
      console.log("test");
    }
    else {
      var regex = new RegExp("^" + input);
      var filtered = this.employees$2.filter(obj => obj.firstName && regex.test(obj.firstName)
        || obj.lastName && regex.test(obj.lastName)
        || obj.city && regex.test(obj.city)
        || obj.id && regex.test(obj.id.toString())
        || obj.phone && regex.test(obj.phone)
        || obj.postcode && regex.test(obj.postcode)
        || obj.street && regex.test(obj.street));
      this.employees$ = filtered;
      console.log(filtered);
    }

  }

  /*
  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
  */
}
