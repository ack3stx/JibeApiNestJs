import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Cargar variables de entorno directamente
dotenv.config();

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly GMAIL_USER = process.env.GMAIL_USER;
  private readonly GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

  private createTransporter() {
    // Verificar que las credenciales existen
    if (!this.GMAIL_USER || !this.GMAIL_APP_PASSWORD) {
      this.logger.error('Credenciales de correo faltantes o inválidas');
      this.logger.error(`GMAIL_USER: ${this.GMAIL_USER ? 'Presente' : 'Faltante'}`);
      this.logger.error(`GMAIL_APP_PASSWORD: ${this.GMAIL_APP_PASSWORD ? 'Presente' : 'Faltante'}`);
      throw new Error('Credenciales de correo no configuradas correctamente');
    }

    this.logger.log(`Configurando transporter de correo para: ${this.GMAIL_USER}`);
    
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.GMAIL_USER,
        pass: this.GMAIL_APP_PASSWORD
      }
    });
  }

  async sendMail(options: { to: string, subject: string, html: string }) {
    try {
      // Verifica credenciales antes de intentar enviar
      if (!this.GMAIL_APP_PASSWORD) {
        this.logger.error('Error: GMAIL_APP_PASSWORD no está configurado en .env');
        this.logger.log('=== MODO SIMULACIÓN (falta contraseña de aplicación) ===');
        this.logger.log(`Se intentaría enviar email a: ${options.to}`);
        this.logger.log(`Asunto: ${options.subject}`);
        return {
          simulated: true,
          to: options.to,
          subject: options.subject
        };
      }
      
      const transporter = this.createTransporter();
      
      this.logger.log(`Enviando correo a: ${options.to}`);
      this.logger.log(`Asunto: ${options.subject}`);
      
      const result = await transporter.sendMail({
        from: `"Jibe Mantenimiento" <${this.GMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html
      });
      
      this.logger.log(`Email enviado exitosamente a ${options.to}. ID: ${result.messageId}`);
      return result;
    } catch (error) {
      this.logger.error(`Error al enviar correo: ${error.message}`);
      this.logger.error(error.stack);
      return false;
    }
  }
}