import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppService } from './app.service';

import { Data } from './app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	data: Observable<Data[]>;

  add_success: boolean;
  del_success: boolean;
	up_success: boolean;

  constructor(private app: AppService) {

  	this.data = this.app.getData();

  }

  onSubmit(e) {

  	e.preventDefault();

  	const data = {
  		'number': e.target.account_number.value,
  		'name': e.target.branch_name.value,
  		'balance': e.target.balance.value
  	};

  	this.app.setData(data).subscribe(res => {
  		this.add_success = true;
      this.data = this.app.getData();
      document.getElementById('reset').click();
      document.getElementById('close').click();
      setTimeout(function () {
        this.add_success = false;
      }, 2000);
  	});

  }

  onDelete(id) {

    this.app.deleteData(id).subscribe(res => {
      this.del_success = true;
      this.data = this.app.getData();
      setTimeout(function () {
        this.del_success = false;
      }, 2000);
    });

  }

  onEdit(id) {

    this.app.editData(id).subscribe(res => {

        (<HTMLInputElement>document.getElementById('acc')).value = id;
        (<HTMLInputElement>document.getElementById('bn')).value = res[0].branch_name;
        (<HTMLInputElement>document.getElementById('ba')).value = res[0].balance;
    });

  }

  onUpdate(e) {
      
    e.preventDefault();

    const data = {
      account_number: e.target.acc.value,
      balance: e.target.ba.value
    }; 

    this.app.updateData(data).subscribe(res => {
      this.up_success = true;
      this.data = this.app.getData();
      setTimeout(function () {
        this.up_success = false;
      }, 2000);
    });

  }

}
