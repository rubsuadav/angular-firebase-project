import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// local imports
import { environment } from '../../../environments/environment';
import { ContactInfo } from '../../models/contact-info';
import BadWordsNext from 'bad-words-next';
import en from 'bad-words-next/lib/en';
import es from 'bad-words-next/lib/es';

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
  protected badwords = new BadWordsNext();

  protected sendEmail(contact: ContactInfo) {
    this.badwords.add(en);
    this.badwords.add(es);
    if (this.badwords.check(contact.message)) {
      this.error = 'Please refrain from using profanity.';
      return;
    }
    if (
      !/^\w+([.-]?\w+)*@(gmail|hotmail|outlook)\.com$/.test(contact.from_name)
    ) {
      this.error = 'Please use a valid email address.';
      return;
    }
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
      });
  }

  protected clearError() {
    this.error = '';
  }
}
