<h1>Angular</h1>
<p>Angular is a popular opem-source framework for building dynamic, interactive web applications.</p>
<p>It leverages the power of TypeScript, a superset of JavaScript, to ensure a more structured and scalable development experience.</p>
<p>Angular's core strength lies in building Single Page Applications (SPA). These applications load the initial HTML page with necessary resources and then dynamically update content within that page in response to user interactions. This results in smoother, more app-like experiences within the web browser.</p>
<p>Angular is developed and maintained by Google, ensuring a strong backing, active community, and long-term support.</p>

<h2>Angular Development Environment Setup</h2>
<p>To install Angular on your local system, you need the following:</p>
<ul>
	<li>Node.js : <code>node -v</code></li>
	<li>npm package manager : <code>npm -v</code></li>
</ul>
<p>Check the versions of Node.js, TypeScript, and RxJS that each version of Angular requires at <a href="https://angular.io/guide/versions">Link</a>.</p>
<p>You can use the Angular CLI to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.</p>
<p>To install the Angular CLI, open a terminal window and run the following command:</p>
<code>npm install -g @angular/cli</code>
<p>To Check whether angular is installed or not , run the following command</p>
<code>ng version</code>


<p>Here are some key concepts associated with Angular:</p>
<ul>
	<li>Components</li>
	<li>Templates</li>
	<li>Directives</li>
	<li>Dependency injection</li>
</ul>

<h2>Components</h2>
<p>Components are the fundamental building blocks of Angular applications.</p>
<p>They provide a way to structure your UI into self-contained, reusable units.</p>
<p>A component in Angular is a TypeScript class that encapsulates the data, behavior, and structure related to a part of the UI.</p>
<p>Each component consists of:</p>
<ul>
	<li><strong>TypeScript Class:</strong>A TypeScript class defines the component's behavior. It contains properties to hold data and methods to implement functionality. This is where you handle user interactions, communicate with services, and manage the component's state.</li>
	<li><strong>HTML Template:</strong>The HTML template determines the structure and presentation of the component's view. It uses Angular's special syntax (directives, data binding, etc.) to create dynamic and interactive elements.</li>
	<li><strong>CSS Styles:</strong>Optional but highly recommended, CSS styles define the look and feel of the component. you can use component-specific styles or global stylesheets.</li>
	<li><strong>Metadata (@Component decorator):</strong>The @Component decorator provides Angular with the essential information about how to create and use the component. It includes:
	<ul>
		<li><strong>selector:</strong> A tag name used to insert the component into HTML templates of other components.</li>
		<li><strong>templateUrl:</strong> The path to the HTML template.</li>
		<li><strong>styleUrls:</strong> An array of paths to CSS files.</li>
	</ul>
	</li>
</ul>

<p>Angular applications typically have a tree-like component structure. A root component (often called AppComponent) holds other components, which may contain further nested components.</p>
<p>Imagine a tree, where the root component acts as the trunk. This root component, usually named AppComponent, forms the foundation of your application and is typically responsible for bootstrapping the entire application.</p>
<p>From this root, branches represent child components nested within the AppComponent's template. These child components can further have their own nested components, creating a hierarchical structure that mirrors the organization of your application's UI.</p>

<h3>Creation Of Component</h3>
<p>Creating components in Angular can be done in two ways</p>

<h4>Using Angular CLI</h4>
<ol>
	<li>Navigate to Project Directory</li>
	<p>Run This Command in terminal : <code>cd your-project-name</code></p>
	<li>Generate a New Component:</li>
	<p>Run the <code> ng generate component component-name</code> command, where component-name is the name of your new component.</p>
	<li>Explore the Generated Files:</li>
	<p>The Angular CLI will generate the following files for your component:</p>
	<p>A folder with the component's name is created under your current directory.</p>
	<ul>
		<li>'component-name.component.ts': The TypeScript file containing the component class.</li>
		<li>'component-name.component.html': The HTML template associated with the component.</li>
		<li>'component-name.component.css' (or scss): The styles for the component.</li>
		<li>'component-name.component.spec.ts' : The unit test file for the component.</li>
	</ul>
</ol>
<p>You can change how ng generate component creates new components. <a href="https://angular.io/cli/generate#component-command">Check Here</a></p>

<h4>Creating a component manually</h4>
<p>Although the Angular CLI is the best way to create an Angular component, you can also create a component manually. This section describes how to create the core component file within an existing Angular project.</p>

<ol>
	<li>Create the component folder: Make a new folder under src/app.</li>
	<li>Create the TypeScript file (component-name.component.ts): Define your component class and decorate it with @Component.</li>
	<li>Create the HTML file (component-name.component.html): Write the component's template.</li>
	<li>Create the CSS file (component-name.component.css): Add styles for your component (optional).</li>
	<li>Configure @Component Decorator</li>
	<ul>
		<li>Define selector: An HTML tag that identifies where the component will be inserted into templates.</li>
		<li>Define templateUrl: The path to the HTML template.</li>
		<li>Define styleUrls: An array of paths to CSS stylesheets.</li>
	</ul>
	<li>Export the class, so that it can be imported to where it needs</li>
</ol>

<h4>Use Component</h4>
<p>To use your new component:</p>
<ol>
	<li>Import it: Import the component's class into the TypeScript file of the component where you want to use it.</li>
	<li>Declare in the @NgModule: Add the component to the declarations array of the Angular module (usually AppModule) that it belongs to.</li>
	<li>Use the selector: Add the component's selector tag in the template of the parent component where you want it to be rendered.</li>
</ol>

```TypeScript
// component-name.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.css']
})
export class ComponentNameComponent {
  // Component logic goes here
}
```

<h3>Defining Component/Css Selector</h3>
<p>In Angular, the component selector is a crucial aspect of how your components are used and identified within your application.</p>
<p>The component selector, defined within the @Component decorator, is a CSS-like string that acts as a unique identifier for your component in the HTML templates of other components. It tells Angular where to instantiate and render your component's view.</p>
<p>Consider a component named ProductDetailsComponent with the following selector:</p>

```TypeScript
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  // ...
}
```
<p>Now, you can use this component in another component's template like this:</p>

```TypeScript
<app-product-details [product]="selectedProduct"></app-product-details>
```
<p>Here, <app-product-details> directly references the selector defined in the @Component decorator, instructing Angular to render the ProductDetailsComponent at this location.</p>

<p>Best Practices for Component Selectors:</p>
<ul>
	<li>Use kebab-case: Use hyphens (kebab-case) for your selector names (e.g., app-product-details) for better readability and consistency.</li>
	<li>Prefix with an app- prefix: It's recommended to prefix your component selectors with app- to avoid conflicts with other libraries or potential future HTML elements.</li>
	<li>Keep it unique: Ensure each component has a unique selector within your application to prevent unintended rendering behavior.</li>
</ul>


<h3>Defining a component's template</h3>
<p>In Angular, a component's template defines the user interface (UI) structure and appearance. It's essentially a blueprint for how your component will be visually displayed in the browser.</p>
<p>There are two primary ways to define a component's template:</p>
<ol>
	<li>Inline Template:</li>
	<p>This approach embeds the HTML code directly within the @Component decorator using the template property:</p>

```TypeScript
@Component({
  selector: 'app-my-component',
  template: `
    <h1>Hello, Angular!</h1>
    <p>This is my component's template.</p>
  `
})
export class MyComponent {
  // ...
}
```
	<p>Here, the HTML code between backticks (\`) defines the component's structure, including an h1 and a p element.</p>
	<li>External Template File:</li>
	<p>For complex or reusable components, it's recommended to use an external template file for better organization and separation of concerns. This involves:</p>
	<ul>
		<li><strong>Creating an HTML file:</strong> Create a new file under your component's folder, typically named component-name.component.html.</li>
		<li><strong>Referencing the file:</strong> In the @Component decorator, use the templateUrl property to specify the path to the external template file:</li>
	</ul>

```TypeScript
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  // ...
}
```

</ol>

<h3>Declaring a component's styles</h3>
<p>There are two main ways to declare styles for your Angular components:</p>
<ol>
	<li>Inline Styles:</li>
	<p>This approach embeds the CSS code directly within the @Component decorator using the styles property:</p>

```TypeScript
@Component({
  selector: 'app-my-component',
  styles: [
    `
      h1 {
        color: blue;
      }
      p {
        font-weight: bold;
      }
    `
  ],
  templateUrl: './my-component.component.html'
})
export class MyComponent {
  // ...
}
```
	<p>Here, the CSS code within the square brackets defines styles for h1 and p elements within the component's template.</p>
	<li>External Stylesheet:</li>
	<p>For more complex components or to maintain better separation of concerns, using an external stylesheet is recommended:</p>
	<ul>
		<li>Create a CSS file: Create a new file under your component's folder, typically named component-name.component.css.</li>
		<li>Reference the file: In the @Component decorator, use the styleUrls property to specify the path to the external stylesheet:</li>
	</ul>

```TypeScript
@Component({
  selector: 'app-my-component',
  styleUrls: ['./my-component.component.css'],
  templateUrl: './my-component.component.html'
})
export class MyComponent {
  // ...
}
```

</ol>

<h3>Lifecycle Hooks</h3>
<p>Angular provides a set of lifecycle hooks that allow developers to tap into various stages of a component's life cycle. These hooks enable you to perform actions at specific moments in the component's creation, update, and destruction processes.</p>
<p>After your application instantiates a component or directive by calling its constructor, Angular calls the hook methods you have implemented at the appropriate point in the lifecycle of that instance.</p>
<p>Here are the main Angular lifecycle hooks:</p>
<ol>
	<li><strong>constructor():</strong></li>
	<p>This is the first method that gets executed when Angular creates a component instance.</p>
	<p>It's used to initialize dependencies, services, and default values for the component's properties.</p>
	<li><strong>ngOnChanges:</strong></li>
	<p>This hook is called when one or more input properties (@Input Properties Only) of the component change.</p>
	<p>It receives a SimpleChanges object containing the previous and current values of the input properties.</p>
	<p>Called before ngOnInit() (if the component has bound inputs) and whenever one or more data-bound input properties change.</p>

```TypeScript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-details',
  template: `
    <p>Product Name: {{ product.name }}</p>
    <p>Product Price: {{ product.price }}</p>
  `
})
export class ProductDetailsComponent implements OnChanges {
  @Input() product: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'].currentValue !== changes['product'].previousValue) {
      console.log('Product details updated!');
    }
  }
}
```
    <li>ngOnInit()</li>
    <p>This hook is called once after the component has been initialized.</p>
    <p>It is commonly used for initialization tasks, such as fetching initial data.</p>
    <p>Called once, right after the component is initialized and its data-bound properties are set.</p>

```TypeScript
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-product-list',
  template: ` ... ` // Your product display template
})
export class ProductListComponent implements OnInit {
  products: any[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.products = this.dataService.getProducts();
  }
} 
```
	<li>ngDoCheck()</li>
	<p>ngDoCheck is called during every change detection cycle,</p>
	<p>Custom change detection: If you have specific logic to check for changes that Angular's default change detection mechanism might not capture, you can implement it in ngDoCheck.</p>
	<p>Fine-grained control: ngDoCheck allows developers to have fine-grained control over change detection and perform optimizations if needed.</p>

```TypeScript
import { Component, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-custom-check',
  template: '{{ data }}'
})
export class CustomCheckComponent implements DoCheck {
  @Input() data: any;

  previousData: any;

  ngDoCheck() {
    if (this.data !== this.previousData) {
      console.log('Data changed:', this.data);
      this.previousData = this.data;
    }
  }
}
```
	<li>ngAfterContentInit()</li>
	<p>It  is useful when you need to perform actions that depend on the initialization of content projected into the component using ng-content.</p>
	<p>This hook is called once after the content has been projected into the component but before ngAfterContentChecked.</p>

```TypeScript
import { Component, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-content',
  template: '<ng-content></ng-content>'
})
export class ContentComponent implements AfterContentInit {
  ngAfterContentInit() {
    console.log('Content has been initialized');
  }
}

 import { Component } from '@angular/core';

 @Component({
   selector: 'app-container',
   template: `
     <app-content>
       <p>Projected content goes here.</p>
     </app-content>
   `
 })
 export class ContainerComponent {}
```
	<p>In this example, when ContainerComponent is created and ngAfterContentInit is called in ContentComponent, it logs a message indicating that the content has been initialized.</p>
	<p>Interacting with projected content: If your component uses <ng-content> to project content into it, ngAfterContentInit is a good place to interact with that content</p>
	<p>Accessing child components: If your component has child components, you can use ngAfterContentInit to interact with those child components after they have been initialized.</p>
	<li>ngAfterContentChecked()</li>
	<p>It is called after the content (projected content or child components) has been checked by Angular during every change detection cycle. This hook provides an opportunity to perform actions after Angular has checked the content and ensured that it is up to date.</p>
	<p>Interacting with projected content: If your component uses <ng-content> to project content into it, ngAfterContentChecked can be used to interact with that content after each change detection cycle.</p>

```Typescript
import { Component, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-content',
  template: '<ng-content></ng-content>'
})
export class ContentComponent implements AfterContentChecked {
  ngAfterContentChecked() {
    console.log('Content has been checked');
  }
}

 import { Component } from '@angular/core';

 @Component({
   selector: 'app-container',
   template: `
     <app-content>
       <p>Projected content goes here.</p>
     </app-content>
   `
 })
 export class ContainerComponent {}
```
	<li>ngAfterViewInit()</li>
	<p>t is called after the component's view and its child views (if any) have been fully initialized. This hook provides an opportunity to interact with the view, perform additional setup, or execute logic that requires access to the rendered DOM elements.</p>
	<p>Any logic that needs to be executed after the view is fully initialized can be placed in this hook.</p>

```TypeScript
import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-custom-styling',
  template: '<p #myParagraph>Dynamic styling</p>',
  styles: ['p { color: red; }']
})
export class CustomStylingComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const paragraphElement: HTMLElement = this.elementRef.nativeElement.querySelector('p');
    paragraphElement.style.fontSize = '20px';
  }
}

```
	<p>In this example, ngAfterViewInit is used to access a DOM element and apply a CSS style after the view has been initialized.</p>
	<li>ngAfterViewChecked()</li>
	<p>ngAfterViewChecked is part of the component's lifecycle and is called after every change detection cycle to notify that the view, including its child views, has been checked.</p>

```TypeSript
import { Component, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-check-message',
  template: '<p>View check message</p>'
})
export class CheckMessageComponent implements AfterViewChecked {
  ngAfterViewChecked() {
    console.log('View has been checked');
  }
}
```
	<p>In this example, when CheckMessageComponent is created, ngAfterViewChecked is called after each change detection cycle, logging a message indicating that the view has been checked.</p>
	<li>ngOnDestroy()</li>
	<p>It is called just before a component is destroyed or removed from the DOM. This hook provides an opportunity to clean up resources, unsubscribe from observables, or perform any necessary cleanup operations before the component is removed.</p>

```TypeScript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  template: '<p>{{ timerValue }}</p>'
})
export class TimerComponent implements OnInit, OnDestroy {
  timerValue: number = 0;
  private timerSubscription: Subscription;

  ngOnInit() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.timerValue++;
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the observable to prevent memory leaks
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
```

<p>In this example, the TimerComponent subscribes to an observable when initialized. The ngOnDestroy hook is used to unsubscribe from the observable when the component is destroyed, ensuring that there are no memory leaks.</p>
</ol>


<h3>View Encapsulation</h3>
<p>View encapsulation is a core strategy in Angular that determines how the styles you define within a component are applied to the component's template (its HTML). This mechanism lets you control the CSS stylesheet's influence, ensuring that styles intended for one component don't accidentally leak into other components, promoting modularity and maintainability.</p>
<p>Angular provides three primary encapsulation modes:</p>
<ul>
	<li>Emulated (Default):</li>
	<p>Angular achieves style scoping not through true Shadow DOM, but by emulating (resembles) its behavior.</p>
	<p>It adds unique attributes to elements within your component's template and modifies your CSS selectors to target those attributes specifically. </p>
	<p> This ensures that your styles are effectively contained within the component, even without native browser support for Shadow DOM.</p>
	<li>ShadowDom:</li>
	<p>Angular leverages the browser's native Shadow DOM implementation to truly isolate the component's styles.</p>
	<p>The Shadow DOM is a browser feature that enables a fundamental level of encapsulation within web development. It allows you to attach a hidden, separate DOM tree to an element. This attached tree is known as the "shadow tree", and the element it's attached to is referred to as the "shadow host".</p>
	<p>CSS styles defined within a shadow tree are strictly isolated from the rest of the document. This prevents styles from unintentionally leaking into other parts of your web page, promoting modularity and avoiding conflicts.</p>
	<p>Styles defined within a Shadow DOM are completely isolated from the rest of the document. This eliminates the risk of external styles inadvertently affecting your components and vice versa.</p>
	<p>Ensure adequate browser support if you intend to use Shadow DOM in production. Older browsers might need polyfills.</p>
	<li>None:</li>
	<p>With this mode, there's no style encapsulation. Styles you define in the component become global styles, affecting the entire application. Use this with caution, mainly for intentionally creating global styles.</p>
</ul>
<p>The default Emulated mode is generally safe and provides a good level of style isolation for most use cases. If you need the absolute strongest encapsulation and have good browser support, ShadowDom is an option. None should be used sparingly.</p>
<p>You control the view encapsulation mode for a component using the encapsulation property within the component's decorator:</p>

```TypeScript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.html',
  styleUrls: ['./my-component.css'],
  encapsulation: ViewEncapsulation.ShadowDom // Example: Using Shadow DOM 
})
export class MyComponent { ... }
```

<p>See Example for more clarity : <a href="https://angular.io/guide/view-encapsulation">Click Here</a></p>

<h3>Component Interaction</h3>
<p>Component interaction in Angular refers to the communication and data exchange between different components in an Angular application. </p>
<p>Components are the building blocks of an Angular application, and they often need to interact with each other to share data, trigger actions, or respond to changes.</p>
<p>There are several ways components can interact in Angular:</p>
<ol>
	<li><strong>@Input and @Output Decorators:</strong></li>
	<p>@Input: Allows a parent component to pass data to a child component. The child component declares an input property using @Input, and the parent component binds data to this property in the template.</p>

```TypeScript
// Child Component
@Input() inputData: string;

<!-- Parent Component Template -->
<app-child-component [inputData]="parentData"></app-child-component>
```
	<p>@Output: Allows a child component to emit events to the parent component. The child component declares an output property using @Output and an EventEmitter. The parent component listens for the emitted events in the template.</p>

```TypeScript
// Parent component (parent.component.ts)
@Component({
  selector: 'app-parent',
  template: `
    <app-child [message]="parentMessage"></app-child>
  `
})
export class ParentComponent {
  parentMessage = 'Hello from parent!';
}

// Child component (child.component.ts)
@Component({
  selector: 'app-child',
  template: `
    <p>{{ message }}</p>
  `
})
export class ChildComponent {
  @Input() message: string;
}
```
	<li><strong>Local Reference</strong></li>
	<p>local references (or template reference variables) provide a way to directly access an HTML element or a component from within the template of the current component. </p>
	<p>ou define a local reference by adding a hashtag (#) followed by a reference variable name to an HTML element in your component's template. For example:</p>

```TypeScript
<input type="text" #myInput>
```
	<p>Now there's a local reference variable named "myInput".</p>
	<p>Accessing an HTML Element: The local reference gives you a direct handle to the underlying HTML element (in the above example, the input element). You can access its properties and methods using the reference variable.</p>

```html
<h3>Countdown to Liftoff (via local variable)</h3>
<button type="button" (click)="timer.start()">Start</button>
<button type="button" (click)="timer.stop()">Stop</button>
<div class="seconds">{{timer.seconds}}</div>
<app-countdown-timer #timer></app-countdown-timer>
```
	<li><strong>@ViewChild</strong></li>
	<p>ViewChild is a decorator provided by Angular that allows a component to access a child component or element within its template</p>
	<p>It essentially injects a reference to the child component or element into the parent component. This enables the parent component to interact with the child's properties, methods, and events.</p>

```TypeScript
import { Component, ViewChild } from '@angular/core';
import { MyChildComponent } from './my-child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child #myChild></app-child>
    <button (click)="changeTitle()">Change Child Title</button>
  `
})
export class ParentComponent {
  @ViewChild('myChild') myViewChild: MyChildComponent;

  changeTitle() {
    this.myViewChild.title = 'New Title from Parent';
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h1>{{ title }}</h1>
  `
})
export class MyChildComponent {
  @Input() title = 'Default Title';
}

```
	<p>The myViewChild variable in the ParentComponent holds a reference to the MyChildComponent instance.</p>
	<p>The changeTitle method in the parent component accesses the title property of the child component and modifies it.</p>
	<li><strong>Shared Services</strong></li>
	<p>A shared service is a singleton object created in Angular to encapsulate data or behavior that needs to be shared between multiple components in your application. These components could be siblings, parent-child, or other unrelated components.</p>
	<p>Since they are singletons, there's only one instance of the service created for the entire application. This means any changes made to the data within a shared service will be reflected across all the components that use it.</p>

```TypeScript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Ensures a single instance across the application 
})
export class DataService {
  sharedData: string = 'Initial value';

  setData(newData: string) {
    this.sharedData = newData;
  }

  getData(): string {
    return this.sharedData;
  }
}

import { Component } from '@angular/core';
import { DataService } from './data.service'; 

@Component({ ... })
export class ComponentA {
  constructor(private dataService: DataService) {}

   updateData() {
     this.dataService.setData('Updated data');
   }
}

// Another component:
@Component ({ ... })
export class ComponentB {
   constructor(private dataService: DataService) {}

   displayData() {
     console.log(this.dataService.getData()); 
   }
}

```
	
</ol>

<h3>Customizing Component Styles</h3>
<ol>
	<li>Using Css Variables</li>
	<p>CSS Custom Properties, also known as CSS Variables, allow you to define values in a stylesheet that can be reused throughout the stylesheet.</p>
	<p>They are prefixed with -- and are referenced using the var() function.</p>
	Users of your component can customize the look by overriding these variables in their own stylesheets, either globally or specifically targeting your component:
	<p>If users want to apply customization directly in the template, they can do so using the style attribute.html</p>

```css
/* my-button.component.css */
:host {
  --my-button-bg-color: #3498db; /* Default background color */
  --my-button-text-color: white;  /* Default text color */

  background-color: var(--my-button-bg-color);
  color: var(--my-button-text-color);
}

/* Global customization */
my-button {
  --my-button-bg-color: red;
}

/* Or, within another component */
.custom-style my-button { 
  --my-button-text-color: black; 
} 

<!-- parent.component.html -->

<app-my-button style="--my-button-bg-color: #e74c3c; --my-button-text-color: black;"></app-my-button>

```
	<li>@Mixins</li>
	<p>Mixins are reusable blocks of styles you can include within other CSS rules.  They often accept parameters, allowing for dynamic customization.</p>

```css
@mixin button-variant($color) {
  background-color: $color;
  border-color: $color;
}

.primary-button {
  @include button-variant(blue);
}
```
	<p>Angular components, by default, use a feature called View Encapsulation. This creates a scoping mechanism for styles, ensuring they only apply within the component where they are defined, preventing styles from clashing with other components.</p>
	<p>So,Direct @mixins Are Not Used in Angular's Styling:</p>
	<p> You can use Sass or Less if you include it in your project setup. Create functions that accept parameters and return CSS blocks, similar to mixin concepts:</p>

```scss
// _functions.scss
@function button-variant($color) {
  background-color: $color;
  border-color: $color;
  @return;
}

// my-component.component.scss
.primary-button {
  @include button-variant(blue);
}

```
<p>Create a separate .scss file (e.g., _functions.scss) containing your global styles and mixins.</p>
	<p>Import this file in your angular.json file within the styles array of the build section:</p>

```json
// angular.json
{
  "architect": {
    "build": {
      "options": {
        "styles": [
          "src/styles.css",
          "src/_functions.scss" // Your global styles and mixins
        ]
      }
    }
  }
}
```
	<p>In your component styles, you can now import and use the global mixin. Let's say you have a component named app-example:</p>

```css
/* app-example.component.scss */

@import '../../styles'; // Adjust the path based on your project structure

@include globalStyles();

// Additional component-specific styles

```
</ol>