# Angular Directives

## Index

1. [Introduction to Directives](#1-introduction-to-directives)
   - 1.1 [What are Directives?](#11-what-are-directives)
   - 1.2 [Types of Directives](#12-types-of-directives)
   - 1.3 [Directives vs Components](#13-directives-vs-components)

2. [Structural Directives](#2-structural-directives)
   - 2.1 [What are Structural Directives?](#21-what-are-structural-directives)
   - 2.2 [ngIf](#22-ngif)
   - 2.3 [ngFor](#23-ngfor)
   - 2.4 [ngSwitch](#24-ngswitch)
   - 2.5 [Asterisk (*) Syntax](#25-asterisk--syntax)
   - 2.6 [ng-template](#26-ng-template)
   - 2.7 [ng-container](#27-ng-container)

3. [Attribute Directives](#3-attribute-directives)
   - 3.1 [What are Attribute Directives?](#31-what-are-attribute-directives)
   - 3.2 [ngClass](#32-ngclass)
   - 3.3 [ngStyle](#33-ngstyle)
   - 3.4 [ngModel](#34-ngmodel)
   - 3.5 [Built-in Attribute Directives](#35-built-in-attribute-directives)

4. [Custom Directives Creation](#4-custom-directives-creation)
   - 4.1 [Creating a Custom Directive](#41-creating-a-custom-directive)
   - 4.2 [Directive Decorator](#42-directive-decorator)
   - 4.3 [ElementRef and Renderer2](#43-elementref-and-renderer2)
   - 4.4 [Input Properties in Directives](#44-input-properties-in-directives)
   - 4.5 [Creating Structural Directives](#45-creating-structural-directives)

5. [Directive Lifecycle Hooks](#5-directive-lifecycle-hooks)
   - 5.1 [Available Lifecycle Hooks](#51-available-lifecycle-hooks)
   - 5.2 [ngOnInit](#52-ngoninit)
   - 5.3 [ngOnChanges](#53-ngonchanges)
   - 5.4 [ngOnDestroy](#54-ngondestroy)
   - 5.5 [Other Lifecycle Hooks](#55-other-lifecycle-hooks)

6. [HostListener and HostBinding](#6-hostlistener-and-hostbinding)
   - 6.1 [HostListener](#61-hostlistener)
   - 6.2 [HostBinding](#62-hostbinding)
   - 6.3 [Combining HostListener and HostBinding](#63-combining-hostlistener-and-hostbinding)
   - 6.4 [Host Property in Directive Decorator](#64-host-property-in-directive-decorator)

7. [Standalone Directives](#7-standalone-directives)
   - 7.1 [What are Standalone Directives?](#71-what-are-standalone-directives)
   - 7.2 [Creating Standalone Directives](#72-creating-standalone-directives)
   - 7.3 [Importing Standalone Directives](#73-importing-standalone-directives)
   - 7.4 [Converting to Standalone](#74-converting-to-standalone)
   - 7.5 [Benefits of Standalone Directives](#75-benefits-of-standalone-directives)

---

## 1. Introduction to Directives

### 1.1 What are Directives?

Directives are **instructions to the DOM**. They tell Angular how to transform or manipulate elements in the template.

**Think of it like:**
A remote control that tells your TV what to do (change channel, adjust volume, turn off). Directives tell DOM elements what to do.

**Purpose:**
- Manipulate DOM elements
- Add/remove elements
- Change appearance
- Handle events
- Add behavior

**Simple Example:**
```typescript
<!-- Directive tells div to hide if false -->
<div *ngIf="isVisible">Content</div>

<!-- Directive adds CSS class -->
<div [ngClass]="{'active': isActive}">Styled</div>
```

### 1.2 Types of Directives

**Three Types:**

```
Directives
├── Component Directives (components with templates)
├── Structural Directives (change DOM structure)
└── Attribute Directives (change appearance or behavior)
```

**1. Component Directives:**
```typescript
@Component({
  selector: 'app-user',
  template: '<p>User Component</p>'
})
export class UserComponent { }
```
- Components are directives with templates
- Most common type

**2. Structural Directives:**
```typescript
<div *ngIf="true">Shown</div>
<div *ngFor="let item of items">{{ item }}</div>
```
- Add or remove elements
- Change DOM layout
- Prefix with `*`

**3. Attribute Directives:**
```typescript
<div [ngClass]="'active'">Styled</div>
<div appHighlight>Highlighted</div>
```
- Change element appearance
- Change element behavior
- No `*` prefix

### 1.3 Directives vs Components

**Comparison:**

| Feature | Component | Directive |
|---------|-----------|-----------|
| **Template** | Has template | No template |
| **Selector** | Element selector | Attribute selector |
| **Purpose** | Create UI | Modify UI |
| **Example** | `<app-user></app-user>` | `<div appHighlight>` |

**Component:**
```typescript
@Component({
  selector: 'app-card',
  template: '<div class="card">Content</div>'
})
export class CardComponent { }
```

**Directive:**
```typescript
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective { }
```

**When to use:**
- **Component**: Need to display content with template
- **Directive**: Need to modify existing elements

---

## 2. Structural Directives

### 2.1 What are Structural Directives?

Structural directives **change the DOM structure** by adding, removing, or manipulating elements.

**Key Feature:**
- Prefix with asterisk `*`
- Modify DOM layout
- Add/remove elements from DOM

**Think of it like:**
A construction manager who decides which rooms to build or demolish in a house.

**Common Structural Directives:**
- `*ngIf` - Conditional rendering
- `*ngFor` - Loop through items
- `*ngSwitch` - Switch between options

### 2.2 ngIf

**ngIf shows or hides elements based on a condition.**

**Basic Syntax:**
```typescript
<element *ngIf="condition">Content</element>
```

**Simple Examples:**

**1. Basic Usage:**
```typescript
<div *ngIf="isVisible">
  This content is visible
</div>
```

```typescript
export class AppComponent {
  isVisible = true;
}
```

**Output when isVisible = true:**
```html
<div>This content is visible</div>
```

**Output when isVisible = false:**
```html
<!-- Element removed from DOM -->
```

**2. With Expression:**
```typescript
<p *ngIf="age >= 18">You are an adult</p>
<p *ngIf="score > 50">You passed!</p>
<p *ngIf="items.length > 0">Items available</p>
```

```typescript
export class ExampleComponent {
  age = 25;
  score = 75;
  items = [1, 2, 3];
}
```

**3. ngIf with Else:**
```typescript
<div *ngIf="isLoggedIn; else loggedOut">
  Welcome back!
</div>

<ng-template #loggedOut>
  <div>Please log in</div>
</ng-template>
```

```typescript
export class LoginComponent {
  isLoggedIn = false;
}
```

**Output:**
```html
<div>Please log in</div>
```

**4. ngIf with Then and Else:**
```typescript
<div *ngIf="isLoading; then loading else content"></div>

<ng-template #loading>
  <p>Loading...</p>
</ng-template>

<ng-template #content>
  <p>Content loaded!</p>
</ng-template>
```

**5. Store Result in Variable:**
```typescript
<div *ngIf="user$ | async as user">
  Hello {{ user.name }}
</div>

<div *ngIf="getUser() as user">
  Email: {{ user.email }}
</div>
```

```typescript
export class UserComponent {
  user$ = of({ name: 'John', email: 'john@example.com' });
  
  getUser() {
    return { name: 'Jane', email: 'jane@example.com' };
  }
}
```

**Important:**
`*ngIf` **removes** element from DOM (not just hides it).

```typescript
<!-- ngIf: Removes from DOM -->
<div *ngIf="false">Not in DOM</div>

<!-- Hidden: Still in DOM -->
<div [style.display]="false ? 'block' : 'none'">In DOM, hidden</div>
```

### 2.3 ngFor

**ngFor loops through arrays and creates elements for each item.**

**Basic Syntax:**
```typescript
<element *ngFor="let item of items">{{ item }}</element>
```

**Simple Examples:**

**1. Basic Loop:**
```typescript
<ul>
  <li *ngFor="let fruit of fruits">{{ fruit }}</li>
</ul>
```

```typescript
export class ListComponent {
  fruits = ['Apple', 'Banana', 'Orange'];
}
```

**Output:**
```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>
```

**2. With Index:**
```typescript
<div *ngFor="let item of items; let i = index">
  {{ i + 1 }}. {{ item }}
</div>
```

```typescript
export class IndexComponent {
  items = ['First', 'Second', 'Third'];
}
```

**Output:**
```
1. First
2. Second
3. Third
```

**3. Loop Through Objects:**
```typescript
<div *ngFor="let user of users">
  <h3>{{ user.name }}</h3>
  <p>Age: {{ user.age }}</p>
</div>
```

```typescript
export class UsersComponent {
  users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 35 }
  ];
}
```

**4. ngFor with Additional Variables:**
```typescript
<div *ngFor="let item of items; 
             let i = index;
             let first = first;
             let last = last;
             let even = even;
             let odd = odd">
  
  <p>Index: {{ i }}</p>
  <p>First: {{ first }}</p>
  <p>Last: {{ last }}</p>
  <p>Even: {{ even }}</p>
  <p>Odd: {{ odd }}</p>
  <p>Item: {{ item }}</p>
  <hr>
</div>
```

```typescript
export class VariablesComponent {
  items = ['A', 'B', 'C'];
}
```

**5. trackBy for Performance:**
```typescript
<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item.name }}
</div>
```

```typescript
export class TrackByComponent {
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ];
  
  trackByFn(index: number, item: any): number {
    return item.id;  // Track by unique id
  }
}
```

**Why trackBy?**
```typescript
// Without trackBy: Angular recreates all elements on change
// With trackBy: Angular only updates changed items (better performance)
```

**6. Nested ngFor:**
```typescript
<div *ngFor="let category of categories">
  <h2>{{ category.name }}</h2>
  <ul>
    <li *ngFor="let product of category.products">
      {{ product }}
    </li>
  </ul>
</div>
```

```typescript
export class NestedComponent {
  categories = [
    { name: 'Fruits', products: ['Apple', 'Banana'] },
    { name: 'Vegetables', products: ['Carrot', 'Broccoli'] }
  ];
}
```

### 2.4 ngSwitch

**ngSwitch displays one element from several possibilities.**

**Basic Syntax:**
```typescript
<div [ngSwitch]="value">
  <p *ngSwitchCase="'option1'">Option 1</p>
  <p *ngSwitchCase="'option2'">Option 2</p>
  <p *ngSwitchDefault>Default</p>
</div>
```

**Simple Examples:**

**1. Basic Switch:**
```typescript
<div [ngSwitch]="color">
  <p *ngSwitchCase="'red'">Red color selected</p>
  <p *ngSwitchCase="'blue'">Blue color selected</p>
  <p *ngSwitchCase="'green'">Green color selected</p>
  <p *ngSwitchDefault>Unknown color</p>
</div>
```

```typescript
export class SwitchComponent {
  color = 'red';
}
```

**Output:**
```html
<div>
  <p>Red color selected</p>
</div>
```

**2. Number Switch:**
```typescript
<div [ngSwitch]="status">
  <p *ngSwitchCase="1">Active</p>
  <p *ngSwitchCase="2">Pending</p>
  <p *ngSwitchCase="3">Inactive</p>
  <p *ngSwitchDefault>Unknown status</p>
</div>
```

```typescript
export class StatusComponent {
  status = 1;
}
```

**3. User Role Example:**
```typescript
<div [ngSwitch]="userRole">
  <div *ngSwitchCase="'admin'">
    <h2>Admin Dashboard</h2>
    <button>Manage Users</button>
  </div>
  
  <div *ngSwitchCase="'user'">
    <h2>User Dashboard</h2>
    <button>View Profile</button>
  </div>
  
  <div *ngSwitchCase="'guest'">
    <h2>Guest View</h2>
    <button>Sign In</button>
  </div>
  
  <div *ngSwitchDefault>
    <p>Please log in</p>
  </div>
</div>
```

```typescript
export class RoleComponent {
  userRole = 'admin';
}
```

**vs Multiple ngIf:**
```typescript
<!-- Using ngSwitch (cleaner) -->
<div [ngSwitch]="value">
  <p *ngSwitchCase="'a'">A</p>
  <p *ngSwitchCase="'b'">B</p>
</div>

<!-- Using ngIf (messier) -->
<p *ngIf="value === 'a'">A</p>
<p *ngIf="value === 'b'">B</p>
```

### 2.5 Asterisk (*) Syntax

**The asterisk `*` is syntactic sugar for `<ng-template>`.**

**What Angular Does:**
```typescript
<!-- You write: -->
<div *ngIf="condition">Content</div>

<!-- Angular converts to: -->
<ng-template [ngIf]="condition">
  <div>Content</div>
</ng-template>
```

**More Examples:**

**ngFor:**
```typescript
<!-- Shorthand -->
<div *ngFor="let item of items">{{ item }}</div>

<!-- Expanded -->
<ng-template ngFor let-item [ngForOf]="items">
  <div>{{ item }}</div>
</ng-template>
```

**ngIf with else:**
```typescript
<!-- Shorthand -->
<div *ngIf="condition; else elseBlock">True</div>
<ng-template #elseBlock>False</ng-template>

<!-- Expanded -->
<ng-template [ngIf]="condition" [ngIfElse]="elseBlock">
  <div>True</div>
</ng-template>
<ng-template #elseBlock>False</ng-template>
```

**Why use asterisk?**
- Cleaner syntax
- Easier to read
- Less verbose

**When to use expanded form:**
- Complex conditions
- Multiple structural directives
- Fine control over template

### 2.6 ng-template

**`<ng-template>` defines a template that isn't rendered by default.**

**Simple Examples:**

**1. Basic Usage:**
```typescript
<ng-template #myTemplate>
  <p>This is not rendered automatically</p>
</ng-template>

<!-- Render it with ngIf -->
<div *ngIf="show; else myTemplate">
  Shown when true
</div>
```

**2. With ngIf else:**
```typescript
<div *ngIf="isLoggedIn; else loginMessage">
  Welcome back!
</div>

<ng-template #loginMessage>
  <p>Please log in to continue</p>
</ng-template>
```

**3. Multiple Templates:**
```typescript
<div *ngIf="status === 'loading'; then loading else loaded"></div>

<ng-template #loading>
  <p>Loading...</p>
</ng-template>

<ng-template #loaded>
  <p>Content ready!</p>
</ng-template>
```

**4. Reusable Template:**
```typescript
<ng-template #cardTemplate let-title="title" let-content="content">
  <div class="card">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
  </div>
</ng-template>

<ng-container 
  *ngTemplateOutlet="cardTemplate; 
  context: {title: 'Card 1', content: 'Content 1'}">
</ng-container>

<ng-container 
  *ngTemplateOutlet="cardTemplate; 
  context: {title: 'Card 2', content: 'Content 2'}">
</ng-container>
```

### 2.7 ng-container

**`<ng-container>` is a logical container that doesn't create a DOM element.**

**Problem without ng-container:**
```typescript
<!-- Extra div wrapper created -->
<div *ngIf="condition">
  <p>Content</p>
</div>
```

**Solution with ng-container:**
```typescript
<!-- No wrapper element -->
<ng-container *ngIf="condition">
  <p>Content</p>
</ng-container>
```

**Simple Examples:**

**1. Multiple Structural Directives:**
```typescript
<!-- ✗ Can't use two structural directives on same element -->
<div *ngIf="condition" *ngFor="let item of items">
  {{ item }}
</div>

<!-- ✓ Use ng-container -->
<ng-container *ngIf="condition">
  <div *ngFor="let item of items">
    {{ item }}
  </div>
</ng-container>
```

**2. Group Elements:**
```typescript
<ng-container *ngIf="showDetails">
  <h2>Details</h2>
  <p>Name: {{ name }}</p>
  <p>Age: {{ age }}</p>
</ng-container>
```

**3. With ngSwitch:**
```typescript
<ng-container [ngSwitch]="userType">
  <ng-container *ngSwitchCase="'admin'">
    <h1>Admin Panel</h1>
    <button>Manage</button>
  </ng-container>
  
  <ng-container *ngSwitchCase="'user'">
    <h1>User Panel</h1>
    <button>View</button>
  </ng-container>
</ng-container>
```

---

## 3. Attribute Directives

### 3.1 What are Attribute Directives?

Attribute directives **change the appearance or behavior** of an element, component, or another directive.

**Key Features:**
- No asterisk `*`
- Don't add/remove elements
- Change existing elements
- Applied as attributes

**Think of it like:**
A painter who changes the color of a room (the room stays, just looks different).

**Common Attribute Directives:**
- `ngClass` - Add/remove CSS classes
- `ngStyle` - Add/remove inline styles
- `ngModel` - Two-way data binding

### 3.2 ngClass

**ngClass adds or removes CSS classes dynamically.**

**Syntax Options:**

**1. String:**
```typescript
<div [ngClass]="'active'">Content</div>
<div [ngClass]="className">Content</div>
```

```typescript
export class ClassComponent {
  className = 'highlight bold';
}
```

**2. Array:**
```typescript
<div [ngClass]="['btn', 'btn-primary', 'large']">Button</div>
<div [ngClass]="classList">Button</div>
```

```typescript
export class ArrayComponent {
  classList = ['active', 'highlighted'];
}
```

**3. Object (Most Common):**
```typescript
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
  Content
</div>
```

```typescript
export class ObjectComponent {
  isActive = true;
  isDisabled = false;
}
```

**Output:**
```html
<div class="active">Content</div>
```

**Simple Examples:**

**1. Toggle Class:**
```typescript
<button [ngClass]="{'active': isSelected}" 
        (click)="isSelected = !isSelected">
  Toggle
</button>
```

```typescript
export class ToggleComponent {
  isSelected = false;
}
```

**2. Multiple Conditions:**
```typescript
<div [ngClass]="{
  'success': status === 'success',
  'error': status === 'error',
  'warning': status === 'warning'
}">
  Status message
</div>
```

```typescript
export class StatusComponent {
  status = 'success';
}
```

**3. Dynamic Classes:**
```typescript
<div [ngClass]="getClasses()">Content</div>
```

```typescript
export class DynamicComponent {
  isActive = true;
  hasError = false;
  
  getClasses() {
    return {
      'active': this.isActive,
      'error': this.hasError,
      'bold': true
    };
  }
}
```

**4. Combining with Static Classes:**
```typescript
<div class="base-class" [ngClass]="{'active': isActive}">
  Content
</div>
```

**Output when isActive = true:**
```html
<div class="base-class active">Content</div>
```

### 3.3 ngStyle

**ngStyle adds or removes inline styles dynamically.**

**Syntax Options:**

**1. Object:**
```typescript
<div [ngStyle]="{'color': 'red', 'font-size': '20px'}">
  Styled text
</div>
```

**2. Component Property:**
```typescript
<div [ngStyle]="currentStyles">Styled</div>
```

```typescript
export class StyleComponent {
  currentStyles = {
    'color': 'blue',
    'font-size': '16px',
    'background-color': '#f0f0f0'
  };
}
```

**Simple Examples:**

**1. Conditional Styles:**
```typescript
<p [ngStyle]="{'color': isError ? 'red' : 'green'}">
  Status message
</p>
```

```typescript
export class ConditionalComponent {
  isError = false;
}
```

**2. Dynamic Values:**
```typescript
<div [ngStyle]="{
  'width': width + 'px',
  'height': height + 'px',
  'background-color': bgColor
}">
  Box
</div>
```

```typescript
export class BoxComponent {
  width = 200;
  height = 100;
  bgColor = '#3498db';
}
```

**3. Multiple Styles:**
```typescript
<div [ngStyle]="getStyles()">Content</div>
```

```typescript
export class MultiStyleComponent {
  fontSize = 16;
  
  getStyles() {
    return {
      'font-size': this.fontSize + 'px',
      'color': this.fontSize > 20 ? 'red' : 'black',
      'font-weight': 'bold'
    };
  }
}
```

**4. With Units:**
```typescript
<div [ngStyle]="{
  'width.px': 200,
  'height.%': 50,
  'margin.em': 2
}">
  Box with units
</div>
```

### 3.4 ngModel

**ngModel creates two-way data binding for form elements.**

**Setup:**
```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule]
})
```

**Simple Examples:**

**1. Text Input:**
```typescript
<input [(ngModel)]="username" type="text">
<p>Hello {{ username }}!</p>
```

```typescript
export class InputComponent {
  username = '';
}
```

**2. Checkbox:**
```typescript
<input [(ngModel)]="agreed" type="checkbox">
<p>Agreed: {{ agreed }}</p>
```

```typescript
export class CheckboxComponent {
  agreed = false;
}
```

**3. Select Dropdown:**
```typescript
<select [(ngModel)]="selectedCity">
  <option value="ny">New York</option>
  <option value="la">Los Angeles</option>
  <option value="ch">Chicago</option>
</select>
<p>Selected: {{ selectedCity }}</p>
```

```typescript
export class SelectComponent {
  selectedCity = 'ny';
}
```

### 3.5 Built-in Attribute Directives

**Other useful attribute directives:**

**1. ngNonBindable:**
```typescript
<p>Angular uses {{ }} for interpolation</p>
<!-- Displays: Angular uses  for interpolation -->

<p ngNonBindable>Angular uses {{ }} for interpolation</p>
<!-- Displays: Angular uses {{ }} for interpolation -->
```

**2. ngPlural:**
```typescript
<div [ngPlural]="itemCount">
  <ng-template ngPluralCase="=0">No items</ng-template>
  <ng-template ngPluralCase="=1">One item</ng-template>
  <ng-template ngPluralCase="other">{{ itemCount }} items</ng-template>
</div>
```

```typescript
export class PluralComponent {
  itemCount = 5;
}
```

---

## 4. Custom Directives Creation

### 4.1 Creating a Custom Directive

**Generate directive using CLI:**
```bash
ng generate directive highlight
# or shorthand
ng g d highlight
```

**Creates:**
```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor() { }
}
```

**Simple Custom Directive Example:**

```typescript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

**Usage:**
```html
<p appHighlight>This text is highlighted</p>
```

**Output:**
Text with yellow background.

### 4.2 Directive Decorator

**@Directive decorator marks a class as a directive:**

**Properties:**

**1. selector:**
```typescript
@Directive({
  selector: '[appHighlight]'  // Attribute selector
})

@Directive({
  selector: '.myClass'  // Class selector
})
```

**2. inputs:**
```typescript
@Directive({
  selector: '[appColor]',
  inputs: ['color']  // Deprecated, use @Input instead
})
```

**3. outputs:**
```typescript
@Directive({
  selector: '[appClick]',
  outputs: ['clicked']  // Deprecated, use @Output instead
})
```

**4. host:**
```typescript
@Directive({
  selector: '[appHover]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HoverDirective {
  onMouseEnter() {
    console.log('Mouse entered');
  }
  
  onMouseLeave() {
    console.log('Mouse left');
  }
}
```

**5. exportAs:**
```typescript
@Directive({
  selector: '[appTooltip]',
  exportAs: 'tooltip'
})
export class TooltipDirective {
  show() {
    console.log('Show tooltip');
  }
}
```

**Usage:**
```html
<div appTooltip #tip="tooltip">
  Content
  <button (click)="tip.show()">Show</button>
</div>
```

### 4.3 ElementRef and Renderer2

**ElementRef:** Direct reference to DOM element.
**Renderer2:** Safe way to manipulate DOM.

**Why use Renderer2?**
- Platform-independent (works with server-side rendering)
- Safer than direct DOM manipulation
- Better for security

**Simple Examples:**

**1. Using ElementRef:**
```typescript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBlue]'
})
export class BlueDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.color = 'blue';
  }
}
```

**2. Using Renderer2:**
```typescript
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
  }
}
```

**3. Multiple Styles with Renderer2:**
```typescript
@Directive({
  selector: '[appBox]'
})
export class BoxDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid black');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px');
    this.renderer.addClass(this.el.nativeElement, 'box-class');
  }
}
```

**4. Renderer2 Methods:**
```typescript
// Set style
renderer.setStyle(element, 'color', 'blue');

// Remove style
renderer.removeStyle(element, 'color');

// Add class
renderer.addClass(element, 'active');

// Remove class
renderer.removeClass(element, 'active');

// Set attribute
renderer.setAttribute(element, 'disabled', 'true');

// Remove attribute
renderer.removeAttribute(element, 'disabled');

// Set property
renderer.setProperty(element, 'value', 'text');
```

### 4.4 Input Properties in Directives

**Pass data to directives using @Input:**

**Simple Example:**

```typescript
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() highlightColor: string = 'yellow';
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    this.renderer.setStyle(
      this.el.nativeElement, 
      'backgroundColor', 
      this.highlightColor
    );
  }
}
```

**Usage:**
```html
<p appHighlight highlightColor="lightblue">Blue highlight</p>
<p appHighlight highlightColor="pink">Pink highlight</p>
<p appHighlight>Default yellow highlight</p>
```

**Using Same Name as Directive:**
```typescript
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = 'yellow';
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.appHighlight
    );
  }
}
```

**Usage:**
```html
<p [appHighlight]="'lightgreen'">Green highlight</p>
<p appHighlight="orange">Orange highlight</p>
```

**Multiple Inputs:**
```typescript
@Directive({
  selector: '[appBorder]'
})
export class BorderDirective implements OnInit {
  @Input() borderColor: string = 'black';
  @Input() borderWidth: number = 1;
  @Input() borderStyle: string = 'solid';
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit() {
    const border = `${this.borderWidth}px ${this.borderStyle} ${this.borderColor}`;
    this.renderer.setStyle(this.el.nativeElement, 'border', border);
  }
}
```

**Usage:**
```html
<div appBorder 
     borderColor="red" 
     borderWidth="2" 
     borderStyle="dashed">
  Content with custom border
</div>
```

### 4.5 Creating Structural Directives

**Create custom structural directive:**

**Simple Example - Unless Directive:**

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }
  
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      // Show element if condition is false
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Remove element if condition is true
      this.viewContainer.clear();
    }
  }
}
```

**Usage:**
```html
<p *appUnless="false">This is shown (opposite of ngIf)</p>
<p *appUnless="true">This is hidden</p>
```

**How it works:**
- `TemplateRef`: Reference to the template
- `ViewContainerRef`: Container to render template
- `@Input() set`: Setter that runs when input changes

**Another Example - Repeat Directive:**

```typescript
@Directive({
  selector: '[appRepeat]'
})
export class RepeatDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }
  
  @Input() set appRepeat(times: number) {
    this.viewContainer.clear();
    for (let i = 0; i < times; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
```

**Usage:**
```html
<p *appRepeat="3">This line appears 3 times</p>
```

**Output:**
```
This line appears 3 times
This line appears 3 times
This line appears 3 times
```

---

## 5. Directive Lifecycle Hooks

### 5.1 Available Lifecycle Hooks

**Directives have the same lifecycle hooks as components:**

```
Lifecycle Order:
1. constructor
2. ngOnChanges (when inputs change)
3. ngOnInit (initialize)
4. ngDoCheck (change detection)
5. ngAfterContentInit (content initialized)
6. ngAfterContentChecked (content checked)
7. ngAfterViewInit (view initialized)
8. ngAfterViewChecked (view checked)
9. ngOnDestroy (cleanup)
```

**Most Used in Directives:**
- `ngOnInit` - Initialize directive
- `ngOnChanges` - React to input changes
- `ngOnDestroy` - Cleanup

### 5.2 ngOnInit

**Runs once after directive is initialized.**

**Simple Example:**
```typescript
import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInit]'
})
export class InitDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    console.log('Constructor called');
  }
  
  ngOnInit() {
    console.log('ngOnInit called');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'blue');
  }
}
```

**When to use:**
- Initialize directive state
- Access input properties
- Setup initial styles/behavior

### 5.3 ngOnChanges

**Runs when input properties change.**

**Simple Example:**
```typescript
import { Directive, Input, OnChanges, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnChanges {
  @Input() appColor: string;
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['appColor']) {
      console.log('Color changed from', changes['appColor'].previousValue, 
                  'to', changes['appColor'].currentValue);
      this.updateColor();
    }
  }
  
  updateColor() {
    this.renderer.setStyle(this.el.nativeElement, 'color', this.appColor);
  }
}
```

**Usage:**
```html
<p [appColor]="currentColor">Text color changes</p>
<button (click)="currentColor = 'red'">Red</button>
<button (click)="currentColor = 'blue'">Blue</button>
```

### 5.4 ngOnDestroy

**Runs before directive is destroyed.**

**Simple Example:**
```typescript
import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTimer]'
})
export class TimerDirective implements OnInit, OnDestroy {
  private intervalId: any;
  
  constructor(private el: ElementRef) { }
  
  ngOnInit() {
    this.intervalId = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
  }
  
  ngOnDestroy() {
    // Cleanup
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('Timer cleared');
    }
  }
}
```

**When to use:**
- Clear timers/intervals
- Unsubscribe from observables
- Remove event listeners
- Free resources

**Complete Example with All Hooks:**

```typescript
@Directive({
  selector: '[appLifecycle]'
})
export class LifecycleDirective implements OnChanges, OnInit, OnDestroy {
  @Input() value: string;
  
  constructor() {
    console.log('1. Constructor');
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('2. ngOnChanges', changes);
  }
  
  ngOnInit() {
    console.log('3. ngOnInit');
  }
  
  ngOnDestroy() {
    console.log('4. ngOnDestroy');
  }
}
```

### 5.5 Other Lifecycle Hooks

**ngDoCheck:**
```typescript
@Directive({
  selector: '[appCheck]'
})
export class CheckDirective implements DoCheck {
  ngDoCheck() {
    console.log('Change detection ran');
  }
}
```

**ngAfterContentInit:**
```typescript
@Directive({
  selector: '[appContent]'
})
export class ContentDirective implements AfterContentInit {
  ngAfterContentInit() {
    console.log('Content initialized');
  }
}
```

**ngAfterViewInit:**
```typescript
@Directive({
  selector: '[appView]'
})
export class ViewDirective implements AfterViewInit {
  ngAfterViewInit() {
    console.log('View initialized');
  }
}
```

---

## 6. HostListener and HostBinding

### 6.1 HostListener

**@HostListener listens to events on the host element.**

**Syntax:** `@HostListener('event', ['$event'])`

**Simple Examples:**

**1. Click Event:**
```typescript
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClick]'
})
export class ClickDirective {
  @HostListener('click')
  onClick() {
    console.log('Element clicked!');
  }
}
```

**Usage:**
```html
<button appClick>Click me</button>
```

**2. Mouse Events:**
```typescript
@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  @HostListener('mouseenter')
  onMouseEnter() {
    console.log('Mouse entered');
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    console.log('Mouse left');
  }
}
```

**3. With Event Object:**
```typescript
@Directive({
  selector: '[appKeypress]'
})
export class KeypressDirective {
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);
  }
}
```

**4. Window Events:**
```typescript
@Directive({
  selector: '[appWindowResize]'
})
export class WindowResizeDirective {
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log('Window resized:', window.innerWidth);
  }
}
```

**5. Document Events:**
```typescript
@Directive({
  selector: '[appDocClick]'
})
export class DocumentClickDirective {
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    console.log('Document clicked at:', event.clientX, event.clientY);
  }
}
```

**Practical Example - Highlight on Hover:**

```typescript
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]'
})
export class HoverHighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight('yellow');
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('');
  }
  
  private highlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
```

**Usage:**
```html
<p appHoverHighlight>Hover over me!</p>
```

### 6.2 HostBinding

**@HostBinding binds a class property to a host element property.**

**Syntax:** `@HostBinding('property')`

**Simple Examples:**

**1. Bind to Class:**
```typescript
import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appActive]'
})
export class ActiveDirective {
  @HostBinding('class.active') isActive = true;
}
```

**Usage:**
```html
<div appActive>Always has 'active' class</div>
```

**Output:**
```html
<div class="active" appActive>Always has 'active' class</div>
```

**2. Bind to Style:**
```typescript
@Directive({
  selector: '[appColor]'
})
export class ColorDirective {
  @HostBinding('style.color') color = 'blue';
}
```

**3. Bind to Attribute:**
```typescript
@Directive({
  selector: '[appRole]'
})
export class RoleDirective {
  @HostBinding('attr.role') role = 'button';
}
```

**Output:**
```html
<div role="button" appRole>Content</div>
```

**4. Dynamic Binding:**
```typescript
@Directive({
  selector: '[appToggleClass]'
})
export class ToggleClassDirective {
  @HostBinding('class.highlighted') isHighlighted = false;
  
  @HostListener('click')
  onClick() {
    this.isHighlighted = !this.isHighlighted;
  }
}
```

**Usage:**
```html
<div appToggleClass>Click to toggle highlight</div>
```

**5. Multiple Bindings:**
```typescript
@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {
  @HostBinding('class.btn') btnClass = true;
  @HostBinding('class.btn-primary') btnPrimary = true;
  @HostBinding('attr.type') type = 'button';
  @HostBinding('style.padding') padding = '10px';
}
```

### 6.3 Combining HostListener and HostBinding

**Powerful combination for interactive directives:**

**Example 1 - Hover Effect:**

```typescript
import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverColor]'
})
export class HoverColorDirective {
  @Input() appHoverColor = 'yellow';
  @Input() defaultColor = 'white';
  
  @HostBinding('style.backgroundColor') backgroundColor: string;
  
  constructor() {
    this.backgroundColor = this.defaultColor;
  }
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.backgroundColor = this.appHoverColor;
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    this.backgroundColor = this.defaultColor;
  }
}
```

**Usage:**
```html
<div [appHoverColor]="'lightblue'" defaultColor="white">
  Hover over me!
</div>
```

**Example 2 - Click to Toggle:**

```typescript
@Directive({
  selector: '[appClickToggle]'
})
export class ClickToggleDirective {
  @HostBinding('class.active') isActive = false;
  @HostBinding('style.cursor') cursor = 'pointer';
  
  @HostListener('click')
  onClick() {
    this.isActive = !this.isActive;
  }
}
```

**Example 3 - Disabled State:**

```typescript
@Directive({
  selector: '[appDisableable]'
})
export class DisableableDirective {
  @Input() isDisabled = false;
  
  @HostBinding('class.disabled') 
  get disabled() {
    return this.isDisabled;
  }
  
  @HostBinding('style.opacity')
  get opacity() {
    return this.isDisabled ? 0.5 : 1;
  }
  
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.isDisabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
```

### 6.4 Host Property in Directive Decorator

**Alternative to @HostListener and @HostBinding:**

**Using host property:**
```typescript
@Directive({
  selector: '[appHost]',
  host: {
    '(click)': 'onClick()',
    '[class.active]': 'isActive',
    '[style.color]': 'color'
  }
})
export class HostDirective {
  isActive = true;
  color = 'blue';
  
  onClick() {
    console.log('Clicked');
  }
}
```

**Equivalent using decorators:**
```typescript
@Directive({
  selector: '[appHost]'
})
export class HostDirective {
  @HostBinding('class.active') isActive = true;
  @HostBinding('style.color') color = 'blue';
  
  @HostListener('click')
  onClick() {
    console.log('Clicked');
  }
}
```

**Comparison:**

| Feature | host property | Decorators |
|---------|---------------|------------|
| **Readability** | Less clear | More clear |
| **Location** | In metadata | In class |
| **Preference** | Legacy | Modern |

**Recommendation:** Use `@HostListener` and `@HostBinding` decorators (more readable).

---

## 7. Standalone Directives

### 7.1 What are Standalone Directives?

**Standalone directives don't need to be declared in NgModules.**

**Introduced in:** Angular 14

**Think of it like:**
A portable tool that works independently without needing a toolbox (module).

**Benefits:**
- Simpler to use
- No module required
- Better tree-shaking
- Easier testing

### 7.2 Creating Standalone Directives

**Using CLI:**
```bash
ng generate directive highlight --standalone
# or
ng g d highlight --standalone
```

**Manual Creation:**

```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true  // Mark as standalone
})
export class HighlightDirective {
  // Directive logic
}
```

**Simple Example:**

```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]',
  standalone: true
})
export class HoverHighlightDirective {
  @Input() highlightColor = 'yellow';
  
  constructor(private el: ElementRef) { }
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
```

### 7.3 Importing Standalone Directives

**In Components:**

**Standalone Component:**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverHighlightDirective } from './hover-highlight.directive';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, HoverHighlightDirective],  // Import directive
  template: `
    <p appHoverHighlight highlightColor="lightblue">
      Hover over me!
    </p>
  `
})
export class ExampleComponent { }
```

**Module-based Component:**
```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example.component';
import { HoverHighlightDirective } from './hover-highlight.directive';

@NgModule({
  declarations: [ExampleComponent],
  imports: [
    CommonModule,
    HoverHighlightDirective  // Import standalone directive
  ]
})
export class ExampleModule { }
```

### 7.4 Converting to Standalone

**Before (Module-based):**

```typescript
// highlight.directive.ts
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective { }

// app.module.ts
@NgModule({
  declarations: [HighlightDirective]  // Must declare
})
export class AppModule { }
```

**After (Standalone):**

```typescript
// highlight.directive.ts
@Directive({
  selector: '[appHighlight]',
  standalone: true  // Add this
})
export class HighlightDirective { }

// No need to declare in module
// Just import where needed
```

**Step-by-Step Conversion:**

1. **Add `standalone: true`:**
```typescript
@Directive({
  selector: '[appMyDirective]',
  standalone: true  // Add this line
})
```

2. **Remove from module declarations:**
```typescript
// Before
@NgModule({
  declarations: [MyDirective]  // Remove this
})

// After
@NgModule({
  declarations: []  // Empty or removed
})
```

3. **Import in components:**
```typescript
@Component({
  imports: [MyDirective]  // Import directly
})
```

### 7.5 Benefits of Standalone Directives

**1. No Module Required:**
```typescript
// ✓ Standalone: Just create and use
@Directive({
  selector: '[appSimple]',
  standalone: true
})
export class SimpleDirective { }

// ✗ Module-based: Need module
@NgModule({
  declarations: [SimpleDirective]
})
```

**2. Easier Imports:**
```typescript
// ✓ Standalone: Import directive directly
@Component({
  imports: [SimpleDirective]
})

// ✗ Module-based: Import module containing directive
@Component({
  imports: [SimpleModule]
})
```

**3. Better Tree-Shaking:**
Only imported directives are included in bundle.

**4. Simpler Testing:**
```typescript
// Standalone: Easier to test
TestBed.configureTestingModule({
  imports: [SimpleDirective]  // Just import directive
});

// Module-based: More setup
TestBed.configureTestingModule({
  declarations: [SimpleDirective],
  imports: [CommonModule]
});
```

**5. Clearer Dependencies:**
```typescript
@Directive({
  standalone: true,
  imports: [CommonModule]  // Clear what it needs
})
```

**Complete Standalone Example:**

```typescript
// tooltip.directive.ts
import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() appTooltip = '';
  private tooltipElement: HTMLElement | null = null;
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTooltip();
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }
  
  private showTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.appendChild(
      this.tooltipElement,
      this.renderer.createText(this.appTooltip)
    );
    this.renderer.appendChild(document.body, this.tooltipElement);
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background', 'black');
    this.renderer.setStyle(this.tooltipElement, 'color', 'white');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px');
  }
  
  private hideTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
```

**Usage:**
```typescript
// In standalone component
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TooltipDirective],
  template: `
    <button [appTooltip]="'Click to save'">Save</button>
  `
})
export class ExampleComponent { }
```

---

## Summary

You've mastered **Angular Directives**!

**Key Concepts:**

**1. Directive Types:**
- **Component**: Directive with template
- **Structural**: Change DOM structure (`*ngIf`, `*ngFor`, `*ngSwitch`)
- **Attribute**: Change appearance/behavior (`ngClass`, `ngStyle`)

**2. Structural Directives:**
- `*ngIf` - Conditional rendering (removes from DOM)
- `*ngFor` - Loop through arrays
- `*ngSwitch` - Switch between options
- Use `*` prefix (syntactic sugar for `<ng-template>`)
- `ng-container` for grouping without extra elements

**3. Attribute Directives:**
- `ngClass` - Dynamic CSS classes (object, array, string)
- `ngStyle` - Dynamic inline styles
- `ngModel` - Two-way data binding
- Don't change DOM structure

**4. Custom Directives:**
- `@Directive` decorator
- `ElementRef` - Direct DOM access
- `Renderer2` - Safe DOM manipulation (preferred)
- `@Input` - Pass data to directive

**5. Lifecycle Hooks:**
- `ngOnInit` - Initialize directive
- `ngOnChanges` - React to input changes
- `ngOnDestroy` - Cleanup resources

**6. HostListener & HostBinding:**
- `@HostListener('event')` - Listen to events
- `@HostBinding('property')` - Bind to properties
- Powerful combination for interactive directives

**7. Standalone Directives:**
- Add `standalone: true`
- No module required
- Import directly in components
- Better tree-shaking and testing

**Directive Creation Checklist:**
```typescript
1. Create: ng g d myDirective --standalone
2. Add logic: Use ElementRef, Renderer2
3. Add inputs: @Input properties
4. Add events: @HostListener
5. Add bindings: @HostBinding
6. Import: In component imports array
7. Use: In template
```

**Best Practices:**
- Use Renderer2 over ElementRef (safer)
- Keep directives focused (single responsibility)
- Clean up in ngOnDestroy
- Use standalone directives for new projects
- Use structural directives to add/remove elements
- Use attribute directives to modify elements

**Common Patterns:**
```typescript
// Highlight on hover
@HostListener('mouseenter') + @HostBinding('style.backgroundColor')

// Toggle on click
@HostListener('click') + @HostBinding('class.active')

// Conditional styling
@Input() + ngOnChanges + Renderer2

// Custom structural
TemplateRef + ViewContainerRef
```

Master these directive concepts to create reusable, powerful behaviors in your Angular applications!
