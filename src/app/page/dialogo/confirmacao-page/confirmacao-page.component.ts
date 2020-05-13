import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmacao-page',
  templateUrl: './confirmacao-page.component.html',
  styleUrls: ['./confirmacao-page.component.scss']
})
export class ConfirmacaoPageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoPageComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
