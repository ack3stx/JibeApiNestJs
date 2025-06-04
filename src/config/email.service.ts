import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import * as path from 'path';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly GMAIL_USER: string;
  private readonly GMAIL_CLIENT_ID: string;
  private readonly GMAIL_CLIENT_SECRET: string;
  private readonly GMAIL_REFRESH_TOKEN: string;

  constructor() {
    // Cargar variables de entorno desde la ruta absoluta correcta
    const result = dotenv.config({ 
      path: path.resolve(process.cwd(), '.env') 
    });
    
    // Verificar si se cargó correctamente el archivo .env
    if (result.error) {
      this.logger.error(`Error al cargar .env: ${result.error.message}`);
    } else {
      this.logger.log('Archivo .env cargado correctamente');
    }

    // Asignar variables y verificar que existan
    this.GMAIL_USER = process.env.GMAIL_USER || '';
    this.GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID || '';
    this.GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET || '';
    this.GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN || '';

    // Diagnóstico de variables
    this.logger.log('=== DIAGNÓSTICO DE VARIABLES DE ENTORNO ===');
    this.logger.log(`GMAIL_USER: ${this.GMAIL_USER ? 'CARGADO' : 'FALTA'}`);
    this.logger.log(`GMAIL_CLIENT_ID: ${this.GMAIL_CLIENT_ID ? 'CARGADO' : 'FALTA'}`);
    this.logger.log(`GMAIL_CLIENT_SECRET: ${this.GMAIL_CLIENT_SECRET ? 'CARGADO' : 'FALTA'}`);
    this.logger.log(`GMAIL_REFRESH_TOKEN: ${this.GMAIL_REFRESH_TOKEN ? 'CARGADO' : 'FALTA'}`);
    
    // Verificar si hay alguna variable faltante
    if (!this.GMAIL_USER || !this.GMAIL_CLIENT_ID || !this.GMAIL_CLIENT_SECRET || !this.GMAIL_REFRESH_TOKEN) {
      this.logger.error('ALERTA: Faltan variables de entorno para el servicio de correo');
    }
  }

  async sendMail(options: { to: string, subject: string, html: string }) {
    try {
      this.logger.log(`Preparando envío de correo a: ${options.to} usando API de Gmail (NO SMTP)`);
      
      // Verificar que tenemos todas las credenciales necesarias
      if (!this.GMAIL_USER || !this.GMAIL_CLIENT_ID || !this.GMAIL_CLIENT_SECRET || !this.GMAIL_REFRESH_TOKEN) {
        throw new Error('Faltan credenciales para el servicio de correo. Verifica tu archivo .env');
      }
      
      // Configurar el cliente OAuth2
      const oauth2Client = new google.auth.OAuth2(
        this.GMAIL_CLIENT_ID,
        this.GMAIL_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
      );

      oauth2Client.setCredentials({
        refresh_token: this.GMAIL_REFRESH_TOKEN
      });

      // Crear mensaje en formato RFC 822
      const message = [
        `From: "Jibe Mantenimiento" <${this.GMAIL_USER}>`,
        `To: ${options.to}`,
        `Subject: ${options.subject}`,
        'Content-Type: text/html; charset=utf-8',
        '',
        options.html
      ].join('\r\n');

      // Codificar mensaje en base64 URL-safe
      const encodedMessage = Buffer.from(message)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      // Enviar correo usando la API de Gmail (HTTP, no SMTP)
      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
      
      const response = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage
        }
      });
      
      this.logger.log(`Email enviado exitosamente a ${options.to} con ID: ${response.data.id}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Error al enviar correo vía API de Gmail: ${error.message}`);
      
      // Información detallada del error para diagnóstico
      if (error.response && error.response.data) {
        this.logger.error(`Detalles del error: ${JSON.stringify(error.response.data)}`);
      }
      
      return {
        error: true,
        message: error.message,
        recipient: options.to
      };
    }
  }
}