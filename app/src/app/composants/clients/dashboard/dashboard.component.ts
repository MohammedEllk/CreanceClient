import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet,Label,monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalClient = 0 ;
  clientPaid = 0;
  clientNotPaid = 0;
  clientPaidEcheance = 0;
  clientPaidFirstRelance = 0;
  clientPaidSecondRelance = 0;
  clientPaidMisenDemeure = 0;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['écheance', '1er relance', '2ème relance','mise en demeure'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [0,0,0], label: 'Le payement' }
  ];
    // Pie
    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartLabels: Label[] = [['payé'], ['non payé']];
    public pieChartData: SingleDataSet = [0 , 1];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];
  constructor(private clientService : ClientsService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
    this.clientService.getStatistique().subscribe(obj => {
      console.log("obj",obj);
      this.totalClient = obj.totalClient['length'];
      this.clientPaid = obj.clientPaid['length'];
      this.clientNotPaid = obj.clientNotPaid['length'];
      this.clientPaidEcheance = obj.clientPaidEcheance['length'];
      this.clientPaidFirstRelance = obj.clientPaidFirstRelance['length'];
      this.clientPaidSecondRelance = obj.clientPaidSecondRelance['length'];
      this.clientPaidMisenDemeure = obj.clientPaidMisenDemeure['length'];
      if(this.clientNotPaid > 0 || this.clientPaid > 0) {
        this.pieChartData = [this.clientPaid,this.clientNotPaid]
      }
      this.barChartData[0].data = [this.clientPaidEcheance,this.clientPaidFirstRelance,this.clientPaidSecondRelance,this.clientPaidMisenDemeure]
      
      
      console.log("this.clientPaid",this.totalClient,this.clientPaid);
    })
  }

}
