import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../api/schedule.service';
import { RozvrhovaAkce } from '../models/schedule-response';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  schedule: RozvrhovaAkce[] = [];


  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.scheduleService.getSchedule("A22418", "ZS", "2024").subscribe(data => {
      this.schedule = data.rozvrhovaAkce;
    });
  }
}