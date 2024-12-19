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
  filteredSchedule: RozvrhovaAkce[] = [];
  groupedSchedule: { [key: string]: RozvrhovaAkce[] } = {};
  filteredScheduleByDay: { [key: string]: RozvrhovaAkce[] } = {};
  selectedDay: string = 'all';

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.scheduleService.getSchedule("ZS", "2024").subscribe(data => {
      this.schedule = data.rozvrhovaAkce;
      this.filteredSchedule = [...this.schedule];
      this.groupScheduleByDay();
      this.applyDayFilter();
    });
  }

  filterSchedule(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (!searchTerm) {
      this.filteredSchedule = [...this.schedule];
    } else {
      this.filteredSchedule = this.schedule.filter(item =>
        item.nazev.toLowerCase().includes(searchTerm) ||
        item.predmet.toLowerCase().includes(searchTerm) ||
        item.den.toLowerCase().includes(searchTerm)
      );
    }
    this.groupScheduleByDay();
    this.applyDayFilter();
  }

  filterByDay(event: any) {
    this.selectedDay = event.detail.value;
    this.applyDayFilter();
  }

  applyDayFilter() {
    if (this.selectedDay === 'all') {
      this.filteredScheduleByDay = { ...this.groupedSchedule };
    } else {
      this.filteredScheduleByDay = {
        [this.selectedDay]: this.groupedSchedule[this.selectedDay] || []
      };
    }
  }

  groupScheduleByDay() {
    this.groupedSchedule = this.filteredSchedule.reduce((acc: { [key: string]: RozvrhovaAkce[] }, item) => {
      if (!acc[item.den]) {
        acc[item.den] = [];
      }
      acc[item.den].push(item);
      return acc;
    }, {}); 
  }

  getDays(): string[] {
    return Object.keys(this.groupedSchedule);
  }
}