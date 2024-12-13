import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// local imports
import { environment } from '../../../environments/environment';
import { ContactInfo } from '../../models/contact-info';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  protected error: string = '';
  protected contact: ContactInfo = {} as ContactInfo;

  protected sendEmail(contact: ContactInfo) {
    if (!contact.from_name || !contact.message) {
      this.error = 'Please fill out all fields.';
      return;
    }
    emailjs
      .send(
        environment.emailServiceId,
        environment.emailTemplateId,
        {
          from_name: contact.from_name,
          message: contact.message,
        },
        { publicKey: environment.emailPublicKey }
      )
      .then(() => {
        Swal.fire('Email sent!', 'Thank you for your message.', 'success');
      })
      .catch((error) => {
        this.error = error;
      });
  }

  protected clearError() {
    this.error = '';
  }
}
