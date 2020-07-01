import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TaskService } from '../task/task.service';
import { SieveModel } from 'src/app/models/sieve.model';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  chartData: ChartDataSets[] = [{ data: [], label: 'Activity history' }];
  chartLabels: Label[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'History activity'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    },
    scales: {
      yAxes: [{
        display: true,
        ticks: {
            beginAtZero: true,
            stepSize: 1,
        }
    }]
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#3880ff'
    }
  ];
  chartType = 'line';
  showLegend = false;

  constructor(
    private tasksService: TaskService
  ) { }

  ngOnInit() {

    this.tasksService.getAll().subscribe(tasks => {
      this.chartData[0].data = [];
      let weekDay = [0, 0, 0, 0, 0, 0, 0];

      tasks.items.map((task) => {
        let date = new Date(task.endDate);

        weekDay[date.getDay()]++;
        this.chartData[0].data[date.getDay()] = weekDay[date.getDay()];
      });
    });
  }

}
