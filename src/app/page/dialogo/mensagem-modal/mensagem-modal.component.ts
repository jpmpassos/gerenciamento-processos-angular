
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mensagem-modal',
  templateUrl: './mensagem-modal.component.html',
  styleUrls: ['./mensagem-modal.component.scss']
})
export class MensagemModalComponent implements OnInit {

  titulo: string;
  mensagem: string;

  constructor(
    private dialogRef: MatDialogRef<MensagemModalComponent>,
    @Inject(MAT_DIALOG_DATA) m: any,
  ) {
    this.titulo = m.titulo;
    this.mensagem = m.mensagem;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}

