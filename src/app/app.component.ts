import { Component } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'avicenna-web-gui';

  problemName: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private apiService: ApiService) {
    this.apiService.setAddress('')
  }

  compute(): void {
    
    this.apiService.compute("-l", (result: any) => {
      this.problemName.next(result.result);
    })
  }

  download(): void {
    this.apiService.downloadFile();
  }
}
