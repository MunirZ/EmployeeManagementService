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

  errors:string[] = [];

  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE2NzUyNDA4NDEsImlhdCI6MTY3NTIzNzI0MSwianRpIjoiMzcxMDllZTEtYmZkMS00NWViLWE4NWItODRlNzM4MTM2NmM2IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJhNzJlMTNjNS1jYjZjLTRkZGQtYmI4Yy1iNGRjZjAzMDM3YTMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.V7I_CIbeiXQ0NTC9JZApFOlBx7ZYjBmwGc7FkOUpepIkw_ZOnzXP5WBoWP4oI80q_nOQWPOLXrpi56LzHyodf6eLoUr7-tWL0iROZlOC5R28mkJ2boGSxTykomR9PRsrswxGxmv0a41S9wiOORj9-Auf3S9gaAlvJ7Bt8Y9phkBeK2PwNGeAGAZZT9urFNQDWguleLZTsdyAKTW9tvuFqNl1K-4A4Tkt9XKaBBgGTGvJr0s7pMQHrYK2oN9jFvV1zBVW03ovA_ns7dsG68EmyVHZIL_i871piFH53bdu55j5scAaxp3JGjWTjajcHeBquwFXMGI1gPBVox66umD1Mg';

  // Main-List
  employees$: Observable<Employee[]> = of([]);
  employeesLoaded: Boolean = false;

  // Sorted-List
  sortedEmployees: Observable<Employee[]> = of([]);

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.get_employees();
    this.sortedEmployees = this.employees$;
  }

  @ViewChild("employeePopup") employeePopup!: PopupComponent;
  @ViewChild("deleteEmployeeConfirmPopup") deleteEmployeeConfirmPopup!: PopupComponent;

  @ViewChild("errorPopup") errorPopup!: PopupComponent;
  @ViewChild("successPopup") successPopup!: PopupComponent;

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
  editEmployeeID: Number = 0;

  openSuccessPopup() {
    let popup = this.successPopup;
    popup.open = true;
    setTimeout(function() {
      popup.open = false;
    }, 1000)
  }

  restoreCreationCache() {
    this.employeeFirstname.nativeElement.value = this.createEmployeeFirstname;
    this.employeeLastname.nativeElement.value = this.createEmployeeLastname;
    this.employeeStreet.nativeElement.value = this.createEmployeeStreet;
    this.employeePostcode.nativeElement.value = this.createEmployeePostcode;
    this.employeeCity.nativeElement.value = this.createEmployeeCity;
    this.employeePhone.nativeElement.value = this.createEmployeePhone;
  }

  editEmployeePopup(id: Number | undefined) {
    this.errors = [];
    
    if (!id) { return; }
    
    // save entered stuff if we were in creation mode before for later use
    if (!this.employeePopup.edit) {
      this.createEmployeeFirstname = this.employeeFirstname.nativeElement.value;
      this.createEmployeeLastname = this.employeeLastname.nativeElement.value;
      this.createEmployeeStreet = this.employeeStreet.nativeElement.value;
      this.createEmployeePostcode = this.employeePostcode.nativeElement.value;
      this.createEmployeeCity = this.employeeCity.nativeElement.value;
      this.createEmployeePhone = this.employeePhone.nativeElement.value;
    }

    this.editEmployeeID = id;
    this.employeePopup.loading = true;
    this.employeePopup.open = true;
    this.get_employee_by_id(id).subscribe((employee: Employee) => {
      this.employeePopup.loading = false;
      this.employeePopup.edit = true;
      
      this.employeeFirstname.nativeElement.value = employee.firstName;
      this.employeeLastname.nativeElement.value = employee.lastName;
      this.employeeStreet.nativeElement.value = employee.street;
      this.employeePostcode.nativeElement.value = employee.postcode;
      this.employeeCity.nativeElement.value = employee.city;
      this.employeePhone.nativeElement.value = employee.phone;
    });
  }

  createEmployeePopup() {
    // restore saved stuff into to popup's fields
    if (this.employeePopup.edit) {
      this.restoreCreationCache()
      this.employeePopup.edit = false;
    }

    this.employeePopup.open = true;
  }

  checkForRightInput(body: any) {

    const firstname = body.firstName.trim();
    const firstNameRegex = new RegExp('[a-zA-Z]+');

    if(!firstNameRegex.test(firstname)){
      this.errors.push("Der Vorname darf nicht leer sein und darf nur Buchstaben enthalten.");
    }
    const lastname = body.firstName.trim();
    const lastNameRegex = new RegExp('[a-zA-Z]+');

    if(!firstNameRegex.test(firstname)){
      this.errors.push("Der Nachname darf nicht leer sein und darf nur Buchstaben enthalten.");
    }

    const street = body.street.trim();
    const streetRegex = new RegExp('[a-zA-Z0-9\s\-]+')
    if(!streetRegex.test(street)){
      this.errors.push("Das Eingabefeld Straße darf nicht leer sein und darf nur Buchstaben oder Zahlen enthalten.");
    } 

    const city = body.city.trim();
    const cityRegex = new RegExp('[a-zA-Z]+')
    if(!cityRegex.test(city)){
      this.errors.push("Das Feld Stadt darf nicht leer sein und darf nur Buchstaben enthalten.");
    } 

    const postcode = body.postcode.trim();
    const postcodeRegex = /^\d{5}$/;
    if(!postcodeRegex.test(postcode)){
      this.errors.push("Die Postleitzahl darf nicht leer sein und muss eine 5 stellige Nummer sein.");
    }

    const phone = body.phone.trim();
    const phoneRegex = /^(\+)?\d+$/;
    if(!phoneRegex.test(phone)){
      this.errors.push("Die Telefonnummer darf nicht leer sein und darf nur aus Ziffern bestehen oder ein vorangeganges + enthalten");
    }
    return this.errors;
  }

  createEmployee(): void {
    const body = {
      "firstName": this.employeeFirstname.nativeElement.value,
      "lastName": this.employeeLastname.nativeElement.value,
      "street": this.employeeStreet.nativeElement.value,
      "postcode": this.employeePostcode.nativeElement.value,
      "city": this.employeeCity.nativeElement.value,
      "phone": this.employeePhone.nativeElement.value,
    }
    this.errors = [];
    this.errors = this.checkForRightInput(body);
    if (this.errors.length > 0) {
      console.log(this.errors);
    }
    else
    {
      //valid body
      this.createEmployeeFirstname = "";
      this.createEmployeeLastname = "";
      this.createEmployeeStreet = "";
      this.createEmployeePostcode = "";
      this.createEmployeeCity = "";
      this.createEmployeePhone = "";
      this.restoreCreationCache();
      this.employeePopup.open = false;

      const head = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.bearer}`)
      }
  
      if (this.employeePopup.edit) {
        this.http.put<Employee>('/backend/' + this.editEmployeeID, body, head).subscribe(data => {
          this.get_employees();
          this.openSuccessPopup();
        }, error => {
          this.errorPopup.errorCode = error.status + " Fehlerhafte Eingabe";
          this.errorPopup.open = true;
        });
      } else {
        this.http.post<Employee>('/backend', body, head).subscribe(data => {
          this.get_employees();
          this.openSuccessPopup();
        }, error => {
          this.errorPopup.errorCode = error.status + " Fehlerhafte Eingabe";
          this.errorPopup.open = true;
        });
      }

    }
  }

  deleteEmployeePopup(): void {
    this.deleteEmployeeConfirmPopup.employeeName = this.createEmployeeFirstname + '' + this.createEmployeeLastname;
    this.deleteEmployeeConfirmPopup.open = true;
    this.employeePopup.open = false;
  }

  deleteEmployeeAbort(): void {
    this.deleteEmployeeConfirmPopup.open = false;
    this.employeePopup.open = true;
  }

  deleteEmployeeAction(): void {
    this.createEmployeeFirstname = "";
    this.createEmployeeLastname = "";
    this.createEmployeeStreet = "";
    this.createEmployeePostcode = "";
    this.createEmployeeCity = "";
    this.createEmployeePhone = "";

    this.deleteEmployeeConfirmPopup.open = false;

    this.http.delete<Employee>('/backend/' + this.editEmployeeID, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    }).subscribe(data => {
      this.get_employees();
      this.openSuccessPopup();
    }, error => {
      this.errorPopup.errorCode = error.status;
      this.errorPopup.open = true;
    });
  }

  onInputChange(event: any) {
    var regex = new RegExp("^" + event.target.value.toLowerCase());

    this.sortedEmployees = this.employees$

    this.sortedEmployees.subscribe(employees => {
      const filtered = employees.filter(obj => obj.firstName && regex.test(obj.firstName.toLowerCase())
        || obj.lastName && regex.test(obj.lastName.toLowerCase())
        || obj.city && regex.test(obj.city.toLowerCase())
        || obj.id && regex.test(obj.id.toString().toLowerCase())
        || obj.phone && regex.test(obj.phone.toLowerCase())
        || obj.postcode && regex.test(obj.postcode.toLowerCase())
        || obj.firstName && obj.lastName && regex.test((obj.firstName + " " + obj.lastName).toLowerCase())
        || obj.street && regex.test(obj.street.toLowerCase()));

      this.sortedEmployees = of(filtered);
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
    this.sortedEmployees.pipe(
      map(employees => employees.sort((a, b) => {

        const valueA = a ? (a[field] as any).toLowerCase() : undefined;
        const valueB = b ? (b[field] as any).toLowerCase() : undefined;
        // const valueA = a ? (typeof a[field] === 'string' ? a[field].toLowerCase() : undefined) : undefined;
        // const valueB = b ? (typeof b[field] === 'string' ? b[field].toLowerCase() : undefined) : undefined;


        if (valueA && valueB && valueA < valueB) { return desc ? 1 : -1; }
        if (valueA && valueB && valueA > valueB) { return desc ? -1 : 1; }

        return 0;
      }))
    ).subscribe(sortedEmployees => this.sortedEmployees = of(sortedEmployees));
  }

  get_employees() {    
    this.employeesLoaded = false;

    let req = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    })
    req.subscribe(data => { 
      this.employeesLoaded = true;
    }, error => {
      this.errorPopup.errorCode = error.status;
      this.errorPopup.open = true;
    });

    this.employees$ = req
    this.sortedEmployees = this.employees$;
  }

  get_employee_by_id(id: Number) {
    let req = this.http.get<Employee>(`/backend/${id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    })
    req.subscribe(data => {}, error => {
      this.errorPopup.errorCode = error.status;
      this.errorPopup.open = true;
    });

    return req
  }
}
