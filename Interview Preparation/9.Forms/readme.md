# Angular Forms
## Index

1. [Introduction to Forms](#1-introduction-to-forms)
   - 1.1 [What are Forms in Angular?](#11-what-are-forms-in-angular)
   - 1.2 [Template-Driven vs Reactive Forms](#12-template-driven-vs-reactive-forms)
   - 1.3 [When to Use Each](#13-when-to-use-each)

2. [Template-Driven Forms](#2-template-driven-forms)
   - 2.1 [Setting Up Template-Driven Forms](#21-setting-up-template-driven-forms)
   - 2.2 [ngModel Directive](#22-ngmodel-directive)
   - 2.3 [Two-Way Data Binding](#23-two-way-data-binding)
   - 2.4 [Template Variables](#24-template-variables)
   - 2.5 [Validation in Template-Driven Forms](#25-validation-in-template-driven-forms)
   - 2.6 [Submitting Template-Driven Forms](#26-submitting-template-driven-forms)

3. [Reactive Forms](#3-reactive-forms)
   - 3.1 [Setting Up Reactive Forms](#31-setting-up-reactive-forms)
   - 3.2 [FormControl](#32-formcontrol)
   - 3.3 [FormGroup](#33-formgroup)
   - 3.4 [FormArray](#34-formarray)
   - 3.5 [Nested FormGroups](#35-nested-formgroups)
   - 3.6 [Setting and Patching Values](#36-setting-and-patching-values)

4. [Form Validation](#4-form-validation)
   - 4.1 [Built-in Validators](#41-built-in-validators)
   - 4.2 [Custom Validators](#42-custom-validators)
   - 4.3 [Displaying Validation Messages](#43-displaying-validation-messages)
   - 4.4 [Conditional Validators](#44-conditional-validators)

5. [Async Validators](#5-async-validators)
   - 5.1 [What are Async Validators?](#51-what-are-async-validators)
   - 5.2 [Creating Async Validators](#52-creating-async-validators)
   - 5.3 [Username Availability Check](#53-username-availability-check)
   - 5.4 [Debouncing Async Validators](#54-debouncing-async-validators)

6. [Cross-Field Validation](#6-cross-field-validation)
   - 6.1 [Form-Level Validators](#61-form-level-validators)
   - 6.2 [Password Confirmation](#62-password-confirmation)
   - 6.3 [Date Range Validation](#63-date-range-validation)
   - 6.4 [Accessing Other Fields](#64-accessing-other-fields)

7. [Dynamic Forms](#7-dynamic-forms)
   - 7.1 [What are Dynamic Forms?](#71-what-are-dynamic-forms)
   - 7.2 [Adding Controls Dynamically](#72-adding-controls-dynamically)
   - 7.3 [Removing Controls Dynamically](#73-removing-controls-dynamically)
   - 7.4 [Dynamic FormArray](#74-dynamic-formarray)
   - 7.5 [Form Configuration from JSON](#75-form-configuration-from-json)

8. [FormBuilder Service](#8-formbuilder-service)
   - 8.1 [What is FormBuilder?](#81-what-is-formbuilder)
   - 8.2 [Creating Forms with FormBuilder](#82-creating-forms-with-formbuilder)
   - 8.3 [FormBuilder vs Manual Creation](#83-formbuilder-vs-manual-creation)
   - 8.4 [Complex Forms with FormBuilder](#84-complex-forms-with-formbuilder)

9. [StatusChanges and ValueChanges](#9-statuschanges-and-valuechanges)
   - 9.1 [ValueChanges Observable](#91-valuechanges-observable)
   - 9.2 [StatusChanges Observable](#92-statuschanges-observable)
   - 9.3 [Reacting to Form Changes](#93-reacting-to-form-changes)
   - 9.4 [Debouncing Changes](#94-debouncing-changes)

10. [Typed Forms (Angular 14+)](#10-typed-forms-angular-14)
    - 10.1 [What are Typed Forms?](#101-what-are-typed-forms)
    - 10.2 [Type-Safe FormControl](#102-type-safe-formcontrol)
    - 10.3 [Type-Safe FormGroup](#103-type-safe-formgroup)
    - 10.4 [Type-Safe FormArray](#104-type-safe-formarray)
    - 10.5 [Benefits of Typed Forms](#105-benefits-of-typed-forms)

11. [Form Control States](#11-form-control-states)
    - 11.1 [Understanding Control States](#111-understanding-control-states)
    - 11.2 [Pristine vs Dirty](#112-pristine-vs-dirty)
    - 11.3 [Touched vs Untouched](#113-touched-vs-untouched)
    - 11.4 [Valid vs Invalid](#114-valid-vs-invalid)
    - 11.5 [Disabled and Enabled](#115-disabled-and-enabled)
    - 11.6 [Using States for UI](#116-using-states-for-ui)

---

## 1. Introduction to Forms

### 1.1 What are Forms in Angular?

**Forms** handle user input, validation, and submission in Angular applications.

**Think of it like:**
A questionnaire that collects, validates, and processes user answers.

**Key Features:**
- Two-way data binding
- Validation
- State management
- Error handling
- Submission handling

**Simple Example:**
```html
<form>
  <input type="text" placeholder="Name">
  <input type="email" placeholder="Email">
  <button type="submit">Submit</button>
</form>
```

### 1.2 Template-Driven vs Reactive Forms

**Two Approaches:**

**Template-Driven Forms:**
```typescript
// Logic in template
<form #userForm="ngForm">
  <input [(ngModel)]="user.name" name="name" required>
</form>
```

**Reactive Forms:**
```typescript
// Logic in component
userForm = new FormGroup({
  name: new FormControl('', Validators.required)
});
```

**Comparison:**

| Feature | Template-Driven | Reactive |
|---------|----------------|----------|
| **Setup** | FormsModule | ReactiveFormsModule |
| **Logic** | In template | In component |
| **Testing** | Harder | Easier |
| **Complexity** | Simple forms | Complex forms |
| **Type Safety** | No | Yes (Angular 14+) |
| **Validation** | Attributes | Functions |

### 1.3 When to Use Each

**Use Template-Driven Forms When:**
- Simple forms (login, search)
- Less validation logic
- Familiar with Angular templates
- Quick prototyping

**Use Reactive Forms When:**
- Complex forms
- Dynamic forms
- Heavy validation
- Unit testing needed
- Type safety desired
- Form state management

**Examples:**

**Template-Driven:**
```typescript
// Login form
// Contact form
// Search bar
```

**Reactive:**
```typescript
// User registration with complex validation
// Dynamic survey forms
// Multi-step wizards
// Admin panels with many fields
```

---

## 2. Template-Driven Forms

### 2.1 Setting Up Template-Driven Forms

**Import FormsModule:**

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule  // Required for template-driven forms
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Standalone Component:**
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  template: '...'
})
export class UserFormComponent { }
```

### 2.2 ngModel Directive

**ngModel creates two-way data binding:**

**Simple Example:**
```typescript
// Component
export class UserComponent {
  name = '';
}
```

```html
<!-- Template -->
<input [(ngModel)]="name" name="name">
<p>Hello {{ name }}!</p>
```

**How it works:**
1. User types in input
2. `name` property updates
3. Display updates automatically

### 2.3 Two-Way Data Binding

**The banana in a box syntax `[(ngModel)]`:**

```html
<form>
  <label>Name:</label>
  <input [(ngModel)]="user.name" name="name">
  
  <label>Email:</label>
  <input [(ngModel)]="user.email" name="email">
  
  <label>Age:</label>
  <input [(ngModel)]="user.age" name="age" type="number">
</form>

<pre>{{ user | json }}</pre>
```

```typescript
export class UserFormComponent {
  user = {
    name: '',
    email: '',
    age: 0
  };
}
```

**Output:**
```json
{
  "name": "John",
  "email": "john@example.com",
  "age": 25
}
```

### 2.4 Template Variables

**Access form and controls:**

```html
<form #userForm="ngForm">
  <input 
    [(ngModel)]="name" 
    name="name" 
    #nameField="ngModel"
    required>
  
  <div *ngIf="nameField.invalid && nameField.touched">
    Name is required
  </div>
  
  <button [disabled]="userForm.invalid">Submit</button>
</form>

<p>Form Valid: {{ userForm.valid }}</p>
<p>Form Touched: {{ userForm.touched }}</p>
```

**Variables:**
- `#userForm="ngForm"` - Form reference
- `#nameField="ngModel"` - Control reference

### 2.5 Validation in Template-Driven Forms

**Built-in validators as attributes:**

```html
<form #userForm="ngForm">
  <div>
    <label>Name:</label>
    <input 
      [(ngModel)]="user.name" 
      name="name"
      #name="ngModel"
      required
      minlength="3">
    
    <div *ngIf="name.invalid && name.touched">
      <div *ngIf="name.errors?.['required']">Name is required</div>
      <div *ngIf="name.errors?.['minlength']">
        Name must be at least 3 characters
      </div>
    </div>
  </div>
  
  <div>
    <label>Email:</label>
    <input 
      [(ngModel)]="user.email" 
      name="email"
      #email="ngModel"
      required
      email>
    
    <div *ngIf="email.invalid && email.touched">
      <div *ngIf="email.errors?.['required']">Email is required</div>
      <div *ngIf="email.errors?.['email']">Invalid email</div>
    </div>
  </div>
  
  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
```

**Available Validators:**
```html
required
minlength="3"
maxlength="20"
min="0"
max="100"
pattern="[0-9]{3}"
email
```

### 2.6 Submitting Template-Driven Forms

**Handle form submission:**

```html
<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  <input [(ngModel)]="user.name" name="name" required>
  <input [(ngModel)]="user.email" name="email" required email>
  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
```

```typescript
export class UserFormComponent {
  user = { name: '', email: '' };
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted:', this.user);
      console.log('Form value:', form.value);
      
      // Reset form
      form.reset();
    }
  }
}
```

---

## 3. Reactive Forms

### 3.1 Setting Up Reactive Forms

**Import ReactiveFormsModule:**

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [ReactiveFormsModule]
})
export class AppModule { }
```

**Standalone:**
```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class FormComponent { }
```

### 3.2 FormControl

**Single form field:**

**Simple Example:**
```typescript
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name',
  template: `
    <input [formControl]="nameControl">
    <p>Value: {{ nameControl.value }}</p>
  `
})
export class NameComponent {
  nameControl = new FormControl('');
}
```

**With Initial Value:**
```typescript
nameControl = new FormControl('John');
```

**With Validators:**
```typescript
import { Validators } from '@angular/forms';

nameControl = new FormControl('', [
  Validators.required,
  Validators.minLength(3)
]);
```

**Complete Example:**
```typescript
export class FormComponent {
  nameControl = new FormControl('', Validators.required);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  ageControl = new FormControl(0, [Validators.min(0), Validators.max(120)]);
}
```

```html
<div>
  <input [formControl]="nameControl" placeholder="Name">
  <div *ngIf="nameControl.invalid && nameControl.touched">
    Name is required
  </div>
</div>

<div>
  <input [formControl]="emailControl" placeholder="Email">
  <div *ngIf="emailControl.invalid && emailControl.touched">
    Valid email required
  </div>
</div>

<div>
  <input [formControl]="ageControl" type="number" placeholder="Age">
</div>
```

### 3.3 FormGroup

**Group of form controls:**

**Simple Example:**
```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Name">
      <input formControlName="email" placeholder="Email">
      <input formControlName="age" type="number" placeholder="Age">
      <button type="submit" [disabled]="userForm.invalid">Submit</button>
    </form>
    
    <pre>{{ userForm.value | json }}</pre>
  `
})
export class UserFormComponent {
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(0, Validators.min(0))
  });
  
  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
```

**Accessing Controls:**
```typescript
// Get control
const nameControl = this.userForm.get('name');

// Get value
const name = this.userForm.get('name')?.value;

// Set value
this.userForm.get('name')?.setValue('John');

// Check validity
const isValid = this.userForm.get('name')?.valid;
```

### 3.4 FormArray

**Array of form controls:**

**Simple Example:**
```typescript
import { FormArray, FormControl } from '@angular/forms';

export class PhoneFormComponent {
  phoneNumbers = new FormArray([
    new FormControl(''),
    new FormControl('')
  ]);
  
  addPhone() {
    this.phoneNumbers.push(new FormControl(''));
  }
  
  removePhone(index: number) {
    this.phoneNumbers.removeAt(index);
  }
}
```

```html
<div formArrayName="phoneNumbers">
  <div *ngFor="let phone of phoneNumbers.controls; let i = index">
    <input [formControlName]="i" placeholder="Phone {{ i + 1 }}">
    <button (click)="removePhone(i)">Remove</button>
  </div>
</div>

<button (click)="addPhone()">Add Phone</button>
```

**Complete Example with FormGroup:**
```typescript
export class ContactFormComponent {
  contactForm = new FormGroup({
    name: new FormControl(''),
    emails: new FormArray([
      new FormControl('', Validators.email)
    ])
  });
  
  get emails() {
    return this.contactForm.get('emails') as FormArray;
  }
  
  addEmail() {
    this.emails.push(new FormControl('', Validators.email));
  }
  
  removeEmail(index: number) {
    this.emails.removeAt(index);
  }
}
```

```html
<form [formGroup]="contactForm">
  <input formControlName="name" placeholder="Name">
  
  <div formArrayName="emails">
    <div *ngFor="let email of emails.controls; let i = index">
      <input [formControlName]="i" placeholder="Email">
      <button (click)="removeEmail(i)">Remove</button>
    </div>
  </div>
  
  <button (click)="addEmail()">Add Email</button>
</form>
```

### 3.5 Nested FormGroups

**FormGroups within FormGroups:**

```typescript
export class ProfileFormComponent {
  profileForm = new FormGroup({
    personalInfo: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl(0)
    }),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      zipCode: new FormControl('')
    })
  });
}
```

```html
<form [formGroup]="profileForm">
  <div formGroupName="personalInfo">
    <h3>Personal Info</h3>
    <input formControlName="firstName" placeholder="First Name">
    <input formControlName="lastName" placeholder="Last Name">
    <input formControlName="age" type="number" placeholder="Age">
  </div>
  
  <div formGroupName="address">
    <h3>Address</h3>
    <input formControlName="street" placeholder="Street">
    <input formControlName="city" placeholder="City">
    <input formControlName="zipCode" placeholder="Zip Code">
  </div>
</form>

<pre>{{ profileForm.value | json }}</pre>
```

**Output:**
```json
{
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "age": 25
  },
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  }
}
```

### 3.6 Setting and Patching Values

**setValue vs patchValue:**

**setValue (all fields required):**
```typescript
// ✓ Correct: All fields provided
this.userForm.setValue({
  name: 'John',
  email: 'john@example.com',
  age: 25
});

// ✗ Error: Missing fields
this.userForm.setValue({
  name: 'John'
});
```

**patchValue (partial update):**
```typescript
// ✓ Update only some fields
this.userForm.patchValue({
  name: 'John'
});

// ✓ Update nested fields
this.profileForm.patchValue({
  personalInfo: {
    firstName: 'John'
  }
});
```

**Reset Form:**
```typescript
// Reset to empty
this.userForm.reset();

// Reset to specific values
this.userForm.reset({
  name: '',
  email: '',
  age: 0
});
```

---

## 4. Form Validation

### 4.1 Built-in Validators

**Common validators:**

```typescript
import { Validators } from '@angular/forms';

userForm = new FormGroup({
  // Required
  name: new FormControl('', Validators.required),
  
  // Min/Max length
  username: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]),
  
  // Email
  email: new FormControl('', [
    Validators.required,
    Validators.email
  ]),
  
  // Pattern (regex)
  phone: new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]{10}$/)
  ]),
  
  // Min/Max value
  age: new FormControl(0, [
    Validators.required,
    Validators.min(18),
    Validators.max(100)
  ])
});
```

**All Built-in Validators:**
```typescript
Validators.required
Validators.requiredTrue         // For checkboxes
Validators.email
Validators.min(value)
Validators.max(value)
Validators.minLength(length)
Validators.maxLength(length)
Validators.pattern(regex)
Validators.nullValidator        // No validation
```

### 4.2 Custom Validators

**Create custom validator:**

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Simple custom validator
export function noSpaces(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpaces = (control.value || '').indexOf(' ') >= 0;
    return hasSpaces ? { noSpaces: { value: control.value } } : null;
  };
}
```

**Usage:**
```typescript
username: new FormControl('', [
  Validators.required,
  noSpaces()
]);
```

**More Examples:**

**Forbidden Name Validator:**
```typescript
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
```

**Usage:**
```typescript
name: new FormControl('', [
  Validators.required,
  forbiddenNameValidator(/admin/i)
]);
```

**Age Range Validator:**
```typescript
export function ageRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const age = control.value;
    if (age < min || age > max) {
      return { ageRange: { min, max, actual: age } };
    }
    return null;
  };
}
```

**Usage:**
```typescript
age: new FormControl(0, ageRangeValidator(18, 65));
```

### 4.3 Displaying Validation Messages

**Show errors to users:**

```html
<form [formGroup]="userForm">
  <div>
    <input formControlName="email" placeholder="Email">
    
    <div *ngIf="email.invalid && (email.dirty || email.touched)">
      <div *ngIf="email.errors?.['required']" class="error">
        Email is required
      </div>
      <div *ngIf="email.errors?.['email']" class="error">
        Invalid email format
      </div>
    </div>
  </div>
  
  <div>
    <input formControlName="username" placeholder="Username">
    
    <div *ngIf="username.invalid && username.touched">
      <div *ngIf="username.errors?.['required']" class="error">
        Username is required
      </div>
      <div *ngIf="username.errors?.['minlength']" class="error">
        Username must be at least 
        {{ username.errors?.['minlength'].requiredLength }} characters
      </div>
      <div *ngIf="username.errors?.['noSpaces']" class="error">
        Username cannot contain spaces
      </div>
    </div>
  </div>
</form>
```

```typescript
export class UserFormComponent {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      noSpaces()
    ])
  });
  
  get email() {
    return this.userForm.get('email')!;
  }
  
  get username() {
    return this.userForm.get('username')!;
  }
}
```

### 4.4 Conditional Validators

**Add/remove validators dynamically:**

```typescript
export class ConditionalFormComponent {
  form = new FormGroup({
    country: new FormControl(''),
    zipCode: new FormControl('')
  });
  
  ngOnInit() {
    this.form.get('country')?.valueChanges.subscribe(country => {
      const zipCodeControl = this.form.get('zipCode');
      
      if (country === 'USA') {
        // Add validators for USA
        zipCodeControl?.setValidators([
          Validators.required,
          Validators.pattern(/^\d{5}$/)
        ]);
      } else if (country === 'UK') {
        // Add validators for UK
        zipCodeControl?.setValidators([
          Validators.required,
          Validators.pattern(/^[A-Z]{1,2}\d{1,2} \d[A-Z]{2}$/)
        ]);
      } else {
        // No validation
        zipCodeControl?.clearValidators();
      }
      
      zipCodeControl?.updateValueAndValidity();
    });
  }
}
```

---

## 5. Async Validators

### 5.1 What are Async Validators?

**Async validators** perform validation asynchronously (e.g., checking with server).

**Think of it like:**
Checking if a username is already taken by asking the server.

**When to use:**
- Username/email availability
- Database lookups
- API validations
- Remote checks

### 5.2 Creating Async Validators

**Basic async validator:**

```typescript
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function asyncEmailValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    
    // Simulate API call
    return of(email).pipe(
      delay(1000),
      map(email => {
        const taken = email === 'test@example.com';
        return taken ? { emailTaken: true } : null;
      })
    );
  };
}
```

**Usage:**
```typescript
email: new FormControl('', 
  [Validators.required, Validators.email],  // Sync validators
  [asyncEmailValidator()]                    // Async validators
);
```

### 5.3 Username Availability Check

**Real-world example:**

```typescript
// username-validator.ts
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UsernameValidator implements AsyncValidator {
  constructor(private userService: UserService) { }
  
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.checkUsername(control.value).pipe(
      map(isTaken => (isTaken ? { usernameTaken: true } : null)),
      catchError(() => null)
    );
  }
}
```

**Service:**
```typescript
// user.service.ts
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  
  checkUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/users/check/${username}`);
  }
}
```

**Component:**
```typescript
export class RegisterComponent {
  constructor(private usernameValidator: UsernameValidator) { }
  
  registerForm = new FormGroup({
    username: new FormControl('',
      [Validators.required],
      [this.usernameValidator.validate.bind(this.usernameValidator)]
    )
  });
}
```

**Template with pending state:**
```html
<input formControlName="username" placeholder="Username">

<div *ngIf="username.pending">
  Checking username availability...
</div>

<div *ngIf="username.invalid && username.touched">
  <div *ngIf="username.errors?.['required']">
    Username is required
  </div>
  <div *ngIf="username.errors?.['usernameTaken']">
    Username is already taken
  </div>
</div>

<div *ngIf="username.valid">
  Username is available ✓
</div>
```

### 5.4 Debouncing Async Validators

**Reduce API calls:**

```typescript
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

export function debouncedAsyncValidator(
  validatorFn: (value: any) => Observable<ValidationErrors | null>,
  time: number = 500
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      debounceTime(time),           // Wait before checking
      distinctUntilChanged(),       // Only if value changed
      switchMap(value => validatorFn(value))
    );
  };
}
```

**Usage:**
```typescript
username: new FormControl('',
  [Validators.required],
  [debouncedAsyncValidator(this.checkUsername.bind(this), 500)]
);
```

---

## 6. Cross-Field Validation

### 6.1 Form-Level Validators

**Validate across multiple fields:**

```typescript
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password.value === confirmPassword.value 
      ? null 
      : { passwordMismatch: true };
  };
}
```

**Usage:**
```typescript
registerForm = new FormGroup({
  password: new FormControl('', Validators.required),
  confirmPassword: new FormControl('', Validators.required)
}, { validators: passwordMatchValidator() });
```

### 6.2 Password Confirmation

**Complete example:**

```typescript
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordMatch });
  
  passwordMatch(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }
  
  get passwordMismatch() {
    return this.registerForm.errors?.['passwordMismatch'] && 
           this.registerForm.get('confirmPassword')?.touched;
  }
}
```

```html
<form [formGroup]="registerForm">
  <input formControlName="email" type="email" placeholder="Email">
  
  <input formControlName="password" type="password" placeholder="Password">
  
  <input formControlName="confirmPassword" type="password" placeholder="Confirm Password">
  
  <div *ngIf="passwordMismatch" class="error">
    Passwords do not match
  </div>
  
  <button [disabled]="registerForm.invalid">Register</button>
</form>
```

### 6.3 Date Range Validation

**Validate start/end dates:**

```typescript
export function dateRangeValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;
    
    if (!startDate || !endDate) {
      return null;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return start < end ? null : { dateRange: true };
  };
}
```

**Usage:**
```typescript
bookingForm = new FormGroup({
  startDate: new FormControl('', Validators.required),
  endDate: new FormControl('', Validators.required)
}, { validators: dateRangeValidator() });
```

```html
<form [formGroup]="bookingForm">
  <input formControlName="startDate" type="date">
  <input formControlName="endDate" type="date">
  
  <div *ngIf="bookingForm.errors?.['dateRange']" class="error">
    End date must be after start date
  </div>
</form>
```

### 6.4 Accessing Other Fields

**Read values from other controls:**

```typescript
export function conditionalRequiredValidator(
  conditionField: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;
    if (!parent) return null;
    
    const conditionValue = parent.get(conditionField)?.value;
    
    // If condition field is true, this field is required
    if (conditionValue && !control.value) {
      return { conditionalRequired: true };
    }
    
    return null;
  };
}
```

**Usage:**
```typescript
form = new FormGroup({
  hasCompany: new FormControl(false),
  companyName: new FormControl('', conditionalRequiredValidator('hasCompany'))
});
```

---

## 7. Dynamic Forms

### 7.1 What are Dynamic Forms?

**Dynamic forms** are forms where controls are added or removed at runtime.

**Use Cases:**
- Survey forms
- Variable number of inputs
- Conditional fields
- User-driven forms

### 7.2 Adding Controls Dynamically

**Add controls to FormGroup:**

```typescript
export class DynamicFormComponent {
  form = new FormGroup({
    name: new FormControl('')
  });
  
  addControl(name: string) {
    this.form.addControl(name, new FormControl(''));
  }
  
  removeControl(name: string) {
    this.form.removeControl(name);
  }
}
```

```html
<form [formGroup]="form">
  <input formControlName="name" placeholder="Name">
  
  <div *ngIf="form.contains('email')">
    <input formControlName="email" placeholder="Email">
    <button (click)="removeControl('email')">Remove Email</button>
  </div>
  
  <button *ngIf="!form.contains('email')" (click)="addControl('email')">
    Add Email
  </button>
</form>
```

### 7.3 Removing Controls Dynamically

**Example with toggle:**

```typescript
export class ConditionalFormComponent {
  form = new FormGroup({
    requiresAddress: new FormControl(false),
    name: new FormControl('', Validators.required)
  });
  
  ngOnInit() {
    this.form.get('requiresAddress')?.valueChanges.subscribe(required => {
      if (required) {
        this.form.addControl('address', new FormControl('', Validators.required));
      } else {
        this.form.removeControl('address');
      }
    });
  }
}
```

```html
<form [formGroup]="form">
  <input formControlName="name" placeholder="Name">
  
  <label>
    <input formControlName="requiresAddress" type="checkbox">
    Requires Address
  </label>
  
  <div *ngIf="form.contains('address')">
    <input formControlName="address" placeholder="Address">
  </div>
</form>
```

### 7.4 Dynamic FormArray

**Add/remove array items:**

```typescript
export class HobbiesFormComponent {
  form = new FormGroup({
    name: new FormControl(''),
    hobbies: new FormArray([
      new FormControl('')
    ])
  });
  
  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }
  
  addHobby() {
    this.hobbies.push(new FormControl(''));
  }
  
  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }
}
```

```html
<form [formGroup]="form">
  <input formControlName="name" placeholder="Name">
  
  <div formArrayName="hobbies">
    <div *ngFor="let hobby of hobbies.controls; let i = index">
      <input [formControlName]="i" placeholder="Hobby">
      <button (click)="removeHobby(i)">Remove</button>
    </div>
  </div>
  
  <button (click)="addHobby()">Add Hobby</button>
</form>
```

### 7.5 Form Configuration from JSON

**Build form from configuration:**

```typescript
interface FieldConfig {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  options?: string[];
}

const formConfig: FieldConfig[] = [
  { type: 'text', label: 'Name', name: 'name', required: true },
  { type: 'email', label: 'Email', name: 'email', required: true },
  { type: 'select', label: 'Country', name: 'country', options: ['USA', 'UK', 'Canada'] }
];

export class ConfigurableFormComponent {
  form: FormGroup;
  fields: FieldConfig[] = formConfig;
  
  constructor(private fb: FormBuilder) {
    this.form = this.createForm(formConfig);
  }
  
  createForm(config: FieldConfig[]): FormGroup {
    const group: any = {};
    
    config.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      group[field.name] = new FormControl('', validators);
    });
    
    return new FormGroup(group);
  }
}
```

```html
<form [formGroup]="form">
  <div *ngFor="let field of fields">
    <label>{{ field.label }}</label>
    
    <input 
      *ngIf="field.type === 'text' || field.type === 'email'"
      [formControlName]="field.name"
      [type]="field.type">
    
    <select *ngIf="field.type === 'select'" [formControlName]="field.name">
      <option *ngFor="let opt of field.options" [value]="opt">
        {{ opt }}
      </option>
    </select>
  </div>
</form>
```

---

## 8. FormBuilder Service

### 8.1 What is FormBuilder?

**FormBuilder** is a service that simplifies creating form controls.

**Benefits:**
- Less verbose
- Cleaner code
- Easier to read

### 8.2 Creating Forms with FormBuilder

**Simple Example:**

```typescript
import { FormBuilder, Validators } from '@angular/forms';

export class UserFormComponent {
  constructor(private fb: FormBuilder) { }
  
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [0, Validators.min(0)]
  });
}
```

**Nested Groups:**
```typescript
profileForm = this.fb.group({
  personalInfo: this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  }),
  address: this.fb.group({
    street: [''],
    city: [''],
    zipCode: ['']
  })
});
```

**FormArray:**
```typescript
contactForm = this.fb.group({
  name: [''],
  phones: this.fb.array([
    this.fb.control('')
  ])
});

get phones() {
  return this.contactForm.get('phones') as FormArray;
}

addPhone() {
  this.phones.push(this.fb.control(''));
}
```

### 8.3 FormBuilder vs Manual Creation

**Comparison:**

**Manual:**
```typescript
userForm = new FormGroup({
  name: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email])
});
```

**FormBuilder:**
```typescript
userForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]]
});
```

**Both produce the same result, but FormBuilder is shorter!**

### 8.4 Complex Forms with FormBuilder

**Complete example:**

```typescript
export class RegistrationComponent {
  constructor(private fb: FormBuilder) { }
  
  registrationForm = this.fb.group({
    personalInfo: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }),
    
    address: this.fb.group({
      street: [''],
      city: ['', Validators.required],
      state: [''],
      zipCode: ['', Validators.pattern(/^\d{5}$/)]
    }),
    
    phoneNumbers: this.fb.array([
      this.fb.control('', Validators.pattern(/^\d{10}$/))
    ]),
    
    agreeToTerms: [false, Validators.requiredTrue]
  }, { validators: this.customValidator });
  
  get phoneNumbers() {
    return this.registrationForm.get('phoneNumbers') as FormArray;
  }
  
  addPhoneNumber() {
    this.phoneNumbers.push(
      this.fb.control('', Validators.pattern(/^\d{10}$/))
    );
  }
  
  customValidator(form: AbstractControl): ValidationErrors | null {
    // Custom validation logic
    return null;
  }
}
```

---

## 9. StatusChanges and ValueChanges

### 9.1 ValueChanges Observable

**React to value changes:**

```typescript
export class SearchComponent {
  searchControl = new FormControl('');
  
  ngOnInit() {
    this.searchControl.valueChanges.subscribe(value => {
      console.log('Search value:', value);
      this.performSearch(value);
    });
  }
  
  performSearch(query: string) {
    // Search logic
  }
}
```

**For entire form:**
```typescript
ngOnInit() {
  this.userForm.valueChanges.subscribe(value => {
    console.log('Form value:', value);
    this.saveToLocalStorage(value);
  });
}
```

### 9.2 StatusChanges Observable

**React to validation status changes:**

```typescript
ngOnInit() {
  this.emailControl.statusChanges.subscribe(status => {
    console.log('Email status:', status);
    // Status can be: VALID, INVALID, PENDING, DISABLED
    
    if (status === 'VALID') {
      console.log('Email is valid');
    }
  });
}
```

### 9.3 Reacting to Form Changes

**Auto-save example:**

```typescript
export class AutoSaveFormComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    title: [''],
    content: ['']
  });
  
  private subscription: Subscription;
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.autoSave(value);
      });
  }
  
  autoSave(value: any) {
    console.log('Auto-saving...', value);
    // Save to backend
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

**Conditional field example:**
```typescript
ngOnInit() {
  this.form.get('country')?.valueChanges.subscribe(country => {
    const phoneControl = this.form.get('phone');
    
    if (country === 'USA') {
      phoneControl?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]);
    } else {
      phoneControl?.clearValidators();
    }
    
    phoneControl?.updateValueAndValidity();
  });
}
```

### 9.4 Debouncing Changes

**Reduce API calls:**

```typescript
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

ngOnInit() {
  this.searchControl.valueChanges.pipe(
    debounceTime(500),           // Wait 500ms after typing
    distinctUntilChanged()       // Only if value changed
  ).subscribe(value => {
    this.search(value);
  });
}
```

**Complex example:**
```typescript
ngOnInit() {
  this.form.get('email')?.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(email => this.checkEmailAvailability(email))
  ).subscribe(available => {
    if (!available) {
      this.form.get('email')?.setErrors({ emailTaken: true });
    }
  });
}
```

---

## 10. Typed Forms (Angular 14+)

### 10.1 What are Typed Forms?

**Typed forms** provide type safety for form controls.

**Before (untyped):**
```typescript
form = new FormGroup({
  name: new FormControl('')
});

const name = this.form.get('name')?.value;  // Type: any
```

**After (typed):**
```typescript
form = new FormGroup({
  name: new FormControl<string>('')
});

const name = this.form.get('name')?.value;  // Type: string
```

### 10.2 Type-Safe FormControl

**Specify type:**

```typescript
// String
nameControl = new FormControl<string>('');

// Number
ageControl = new FormControl<number>(0);

// Boolean
agreeControl = new FormControl<boolean>(false);

// Nullable
emailControl = new FormControl<string | null>(null);

// Object
userControl = new FormControl<User | null>(null);
```

**With interfaces:**
```typescript
interface User {
  name: string;
  email: string;
  age: number;
}

userControl = new FormControl<User>({
  name: '',
  email: '',
  age: 0
});
```

### 10.3 Type-Safe FormGroup

**Define form with types:**

```typescript
interface UserForm {
  name: string;
  email: string;
  age: number;
}

userForm = new FormGroup<{
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number>;
}>({
  name: new FormControl('', { nonNullable: true }),
  email: new FormControl('', { nonNullable: true }),
  age: new FormControl(0, { nonNullable: true })
});

// Type-safe access
const name: string = this.userForm.value.name;  // Type: string
const email: string = this.userForm.get('email')?.value;  // Type: string
```

**Using interfaces:**
```typescript
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

userForm = new FormGroup({
  firstName: new FormControl<string>('', { nonNullable: true }),
  lastName: new FormControl<string>('', { nonNullable: true }),
  email: new FormControl<string>('', { nonNullable: true })
});

// Value is typed
const user: { firstName: string; lastName: string; email: string } = this.userForm.value;
```

### 10.4 Type-Safe FormArray

**Array with types:**

```typescript
phonesArray = new FormArray<FormControl<string>>([
  new FormControl<string>('', { nonNullable: true })
]);

addPhone() {
  this.phonesArray.push(new FormControl<string>('', { nonNullable: true }));
}

// Type-safe value
const phones: string[] = this.phonesArray.value;  // Type: string[]
```

**Complex FormArray:**
```typescript
interface Address {
  street: string;
  city: string;
}

addressesArray = new FormArray<FormGroup<{
  street: FormControl<string>;
  city: FormControl<string>;
}>>([
  new FormGroup({
    street: new FormControl<string>('', { nonNullable: true }),
    city: new FormControl<string>('', { nonNullable: true })
  })
]);
```

### 10.5 Benefits of Typed Forms

**1. Type Safety:**
```typescript
// Error caught at compile time
this.userForm.patchValue({
  name: 123  // Error: Type 'number' is not assignable to type 'string'
});
```

**2. IntelliSense:**
```typescript
// Auto-completion for form controls
this.userForm.get('name').  // Shows available methods
```

**3. Refactoring:**
```typescript
// Rename field in interface → errors show everywhere it's used
interface User {
  fullName: string;  // Renamed from 'name'
  email: string;
}
// All references to 'name' now show errors
```

**4. Documentation:**
```typescript
// Types serve as documentation
form = new FormGroup<{
  name: FormControl<string>;     // Clear what type expected
  age: FormControl<number>;
  isActive: FormControl<boolean>;
}>({ ... });
```

---

## 11. Form Control States

### 11.1 Understanding Control States

**Every form control has states:**

| State | Opposite | Description |
|-------|----------|-------------|
| **pristine** | dirty | Not changed |
| **dirty** | pristine | Changed |
| **touched** | untouched | Focused/blurred |
| **untouched** | touched | Never focused |
| **valid** | invalid | Passes validation |
| **invalid** | valid | Fails validation |
| **pending** | - | Async validation in progress |
| **disabled** | enabled | Disabled |
| **enabled** | disabled | Not disabled |

### 11.2 Pristine vs Dirty

**pristine:** User hasn't changed the value
**dirty:** User has changed the value

```typescript
ngOnInit() {
  console.log(this.nameControl.pristine);  // true (initial)
  
  this.nameControl.setValue('John');
  console.log(this.nameControl.pristine);  // false
  console.log(this.nameControl.dirty);     // true
}
```

**UI Example:**
```html
<input [formControl]="nameControl">

<p *ngIf="nameControl.dirty">
  You have unsaved changes
</p>
```

### 11.3 Touched vs Untouched

**touched:** User has focused and blurred the control
**untouched:** User has never focused the control

```html
<input 
  [formControl]="emailControl"
  (blur)="onBlur()">

<div *ngIf="emailControl.invalid && emailControl.touched">
  Please enter a valid email
</div>
```

**Why check touched?**
- Avoid showing errors immediately
- Only show after user interacted

### 11.4 Valid vs Invalid

**valid:** Passes all validators
**invalid:** Fails validation

```typescript
nameControl = new FormControl('', Validators.required);

console.log(this.nameControl.valid);    // false (empty)
console.log(this.nameControl.invalid);  // true

this.nameControl.setValue('John');
console.log(this.nameControl.valid);    // true
console.log(this.nameControl.invalid);  // false
```

**UI Example:**
```html
<button [disabled]="userForm.invalid">
  Submit
</button>
```

### 11.5 Disabled and Enabled

**Disable/enable controls:**

```typescript
// Disable
this.nameControl.disable();

// Enable
this.nameControl.enable();

// Check state
console.log(this.nameControl.disabled);  // true
console.log(this.nameControl.enabled);   // false
```

**Create disabled control:**
```typescript
nameControl = new FormControl({ value: '', disabled: true });
```

**Conditional disable:**
```typescript
ngOnInit() {
  if (this.isReadOnly) {
    this.userForm.disable();
  }
}
```

### 11.6 Using States for UI

**Complete example:**

```html
<form [formGroup]="userForm">
  <div class="form-group">
    <input 
      formControlName="email"
      [class.is-invalid]="email.invalid && email.touched"
      [class.is-valid]="email.valid && email.touched">
    
    <div *ngIf="email.invalid && (email.dirty || email.touched)" class="errors">
      <div *ngIf="email.errors?.['required']">Email is required</div>
      <div *ngIf="email.errors?.['email']">Invalid email format</div>
    </div>
    
    <div *ngIf="email.valid && email.touched" class="success">
      ✓ Email looks good
    </div>
    
    <div *ngIf="email.pending" class="pending">
      Checking email availability...
    </div>
  </div>
  
  <div class="form-group">
    <input 
      formControlName="password"
      type="password"
      [class.is-invalid]="password.invalid && password.touched">
    
    <div *ngIf="password.invalid && password.touched" class="errors">
      <div *ngIf="password.errors?.['required']">Password is required</div>
      <div *ngIf="password.errors?.['minlength']">
        Password must be at least 8 characters
      </div>
    </div>
  </div>
  
  <button 
    type="submit" 
    [disabled]="userForm.invalid || userForm.pristine">
    Submit
  </button>
  
  <button 
    type="button" 
    [disabled]="userForm.pristine"
    (click)="reset()">
    Reset
  </button>
</form>

<div class="form-status">
  <p>Form Valid: {{ userForm.valid }}</p>
  <p>Form Dirty: {{ userForm.dirty }}</p>
  <p>Form Touched: {{ userForm.touched }}</p>
</div>
```

```typescript
export class FormComponent {
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  
  get email() {
    return this.userForm.get('email')!;
  }
  
  get password() {
    return this.userForm.get('password')!;
  }
  
  reset() {
    this.userForm.reset();
  }
}
```

**CSS Classes:**
```css
.is-invalid {
  border-color: red;
}

.is-valid {
  border-color: green;
}

.errors {
  color: red;
  font-size: 0.875rem;
}

.success {
  color: green;
  font-size: 0.875rem;
}

.pending {
  color: orange;
  font-size: 0.875rem;
}
```

---

## Summary

You've mastered **Angular Forms**!

**Key Concepts:**

**1. Two Form Approaches:**
- **Template-Driven**: Simple, in template, FormsModule
- **Reactive**: Complex, in component, ReactiveFormsModule

**2. Reactive Forms Building Blocks:**
- **FormControl**: Single field
- **FormGroup**: Group of controls
- **FormArray**: Dynamic array of controls

**3. Validation:**
- **Built-in**: required, email, minLength, pattern
- **Custom**: Create validator functions
- **Async**: Server-side validation
- **Cross-field**: Validate across multiple fields

**4. Form States:**
- **pristine/dirty**: Changed or not
- **touched/untouched**: Focused or not
- **valid/invalid**: Passes validation or not
- **enabled/disabled**: Interactive or not

**5. Advanced Features:**
- **FormBuilder**: Simplified form creation
- **ValueChanges**: Observable of value changes
- **StatusChanges**: Observable of status changes
- **Typed Forms**: Type safety (Angular 14+)
- **Dynamic Forms**: Runtime control management

**Form Checklist:**
```typescript
1. Choose approach (Template-Driven vs Reactive)
2. Import module (FormsModule or ReactiveFormsModule)
3. Create form structure
4. Add validation
5. Handle submission
6. Display errors
7. Test all paths
```

**Best Practices:**
- Use Reactive Forms for complex scenarios
- Prefer FormBuilder for cleaner code
- Always validate on both client and server
- Use typed forms for type safety
- Show errors only after user interaction
- Debounce async validators
- Clean up subscriptions
- Use cross-field validation for related fields

**Common Patterns:**
```typescript
// Reactive form with FormBuilder
form = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]]
});

// Custom validator
export function customValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return isValid ? null : { customError: true };
  };
}

// Value changes with debounce
this.control.valueChanges.pipe(
  debounceTime(500),
  distinctUntilChanged()
).subscribe(value => { });

// Type-safe form (Angular 14+)
form = new FormGroup({
  name: new FormControl<string>('')
});
```

Master these form concepts to build robust, user-friendly data collection interfaces in Angular!
