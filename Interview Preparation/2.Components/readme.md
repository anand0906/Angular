# Angular Components - Complete Guide

## Index

1. [Component Lifecycle Hooks](#1-component-lifecycle-hooks)
   - 1.1 [What are Lifecycle Hooks?](#11-what-are-lifecycle-hooks)
   - 1.2 [Lifecycle Hook Order](#12-lifecycle-hook-order)
   - 1.3 [ngOnChanges](#13-ngonchanges)
   - 1.4 [ngOnInit](#14-ngoninit)
   - 1.5 [ngDoCheck](#15-ngdocheck)
   - 1.6 [ngAfterContentInit](#16-ngaftercontentinit)
   - 1.7 [ngAfterContentChecked](#17-ngaftercontentchecked)
   - 1.8 [ngAfterViewInit](#18-ngafterviewinit)
   - 1.9 [ngAfterViewChecked](#19-ngafterviewchecked)
   - 1.10 [ngOnDestroy](#110-ngondestroy)
   - 1.11 [When to Use Each Hook](#111-when-to-use-each-hook)

2. [Component Metadata and Decorators](#2-component-metadata-and-decorators)
   - 2.1 [@Component Decorator](#21-component-decorator)
   - 2.2 [Selector Property](#22-selector-property)
   - 2.3 [Template and TemplateUrl](#23-template-and-templateurl)
   - 2.4 [Styles and StyleUrls](#24-styles-and-styleurls)
   - 2.5 [Providers](#25-providers)
   - 2.6 [ViewProviders](#26-viewproviders)
   - 2.7 [ChangeDetection](#27-changedetection)
   - 2.8 [Other Metadata Properties](#28-other-metadata-properties)

3. [Component Communication](#3-component-communication)
   - 3.1 [Parent to Child (@Input)](#31-parent-to-child-input)
   - 3.2 [Child to Parent (@Output)](#32-child-to-parent-output)
   - 3.3 [EventEmitter](#33-eventemitter)
   - 3.4 [ViewChild and ViewChildren](#34-viewchild-and-viewchildren)
   - 3.5 [ContentChild and ContentChildren](#35-contentchild-and-contentchildren)
   - 3.6 [Service Communication](#36-service-communication)

4. [View Encapsulation](#4-view-encapsulation)
   - 4.1 [What is View Encapsulation?](#41-what-is-view-encapsulation)
   - 4.2 [Emulated (Default)](#42-emulated-default)
   - 4.3 [ShadowDom (Native)](#43-shadowdom-native)
   - 4.4 [None](#44-none)
   - 4.5 [When to Use Each Mode](#45-when-to-use-each-mode)

5. [Content Projection and ng-content](#5-content-projection-and-ng-content)
   - 5.1 [What is Content Projection?](#51-what-is-content-projection)
   - 5.2 [Single-Slot Projection](#52-single-slot-projection)
   - 5.3 [Multi-Slot Projection](#53-multi-slot-projection)
   - 5.4 [Conditional Content Projection](#54-conditional-content-projection)
   - 5.5 [ng-content with Select](#55-ng-content-with-select)

6. [Dynamic Components](#6-dynamic-components)
   - 6.1 [What are Dynamic Components?](#61-what-are-dynamic-components)
   - 6.2 [Creating Dynamic Components](#62-creating-dynamic-components)
   - 6.3 [ViewContainerRef](#63-viewcontainerref)
   - 6.4 [ComponentFactoryResolver (Legacy)](#64-componentfactoryresolver-legacy)
   - 6.5 [Passing Data to Dynamic Components](#65-passing-data-to-dynamic-components)
   - 6.6 [Destroying Dynamic Components](#66-destroying-dynamic-components)

7. [Component Inheritance](#7-component-inheritance)
   - 7.1 [What is Component Inheritance?](#71-what-is-component-inheritance)
   - 7.2 [Inheriting Component Classes](#72-inheriting-component-classes)
   - 7.3 [Inheriting Lifecycle Hooks](#73-inheriting-lifecycle-hooks)
   - 7.4 [Inheriting Inputs and Outputs](#74-inheriting-inputs-and-outputs)
   - 7.5 [Best Practices](#75-best-practices)

8. [Standalone Components](#8-standalone-components)
   - 8.1 [What are Standalone Components?](#81-what-are-standalone-components)
   - 8.2 [Creating Standalone Components](#82-creating-standalone-components)
   - 8.3 [Importing Dependencies](#83-importing-dependencies)
   - 8.4 [Standalone Component Routing](#84-standalone-component-routing)
   - 8.5 [Migrating to Standalone](#85-migrating-to-standalone)
   - 8.6 [Benefits of Standalone Components](#86-benefits-of-standalone-components)

---

## 1. Component Lifecycle Hooks

### 1.1 What are Lifecycle Hooks?

Lifecycle hooks are **methods** that Angular calls at specific moments in a component's life, from creation to destruction.

**Think of it like:**
A person's life stages: birth → childhood → adulthood → old age → death. Each stage has specific events that happen.

**Purpose:**
- Perform initialization logic
- React to changes
- Clean up resources
- Optimize performance

**How to Use:**
Implement the corresponding interface and define the method.

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

export class MyComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('Component initialized');
  }
  
  ngOnDestroy() {
    console.log('Component destroyed');
  }
}
```

### 1.2 Lifecycle Hook Order

**Execution Sequence:**

```
1. Constructor           (class instantiated)
2. ngOnChanges          (when @Input changes)
3. ngOnInit             (component initialized)
4. ngDoCheck            (change detection runs)
5. ngAfterContentInit   (content projected)
6. ngAfterContentChecked (content checked)
7. ngAfterViewInit      (view initialized)
8. ngAfterViewChecked   (view checked)
   ... (4-8 repeat on changes)
9. ngOnDestroy          (before component destroyed)
```

**Visual Timeline:**
```
Create → Initialize → Check → Render → Update → Destroy
  ↓         ↓          ↓        ↓        ↓        ↓
 new()   ngOnInit  ngDoCheck  AfterView Updates  ngOnDestroy
```

### 1.3 ngOnChanges

**When it runs:**
- BEFORE ngOnInit
- Whenever an **@Input property** changes
- Receives a `SimpleChanges` object

**Simple Example:**
```typescript
import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user',
  template: '<p>User: {{ name }}</p>'
})
export class UserComponent implements OnChanges {
  @Input() name: string;
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('Previous:', changes['name'].previousValue);
    console.log('Current:', changes['name'].currentValue);
    console.log('First change?', changes['name'].firstChange);
  }
}
```

**Parent Component:**
```typescript
@Component({
  selector: 'app-parent',
  template: '<app-user [name]="userName"></app-user>'
})
export class ParentComponent {
  userName = 'John';
  
  changeName() {
    this.userName = 'Jane';  // Triggers ngOnChanges in child
  }
}
```

**Output when name changes:**
```
Previous: John
Current: Jane
First change? false
```

**When to use:**
- React to input property changes
- Perform logic when inputs update
- Compare old vs new values

### 1.4 ngOnInit

**When it runs:**
- ONCE, after the first ngOnChanges
- After Angular sets all @Input properties

**Simple Example:**
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  template: '<ul><li *ngFor="let item of items">{{ item }}</li></ul>'
})
export class DataComponent implements OnInit {
  items: string[] = [];
  
  ngOnInit() {
    // Initialize component
    this.loadData();
    console.log('Component initialized');
  }
  
  loadData() {
    // Simulate API call
    this.items = ['Apple', 'Banana', 'Orange'];
  }
}
```

**Why not use constructor?**
```typescript
// ✗ Don't do heavy work in constructor
constructor() {
  this.loadData();  // @Input properties not set yet!
}

// ✓ Use ngOnInit instead
ngOnInit() {
  this.loadData();  // @Input properties are ready
}
```

**When to use:**
- Fetch data from API
- Initialize component state
- Set up subscriptions
- Access @Input properties

### 1.5 ngDoCheck

**When it runs:**
- After ngOnChanges
- Every change detection cycle
- Very frequently!

**Simple Example:**
```typescript
import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-check',
  template: '<p>{{ data.name }}</p>'
})
export class CheckComponent implements DoCheck {
  @Input() data: { name: string };
  private lastData: string;
  
  ngDoCheck() {
    // Detect changes Angular might miss
    if (this.data.name !== this.lastData) {
      console.log('Data changed:', this.data.name);
      this.lastData = this.data.name;
    }
  }
}
```

**Why use it:**
Angular doesn't detect changes inside objects/arrays. ngDoCheck lets you implement custom change detection.

**Parent:**
```typescript
export class ParentComponent {
  user = { name: 'John' };
  
  changeUser() {
    this.user.name = 'Jane';  // ngOnChanges won't detect this
                               // but ngDoCheck will
  }
}
```

**Warning:**
Use sparingly! Runs very often and can impact performance.

### 1.6 ngAfterContentInit

**When it runs:**
- ONCE, after Angular projects external content into the component
- After `<ng-content>` is initialized

**Simple Example:**
```typescript
// child.component.ts
import { Component, AfterContentInit, ContentChild } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent implements AfterContentInit {
  @ContentChild('header') header: any;
  
  ngAfterContentInit() {
    console.log('Content projected:', this.header);
    // Content is now available
  }
}
```

**Usage:**
```html
<app-card>
  <h1 #header>Card Title</h1>
  <p>Card content</p>
</app-card>
```

**When to use:**
- Access content children
- Initialize after content projection
- Modify projected content

### 1.7 ngAfterContentChecked

**When it runs:**
- After ngAfterContentInit
- After every change detection check of projected content

**Simple Example:**
```typescript
import { Component, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  template: '<ng-content></ng-content>'
})
export class WrapperComponent implements AfterContentChecked {
  ngAfterContentChecked() {
    console.log('Content checked');
  }
}
```

**When to use:**
- React to changes in projected content
- Rarely needed (runs frequently)

### 1.8 ngAfterViewInit

**When it runs:**
- ONCE, after component's view (and child views) are initialized
- After Angular creates component's DOM

**Simple Example:**
```typescript
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-focus',
  template: '<input #inputBox type="text">'
})
export class FocusComponent implements AfterViewInit {
  @ViewChild('inputBox') inputBox: ElementRef;
  
  ngAfterViewInit() {
    // DOM is ready, can access elements
    this.inputBox.nativeElement.focus();
    console.log('View initialized');
  }
}
```

**When to use:**
- Access DOM elements
- Initialize third-party libraries
- Manipulate view after it's rendered
- Access child components

### 1.9 ngAfterViewChecked

**When it runs:**
- After ngAfterViewInit
- After every check of component's view and child views

**Simple Example:**
```typescript
import { Component, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-view',
  template: '<p>{{ counter }}</p>'
})
export class ViewComponent implements AfterViewChecked {
  counter = 0;
  
  ngAfterViewChecked() {
    console.log('View checked');
    // Runs every time view is checked
  }
}
```

**When to use:**
- Respond to view updates
- Rarely needed (performance concern)

### 1.10 ngOnDestroy

**When it runs:**
- ONCE, just before component is destroyed
- Before Angular removes component from DOM

**Simple Example:**
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  template: '<p>Time: {{ time }}</p>'
})
export class TimerComponent implements OnInit, OnDestroy {
  time = 0;
  private intervalId: any;
  private subscription: Subscription;
  
  ngOnInit() {
    // Start timer
    this.intervalId = setInterval(() => {
      this.time++;
    }, 1000);
    
    // Subscribe to service
    this.subscription = this.dataService.getData()
      .subscribe(data => console.log(data));
  }
  
  ngOnDestroy() {
    // Clean up timer
    clearInterval(this.intervalId);
    
    // Unsubscribe
    this.subscription.unsubscribe();
    
    console.log('Component destroyed');
  }
}
```

**When to use:**
- Clear timers/intervals
- Unsubscribe from observables
- Detach event listeners
- Free resources
- Save state

**Important:**
Always clean up to prevent memory leaks!

### 1.11 When to Use Each Hook

| Hook | Common Use Cases |
|------|------------------|
| **ngOnChanges** | React to input changes, validate inputs |
| **ngOnInit** | Fetch data, initialize component, setup |
| **ngDoCheck** | Custom change detection (rarely needed) |
| **ngAfterContentInit** | Access projected content once |
| **ngAfterContentChecked** | React to content changes (rarely) |
| **ngAfterViewInit** | Access DOM, init libraries, focus elements |
| **ngAfterViewChecked** | React to view updates (rarely) |
| **ngOnDestroy** | Cleanup: unsubscribe, clear timers |

**Most Commonly Used:**
1. **ngOnInit** - Almost every component
2. **ngOnDestroy** - When cleanup needed
3. **ngOnChanges** - When working with @Input
4. **ngAfterViewInit** - When accessing DOM

---

## 2. Component Metadata and Decorators

### 2.1 @Component Decorator

The `@Component` decorator **marks a class as an Angular component** and provides configuration metadata.

**Basic Structure:**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  // Component logic
}
```

**What it does:**
- Tells Angular this class is a component
- Defines how the component should be used
- Specifies template and styles
- Configures component behavior

### 2.2 Selector Property

**Selector** defines the **custom HTML tag** for your component.

**Three Types:**

**1. Element Selector (most common):**
```typescript
@Component({
  selector: 'app-user'
})
```
```html
<app-user></app-user>
```

**2. Attribute Selector:**
```typescript
@Component({
  selector: '[app-user]'
})
```
```html
<div app-user></div>
```

**3. Class Selector:**
```typescript
@Component({
  selector: '.app-user'
})
```
```html
<div class="app-user"></div>
```

**Naming Convention:**
```typescript
// ✓ Good: Use prefix
selector: 'app-user-list'

// ✗ Bad: No prefix (might conflict with future HTML elements)
selector: 'user-list'
```

### 2.3 Template and TemplateUrl

**Two ways to define HTML:**

**1. Inline Template:**
```typescript
@Component({
  selector: 'app-greeting',
  template: '<h1>Hello {{ name }}!</h1>'
})
```

**Multi-line Inline Template:**
```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
    </div>
  `
})
```

**2. External Template File:**
```typescript
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
```

**When to use each:**
- **Inline**: Simple templates (1-5 lines)
- **External**: Complex templates, better IDE support

### 2.4 Styles and StyleUrls

**Two ways to define CSS:**

**1. Inline Styles:**
```typescript
@Component({
  selector: 'app-button',
  template: '<button>Click me</button>',
  styles: [`
    button {
      background-color: blue;
      color: white;
      padding: 10px;
    }
  `]
})
```

**Multiple Inline Styles:**
```typescript
@Component({
  selector: 'app-card',
  template: '<div>Card</div>',
  styles: [
    'div { border: 1px solid black; }',
    '.card { padding: 20px; }'
  ]
})
```

**2. External Style Files:**
```typescript
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
```

**Multiple Style Files:**
```typescript
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: [
    './theme.component.css',
    './theme-dark.component.css'
  ]
})
```

**Style Encapsulation:**
Styles are scoped to the component by default (won't affect other components).

### 2.5 Providers

**Providers** make services available to the component and its children.

**Simple Example:**
```typescript
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-data',
  template: '<p>{{ data }}</p>',
  providers: [DataService]  // New instance for this component
})
export class DataComponent {
  data: string;
  
  constructor(private dataService: DataService) {
    this.data = this.dataService.getData();
  }
}
```

**Provider Scope:**
```typescript
// Component-level: New instance per component
@Component({
  providers: [DataService]
})

// Module-level: Shared instance across module
@NgModule({
  providers: [DataService]
})

// Root-level: Singleton across entire app
@Injectable({
  providedIn: 'root'
})
```

### 2.6 ViewProviders

**ViewProviders** make services available only to the **component's view**, not to projected content.

**Simple Example:**
```typescript
@Component({
  selector: 'app-parent',
  template: `
    <div>
      <app-child></app-child>
      <ng-content></ng-content>
    </div>
  `,
  viewProviders: [LogService]  // Only for <app-child>, not <ng-content>
})
export class ParentComponent { }
```

**Difference:**
```typescript
// providers: Available to view AND projected content
providers: [MyService]

// viewProviders: Available only to view (not ng-content)
viewProviders: [MyService]
```

### 2.7 ChangeDetection

**ChangeDetectionStrategy** determines how Angular checks for changes.

**Two Strategies:**

**1. Default (ChangeDetectionStrategy.Default):**
```typescript
@Component({
  selector: 'app-default',
  template: '<p>{{ counter }}</p>',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DefaultComponent {
  counter = 0;
  
  increment() {
    this.counter++;  // Angular detects and updates
  }
}
```

**2. OnPush (ChangeDetectionStrategy.OnPush):**
```typescript
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-optimized',
  template: '<p>{{ data }}</p>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  @Input() data: string;
  
  // Only checks when:
  // 1. @Input reference changes
  // 2. Event fires in component
  // 3. Manual detection triggered
}
```

**When to use OnPush:**
- Better performance
- Large lists
- Components with only @Input properties

**Example:**
```typescript
// Parent
export class ParentComponent {
  user = { name: 'John' };
  
  updateUser() {
    // ✗ OnPush won't detect (same reference)
    this.user.name = 'Jane';
    
    // ✓ OnPush will detect (new reference)
    this.user = { name: 'Jane' };
  }
}
```

### 2.8 Other Metadata Properties

**exportAs:**
```typescript
@Component({
  selector: 'app-timer',
  template: '<p>{{ time }}</p>',
  exportAs: 'timer'
})
export class TimerComponent {
  time = 0;
  
  start() { }
  stop() { }
}
```

**Usage:**
```html
<app-timer #myTimer="timer"></app-timer>
<button (click)="myTimer.start()">Start</button>
<button (click)="myTimer.stop()">Stop</button>
```

**host:**
```typescript
@Component({
  selector: 'app-box',
  template: '<p>Box</p>',
  host: {
    'class': 'container',
    '[style.border]': '"1px solid black"',
    '(click)': 'onClick()'
  }
})
export class BoxComponent {
  onClick() {
    console.log('Box clicked');
  }
}
```

**animations:**
```typescript
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-fade',
  template: '<div [@fadeIn]>Content</div>',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
```

---

## 3. Component Communication

### 3.1 Parent to Child (@Input)

**@Input** allows a parent component to **pass data** to a child component.

**Simple Example:**

**Child Component:**
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '<p>Received: {{ message }}</p>'
})
export class ChildComponent {
  @Input() message: string;
}
```

**Parent Component:**
```typescript
@Component({
  selector: 'app-parent',
  template: '<app-child [message]="parentMessage"></app-child>'
})
export class ParentComponent {
  parentMessage = 'Hello from parent!';
}
```

**Multiple Inputs:**
```typescript
export class UserComponent {
  @Input() name: string;
  @Input() age: number;
  @Input() email: string;
}
```
```html
<app-user 
  [name]="'John'" 
  [age]="25" 
  [email]="'john@example.com'">
</app-user>
```

**Input Alias:**
```typescript
export class ChildComponent {
  @Input('userName') name: string;  // Use different external name
}
```
```html
<app-child [userName]="'John'"></app-child>
```

**Input with Getter/Setter:**
```typescript
export class ChildComponent {
  private _value: number;
  
  @Input()
  set value(val: number) {
    this._value = val * 2;  // Transform input
  }
  
  get value(): number {
    return this._value;
  }
}
```

### 3.2 Child to Parent (@Output)

**@Output** allows a child component to **send data** to a parent component.

**Simple Example:**

**Child Component:**
```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '<button (click)="sendMessage()">Send</button>'
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();
  
  sendMessage() {
    this.messageEvent.emit('Hello from child!');
  }
}
```

**Parent Component:**
```typescript
@Component({
  selector: 'app-parent',
  template: `
    <app-child (messageEvent)="receiveMessage($event)"></app-child>
    <p>{{ childMessage }}</p>
  `
})
export class ParentComponent {
  childMessage: string;
  
  receiveMessage(message: string) {
    this.childMessage = message;
  }
}
```

**Output Alias:**
```typescript
export class ChildComponent {
  @Output('userClicked') clicked = new EventEmitter<string>();
}
```
```html
<app-child (userClicked)="onUserClick($event)"></app-child>
```

### 3.3 EventEmitter

**EventEmitter** is used to **emit custom events** from components.

**Simple Example:**
```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increment()">+</button>
    <span>{{ count }}</span>
    <button (click)="decrement()">-</button>
  `
})
export class CounterComponent {
  @Output() countChanged = new EventEmitter<number>();
  count = 0;
  
  increment() {
    this.count++;
    this.countChanged.emit(this.count);
  }
  
  decrement() {
    this.count--;
    this.countChanged.emit(this.count);
  }
}
```

**Parent Usage:**
```html
<app-counter (countChanged)="onCountChange($event)"></app-counter>
<p>Total: {{ total }}</p>
```
```typescript
export class ParentComponent {
  total = 0;
  
  onCountChange(count: number) {
    this.total = count;
  }
}
```

**Emitting Objects:**
```typescript
export class UserFormComponent {
  @Output() userCreated = new EventEmitter<{name: string, age: number}>();
  
  submitForm() {
    const user = { name: 'John', age: 25 };
    this.userCreated.emit(user);
  }
}
```

### 3.4 ViewChild and ViewChildren

**@ViewChild** accesses a **single child component or element** in the view.

**Simple Example:**

**Accessing Child Component:**
```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: '<app-child></app-child>'
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) childComponent: ChildComponent;
  
  ngAfterViewInit() {
    // Access child's properties/methods
    console.log(this.childComponent.message);
    this.childComponent.someMethod();
  }
}
```

**Accessing DOM Element:**
```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: '<input #inputBox type="text">'
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('inputBox') input: ElementRef;
  
  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }
}
```

**@ViewChildren** accesses **multiple children:**
```typescript
import { Component, ViewChildren, QueryList } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child></app-child>
    <app-child></app-child>
    <app-child></app-child>
  `
})
export class ParentComponent {
  @ViewChildren(ChildComponent) children: QueryList<ChildComponent>;
  
  ngAfterViewInit() {
    console.log('Number of children:', this.children.length);
    this.children.forEach(child => console.log(child));
  }
}
```

### 3.5 ContentChild and ContentChildren

**@ContentChild** accesses **projected content** (content inside `<ng-content>`).

**Simple Example:**

**Child Component:**
```typescript
import { Component, ContentChild, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent implements AfterContentInit {
  @ContentChild('header') headerElement: ElementRef;
  
  ngAfterContentInit() {
    console.log('Header:', this.headerElement.nativeElement.textContent);
  }
}
```

**Parent Usage:**
```html
<app-card>
  <h2 #header>Card Title</h2>
  <p>Card content</p>
</app-card>
```

**@ContentChildren:**
```typescript
@Component({
  selector: 'app-tabs',
  template: '<ng-content></ng-content>'
})
export class TabsComponent {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  
  ngAfterContentInit() {
    console.log('Number of tabs:', this.tabs.length);
  }
}
```

### 3.6 Service Communication

**Share data between components using a service.**

**Simple Example:**

**Shared Service:**
```typescript
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();
  
  sendMessage(message: string) {
    this.messageSource.next(message);
  }
}
```

**Component A (Sender):**
```typescript
@Component({
  selector: 'app-sender',
  template: '<button (click)="send()">Send Message</button>'
})
export class SenderComponent {
  constructor(private messageService: MessageService) { }
  
  send() {
    this.messageService.sendMessage('Hello from Sender!');
  }
}
```

**Component B (Receiver):**
```typescript
@Component({
  selector: 'app-receiver',
  template: '<p>{{ message }}</p>'
})
export class ReceiverComponent implements OnInit, OnDestroy {
  message: string;
  private subscription: Subscription;
  
  constructor(private messageService: MessageService) { }
  
  ngOnInit() {
    this.subscription = this.messageService.message$
      .subscribe(msg => this.message = msg);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

---

## 4. View Encapsulation

### 4.1 What is View Encapsulation?

View Encapsulation determines how **component styles are scoped**. It prevents styles from leaking between components.

**Think of it like:**
CSS in one component shouldn't affect other components (like rooms in a house - each room has its own decoration).

**Three Modes:**
1. Emulated (default)
2. ShadowDom (native)
3. None

### 4.2 Emulated (Default)

**How it works:**
Angular adds **unique attributes** to elements and modifies CSS selectors to scope styles.

**Simple Example:**
```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  template: '<div class="card">Card content</div>',
  styles: ['.card { border: 1px solid blue; }'],
  encapsulation: ViewEncapsulation.Emulated  // Default
})
export class CardComponent { }
```

**Generated HTML:**
```html
<app-card _ngcontent-abc-123>
  <div class="card" _ngcontent-abc-123>Card content</div>
</app-card>
```

**Generated CSS:**
```css
.card[_ngcontent-abc-123] {
  border: 1px solid blue;
}
```

**Result:**
- Styles only apply to this component
- Other components' `.card` classes unaffected

### 4.3 ShadowDom (Native)

**How it works:**
Uses browser's **native Shadow DOM** for true encapsulation.

**Simple Example:**
```typescript
@Component({
  selector: 'app-shadow',
  template: '<p class="text">Shadow DOM</p>',
  styles: ['.text { color: red; }'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ShadowComponent { }
```

**Generated HTML:**
```html
<app-shadow>
  #shadow-root
    <p class="text">Shadow DOM</p>
</app-shadow>
```

**Characteristics:**
- True isolation (uses Shadow DOM API)
- Global styles don't penetrate
- Component styles don't leak out
- Better encapsulation than Emulated

**Browser Support:**
Modern browsers only (not IE11).

### 4.4 None

**How it works:**
**No encapsulation** - styles are global.

**Simple Example:**
```typescript
@Component({
  selector: 'app-global',
  template: '<p class="text">Global styles</p>',
  styles: ['.text { color: green; }'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalComponent { }
```

**Generated CSS:**
```css
.text {
  color: green;  /* Applied globally! */
}
```

**Result:**
- Styles apply to entire application
- Can affect other components
- No scoping

**When to use:**
- Third-party library integration
- Global utility classes
- Rarely recommended

### 4.5 When to Use Each Mode

| Mode | Use Case | Pros | Cons |
|------|----------|------|------|
| **Emulated** | Default for most components | Good isolation, works everywhere | Slight performance overhead |
| **ShadowDom** | Maximum isolation needed | True encapsulation | Limited browser support |
| **None** | Global styles, third-party libs | Simple, fast | Style conflicts |

**Example Comparison:**

**Component 1:**
```typescript
@Component({
  selector: 'app-one',
  template: '<p class="text">Component One</p>',
  styles: ['.text { color: red; }'],
  encapsulation: ViewEncapsulation.Emulated
})
```

**Component 2:**
```typescript
@Component({
  selector: 'app-two',
  template: '<p class="text">Component Two</p>',
  styles: ['.text { color: blue; }'],
  encapsulation: ViewEncapsulation.Emulated
})
```

**Result:**
- Component 1's text is red
- Component 2's text is blue
- No conflict!

---

## 5. Content Projection and ng-content

### 5.1 What is Content Projection?

Content Projection is a pattern where you **insert content from a parent component** into a child component's template using `<ng-content>`.

**Think of it like:**
A picture frame (child component) that displays any picture you put in it (parent content).

**Why use it:**
- Create reusable container components
- Build flexible layouts
- Compose components

### 5.2 Single-Slot Projection

**Simple Example:**

**Child Component (Card):**
```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
  styles: ['.card { border: 1px solid black; padding: 20px; }']
})
export class CardComponent { }
```

**Parent Component Usage:**
```html
<app-card>
  <h2>Card Title</h2>
  <p>This content is projected into the card.</p>
</app-card>
```

**Rendered Output:**
```html
<app-card>
  <div class="card">
    <h2>Card Title</h2>
    <p>This content is projected into the card.</p>
  </div>
</app-card>
```

**Another Example:**
```typescript
@Component({
  selector: 'app-dialog',
  template: `
    <div class="dialog">
      <ng-content></ng-content>
      <button>Close</button>
    </div>
  `
})
export class DialogComponent { }
```

**Usage:**
```html
<app-dialog>
  <h1>Warning</h1>
  <p>Are you sure you want to delete?</p>
</app-dialog>
```

### 5.3 Multi-Slot Projection

**Use `select` attribute** to project content into specific slots.

**Simple Example:**

**Child Component:**
```typescript
@Component({
  selector: 'app-panel',
  template: `
    <div class="panel">
      <div class="header">
        <ng-content select="[slot=header]"></ng-content>
      </div>
      <div class="body">
        <ng-content select="[slot=body]"></ng-content>
      </div>
      <div class="footer">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `
})
export class PanelComponent { }
```

**Parent Usage:**
```html
<app-panel>
  <h2 slot="header">Panel Title</h2>
  <p slot="body">Panel content goes here.</p>
  <button slot="footer">Save</button>
</app-panel>
```

**Select by Element:**
```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content select="h1"></ng-content>
      <ng-content select="p"></ng-content>
    </div>
  `
})
```

**Usage:**
```html
<app-card>
  <h1>Title</h1>
  <p>Content</p>
</app-card>
```

**Select by Class:**
```typescript
@Component({
  selector: 'app-layout',
  template: `
    <header><ng-content select=".header"></ng-content></header>
    <main><ng-content select=".content"></ng-content></main>
  `
})
```

**Usage:**
```html
<app-layout>
  <div class="header">Header</div>
  <div class="content">Main content</div>
</app-layout>
```

### 5.4 Conditional Content Projection

**Check if content is projected:**

```typescript
import { Component, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
    <div *ngIf="hasContent">
      <ng-content></ng-content>
    </div>
    <div *ngIf="!hasContent">
      <p>No content provided</p>
    </div>
  `
})
export class ContainerComponent {
  @ContentChild('content') content: ElementRef;
  
  get hasContent(): boolean {
    return !!this.content;
  }
}
```

### 5.5 ng-content with Select

**Advanced Selectors:**

**Multiple Selectors:**
```typescript
@Component({
  selector: 'app-blog-post',
  template: `
    <article>
      <header>
        <ng-content select="h1,h2,h3"></ng-content>
      </header>
      <section>
        <ng-content select="p"></ng-content>
      </section>
      <footer>
        <ng-content select=".metadata"></ng-content>
      </footer>
    </article>
  `
})
```

**Default Content (fallback):**
```typescript
@Component({
  selector: 'app-wrapper',
  template: `
    <ng-content select="[primary]"></ng-content>
    <ng-content></ng-content>  <!-- Catches everything else -->
  `
})
```

**Usage:**
```html
<app-wrapper>
  <div primary>Primary content</div>
  <p>This goes to default slot</p>
  <span>This too</span>
</app-wrapper>
```

---

## 6. Dynamic Components

### 6.1 What are Dynamic Components?

Dynamic Components are components **created at runtime** (not defined in template).

**Think of it like:**
Building a Lego structure where you decide which pieces to add while building (not from a fixed plan).

**Use Cases:**
- Modal dialogs
- Dynamic forms
- Ad banners
- Tabs
- Widgets

### 6.2 Creating Dynamic Components

**Modern Way (Angular 13+):**

**Simple Example:**

**Component to Load:**
```typescript
@Component({
  selector: 'app-alert',
  template: '<div class="alert">{{ message }}</div>',
  standalone: true
})
export class AlertComponent {
  @Input() message: string;
}
```

**Host Component:**
```typescript
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AlertComponent } from './alert.component';

@Component({
  selector: 'app-dynamic',
  template: `
    <button (click)="loadComponent()">Show Alert</button>
    <div #container></div>
  `
})
export class DynamicComponent {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  
  loadComponent() {
    // Clear existing
    this.container.clear();
    
    // Create component
    const componentRef = this.container.createComponent(AlertComponent);
    
    // Set inputs
    componentRef.instance.message = 'Dynamic Alert!';
  }
}
```

### 6.3 ViewContainerRef

**ViewContainerRef** is a **container** where you can attach components.

**Simple Example:**
```typescript
import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-host',
  template: '<ng-container #dynamicContainer></ng-container>'
})
export class HostComponent implements OnInit {
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) 
  container: ViewContainerRef;
  
  ngOnInit() {
    // Create multiple components
    this.container.createComponent(Component1);
    this.container.createComponent(Component2);
    this.container.createComponent(Component3);
  }
}
```

**ViewContainerRef Methods:**
```typescript
// Create component
const ref = this.container.createComponent(MyComponent);

// Clear all
this.container.clear();

// Remove at index
this.container.remove(0);

// Get component at index
const component = this.container.get(0);

// Get length
const count = this.container.length;
```

### 6.4 ComponentFactoryResolver (Legacy)

**Old way (before Angular 13):**

```typescript
import { 
  Component, 
  ComponentFactoryResolver, 
  ViewChild, 
  ViewContainerRef 
} from '@angular/core';

@Component({
  selector: 'app-host',
  template: '<ng-container #container></ng-container>'
})
export class HostComponent {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  
  constructor(private resolver: ComponentFactoryResolver) { }
  
  loadComponent() {
    // Create factory
    const factory = this.resolver.resolveComponentFactory(AlertComponent);
    
    // Create component
    const componentRef = this.container.createComponent(factory);
  }
}
```

**Note:** This approach is deprecated. Use the modern way.

### 6.5 Passing Data to Dynamic Components

**Set Inputs:**
```typescript
loadComponent() {
  const componentRef = this.container.createComponent(UserComponent);
  
  // Set inputs
  componentRef.instance.name = 'John';
  componentRef.instance.age = 25;
  componentRef.instance.email = 'john@example.com';
  
  // Subscribe to outputs
  componentRef.instance.userClicked.subscribe((data) => {
    console.log('User clicked:', data);
  });
}
```

**Using setInput (Angular 14+):**
```typescript
loadComponent() {
  const componentRef = this.container.createComponent(UserComponent);
  
  componentRef.setInput('name', 'John');
  componentRef.setInput('age', 25);
}
```

**Pass Data via Constructor:**
```typescript
// Component with injection
@Component({
  selector: 'app-data',
  template: '<p>{{ config.title }}</p>'
})
export class DataComponent {
  constructor(@Inject('CONFIG') public config: any) { }
}

// Create with injector
import { Injector } from '@angular/core';

const injector = Injector.create({
  providers: [
    { provide: 'CONFIG', useValue: { title: 'Dynamic Title' } }
  ]
});

const componentRef = this.container.createComponent(
  DataComponent, 
  { injector }
);
```

### 6.6 Destroying Dynamic Components

**Destroy Single Component:**
```typescript
export class HostComponent {
  private componentRef: ComponentRef<any>;
  
  createComponent() {
    this.componentRef = this.container.createComponent(MyComponent);
  }
  
  destroyComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
```

**Clear All Components:**
```typescript
clearAll() {
  this.container.clear();
}
```

**Auto-destroy on Component Destroy:**
```typescript
export class HostComponent implements OnDestroy {
  private componentRefs: ComponentRef<any>[] = [];
  
  createComponent() {
    const ref = this.container.createComponent(MyComponent);
    this.componentRefs.push(ref);
  }
  
  ngOnDestroy() {
    // Destroy all created components
    this.componentRefs.forEach(ref => ref.destroy());
  }
}
```

---

## 7. Component Inheritance

### 7.1 What is Component Inheritance?

Component Inheritance allows one component to **inherit properties and methods** from another component.

**Think of it like:**
A child inheriting traits from a parent (eye color, height). Child components inherit code from parent classes.

**When to use:**
- Share common logic
- Reduce code duplication
- Create component hierarchies

### 7.2 Inheriting Component Classes

**Simple Example:**

**Base Component:**
```typescript
export class BaseComponent {
  title: string = 'Base';
  
  greet() {
    console.log('Hello from base');
  }
  
  commonMethod() {
    console.log('Common logic');
  }
}
```

**Child Component:**
```typescript
@Component({
  selector: 'app-child',
  template: '<h1>{{ title }}</h1>'
})
export class ChildComponent extends BaseComponent {
  constructor() {
    super();
    this.title = 'Child Component';
  }
  
  greet() {
    super.greet();  // Call parent method
    console.log('Hello from child');
  }
}
```

**Another Example:**
```typescript
// Base form component
export class BaseFormComponent {
  isValid = false;
  
  validate() {
    // Common validation logic
  }
  
  submit() {
    if (this.isValid) {
      console.log('Form submitted');
    }
  }
}

// User form
@Component({
  selector: 'app-user-form',
  template: '<form></form>'
})
export class UserFormComponent extends BaseFormComponent {
  username: string;
  
  submit() {
    super.validate();  // Use base validation
    super.submit();     // Use base submit
  }
}
```

### 7.3 Inheriting Lifecycle Hooks

**Child components can override lifecycle hooks:**

**Simple Example:**
```typescript
export class BaseComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('Base: OnInit');
    this.initialize();
  }
  
  ngOnDestroy() {
    console.log('Base: OnDestroy');
    this.cleanup();
  }
  
  initialize() {
    // Base initialization
  }
  
  cleanup() {
    // Base cleanup
  }
}
```

**Child Component:**
```typescript
@Component({
  selector: 'app-child',
  template: '<p>Child</p>'
})
export class ChildComponent extends BaseComponent {
  ngOnInit() {
    super.ngOnInit();  // Call parent's ngOnInit
    console.log('Child: OnInit');
    // Child-specific initialization
  }
  
  ngOnDestroy() {
    console.log('Child: OnDestroy');
    super.ngOnDestroy();  // Call parent's ngOnDestroy
  }
}
```

**Output:**
```
Base: OnInit
Child: OnInit
... (component lifecycle)
Child: OnDestroy
Base: OnDestroy
```

### 7.4 Inheriting Inputs and Outputs

**Inputs and Outputs are inherited:**

**Simple Example:**
```typescript
export class BaseComponent {
  @Input() title: string;
  @Output() titleChanged = new EventEmitter<string>();
  
  updateTitle(newTitle: string) {
    this.title = newTitle;
    this.titleChanged.emit(newTitle);
  }
}
```

**Child Component:**
```typescript
@Component({
  selector: 'app-child',
  template: `
    <h1>{{ title }}</h1>
    <button (click)="changeTitle()">Change</button>
  `
})
export class ChildComponent extends BaseComponent {
  changeTitle() {
    this.updateTitle('New Title');  // Use inherited method
  }
}
```

**Usage:**
```html
<app-child 
  [title]="'Hello'" 
  (titleChanged)="onTitleChange($event)">
</app-child>
```

### 7.5 Best Practices

**1. Keep Base Classes Abstract:**
```typescript
export abstract class BaseListComponent {
  items: any[] = [];
  
  abstract loadItems(): void;
  
  deleteItem(index: number) {
    this.items.splice(index, 1);
  }
}

@Component({
  selector: 'app-user-list',
  template: '<div *ngFor="let user of items">{{ user.name }}</div>'
})
export class UserListComponent extends BaseListComponent {
  loadItems() {
    // Implement specific loading
    this.items = [{name: 'John'}, {name: 'Jane'}];
  }
}
```

**2. Don't Inherit @Component Decorator:**
```typescript
// ✗ Bad: Base class shouldn't have @Component
@Component({...})
export class BaseComponent { }

// ✓ Good: Only child has @Component
export class BaseComponent { }

@Component({...})
export class ChildComponent extends BaseComponent { }
```

**3. Use Composition Over Inheritance (when possible):**
```typescript
// Instead of inheritance
export class DataComponent {
  constructor(private dataService: DataService) { }
}

// Child uses composition
@Component({...})
export class UserComponent {
  constructor(private dataService: DataService) { }
  // Reuse service instead of inheriting
}
```

**4. Call super() in Constructor:**
```typescript
export class BaseComponent {
  constructor(protected service: DataService) { }
}

@Component({...})
export class ChildComponent extends BaseComponent {
  constructor(service: DataService) {
    super(service);  // Required!
  }
}
```

---

## 8. Standalone Components

### 8.1 What are Standalone Components?

Standalone Components are components that **don't need to be declared in NgModules**. They are self-contained.

**Introduced in:** Angular 14 (stable in Angular 15)

**Think of it like:**
A standalone phone that doesn't need to be connected to a landline network. It works independently.

**Benefits:**
- Simpler architecture
- Less boilerplate code
- Better tree-shaking
- Easier testing

### 8.2 Creating Standalone Components

**Using CLI:**
```bash
ng generate component user --standalone
```

**Manual Creation:**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,  // Mark as standalone
  imports: [CommonModule],  // Import dependencies
  template: '<p>{{ name }}</p>'
})
export class UserComponent {
  name = 'John';
}
```

**Comparison:**

**Traditional Component:**
```typescript
// Component
@Component({
  selector: 'app-user',
  template: '<p>User</p>'
})
export class UserComponent { }

// Module (required)
@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule]
})
export class UserModule { }
```

**Standalone Component:**
```typescript
// Component (no module needed!)
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: '<p>User</p>'
})
export class UserComponent { }
```

### 8.3 Importing Dependencies

**Import what you need directly in the component:**

**Simple Example:**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,    // *ngIf, *ngFor, etc.
    FormsModule      // ngModel
  ],
  template: `
    <div *ngIf="showForm">
      <input [(ngModel)]="name" />
      <p>Hello {{ name }}</p>
    </div>
  `
})
export class FormComponent {
  showForm = true;
  name = '';
}
```

**Import Other Components:**
```typescript
import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,  // Import standalone components
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <main>Content</main>
    <app-footer></app-footer>
  `
})
export class LayoutComponent { }
```

**Import Pipes:**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPipe } from './custom.pipe';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule, CustomPipe],
  template: '<p>{{ data | custom }}</p>'
})
export class DataComponent {
  data = 'Hello';
}
```

### 8.4 Standalone Component Routing

**Route Configuration:**

**app.routes.ts:**
```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  
  // Lazy load standalone component
  {
    path: 'users',
    loadComponent: () => import('./users.component')
      .then(m => m.UsersComponent)
  }
];
```

**main.ts (Bootstrap):**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
```

**App Component:**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/about">About</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
```

**Child Routes:**
```typescript
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent),
    children: [
      {
        path: 'users',
        loadComponent: () => import('./admin/users.component')
          .then(m => m.UsersComponent)
      }
    ]
  }
];
```

### 8.5 Migrating to Standalone

**Step-by-Step Migration:**

**1. Create Standalone Component:**
```bash
ng generate component new-feature --standalone
```

**2. Convert Existing Component:**

**Before (Module-based):**
```typescript
// user.component.ts
@Component({
  selector: 'app-user',
  template: '<p>User</p>'
})
export class UserComponent { }

// user.module.ts
@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule]
})
export class UserModule { }
```

**After (Standalone):**
```typescript
// user.component.ts
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: '<p>User</p>'
})
export class UserComponent { }

// Delete user.module.ts (no longer needed)
```

**3. Update App Module:**

**Before:**
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UserModule  // Module import
  ]
})
export class AppModule { }
```

**After:**
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UserComponent  // Direct component import
  ]
})
export class AppModule { }
```

**4. Full Standalone App (No AppModule):**

**main.ts:**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    // Global providers here
  ]
});
```

### 8.6 Benefits of Standalone Components

**1. Simpler Code:**
```typescript
// Less boilerplate - no module needed
@Component({
  standalone: true,
  // ...
})
```

**2. Better Tree-Shaking:**
Only imports what's actually used, resulting in smaller bundles.

**3. Easier Testing:**
```typescript
// Test standalone component
TestBed.configureTestingModule({
  imports: [UserComponent]  // Just import the component
});
```

**4. Clearer Dependencies:**
```typescript
@Component({
  imports: [
    CommonModule,
    FormsModule,
    ChildComponent
  ]
  // Easy to see what this component needs
})
```

**5. Gradual Migration:**
Standalone and module-based components can coexist.

**Example:**
```typescript
// Standalone component
@Component({
  standalone: true,
  imports: [OldModuleComponent]  // Can use module components
})
export class NewComponent { }

// Module component
@NgModule({
  imports: [NewComponent]  // Can use standalone components
})
export class OldModule { }
```

---

## Summary

You've mastered **Angular Components**!

**Key Concepts:**

**1. Lifecycle Hooks**
- **ngOnInit**: Initialize component
- **ngOnDestroy**: Cleanup resources
- **ngOnChanges**: React to input changes
- **ngAfterViewInit**: Access DOM elements

**2. Component Metadata**
- **@Component**: Marks class as component
- **selector**: HTML tag name
- **template/templateUrl**: Component view
- **styles/styleUrls**: Component styles

**3. Component Communication**
- **@Input**: Parent → Child
- **@Output**: Child → Parent
- **EventEmitter**: Emit custom events
- **@ViewChild**: Access child components
- **Services**: Share data between any components

**4. View Encapsulation**
- **Emulated**: Default, scoped styles
- **ShadowDom**: Native shadow DOM
- **None**: Global styles

**5. Content Projection**
- **Single-slot**: `<ng-content>`
- **Multi-slot**: `<ng-content select="...">`
- Reusable container components

**6. Dynamic Components**
- Create components at runtime
- **ViewContainerRef**: Container for components
- Useful for modals, tabs, widgets

**7. Component Inheritance**
- Share logic between components
- Inherit lifecycle hooks
- Use composition when possible

**8. Standalone Components**
- No modules needed
- Self-contained
- Simpler architecture
- Future of Angular

**Best Practices:**
- Use ngOnInit for initialization
- Always cleanup in ngOnDestroy
- Prefer @Input/@Output for communication
- Use standalone components for new projects
- Keep components focused and small

Keep practicing these concepts!
