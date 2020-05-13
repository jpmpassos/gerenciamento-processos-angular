
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-erro-modal',
  templateUrl: './erro-modal.component.html',
  styleUrls: ['./erro-modal.component.scss']
})
export class ErroModalComponent implements OnInit {

  erros: any[];
  mensagemUsuario = 'Erro indeterminado';
  mensagemDesenvolvedor = 'O Sistema não conseguiu executar a tarefa solicitada!';

  constructor(
    private dialogRef: MatDialogRef<ErroModalComponent>,
    @Inject(MAT_DIALOG_DATA) e: any,
  ) {
    if (e && e.error && e.error[0].mensagemUsuario) {
      this.erros = e.error;
    } else {
      this.erros = [{ mensagemUsuario: this.mensagemUsuario, mensagemDesenvolvedor: this.mensagemDesenvolvedor }]
    }
    console.log(e);
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}

