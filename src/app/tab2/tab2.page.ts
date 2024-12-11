import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../api/schedule.service';
import { StudentSubjectDetail } from '../models/subject-response';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  subjects: StudentSubjectDetail[] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.scheduleService.getsubjects("A22418", "ZS", "2024").subscribe(data => {
      this.subjects = data.student_na_predmetu;
      console.log(this.subjects);
    });
  }
}