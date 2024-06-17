import { Component, Input } from '@angular/core';
import { Email } from '../../../external-api/email';
import { Sorteo } from '../../../external-api/sorteo';
import { CensoService } from '../../services/censo.service';

@Component({
  selector: 'app-participante-card',
  standalone: true,
  imports: [],
  templateUrl: './participante-card.component.html',
  styleUrl: './participante-card.component.scss'
})
export class ParticipanteCardComponent {
  @Input() participante!: Sorteo;

  constructor(
    private censoService: CensoService
  ) { }

  sendEmail() {
    console.log('Sending email to ' + this.participante.email);
    let email: Email = {
      para: this.participante.email!,
      asunto: 'Resultado sorteo mascletà 19 de junio',
      cuerpo: '<!DOCTYPE html><html lang="es"><head>    <meta charset="UTF-8">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>Ganador del Sorteo - Entrada Mascletà</title>    <style>        body {            font-family: Arial, sans-serif;            background-color: #f4f4f4;            margin: 0;            padding: 0;            display: flex;            justify-content: center;            align-items: center;            height: 100vh;        }        .container {            background-color: #fff;            padding: 20px;            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);            text-align: center;            border-radius: 8px;            max-width: 600px;            margin: 0 auto;        }        .container h1 {            color: #333;        }        .container p {            color: #666;        }        .button-link {            display: inline-block;            margin: 10px;            padding: 10px 20px;            text-decoration: none;            color: #fff;            border-radius: 5px;            background-color: #007bff;            font-size: 16px;        }        /* Fallback for Outlook */        .button-link table {            width: 100%;            height: 100%;        }        .button-link a {            color: #fff;            text-decoration: none;        }    </style></head><body>    <div class="container">        <h1>¡Felicidades!</h1>        <p>Has sido el ganador de una entrada para la mascletà del día 19 de Junio.</p>        <p>Por favor, confirma si aceptas o rechazas la invitación antes del día 18 de Junio a las 12:00 de la mañana.</p>        <p>Si no confirmas o rechazas antes de esa fecha, tu entrada será resorteada.</p>        <div class="button-link">            <a href="promociones.hogueras.es/participantes/' + this.participante.participacion + '" target="_blank">Aceptar o Rechazar</a>        </div>    </div></body></html>'
    }
    this.censoService.sendEmailPost([email]).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
    
  }
}
