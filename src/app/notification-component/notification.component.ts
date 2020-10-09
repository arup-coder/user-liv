import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor(public snackBar: MatSnackBar) {}

  ngOnInit() {}

  // this function will open up snackbar on top right position
  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: action === 'Close' ? 2000 : null,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: [className],
    });
  }
}
