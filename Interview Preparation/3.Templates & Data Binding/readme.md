# Angular Templates and Data Binding
## Index

1. [Interpolation](#1-interpolation)
   - 1.1 [What is Interpolation?](#11-what-is-interpolation)
   - 1.2 [Basic Syntax](#12-basic-syntax)
   - 1.3 [Expressions in Interpolation](#13-expressions-in-interpolation)
   - 1.4 [Limitations](#14-limitations)
   - 1.5 [Best Practices](#15-best-practices)

2. [Property Binding](#2-property-binding)
   - 2.1 [What is Property Binding?](#21-what-is-property-binding)
   - 2.2 [Basic Syntax](#22-basic-syntax)
   - 2.3 [Binding to HTML Properties](#23-binding-to-html-properties)
   - 2.4 [Binding to Component Properties](#24-binding-to-component-properties)
   - 2.5 [Binding to Directive Properties](#25-binding-to-directive-properties)
   - 2.6 [When to Use Property Binding vs Interpolation](#26-when-to-use-property-binding-vs-interpolation)

3. [Event Binding](#3-event-binding)
   - 3.1 [What is Event Binding?](#31-what-is-event-binding)
   - 3.2 [Basic Syntax](#32-basic-syntax)
   - 3.3 [Common DOM Events](#33-common-dom-events)
   - 3.4 [Event Object ($event)](#34-event-object-event)
   - 3.5 [Custom Events](#35-custom-events)
   - 3.6 [Event Filtering](#36-event-filtering)
   - 3.7 [Multiple Event Handlers](#37-multiple-event-handlers)

4. [Two-Way Binding (ngModel)](#4-two-way-binding-ngmodel)
   - 4.1 [What is Two-Way Binding?](#41-what-is-two-way-binding)
   - 4.2 [Setting Up FormsModule](#42-setting-up-formsmodule)
   - 4.3 [Basic ngModel Usage](#43-basic-ngmodel-usage)
   - 4.4 [Two-Way Binding Syntax](#44-two-way-binding-syntax)
   - 4.5 [Custom Two-Way Binding](#45-custom-two-way-binding)
   - 4.6 [Banana in a Box Syntax](#46-banana-in-a-box-syntax)

5. [Template Reference Variables](#5-template-reference-variables)
   - 5.1 [What are Template Reference Variables?](#51-what-are-template-reference-variables)
   - 5.2 [Basic Syntax](#52-basic-syntax)
   - 5.3 [Referencing DOM Elements](#53-referencing-dom-elements)
   - 5.4 [Referencing Components](#54-referencing-components)
   - 5.5 [Referencing Directives](#55-referencing-directives)
   - 5.6 [Scope of Reference Variables](#56-scope-of-reference-variables)

6. [Template Expressions and Statements](#6-template-expressions-and-statements)
   - 6.1 [Template Expressions](#61-template-expressions)
   - 6.2 [Template Statements](#62-template-statements)
   - 6.3 [Expression Context](#63-expression-context)
   - 6.4 [Allowed Operations](#64-allowed-operations)
   - 6.5 [Forbidden Operations](#65-forbidden-operations)
   - 6.6 [Expression Guidelines](#66-expression-guidelines)

7. [Safe Navigation Operator and Nullish Coalescing](#7-safe-navigation-operator-and-nullish-coalescing)
   - 7.1 [Safe Navigation Operator (?.)](#71-safe-navigation-operator-)
   - 7.2 [Non-Null Assertion Operator (!)](#72-non-null-assertion-operator-)
   - 7.3 [Nullish Coalescing Operator (??)](#73-nullish-coalescing-operator-)
   - 7.4 [Combining Operators](#74-combining-operators)
   - 7.5 [When to Use Each Operator](#75-when-to-use-each-operator)

8. [Attribute vs Property Binding](#8-attribute-vs-property-binding)
   - 8.1 [Understanding the Difference](#81-understanding-the-difference)
   - 8.2 [Attribute Binding Syntax](#82-attribute-binding-syntax)
   - 8.3 [When to Use Attribute Binding](#83-when-to-use-attribute-binding)
   - 8.4 [ARIA Attributes](#84-aria-attributes)
   - 8.5 [Data Attributes](#85-data-attributes)
   - 8.6 [Class Binding](#86-class-binding)
   - 8.7 [Style Binding](#87-style-binding)

---

## 1. Interpolation

### 1.1 What is Interpolation?

Interpolation is a technique to **display component data in the template** by embedding expressions within double curly braces `{{ }}`.

**Think of it like:**
A placeholder in a document that gets filled with actual data. Like a name tag that says "Hello, my name is {{name}}".

**Purpose:**
- Display component properties
- Show calculated values
- Render dynamic text

**Data Flow:**
```
Component (TypeScript) → Template (HTML)
One-way binding (component to view)
```

### 1.2 Basic Syntax

**Syntax:** `{{ expression }}`

**Simple Example:**
```typescript
// Component
@Component({
  selector: 'app-greeting',
  template: '<h1>Hello {{ name }}!</h1>'
})
export class GreetingComponent {
  name = 'John';
}
```

**Output:**
```html
<h1>Hello John!</h1>
```

**Multiple Interpolations:**
```typescript
@Component({
  template: `
    <div>
      <h1>{{ title }}</h1>
      <p>Welcome, {{ firstName }} {{ lastName }}</p>
      <p>Age: {{ age }}</p>
    </div>
  `
})
export class UserComponent {
  title = 'User Profile';
  firstName = 'John';
  lastName = 'Doe';
  age = 25;
}
```

**Output:**
```html
<div>
  <h1>User Profile</h1>
  <p>Welcome, John Doe</p>
  <p>Age: 25</p>
</div>
```

### 1.3 Expressions in Interpolation

**You can use:**

**1. Simple Properties:**
```typescript
{{ name }}
{{ age }}
```

**2. Mathematical Operations:**
```typescript
<p>Total: {{ price * quantity }}</p>
<p>Percentage: {{ (score / total) * 100 }}%</p>
```

```typescript
export class CalculatorComponent {
  price = 10;
  quantity = 5;
  score = 85;
  total = 100;
}
```

**Output:**
```
Total: 50
Percentage: 85%
```

**3. String Operations:**
```typescript
<p>{{ firstName + ' ' + lastName }}</p>
<p>{{ 'Hello ' + name }}</p>
<p>{{ message.toUpperCase() }}</p>
```

```typescript
export class TextComponent {
  firstName = 'John';
  lastName = 'Doe';
  name = 'Alice';
  message = 'hello world';
}
```

**Output:**
```
John Doe
Hello Alice
HELLO WORLD
```

**4. Method Calls:**
```typescript
<p>{{ getFullName() }}</p>
<p>{{ calculateTotal() }}</p>
```

```typescript
export class UserComponent {
  firstName = 'John';
  lastName = 'Doe';
  
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  
  calculateTotal(): number {
    return 10 * 5;
  }
}
```

**5. Ternary Operator:**
```typescript
<p>Status: {{ isActive ? 'Active' : 'Inactive' }}</p>
<p>{{ age >= 18 ? 'Adult' : 'Minor' }}</p>
```

```typescript
export class StatusComponent {
  isActive = true;
  age = 25;
}
```

**Output:**
```
Status: Active
Adult
```

**6. Null/Undefined Checks:**
```typescript
<p>{{ user || 'Guest' }}</p>
<p>{{ userName || 'Anonymous' }}</p>
```

```typescript
export class DefaultComponent {
  user = null;
  userName = '';
}
```

**Output:**
```
Guest
Anonymous
```

### 1.4 Limitations

**What you CANNOT do:**

**1. Assignments:**
```typescript
<!-- ✗ Error -->
{{ name = 'John' }}
{{ count++ }}
```

**2. Keyword Operations:**
```typescript
<!-- ✗ Error -->
{{ new User() }}
{{ typeof name }}
{{ delete user }}
```

**3. Global Variables:**
```typescript
<!-- ✗ Error -->
{{ window.location }}
{{ console.log('test') }}
```

**4. Chaining Expressions:**
```typescript
<!-- ✗ Error -->
{{ name; age; email }}
```

**5. Bitwise Operators:**
```typescript
<!-- ✗ Error -->
{{ a | b }}
{{ a & b }}
```

### 1.5 Best Practices

**1. Keep Expressions Simple:**
```typescript
<!-- ✓ Good -->
{{ fullName }}

<!-- ✗ Bad: Too complex -->
{{ firstName.trim().toUpperCase() + ' ' + lastName.trim().toUpperCase() }}
```

**Better approach:**
```typescript
// Component
get fullName(): string {
  return `${this.firstName.trim().toUpperCase()} ${this.lastName.trim().toUpperCase()}`;
}

// Template
{{ fullName }}
```

**2. Avoid Method Calls with Side Effects:**
```typescript
<!-- ✗ Bad: Method modifies data -->
{{ updateCount() }}

<!-- ✓ Good: Pure calculation -->
{{ getCount() }}
```

**3. Use Pipes for Formatting:**
```typescript
<!-- ✗ Okay but not ideal -->
{{ price.toFixed(2) }}

<!-- ✓ Better: Use pipe -->
{{ price | number:'1.2-2' }}
```

**4. Handle Null/Undefined:**
```typescript
<!-- Use safe navigation or default values -->
{{ user?.name || 'Guest' }}
```

---

## 2. Property Binding

### 2.1 What is Property Binding?

Property Binding sets a **DOM element or directive property** to a component property value.

**Syntax:** `[property]="expression"`

**Think of it like:**
Setting a variable. Like `element.property = value` in JavaScript.

**Data Flow:**
```
Component → Element Property
One-way binding (component to view)
```

### 2.2 Basic Syntax

**Square Brackets [ ]:**

**Simple Example:**
```typescript
@Component({
  template: '<img [src]="imageUrl">'
})
export class ImageComponent {
  imageUrl = 'photo.jpg';
}
```

**Equivalent to:**
```html
<img src="photo.jpg">
```

**Multiple Property Bindings:**
```typescript
@Component({
  template: `
    <img 
      [src]="imageUrl"
      [alt]="imageDescription"
      [width]="imageWidth">
  `
})
export class ImageComponent {
  imageUrl = 'photo.jpg';
  imageDescription = 'Profile picture';
  imageWidth = 200;
}
```

### 2.3 Binding to HTML Properties

**Common HTML Property Bindings:**

**1. Input Elements:**
```typescript
<input [value]="userName">
<input [placeholder]="placeholderText">
<input [disabled]="isDisabled">
```

```typescript
export class FormComponent {
  userName = 'John';
  placeholderText = 'Enter your name';
  isDisabled = false;
}
```

**2. Button Elements:**
```typescript
<button [disabled]="!isValid">Submit</button>
<button [type]="buttonType">Click</button>
```

```typescript
export class ButtonComponent {
  isValid = false;
  buttonType = 'submit';
}
```

**3. Link Elements:**
```typescript
<a [href]="websiteUrl">Visit Website</a>
<a [target]="linkTarget">Open Link</a>
```

```typescript
export class LinkComponent {
  websiteUrl = 'https://example.com';
  linkTarget = '_blank';
}
```

**4. Boolean Properties:**
```typescript
<input [required]="isRequired">
<input [readonly]="isReadonly">
<button [disabled]="isDisabled">
```

```typescript
export class ControlComponent {
  isRequired = true;
  isReadonly = false;
  isDisabled = true;
}
```

**Output:**
```html
<input required>
<input>
<button disabled>
```

### 2.4 Binding to Component Properties

**Binding to Child Component @Input:**

**Child Component:**
```typescript
@Component({
  selector: 'app-child',
  template: '<p>{{ message }}</p>'
})
export class ChildComponent {
  @Input() message: string;
}
```

**Parent Component:**
```typescript
@Component({
  template: '<app-child [message]="parentMessage"></app-child>'
})
export class ParentComponent {
  parentMessage = 'Hello from parent!';
}
```

**Multiple Inputs:**
```typescript
@Component({
  template: `
    <app-user
      [name]="userName"
      [age]="userAge"
      [email]="userEmail">
    </app-user>
  `
})
export class ParentComponent {
  userName = 'John';
  userAge = 25;
  userEmail = 'john@example.com';
}
```

### 2.5 Binding to Directive Properties

**Built-in Directives:**

**1. ngClass:**
```typescript
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
  Content
</div>
```

```typescript
export class StyleComponent {
  isActive = true;
  isDisabled = false;
}
```

**2. ngStyle:**
```typescript
<p [ngStyle]="{'color': textColor, 'font-size': fontSize}">
  Styled text
</p>
```

```typescript
export class StyleComponent {
  textColor = 'blue';
  fontSize = '20px';
}
```

**3. ngIf:**
```typescript
<div [ngIf]="isVisible">
  Conditional content
</div>
```

```typescript
export class ConditionalComponent {
  isVisible = true;
}
```

### 2.6 When to Use Property Binding vs Interpolation

**Interpolation ({{ }}):**
- Text content only
- String values
- Display data in text nodes

```typescript
<!-- ✓ Good: Text content -->
<h1>{{ title }}</h1>
<p>{{ description }}</p>
```

**Property Binding ([ ]):**
- Element properties
- Non-string values (boolean, number, object)
- Attribute binding

```typescript
<!-- ✓ Good: Element properties -->
<img [src]="imageUrl">
<button [disabled]="isDisabled">
```

**Comparison:**

```typescript
<!-- Both work for text -->
<p>{{ title }}</p>
<p [textContent]="title"></p>

<!-- Only property binding works for properties -->
<button [disabled]="false">Click</button>
<!-- ✗ This won't work -->
<button disabled="{{ false }}">Click</button>

<!-- Only interpolation works in text -->
<h1>Welcome {{ name }}</h1>
<!-- ✗ This won't work -->
<h1>Welcome [name]="userName"</h1>
```

**Best Practice:**
```typescript
<!-- ✓ Use interpolation for text -->
<p>Hello {{ name }}</p>

<!-- ✓ Use property binding for properties -->
<img [src]="url">
<input [value]="text">
```

---

## 3. Event Binding

### 3.1 What is Event Binding?

Event Binding listens to **DOM events** and executes component methods when events occur.

**Syntax:** `(event)="handler()"`

**Think of it like:**
Setting up a listener. Like `element.addEventListener('click', handler)`.

**Data Flow:**
```
Element Event → Component Method
One-way binding (view to component)
```

### 3.2 Basic Syntax

**Parentheses ( ):**

**Simple Example:**
```typescript
@Component({
  template: '<button (click)="handleClick()">Click me</button>'
})
export class ButtonComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}
```

**Output when clicked:**
```
Button clicked!
```

**Inline Statements:**
```typescript
@Component({
  template: `
    <button (click)="count = count + 1">Increment</button>
    <p>Count: {{ count }}</p>
  `
})
export class CounterComponent {
  count = 0;
}
```

### 3.3 Common DOM Events

**Mouse Events:**
```typescript
<button (click)="onClick()">Click</button>
<div (dblclick)="onDoubleClick()">Double Click</div>
<div (mouseenter)="onMouseEnter()">Hover</div>
<div (mouseleave)="onMouseLeave()">Leave</div>
```

```typescript
export class MouseComponent {
  onClick() {
    console.log('Clicked');
  }
  
  onDoubleClick() {
    console.log('Double clicked');
  }
  
  onMouseEnter() {
    console.log('Mouse entered');
  }
  
  onMouseLeave() {
    console.log('Mouse left');
  }
}
```

**Keyboard Events:**
```typescript
<input (keyup)="onKeyUp()">
<input (keydown)="onKeyDown()">
<input (keypress)="onKeyPress()">
```

```typescript
export class KeyboardComponent {
  onKeyUp() {
    console.log('Key released');
  }
  
  onKeyDown() {
    console.log('Key pressed');
  }
  
  onKeyPress() {
    console.log('Key typed');
  }
}
```

**Form Events:**
```typescript
<input (input)="onInput()">
<input (change)="onChange()">
<input (focus)="onFocus()">
<input (blur)="onBlur()">
<form (submit)="onSubmit()">
```

```typescript
export class FormComponent {
  onInput() {
    console.log('Input changed');
  }
  
  onChange() {
    console.log('Value changed');
  }
  
  onFocus() {
    console.log('Input focused');
  }
  
  onBlur() {
    console.log('Input blurred');
  }
  
  onSubmit() {
    console.log('Form submitted');
  }
}
```

### 3.4 Event Object ($event)

**Access event details with `$event`:**

**Simple Example:**
```typescript
<button (click)="handleClick($event)">Click</button>
```

```typescript
export class EventComponent {
  handleClick(event: MouseEvent) {
    console.log('Event:', event);
    console.log('Target:', event.target);
    console.log('Position:', event.clientX, event.clientY);
  }
}
```

**Input Events:**
```typescript
<input (input)="onInput($event)">
```

```typescript
export class InputComponent {
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log('Value:', target.value);
  }
}
```

**Keyboard Events:**
```typescript
<input (keyup)="onKeyUp($event)">
```

```typescript
export class KeyComponent {
  onKeyUp(event: KeyboardEvent) {
    console.log('Key:', event.key);
    console.log('Code:', event.code);
    
    if (event.key === 'Enter') {
      console.log('Enter pressed!');
    }
  }
}
```

**Prevent Default:**
```typescript
<a href="https://example.com" (click)="handleClick($event)">Link</a>
```

```typescript
export class LinkComponent {
  handleClick(event: MouseEvent) {
    event.preventDefault();
    console.log('Default action prevented');
  }
}
```

**Stop Propagation:**
```typescript
<div (click)="outerClick()">
  <button (click)="innerClick($event)">Click</button>
</div>
```

```typescript
export class PropagationComponent {
  outerClick() {
    console.log('Outer clicked');
  }
  
  innerClick(event: MouseEvent) {
    event.stopPropagation();
    console.log('Inner clicked (not propagating)');
  }
}
```

### 3.5 Custom Events

**Emit events from child components:**

**Child Component:**
```typescript
@Component({
  selector: 'app-child',
  template: '<button (click)="notify()">Notify Parent</button>'
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();
  
  notify() {
    this.messageEvent.emit('Hello from child!');
  }
}
```

**Parent Component:**
```typescript
@Component({
  template: `
    <app-child (messageEvent)="receiveMessage($event)"></app-child>
    <p>{{ message }}</p>
  `
})
export class ParentComponent {
  message: string;
  
  receiveMessage(msg: string) {
    this.message = msg;
  }
}
```

### 3.6 Event Filtering

**Keyboard Event Filtering:**

**Angular provides key event filters:**
```typescript
<input (keyup.enter)="onEnter()">
<input (keyup.escape)="onEscape()">
<input (keyup.space)="onSpace()">
<input (keyup.shift)="onShift()">
<input (keyup.control)="onControl()">
```

```typescript
export class KeyFilterComponent {
  onEnter() {
    console.log('Enter pressed');
  }
  
  onEscape() {
    console.log('Escape pressed');
  }
  
  onSpace() {
    console.log('Space pressed');
  }
}
```

**Combination Keys:**
```typescript
<input (keyup.shift.enter)="onShiftEnter()">
<input (keyup.control.s)="onCtrlS($event)">
```

```typescript
export class ComboComponent {
  onShiftEnter() {
    console.log('Shift + Enter');
  }
  
  onCtrlS(event: KeyboardEvent) {
    event.preventDefault();
    console.log('Ctrl + S (Save)');
  }
}
```

### 3.7 Multiple Event Handlers

**Bind multiple events:**
```typescript
<button 
  (click)="onClick()" 
  (mouseenter)="onHover()" 
  (mouseleave)="onLeave()">
  Hover and Click
</button>
```

```typescript
export class MultiEventComponent {
  onClick() {
    console.log('Clicked');
  }
  
  onHover() {
    console.log('Hovered');
  }
  
  onLeave() {
    console.log('Left');
  }
}
```

---

## 4. Two-Way Binding (ngModel)

### 4.1 What is Two-Way Binding?

Two-Way Binding **synchronizes data** between component and template in both directions.

**Think of it like:**
A two-way mirror. Changes on one side reflect on the other side.

**Data Flow:**
```
Component ←→ Template
Changes flow both ways
```

**Visual:**
```
Component Property → Template (displays value)
Template (user input) → Component Property (updates value)
```

### 4.2 Setting Up FormsModule

**Import FormsModule:**

**Module-based:**
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule  // Required for ngModel
  ]
})
export class AppModule { }
```

**Standalone Component:**
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],  // Import here
  template: '<input [(ngModel)]="name">'
})
export class FormComponent {
  name = '';
}
```

### 4.3 Basic ngModel Usage

**Simple Example:**
```typescript
@Component({
  template: `
    <input [(ngModel)]="name">
    <p>Hello {{ name }}!</p>
  `
})
export class GreetingComponent {
  name = 'John';
}
```

**How it works:**
1. Initial value: Component `name = 'John'` displays in input
2. User types: Input value updates component `name`
3. Display updates: `{{ name }}` shows new value

**Common Use Cases:**

**Text Input:**
```typescript
<input [(ngModel)]="userName" type="text">
<p>Username: {{ userName }}</p>
```

```typescript
export class FormComponent {
  userName = '';
}
```

**Textarea:**
```typescript
<textarea [(ngModel)]="description"></textarea>
<p>{{ description }}</p>
```

```typescript
export class TextComponent {
  description = '';
}
```

**Select Dropdown:**
```typescript
<select [(ngModel)]="selectedCountry">
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</select>
<p>Selected: {{ selectedCountry }}</p>
```

```typescript
export class SelectComponent {
  selectedCountry = 'us';
}
```

**Checkbox:**
```typescript
<input type="checkbox" [(ngModel)]="isChecked">
<p>Checked: {{ isChecked }}</p>
```

```typescript
export class CheckboxComponent {
  isChecked = false;
}
```

**Radio Buttons:**
```typescript
<input type="radio" [(ngModel)]="gender" value="male"> Male
<input type="radio" [(ngModel)]="gender" value="female"> Female
<p>Gender: {{ gender }}</p>
```

```typescript
export class RadioComponent {
  gender = 'male';
}
```

### 4.4 Two-Way Binding Syntax

**The "Banana in a Box" syntax `[( )]`:**

**Expanded form:**
```typescript
<!-- Two-way binding (shorthand) -->
<input [(ngModel)]="name">

<!-- Equivalent expanded form -->
<input 
  [ngModel]="name" 
  (ngModelChange)="name = $event">
```

**Why use expanded form:**
- Add custom logic on change
- Transform values
- Validation

**Example with custom logic:**
```typescript
<input 
  [ngModel]="name" 
  (ngModelChange)="onNameChange($event)">
```

```typescript
export class CustomComponent {
  name = '';
  
  onNameChange(value: string) {
    this.name = value.toUpperCase();  // Transform to uppercase
    console.log('Name changed:', this.name);
  }
}
```

### 4.5 Custom Two-Way Binding

**Create custom two-way binding for your components:**

**Child Component:**
```typescript
@Component({
  selector: 'app-counter',
  template: `
    <button (click)="decrement()">-</button>
    <span>{{ count }}</span>
    <button (click)="increment()">+</button>
  `
})
export class CounterComponent {
  @Input() count: number = 0;
  @Output() countChange = new EventEmitter<number>();
  
  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
  
  decrement() {
    this.count--;
    this.countChange.emit(this.count);
  }
}
```

**Parent Component:**
```typescript
@Component({
  template: `
    <app-counter [(count)]="value"></app-counter>
    <p>Parent value: {{ value }}</p>
  `
})
export class ParentComponent {
  value = 5;
}
```

**Pattern:**
- Input property: `propertyName`
- Output event: `propertyNameChange`

**Another Example:**
```typescript
@Component({
  selector: 'app-size-picker',
  template: `
    <button (click)="selectSize('S')">S</button>
    <button (click)="selectSize('M')">M</button>
    <button (click)="selectSize('L')">L</button>
  `
})
export class SizePickerComponent {
  @Input() size: string;
  @Output() sizeChange = new EventEmitter<string>();
  
  selectSize(newSize: string) {
    this.size = newSize;
    this.sizeChange.emit(newSize);
  }
}
```

**Usage:**
```typescript
<app-size-picker [(size)]="selectedSize"></app-size-picker>
<p>Size: {{ selectedSize }}</p>
```

### 4.6 Banana in a Box Syntax

**Why "Banana in a Box"?**

```
[( )] looks like a banana [(  )] in a box []
```

**Mnemonic:** Helps remember the syntax order.

**Breakdown:**
```typescript
[(ngModel)]="value"
 │└─────┘│
 │   │   │
 │   │   └─ Closing parenthesis
 │   └───── Property name
 └───────── Opening bracket

[ ] = Property binding
( ) = Event binding
[()] = Two-way binding
```

**Common Mistake:**
```typescript
<!-- ✗ Wrong order -->
([ngModel])="value"

<!-- ✓ Correct -->
[(ngModel)]="value"
```

---

## 5. Template Reference Variables

### 5.1 What are Template Reference Variables?

Template Reference Variables are **references to DOM elements or directives** in the template.

**Syntax:** `#variableName` or `ref-variableName`

**Think of it like:**
Giving a nickname to an element so you can reference it elsewhere in the template.

**Purpose:**
- Access element properties
- Call element methods
- Pass elements to component methods

### 5.2 Basic Syntax

**Hash (#) syntax:**

**Simple Example:**
```typescript
<input #nameInput type="text">
<button (click)="logValue(nameInput.value)">Log Value</button>
```

```typescript
export class InputComponent {
  logValue(value: string) {
    console.log('Input value:', value);
  }
}
```

**Alternative `ref-` syntax:**
```typescript
<input ref-nameInput type="text">
<button (click)="logValue(nameInput.value)">Log Value</button>
```

### 5.3 Referencing DOM Elements

**Access element properties:**

**Get Input Value:**
```typescript
<input #userInput type="text">
<p>You typed: {{ userInput.value }}</p>
```

**Focus Element:**
```typescript
<input #emailInput type="email">
<button (click)="emailInput.focus()">Focus Email</button>
```

**Check Checkbox:**
```typescript
<input #agreeCheckbox type="checkbox">
<button [disabled]="!agreeCheckbox.checked">Submit</button>
```

**Multiple References:**
```typescript
<input #input1 type="text">
<input #input2 type="text">
<button (click)="compare(input1.value, input2.value)">Compare</button>
```

```typescript
export class CompareComponent {
  compare(val1: string, val2: string) {
    console.log('Equal:', val1 === val2);
  }
}
```

### 5.4 Referencing Components

**Reference child components:**

**Child Component:**
```typescript
@Component({
  selector: 'app-child',
  template: '<p>Child Component</p>'
})
export class ChildComponent {
  message = 'Hello from child';
  
  sayHello() {
    console.log(this.message);
  }
}
```

**Parent Component:**
```typescript
@Component({
  template: `
    <app-child #childComp></app-child>
    <button (click)="childComp.sayHello()">Call Child Method</button>
    <p>{{ childComp.message }}</p>
  `
})
export class ParentComponent { }
```

**Another Example:**
```typescript
@Component({
  selector: 'app-timer',
  template: '<p>Time: {{ seconds }}</p>'
})
export class TimerComponent {
  seconds = 0;
  
  start() {
    setInterval(() => this.seconds++, 1000);
  }
  
  stop() {
    // Stop logic
  }
  
  reset() {
    this.seconds = 0;
  }
}
```

**Usage:**
```typescript
<app-timer #timer></app-timer>
<button (click)="timer.start()">Start</button>
<button (click)="timer.stop()">Stop</button>
<button (click)="timer.reset()">Reset</button>
```

### 5.5 Referencing Directives

**Reference directives with exportAs:**

**Form Directive:**
```typescript
<form #myForm="ngForm">
  <input name="username" ngModel>
  <button [disabled]="!myForm.valid">Submit</button>
</form>
<p>Form valid: {{ myForm.valid }}</p>
```

**NgModel Directive:**
```typescript
<input 
  name="email" 
  #emailModel="ngModel" 
  [(ngModel)]="email" 
  required>
<p>Valid: {{ emailModel.valid }}</p>
<p>Touched: {{ emailModel.touched }}</p>
```

### 5.6 Scope of Reference Variables

**Variables are scoped to the template:**

**Example:**
```typescript
<!-- ✓ Works: Same template -->
<input #input1>
<p>{{ input1.value }}</p>

<!-- ✗ Won't work: Different component -->
<app-other-component>
  <p>{{ input1.value }}</p>  <!-- input1 not accessible here -->
</app-other-component>
```

**Structural Directives Create New Scope:**
```typescript
<div *ngIf="true">
  <input #input1>
  <p>{{ input1.value }}</p>  <!-- ✓ Works -->
</div>
<p>{{ input1.value }}</p>  <!-- ✗ Error: input1 out of scope -->
```

**NgFor Creates Scope:**
```typescript
<div *ngFor="let item of items">
  <input #itemInput>
  <p>{{ itemInput.value }}</p>  <!-- ✓ Works -->
</div>
<p>{{ itemInput.value }}</p>  <!-- ✗ Error: out of scope -->
```

---

## 6. Template Expressions and Statements

### 6.1 Template Expressions

**Template expressions** are JavaScript-like expressions used in **interpolation and property binding**.

**Where used:**
```typescript
{{ expression }}      // Interpolation
[property]="expression"  // Property binding
```

**Simple Example:**
```typescript
{{ 1 + 1 }}           // 2
{{ name }}            // Property
{{ getName() }}       // Method call
{{ items.length }}    // Property access
{{ items[0] }}        // Array access
```

**Expression Context:**
```typescript
@Component({
  template: `
    <p>{{ name }}</p>           <!-- Component property -->
    <p>{{ user.email }}</p>     <!-- Object property -->
    <p>{{ getTotal() }}</p>     <!-- Method call -->
  `
})
export class ExpressionComponent {
  name = 'John';
  user = { email: 'john@example.com' };
  
  getTotal(): number {
    return 100;
  }
}
```

### 6.2 Template Statements

**Template statements** respond to events raised by bindings.

**Where used:**
```typescript
(event)="statement"  // Event binding
```

**Simple Example:**
```typescript
<button (click)="count = count + 1">Increment</button>
<button (click)="handleClick()">Click</button>
<button (click)="handleClick(); logMessage()">Multiple</button>
```

**Statement Context:**
```typescript
@Component({
  template: `
    <button (click)="count = 0">Reset</button>
    <button (click)="save()">Save</button>
    <input (keyup)="onKeyUp($event)">
  `
})
export class StatementComponent {
  count = 0;
  
  save() {
    console.log('Saved');
  }
  
  onKeyUp(event: KeyboardEvent) {
    console.log('Key:', event.key);
  }
}
```

### 6.3 Expression Context

**Template expressions can access:**

**1. Component Properties:**
```typescript
{{ name }}
{{ user.email }}
{{ items[0] }}
```

**2. Template Variables:**
```typescript
<input #myInput>
{{ myInput.value }}
```

**3. Template Context:**
```typescript
<div *ngFor="let item of items; let i = index">
  {{ item }}    <!-- Template variable -->
  {{ i }}       <!-- Template variable -->
</div>
```

**Cannot access:**
```typescript
<!-- ✗ Global variables -->
{{ window.location }}
{{ console.log('test') }}
{{ Math.random() }}

<!-- ✗ Template doesn't see these -->
{{ localStorage }}
{{ document }}
```

**Workaround for globals:**
```typescript
// Component
export class GlobalComponent {
  Math = Math;  // Expose to template
  
  get currentUrl(): string {
    return window.location.href;
  }
}

// Template
{{ Math.random() }}
{{ currentUrl }}
```

### 6.4 Allowed Operations

**Expressions support:**

**1. Property Access:**
```typescript
{{ user.name }}
{{ user.address.city }}
```

**2. Array/Object Indexing:**
```typescript
{{ items[0] }}
{{ users[userId] }}
```

**3. Method Calls:**
```typescript
{{ getName() }}
{{ calculateTotal(price, quantity) }}
```

**4. Arithmetic:**
```typescript
{{ a + b }}
{{ price * quantity }}
{{ total / count }}
```

**5. Comparison:**
```typescript
{{ age > 18 }}
{{ name === 'John' }}
{{ count <= 10 }}
```

**6. Logical Operators:**
```typescript
{{ isValid && isActive }}
{{ hasError || hasWarning }}
{{ !isDisabled }}
```

**7. Ternary Operator:**
```typescript
{{ isActive ? 'Active' : 'Inactive' }}
{{ age >= 18 ? 'Adult' : 'Minor' }}
```

**8. Nullish Coalescing:**
```typescript
{{ userName ?? 'Guest' }}
{{ value ?? 0 }}
```

**9. Optional Chaining:**
```typescript
{{ user?.name }}
{{ data?.items?.[0] }}
```

### 6.5 Forbidden Operations

**Expressions CANNOT contain:**

**1. Assignments:**
```typescript
<!-- ✗ Error -->
{{ name = 'John' }}
{{ count++ }}
{{ total += 10 }}
```

**2. new, typeof, instanceof:**
```typescript
<!-- ✗ Error -->
{{ new Date() }}
{{ typeof name }}
{{ user instanceof User }}
```

**3. Chaining with ; or ,:**
```typescript
<!-- ✗ Error -->
{{ name; age }}
{{ a, b, c }}
```

**4. Increment/Decrement:**
```typescript
<!-- ✗ Error -->
{{ count++ }}
{{ --value }}
```

**5. Bitwise Operators:**
```typescript
<!-- ✗ Error -->
{{ a | b }}
{{ a & b }}
```

### 6.6 Expression Guidelines

**Best Practices:**

**1. Keep Simple:**
```typescript
<!-- ✓ Good -->
{{ fullName }}

<!-- ✗ Bad: Too complex -->
{{ firstName.trim().toUpperCase() + ' ' + lastName.trim().toUpperCase() }}
```

**2. No Side Effects:**
```typescript
<!-- ✗ Bad: Changes data -->
{{ updateUser() }}

<!-- ✓ Good: Pure function -->
{{ getUser() }}
```

**3. Fast Execution:**
```typescript
<!-- ✗ Bad: Slow operation -->
{{ sortLargeArray() }}

<!-- ✓ Good: Pre-computed -->
{{ sortedArray }}
```

**4. Idempotent:**
```typescript
<!-- ✓ Good: Same input = same output -->
{{ calculateTotal() }}

<!-- ✗ Bad: Different every time -->
{{ Math.random() }}
```

---

## 7. Safe Navigation Operator and Nullish Coalescing

### 7.1 Safe Navigation Operator (?.)

**The safe navigation operator (`?.`)** protects against null/undefined errors.

**Problem without `?.`:**
```typescript
@Component({
  template: '<p>{{ user.name }}</p>'
})
export class UserComponent {
  user = null;  // Error: Cannot read property 'name' of null
}
```

**Solution with `?.`:**
```typescript
@Component({
  template: '<p>{{ user?.name }}</p>'
})
export class UserComponent {
  user = null;  // No error, displays nothing
}
```

**How it works:**
```typescript
user?.name
// If user is null/undefined → returns undefined
// If user exists → returns user.name
```

**Simple Examples:**

**Object Properties:**
```typescript
{{ user?.name }}
{{ user?.address?.city }}
{{ product?.details?.price }}
```

```typescript
export class SafeComponent {
  user = null;  // Safe, won't error
  // user = { name: 'John' };  // Displays: John
}
```

**Array Access:**
```typescript
{{ users?.[0] }}
{{ data?.items?.[index] }}
```

```typescript
export class ArrayComponent {
  users = null;  // Safe
  data = { items: [1, 2, 3] };
  index = 0;
}
```

**Method Calls:**
```typescript
{{ user?.getName() }}
{{ data?.getTotal?.() }}
```

```typescript
export class MethodComponent {
  user = null;  // Safe, won't call getName
}
```

**Chaining:**
```typescript
{{ user?.profile?.settings?.theme }}
{{ response?.data?.users?.[0]?.name }}
```

### 7.2 Non-Null Assertion Operator (!)

**The non-null assertion operator (`!`)** tells TypeScript "this is definitely not null/undefined".

**Use with caution!**

**Example:**
```typescript
@Component({
  template: '<p>{{ user!.name }}</p>'
})
export class AssertComponent {
  user: User | null = null;
  
  ngOnInit() {
    this.user = { name: 'John' };
  }
}
```

**When to use:**
```typescript
// ✓ When you're certain value exists
{{ user!.name }}  // After checking user exists

// ✗ Dangerous if unsure
{{ maybeUser!.name }}  // Runtime error if null
```

**Comparison:**
```typescript
// Safe navigation: No error, returns undefined
{{ user?.name }}

// Non-null assertion: Assumes not null, errors if wrong
{{ user!.name }}
```

### 7.3 Nullish Coalescing Operator (??)

**The nullish coalescing operator (`??`)** provides a default value when value is null/undefined.

**Syntax:** `value ?? defaultValue`

**Simple Example:**
```typescript
{{ username ?? 'Guest' }}
{{ age ?? 0 }}
{{ message ?? 'No message' }}
```

```typescript
export class DefaultComponent {
  username = null;     // Displays: Guest
  age = undefined;     // Displays: 0
  message = '';        // Displays: (empty string, not 'No message')
}
```

**vs OR operator (||):**

**Difference:**
```typescript
// ?? only checks for null/undefined
{{ value ?? 'default' }}

// || checks for falsy (0, '', false, null, undefined)
{{ value || 'default' }}
```

**Comparison:**
```typescript
export class ComparisonComponent {
  zero = 0;
  empty = '';
  nullValue = null;
}
```

```html
<!-- ?? operator -->
{{ zero ?? 'default' }}       // 0 (keeps 0)
{{ empty ?? 'default' }}      // (keeps empty string)
{{ nullValue ?? 'default' }}  // default

<!-- || operator -->
{{ zero || 'default' }}       // default (0 is falsy)
{{ empty || 'default' }}      // default ('' is falsy)
{{ nullValue || 'default' }}  // default
```

**When to use `??`:**
```typescript
<!-- ✓ Good: Want to keep 0, false, '' -->
{{ count ?? 0 }}
{{ isEnabled ?? true }}

<!-- ✓ Good: Only replace null/undefined -->
{{ userName ?? 'Anonymous' }}
```

**When to use `||`:**
```typescript
<!-- ✓ Good: Want to replace all falsy values -->
{{ message || 'No message' }}
{{ title || 'Untitled' }}
```

### 7.4 Combining Operators

**Safe navigation + Nullish coalescing:**
```typescript
{{ user?.name ?? 'Guest' }}
{{ data?.items?.[0] ?? 'No items' }}
{{ product?.price ?? 0 }}
```

```typescript
export class CombinedComponent {
  user = null;        // Displays: Guest
  data = null;        // Displays: No items
  product = { };      // Displays: 0
}
```

**Complex example:**
```typescript
{{ user?.profile?.settings?.theme ?? 'default' }}
```

**Breakdown:**
```
1. user?.profile → checks if user exists
2. ?.settings → checks if profile exists
3. ?.theme → checks if settings exists
4. ?? 'default' → if any step is null/undefined, use 'default'
```

**Real-world example:**
```typescript
@Component({
  template: `
    <h1>{{ user?.name ?? 'Anonymous User' }}</h1>
    <p>Email: {{ user?.email ?? 'No email provided' }}</p>
    <p>Age: {{ user?.age ?? 'Not specified' }}</p>
    <p>City: {{ user?.address?.city ?? 'Unknown' }}</p>
  `
})
export class ProfileComponent {
  user = null;  // All display default values
}
```

### 7.5 When to Use Each Operator

| Operator | Purpose | Use When |
|----------|---------|----------|
| **`?.`** | Safe navigation | Prevent null/undefined errors |
| **`!`** | Non-null assertion | You're certain value exists |
| **`??`** | Nullish coalescing | Provide defaults for null/undefined |
| **`||`** | OR operator | Provide defaults for any falsy value |

**Decision Tree:**
```
Need to access nested property?
├─ Value might be null? → Use ?.
└─ Value definitely exists? → Use ! (or nothing)

Need a default value?
├─ Only for null/undefined? → Use ??
└─ For all falsy values? → Use ||
```

**Examples:**
```typescript
// Safe access to nested property
{{ user?.profile?.bio }}

// Access with default
{{ user?.name ?? 'Guest' }}

// Multiple levels with default
{{ data?.items?.[0]?.title ?? 'No title' }}

// Assertion when certain
{{ loggedInUser!.id }}

// OR for empty strings
{{ title || 'Untitled' }}
```

---

## 8. Attribute vs Property Binding

### 8.1 Understanding the Difference

**Attributes** and **Properties** are different concepts:

**Attributes:**
- Defined in HTML
- Initialize DOM properties
- Static (don't change after initialization)
- String values only

**Properties:**
- Defined in DOM
- Current state of element
- Dynamic (change over time)
- Any type (string, boolean, object)

**Example:**
```html
<input type="text" value="Hello">
```

**Initial state:**
```
Attribute value: "Hello"
Property value: "Hello"
```

**After user types "World":**
```
Attribute value: "Hello" (unchanged)
Property value: "World" (updated)
```

**Visual:**
```
HTML Attribute → Initialize → DOM Property → Current State
    (static)                      (dynamic)
```

### 8.2 Attribute Binding Syntax

**Use `attr.` prefix for attribute binding:**

**Syntax:** `[attr.attributeName]="expression"`

**Simple Example:**
```typescript
<button [attr.aria-label]="buttonLabel">Click</button>
<div [attr.data-id]="userId">User Info</div>
<td [attr.colspan]="columnSpan">Cell</td>
```

```typescript
export class AttributeComponent {
  buttonLabel = 'Submit form';
  userId = '123';
  columnSpan = 2;
}
```

**Output:**
```html
<button aria-label="Submit form">Click</button>
<div data-id="123">User Info</div>
<td colspan="2">Cell</td>
```

### 8.3 When to Use Attribute Binding

**Use attribute binding when:**

**1. No corresponding DOM property:**
```typescript
<!-- ARIA attributes -->
<button [attr.aria-label]="label">Click</button>
<div [attr.aria-hidden]="isHidden">Content</div>

<!-- Data attributes -->
<div [attr.data-user-id]="userId">User</div>

<!-- Colspan/Rowspan -->
<td [attr.colspan]="span">Cell</td>
```

**2. SVG attributes:**
```typescript
<svg>
  <circle 
    [attr.cx]="x" 
    [attr.cy]="y" 
    [attr.r]="radius">
  </circle>
</svg>
```

```typescript
export class SvgComponent {
  x = 50;
  y = 50;
  radius = 40;
}
```

**Don't use attribute binding when property exists:**
```typescript
<!-- ✗ Bad: Use property binding instead -->
<img [attr.src]="imageUrl">
<button [attr.disabled]="isDisabled">

<!-- ✓ Good: Property binding -->
<img [src]="imageUrl">
<button [disabled]="isDisabled">
```

### 8.4 ARIA Attributes

**Accessibility attributes:**

**Simple Examples:**
```typescript
<button 
  [attr.aria-label]="'Delete ' + userName"
  [attr.aria-pressed]="isPressed">
  Delete
</button>

<div 
  [attr.aria-expanded]="isExpanded"
  [attr.aria-controls]="panelId">
  Toggle Panel
</div>

<input 
  [attr.aria-required]="isRequired"
  [attr.aria-invalid]="hasError">
```

```typescript
export class AccessibleComponent {
  userName = 'John';
  isPressed = false;
  isExpanded = true;
  panelId = 'panel-1';
  isRequired = true;
  hasError = false;
}
```

**Output:**
```html
<button aria-label="Delete John" aria-pressed="false">Delete</button>
<div aria-expanded="true" aria-controls="panel-1">Toggle Panel</div>
<input aria-required="true" aria-invalid="false">
```

### 8.5 Data Attributes

**Custom data attributes:**

**Simple Example:**
```typescript
<div 
  [attr.data-user-id]="userId"
  [attr.data-role]="userRole"
  [attr.data-active]="isActive">
  User Card
</div>
```

```typescript
export class DataComponent {
  userId = 42;
  userRole = 'admin';
  isActive = true;
}
```

**Output:**
```html
<div 
  data-user-id="42" 
  data-role="admin" 
  data-active="true">
  User Card
</div>
```

**Use cases:**
- Testing hooks
- CSS selectors
- Third-party integrations

### 8.6 Class Binding

**Multiple ways to bind CSS classes:**

**1. Single Class Binding:**
```typescript
<div [class.active]="isActive">Content</div>
<div [class.disabled]="isDisabled">Content</div>
```

```typescript
export class ClassComponent {
  isActive = true;
  isDisabled = false;
}
```

**Output:**
```html
<div class="active">Content</div>
<div>Content</div>
```

**2. Multiple Classes (ngClass):**
```typescript
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
  Content
</div>

<div [ngClass]="currentClasses">Content</div>
```

```typescript
export class NgClassComponent {
  isActive = true;
  isDisabled = false;
  
  currentClasses = {
    'active': this.isActive,
    'disabled': this.isDisabled,
    'highlight': true
  };
}
```

**3. String Binding:**
```typescript
<div [class]="className">Content</div>
<div [class]="'primary large'">Content</div>
```

```typescript
export class StringComponent {
  className = 'btn btn-primary';
}
```

**4. Array Binding:**
```typescript
<div [ngClass]="['btn', 'btn-primary', 'active']">Button</div>
<div [ngClass]="classList">Button</div>
```

```typescript
export class ArrayComponent {
  classList = ['btn', 'btn-primary'];
}
```

**Combining:**
```typescript
<div 
  class="base-class"
  [class.active]="isActive"
  [ngClass]="additionalClasses">
  Content
</div>
```

### 8.7 Style Binding

**Multiple ways to bind inline styles:**

**1. Single Style Binding:**
```typescript
<div [style.color]="textColor">Text</div>
<div [style.font-size.px]="fontSize">Text</div>
<div [style.width.%]="width">Content</div>
```

```typescript
export class StyleComponent {
  textColor = 'blue';
  fontSize = 16;
  width = 50;
}
```

**Output:**
```html
<div style="color: blue;">Text</div>
<div style="font-size: 16px;">Text</div>
<div style="width: 50%;">Content</div>
```

**2. Multiple Styles (ngStyle):**
```typescript
<div [ngStyle]="{'color': textColor, 'font-size': fontSize + 'px'}">
  Text
</div>

<div [ngStyle]="currentStyles">Text</div>
```

```typescript
export class NgStyleComponent {
  textColor = 'red';
  fontSize = 20;
  
  currentStyles = {
    'color': this.textColor,
    'font-size': this.fontSize + 'px',
    'background-color': '#f0f0f0'
  };
}
```

**3. Style Object:**
```typescript
<div [style]="styleObject">Text</div>
```

```typescript
export class ObjectComponent {
  styleObject = {
    color: 'blue',
    'font-size': '20px',
    border: '1px solid black'
  };
}
```

**4. Conditional Styles:**
```typescript
<div [style.color]="isError ? 'red' : 'green'">Status</div>
<div [style.display]="isVisible ? 'block' : 'none'">Content</div>
```

```typescript
export class ConditionalComponent {
  isError = false;
  isVisible = true;
}
```

**Units:**
```typescript
<!-- Automatic units -->
<div [style.width.px]="200">Width in pixels</div>
<div [style.height.%]="50">Height in percent</div>
<div [style.margin.em]="2">Margin in em</div>
<div [style.padding.rem]="1.5">Padding in rem</div>
```

**Combining:**
```typescript
<div 
  style="padding: 10px;"
  [style.color]="textColor"
  [ngStyle]="additionalStyles">
  Styled content
</div>
```

---

## Summary

You've mastered **Angular Templates and Data Binding**!

**Key Concepts:**

**1. Interpolation (`{{ }}`):**
- Display component data in text
- One-way: Component → Template
- Use for text content

**2. Property Binding (`[ ]`):**
- Set element/component properties
- One-way: Component → Template
- Use for element properties, not text

**3. Event Binding (`( )`):**
- Listen to DOM events
- One-way: Template → Component
- Access event with `$event`

**4. Two-Way Binding (`[( )]`):**
- Synchronize data both ways
- Component ↔ Template
- "Banana in a box" syntax
- Requires FormsModule

**5. Template Reference Variables (`#var`):**
- Reference elements in template
- Access properties and methods
- Scoped to template

**6. Template Expressions & Statements:**
- Expressions: In `{{ }}` and `[property]`
- Statements: In `(event)`
- Keep simple and pure

**7. Safe Navigation (`?.`):**
- Prevent null/undefined errors
- Chain safely through nested properties

**8. Nullish Coalescing (`??`):**
- Provide default values
- Only for null/undefined (not other falsy)

**9. Attribute Binding (`[attr.]`):**
- Bind to HTML attributes
- Use for ARIA, data attributes, SVG
- Different from property binding

**10. Class & Style Binding:**
- `[class.name]` for single class
- `[ngClass]` for multiple classes
- `[style.property]` for single style
- `[ngStyle]` for multiple styles

**Data Binding Overview:**
```
Interpolation:     {{ value }}           Component → View
Property Binding:  [property]="value"    Component → View
Event Binding:     (event)="handler"     View → Component
Two-Way Binding:   [(ngModel)]="value"   Component ↔ View
```

**Best Practices:**
- Use interpolation for text content
- Use property binding for element properties
- Keep expressions simple
- Use safe navigation for nullable values
- Prefer nullish coalescing over OR for defaults
- Clean up event listeners in ngOnDestroy

Master these binding techniques for dynamic, interactive Angular applications!
