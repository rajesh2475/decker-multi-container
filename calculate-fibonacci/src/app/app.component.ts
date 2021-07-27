import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculate fibonacci';

  @ViewChild('salary') salary: ElementRef;
  @ViewChild('savings') savings: ElementRef;
  @ViewChild('loan') loan: ElementRef;
  currentMonth = null
  status = "Saved successfully"
  showerror = false
  data = {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){}


getData(){
  this.http.get<any>('http://localhost:3000/data').subscribe(data => {
      this.data  = data.salary
      console.log(this.data)
    })
}

sendData(){
  this.http.post<any>("http://localhost:3000/data", {}, this.httpOptions).subscribe(data =>{
    console.log(this.data)
  })
}

submitDetails() {
  var salaryVal = this.loan.nativeElement.value
  var savingsVal = this.loan.nativeElement.value
  var loanVal = this.loan.nativeElement.value
  if (this.currentMonth != null && salaryVal && savingsVal && loanVal){
    this.status = "Saved successfully"
    this.showerror = true
  } else{
    this.status = "Please fill all the details to save"
    this.showerror = false
  }

  setTimeout(() => {
    this.showerror = false
    this.getData()
  }, 3000);

  setTimeout(() => {
    this.showerror = false
    this.sendData()
    this.getData()
  }, 3000);
}

}
