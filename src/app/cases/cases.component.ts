import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Cases} from '../model/cases';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})

export class CasesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'age', 'status'];
  data: Cases[] = [];
  isLoadingResults = true;
  search = '';
  gender = '';
  status = '';
  statusList = ['All', 'Positive', 'Dead', 'Recovered'];
  genderList = ['All', 'Male', 'Female'];

  constructor(private api: ApiService) {
    this.api = api;
  }

  loadMatTable(): void {
    this.api.getCases(this.search, this.status, this.gender)
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  ngOnInit(): void {
    this.loadMatTable();
  }

  callOnEnter($event: any): void {
    if ($event.keyCode === 13) {
      this.loadMatTable();
    }
  }

  statusChanged(): void {
    this.loadMatTable();
  }

  genderChanged(): void {
    this.loadMatTable();
  }

}
