import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from '../../Services/contactForm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css', './contact-us-tablet.component.css', './contact-us-mobile.component.css']
})
export class ContactUsComponent {
  ContactForm: FormGroup;

  constructor(private builder: FormBuilder, private contactFormService: ContactFormService,
      private Toast: ToastrService) {
    this.ContactForm = this.builder.group({
      Name: ['', [Validators.required]],
      Message: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.ContactForm.valid) {
      console.log(this.ContactForm.value);
      this.contactFormService.sendContactForm(this.ContactForm.value).subscribe({
        next: response => {

          this.Toast.success("Contact form submitted successfully")
          console.log('Contact form submitted successfully');
        },
        error: r => {
          console.error('Error submitting contact form:', r);
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
}