import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
// import { saveAs } from 'file-saver';

@Injectable()
export class ApiService {

    private serviceAddress = '';

    constructor(private http: HttpClient) {}

    setAddress(address: string): void {
        this.serviceAddress = address;
    }

    compute(operation: string, handler: any): void {
        fetch(this.makeURL(operation))
        .then(res => {
            return res.json();
        })
        .then((response)=> {
            
            handler(response);
          },
          (err)=> {
            handler(err);
            console.log(err);
          }
        );
    }

    downloadFile() {
        const url = `${this.serviceAddress}/resources/item`; // Replace with your file URL
        const options = { responseType: 'blob' as 'json' };
        const filename = "recieved"
        console.log(url);
        this.http.get(url, options).subscribe(
          (response: any) => {
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (filename)
                downloadLink.setAttribute('download', filename);
            document.body.appendChild(downloadLink);
            downloadLink.click();
          },
          (error) => {
            console.error('Error downloading the file:', error);
          }
        );
      }

    private makeURL(problem: string): URL {
        const resource = `${problem}`
        return new URL(resource, this.serviceAddress);
    }
}