import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmacaoPageComponent } from '../page/dialogo/confirmacao-page/confirmacao-page.component';
import { ErroModalComponent } from '../page/dialogo/erro-modal/erro-modal.component';
import { MensagemModalComponent } from '../page/dialogo/mensagem-modal/mensagem-modal.component';

export class MensagensSistema {
    constructor(
        public dialog: MatDialog
    ) { }

    showMensagemConfirmacao(mensagem: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {

            const dialogRef = this.dialog.open(ConfirmacaoPageComponent, {
                width: '350px',
                data: mensagem
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    showMensagemErro(e: any) {
        const dialogRef = this.dialog.open(ErroModalComponent, { data: e });
    }

    showMensagem(titulo: string, mensagem: string) {
        const dialogRef = this.dialog.open(MensagemModalComponent, { data: { titulo, mensagem } });
    }

  
}