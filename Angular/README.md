<h1>Angular</h1>
<p>Angular is a popular open-source framework for building dynamic, interactive web applications.</p>
<p>It leverages the power of TypeScript, a superset of JavaScript, to ensure a more structured and scalable development experience.</p>
<p>Angular's core strength lies in building single-page applications (SPA). These applications load the initial HTML page with the necessary resources and then dynamically update content within that page in response to user interactions. This results in smoother, more app-like experiences within the web browser.</p>
<p>Angular is developed and maintained by Google, ensuring strong backing, active community, and long-term support.</p>

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
<p>To Check whether angular is installed or not, run the following command</p>
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
	<li><strong>Metadata (@Component decorator):</strong>The @Component decorator provides Angular with essential information about how to create and use the component. It includes:
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
		<li>'component-name.component.spec.ts': The unit test file for the component.</li>
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
<p>Here, app-product-details directly references the selector defined in the @Component decorator, instructing Angular to render the ProductDetailsComponent at this location.</p>

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
	<p>Interacting with projected content: If your component uses ng-content to project content into it, ngAfterContentInit is a good place to interact with that content</p>
	<p>Accessing child components: If your component has child components, you can use ngAfterContentInit to interact with those child components after they have been initialized.</p>
	<li>ngAfterContentChecked()</li>
	<p>It is called after the content (projected content or child components) has been checked by Angular during every change detection cycle. This hook provides an opportunity to perform actions after Angular has checked the content and ensured that it is up to date.</p>
	<p>Interacting with projected content: If your component uses ng-content to project content into it, ngAfterContentChecked can be used to interact with that content after each change detection cycle.</p>

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
	<p>Angular achieves style scoping not through true Shadow DOM, but by emulating (resembling) its behavior.</p>
	<p>It adds unique attributes to elements within your component's template and modifies your CSS selectors to target those attributes specifically. </p>
	<p> This ensures that your styles are effectively contained within the component, even without native browser support for Shadow DOM.</p>
	<li>ShadowDom:</li>
	<p>Angular leverages the browser's native Shadow DOM implementation to truly isolate the component's styles.</p>
	<p>The Shadow DOM is a browser feature that enables a fundamental level of encapsulation within web development. It allows you to attach a hidden, separate DOM tree to an element. This attached tree is known as the "shadow tree", and the element it's attached to is referred to as the "shadow host".</p>
	<p>CSS styles defined within a shadow tree are strictly isolated from the rest of the document. This prevents styles from unintentionally leaking into other parts of your web page, promoting modularity and avoiding conflicts.</p>
	<p>Styles defined within a Shadow DOM are completely isolated from the rest of the document. This eliminates the risk of external styles inadvertently affecting your components and vice versa.</p>
	<p>Ensure adequate browser support if you intend to use Shadow DOM in production. Older browsers might need polyfills.</p>
	<li>None:</li>
	<p>With this mode, there's no style encapsulation. The styles you define in the component become global styles, affecting the entire application. Use this with caution, mainly for intentionally creating global styles.</p>
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

<h3>Content Projection</h3>
<p>Content projection in Angular is a powerful feature that allows you to insert and project content from a One component into another component. This enables you to create more flexible and reusable components by separating the structure and behavior of the components.</p>
<p>Types of Content Projection</p>
<ol>
	<li>Single-Slot Content Projection</li>
	<li>Multi-Slot Content Projection</li>
	<li>Conditional content projection</li>
</ol>
<h4>Single Slot Content Projection</h4>
<p>The most basic form.</p>
<p>You have a single ng-content tag in your component's template</p>
<p>Any content placed between the component's opening and closing tags in the parent component is projected into that slot.</p>
<p>please import common module to use these examples</p>

```html
<div class="card">
  <div class="card-header">
    <ng-content></ng-content> 
  </div>
  <div class="card-body">
    <p>Default card content</p>
  </div>
</div>
```

```TypeScript
<app-card>
  <h2>Custom Title</h2>
  <img src="my-image.jpg" alt="Image">
</app-card>
```

<p>The content placed within the app-card tags (the h2 and img) will get projected directly into the card-header section of your card component.</p>
<p>The overall result looks as follows</p>

```html
<div class="card">
  <div class="card-header">
    <h2>Custom Title</h2>
  	<img src="my-image.jpg" alt="Image">
  </div>
  <div class="card-body">
    <p>Default card content</p>
  </div>
</div>
```

<h4>Multiple Content Projection</h4>
<p>You can have multiple ng-content tags</p>
<p>you can name them as tag name, attribute, CSS class, and the :not pseudo-class. to differentiate between different content insertion points</p>
<p>When using the component, any elements in the parent component that match the specified CSS selectors will be projected into the corresponding ng-content slots.</p>

```html
<!-- parent.component.html -->
<div>
  <h2>Parent Component</h2>
  <ng-content select=".header"></ng-content>
  <ng-content></ng-content>
</div>

<!-- app.component.html -->
<app-parent>
  <div class="header">Header Content</div>
  <p>Regular Content</p>
</app-parent>

```

<p>In this case, the content with the class "header" is projected into the first ng-content in the parent component, and the remaining content is projected into the second ng-content.</p>
<p>If your component includes an ng-content element without a select attribute, that instance receives all projected components that do not match any of the other ng-content elements.</p>

<h4>Conditional Content Projection</h4>
<p>This technique allows you to display projected content based on specific conditions or logic within your component. It's a powerful way to make your components even more adaptable.</p>
<p>It refers to the ability to project different content into a child component based on certain conditions in the parent component. This feature is particularly useful when you want to customize the content that gets projected into a child component depending on specific criteria or dynamic circumstances.</p>

<h5>ng-container</h5>
<p>t acts as a grouping element without adding an extra layer to your DOM (Document Object Model). This means it won't be rendered as a real HTML element in the browser.</p>
<p> The primary use of ng-container is with structural directives (like *ngIf, *ngFor). Structural directives alter how the DOM is shaped. ng-container gives you a clean way to apply these directives without introducing unnecessary HTML tags.</p>

```html
<ng-container *ngIf="showContent">
  <div>Some content here</div>
  <p>More content</p>
</ng-container>
```

<h5>ng-template</h5>
<p>Defines a template that isn't directly rendered. It's a blueprint for content that you can instantiate later, either conditionally or repeatedly.</p>
<p>The content inside ng-template won't display on its own.</p>
<p>ng-template usually works with structural directives and the NgTemplateOutlet directive to dynamically insert the template into the DOM.</p>

```html
<ng-template #errorTemplate>
  <p class="error"> An error occurred! </p>
</ng-template>

<ng-container *ngIf="hasError; else successTemplate">
  <ng-container *ngTemplateOutlet="errorTemplate"></ng-container>
</ng-container>

<ng-template #successTemplate>
  <p>Success!</p> 
</ng-template>
```

<p>In Conditional Content Projection,Using an ng-content element in these cases is not recommended, because when the consumer of a component supplies the content, that content is always initialized, even if the component does not define an ng-content element or if that ng-content element is inside of an ngIf statement.</p>
<p>With an ng-template element, you can have your component explicitly render content based on any condition you want, as many times as you want. Angular will not initialize the content of an ng-template element until that element is explicitly rendered.</p>

<h3>Dynamic Components</h3>
<p>Dynamic components in Angular refer to the creation and rendering of components at runtime, rather than at compile time. This allows you to build more flexible and dynamic user interfaces</p>
<p>Static applications have pre-defined components in their templates.</p>
<p>Dynamic components are useful when:</p>
<ul>
	<li>You need to display components based on user interaction</li>
	<li>You have a large number of components that are not always needed on the page</li>
	<p>You want to create a more modular and adaptable application architecture.</p>
</ul>
<p>There are two primary approaches to creating dynamic components in Angular:</p>
<ul>
	<li>Using NgComponentOutlet:</li>
	<li>Using the ComponentFactoryResolver Service:</li>
</ul>

<h4>Using NgComponentOutlet:</h4>
<p>The NgComponentOutlet directive can be used to instantiate components and insert them into the current view. This directive allows you to provide a component class that should be rendered, as well as component inputs to be used during initialization.</p>

```TypeScript

import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="job-ad">
      <h4>{{ headline }}</h4>
      {{ body }}
    </div>
  `,
})
export class HeroJobAdComponent {
  @Input() headline!: string;
  @Input() body!: string;
}

import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="hero-profile">
      <h3>Featured Hero Profile</h3>
      <h4>{{ name }}</h4>
      <p>{{ bio }}</p>
      <strong>Hire this hero today!</strong>
    </div>
  `,
})
export class HeroProfileComponent {
  @Input() name!: string;
  @Input() bio!: string;
}

import { Injectable, Type } from '@angular/core';
import { HeroProfileComponent } from './hero-profile.component';
import { HeroJobAdComponent } from './hero-job-ad.component';

@Injectable({ providedIn: 'root' })
export class AdService {
  getAds() {
    return [
      {
        component: HeroProfileComponent,
        inputs: { name: 'Dr. IQ', bio: 'Smart as they come' },
      },
      {
        component: HeroProfileComponent,
        inputs: { name: 'Bombasto', bio: 'Brave as they come' },
      },
      {
        component: HeroJobAdComponent,
        inputs: {
          headline: 'Hiring for several positions',
          body: 'Submit your resume today!',
        },
      },
      {
        component: HeroJobAdComponent,
        inputs: {
          headline: 'Openings in all departments',
          body: 'Apply today',
        },
      },
    ] as {component: Type<any>, inputs: Record<string, unknown>}[];
  }
}


@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe],
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <ng-container *ngComponentOutlet="
        currentAd.component;
        inputs: currentAd.inputs;
      " />
      <button (click)="displayNextAd()">Next</button>
    </div>
  `
})
export class AdBannerComponent {
  private adList = inject(AdService).getAds();

  private currentAdIndex = 0;

  get currentAd() {
    return this.adList[this.currentAdIndex];
  }

  displayNextAd() {
    this.currentAdIndex++;
    // Reset the current ad index back to `0` when we reach the end of an array.
    if (this.currentAdIndex === this.adList.length) {
      this.currentAdIndex = 0;
    }
  }
}
```

<p>Final Output</p>
<img src="https://angular.io/generated/images/guide/dynamic-component-loader/ads-example.gif">

<h3>Angular Elements</h3>
<p>Angular Elements provides a way to take your Angular components and turn them into standard custom elements (also known as Web Components). This empowers you to use your well-crafted Angular components directly within non-Angular applications or even basic HTML pages.</p>
<p>Uses</p>
<ul>
	<li>Custom elements are a native browser feature, making Angular Elements usable in projects built with React, Vue, vanilla JavaScript, or any other framework (or even no framework at all!).</li>
	<li>This can aid in incremental migration. You can package existing Angular components as custom elements and introduce them into a legacy application built with a different technology.</li>
	<li>Build micro-frontends: different parts of a large application can be developed independently (even using different frameworks), while retaining seamless integration.</li>
</ul>
<p>Steps to create</p>
<ol>
	<li>Create an Angular Component: Develop your Angular component as you typically would.</li>
	<li>Use the @angular/elements Package: Install this package and its polyfills for older browser support.</li>
	<li>createCustomElement Function: Utilize the createCustomElement function to convert your Angular component into a custom element.</li>
	<li>Register the Custom Element: Use JavaScript's customElements.define() function to register your newly created custom element.</li>
</ol>

```TypeScript
import { createCustomElement } from '@angular/elements';
import { MyAngularComponent } from './my-angular.component';

const customElement = createCustomElement(MyAngularComponent, { injector: this.injector });
customElements.define('my-angular-element', customElement);
```

<p>You can use your my-angular-element tag in any HTML document as if it were any standard HTML element.</p>


<h2>Templates</h2>
<p>In Angular, templates are a fundamental part of the framework that allow you to define the structure and layout of your application's user interface. Templates in Angular are typically written in HTML and can include Angular-specific syntax and directives to bind data, handle events, and manipulate the DOM.</p>
<p>Almost all HTML syntax is valid template syntax. However, because an Angular template is only a fragment of the UI, it does not include elements such as html, body, or base.</p>
<h3>Interpolation</h3>
<p>interpolation is a technique used to embed expressions within your templates, allowing you to display dynamic content based on your component's data.</p>
<p>It acts as a one-way data binding mechanism, bringing your component's properties and expressions to life in the UI.</p>
<p>Double curly braces: {{ expression }} is the syntax used to mark an interpolation point in the template.</p>
<p>Expressions inside: The expression within the braces can be a reference to a component property, a valid JavaScript expression, or even a combination of both.</p>

```TypeScript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome, {{ username }}!</h1>
    <p>Your age is {{ calculateAge(birthYear) }}.</p>
  `,
})
export class AppComponent {
  username = 'John Doe';
  birthYear = 1990;

  calculateAge(year: number): number {
    const currentYear = new Date().getFullYear();
    return currentYear - year;
  }
}
```

<p> Angular evaluates the expression within the double curly braces and replaces it with the resulting value.</p>
<h3>Template Statements</h3>
<p>template statements are used for event binding. They allow you to respond to user actions, such as button clicks or mouse events, by executing methods defined in your Angular component</p>
<p> Template statements are enclosed in parentheses and are used within the HTML templates to bind to events.</p>

```TypeScript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="onButtonClick()">Click me!</button>
    <p>{{ message }}</p>
  `,
})
export class AppComponent {
  message: string = '';

  onButtonClick(): void {
    this.message = 'Button clicked!';
  }
}
```

<p>(click)="onButtonClick()" is a template statement that binds the onButtonClick() method to the click event of the button element.</p>
<p>When the button is clicked, the onButtonClick() method is executed, updating the message property in the component.</p>
<p>Template statements are enclosed in parentheses. The content inside the parentheses typically consists of an event name (e.g., click) followed by the method or expression to be executed when the event occurs.</p>

<h4>Statement Context</h4>
<p>In Angular templates, statement context refers to the specific environment within which a template statement operates. This context determines what elements the statement has access to and can interact with.</p>
<p>	The context of a template statement can be the component class instance or the template.</p>
<p>Typically, the statement context is the component class instance. This means that statements within a template can directly access properties and methods defined in the component class.</p>
<p>Template statements can also access elements within their own context.</p>
<p>Template reference variables: These are references assigned to specific DOM elements within the template, allowing the statement to interact with the element.</p>
<p>The $event object: This object is available in event handler statements and provides details about the event that triggered the statement.</p>
<p>Statement context has priority over global scope. This means template statements cannot directly access global variables or functions like window or console.log.
</p>

```html
<button type="button" (click)="onSave($event)">Save</button>
<button type="button" *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{hero.name}}</button>
<form #heroForm (ngSubmit)="onSubmit(heroForm)"> ... </form>
```

<p>The (click) event handler binds the click event on the button to the deleteHero method of the component class.</p>
<p>Inside the deleteHero statement, hero refers to the current item being iterated over in the loop (assuming the button is placed within an *ngFor loop).</p>
<p>This statement can access hero because it's within the context of the loop iteration, and hero is a local variable available in that context.</p>
<p>	In this example, the context of the $event object, hero, and #heroForm is the template.</p>
<p>	The statement context may also refer to properties of the template's own context. In the following example, the component's event handling method, onSave() takes the template's own $event object as an argument. On the next two lines, the deleteHero() method takes a template input variable, hero, and onSubmit() takes a template reference variable, #heroForm.
</p>
<p>	Template statements support basic assignment (=) and chaining expressions with semicolons (;) unlike template expressions. This allows for functionalities like setting variable values and executing multiple statements within a single line.</p>
<p>Template statements do not allow:</p>
<ul>	
	<li>new keyword</li>
	<li>Increment/decrement operators (++, --) and operator assignment (+=, -=, etc.) </li>
	<li>Bitwise operators (|, &, etc.) </li>
	<li>Pipe operator (|)</li>
</ul>

<h3>Template Binding</h3>
<p>In Angular, binding is a powerful mechanism that allows you to connect and synchronize data between the components (the TypeScript code) and the templates (the HTML code). </p>
<p>Creates a live connection between the component's data and the template elements.</p>
<p>Keeps the view and the model synchronized.</p>
<p>Allows user interactions in the view to update the model, and vice versa.</p>
<p>There are different types of bindings in Angular</p>
<ul>
	<li>Interpolation Binding:</li>
	<li>Property Binding:</li>
	<li>Event Binding:</li>
	<li>Two-way Binding:</li>
</ul>
<p>Bindings always have two parts: a <strong>target</strong> which will receive the bound value, and a <strong>template expression</strong> which produces a value from the model.</p>
<p>Template expressions are similar to JavaScript expressions. Many JavaScript expressions are legal template expressions, with the following exceptions.</p>
<p>You can't use JavaScript expressions that have or promote side effects, including:</p>
<ul>
	<li>Assignments (=, +=, -=, ...)</li>
	<li>Operators such as new, typeof, or instanceof</li>
	<li>Chaining expressions with ; or ,</li>
	<li>The increment and decrement operators ++ and --</li>
	<li>Some of the ES2015+ operators</li>
	<li>No support for the bitwise operators such as | and &</li>
</ul>
<h4>Name Collison</h4>
<p>The evaluation context of an expression in a template is a combination of:</p>
<ul>
	<li>Template variables: Variables defined within the current template.</li>
	<li>Directive's context object: If the directive used in the element defines a context object.</li>
	<li>Component's member names: Properties and methods defined in the component class.</li>
</ul>
<p>When a name belongs to multiple contexts, Angular follows this precedence order:</p>
<ol>
	<li>Template variable name: Takes highest priority.</li>
	<li>Directive's context object name: If applicable.</li>
	<li>Component's member names: Lowest priority.</li>
</ol>
<p>The best practice is to choose unique names for variables across different contexts to avoid confusion and potential errors.</p>

<h3>Property Binding</h4>
<p>Property binding in Angular is a one-way data binding technique that allows you to set the value of a property of a DOM element or a directive based on the value of a property in the component class.</p>
<p>This binding is useful for dynamically updating the properties of HTML elements or Angular directives in response to changes in the component.</p>
<p>Property binding is denoted by square brackets [] in the template</p>
<p>Enclose the property name in square brackets [] within the element tag.</p>
<p>Assign a component property to the target property using =.</p>

```html
<img alt="item" [src]="itemImageUrl">
```
<p>src is the target property of the img element.</p>
<p>itemImageUrl is a component property holding the image URL.</p>
<p>Angular evaluates the right-hand side expression (e.g., itemImageUrl) and retrieves its value.</p>
<p>Angular sets the target property to the evaluated value, dynamically updating the element's behavior or appearance.</p>

<p>Target property names often correspond to HTML attribute names (e.g., src, href, disabled).</p>
<p>Square brackets mark dynamic evaluation. Without them, Angular treats the value as a static string.</p>
<p>To assign a string to a component's property (such as the childItem of the ItemDetailComponent), remove square brackets</p>

```html
<app-item-detail childItem="parentItem"></app-item-detail>
```

<p>It can also be used in data sharing between two components</p>


<h4>DOM Properties vs Html Attributes</h4>

<p><strong>DOM Properties:</strong></p>
<ul>
	<li>JavaScript properties associated with HTML elements in the Document Object Model (DOM).</li>
	<li>Accessible and modifiable using JavaScript code, allowing dynamic control over element behavior and appearance.</li>
	<li>Examples: innerHTML, style, value, disabled, checked, etc.</li>
	<li>Not directly reflected in HTML source code: Changes made through DOM properties don't always update the original HTML attribute values.</li>
</ul>

<p><strong>HTML Attributes:</strong></p>
<ul>
	<li>Defined within the HTML tag itself, providing information about the element and its behavior.</li>
	<li>Usually static, defined in the HTML code and typically not meant to be changed dynamically using JavaScript.</li>
	<li>src, href, id, class, alt, etc.</li>
	<li>Changes made to attributes directly modify the HTML code.</li>
</ul>

<p>DOM properties allow for dynamic control of elements' appearance and behavior through JavaScript.</p>
<li>HTML attributes provide static information about elements and are used for initial configuration.</li>

<h3>Attribute Binding</h4>
<p>Attribute binding in Angular is a technique used to set the value of an HTML element's attribute directly from a component's property. While similar to property binding, it caters to specific scenarios.</p>
<ul>
	<li>Targets element attributes, not DOM properties. This is useful for attributes that don't have direct DOM property counterparts</li>
	<li> Uses the attr. prefix followed by the attribute name in square brackets []. The value is assigned using the equal sign =.</li>
</ul>

```html
<td [attr.colspan]="columnSpan"></td>
```
<p>[attr.colspan]: Attribute binding for the colspan attribute.</p>
<p>columnSpan: Component property holding the desired colspan value.</p>

<p>When to use attribute binding:</p>
<ul>
	<li>Non-DOM property attributes: When there's no corresponding DOM property for the attribute you want to set.</li>
	<li>Dynamic attribute values: When the attribute value needs to be determined at runtime based on component data.</li>
	<li>Custom directives: When working with directives that expect specific attributes to be set.</li>
</ul>

<h3>Class & Style Binding</h3>
<p>In Angular templates, class binding and style binding are powerful techniques that allow you to dynamically add, remove, or modify CSS classes and inline styles of your HTML elements based on data in your component class.</p>
<h4>Class Binding</h4>
<p>Dynamically manage an element's CSS classes based on component properties.</p>
<table>
<thead>
<tr>
<th align="left">Binding Type</th>
<th align="left">Syntax</th>
<th align="left">Input Type</th>
<th align="left">Example Input Values</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Single class binding</td>
<td align="left"><code>[class.sale]="onSale"</code></td>
<td align="left"><code>boolean | undefined | null</code></td>
<td align="left"><code>true</code>, <code>false</code></td>
</tr>
<tr>
<td align="left">Multi-class binding</td>
<td align="left"><code>[class]="classExpression"</code></td>
<td align="left"><code>string</code></td>
<td align="left"><code>"my-class-1 my-class-2 my-class-3"</code></td>
</tr>
<tr>
<td align="left">Multi-class binding</td>
<td align="left"><code>[class]="classExpression"</code></td>
<td align="left"><code>Record(string, boolean | undefined | null)</code></td>
<td align="left"><code>{foo: true, bar: false}</code></td>
</tr>
<tr>
<td align="left">Multi-class binding</td>
<td align="left"><code>[class]="classExpression"</code></td>
<td align="left"><code>Array&lt;string&gt;</code></td>
<td align="left"><code>['foo', 'bar']</code></td>
</tr>
</tbody>
</table>

```html
<button [class.active]="isActive">Click me!</button>
```

<p>The button receives the active class only when isActive (a component property) is true.</p>

<h4>Style Binding</h4>
<p>Dynamically set inline styles of an element based on component properties.</p>

<table>
<thead>
<tr>
<th align="left">Binding Type</th>
<th align="left">Syntax</th>
<th align="left">Input Type</th>
<th align="left">Example Input Values</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Single style binding</td>
<td align="left"><code>[style.width]="width"</code></td>
<td align="left"><code>string | undefined | null</code></td>
<td align="left"><code>"100px"</code></td>
</tr>
<tr>
<td align="left">Single style binding with units</td>
<td align="left"><code>[style.width.px]="width"</code></td>
<td align="left"><code>number | undefined | null</code></td>
<td align="left"><code>100</code></td>
</tr>
<tr>
<td align="left">Multi-style binding</td>
<td align="left"><code>[<a href="api/animations/style" class="code-anchor">style</a>]="styleExpression"</code></td>
<td align="left"><code>string</code></td>
<td align="left"><code>"width: 100px; height: 100px"</code></td>
</tr>
<tr>
<td align="left">Multi-style binding</td>
<td align="left"><code>[<a href="api/animations/style" class="code-anchor">style</a>]="styleExpression"</code></td>
<td align="left"><code>Record(string, string | undefined | null)</code></td>
<td align="left"><code>{width: '100px', height: '100px'}</code></td>
</tr>
</tbody>
</table>

```html
<h1 [style.color]="isError ? 'red' : 'green'">Heading</h1>
```
<p>The heading's color switches between red (if isError is true) and green.</p>

<h3>Event Binding</h3>
<p>Event binding in Angular allows you to capture and respond to user-generated events (such as button clicks, mouse movements, and keyboard inputs) within your application. With event binding, you can execute methods in your component class in response to these events.</p>
<p>Binds an event occurring on an HTML element (like a click, keypress, or mouseover) to a method defined in your component class.</p>
<p>Triggers the execution of the bound method when the event happens on the element.</p>
<p>Enables your component to handle user interactions and react accordingly.</p>

```TypeScript
(event-name)="method-name($event)"
```

<p>(event-name): Represents the HTML event you want to listen for (e.g., (click), (keyup)).</p>
<p>"method-name": The name of the method in your component class that you want to execute when the event occurs.</p>
<p>($event) (optional): An optional argument representing an event object containing details about the triggered event.</p>

```TypeScript
<button (click)="handleClick($event)">Click me!</button>

export class AppComponent {
  handleClick(event: MouseEvent) {
    alert('Button clicked!');
    console.log('Event object:', event);
  }
}

```
<p>Clicking the button triggers the handleClick method in the component class.</p>
<p>The $event argument (optional here) provides access to the event object, which contains details like the button clicked and any modifier keys pressed during the click.</p>

<p>You can bind multiple events to the same element (e.g., (click)="handleClick()" (mouseover)="handleHover()").</p>

<h3>Two Way Data Binding</h3>
<p>Two-way data binding in Angular is a mechanism that establishes a synchronized connection between an element's value in the template (view) and a property in your component class (model). This means changes made in one place are automatically reflected in the other, creating a seamless flow of data.</p>
<p>Combines property binding and event binding: It leverages both concepts to achieve two-way communication.
</p>
<p>Syntax: Achieved using the [(ngModel)] directive.</p>
<p>Commonly used with forms: Ideal for scenarios where user input in form elements needs to be reflected back to the component's data and vice versa.</p>
<p>Two-way data binding is denoted by the [(ngModel)] directive in the template. It combines the square bracket syntax of property binding ([property]) with the parentheses syntax of event binding (event).</p>

```html
<!-- Syntax for Two-Way Data Binding -->
<element [(ngModel)]="property"></element>
```
<p>Here, property is a property in your component class.</p>
<p>Consider a scenario where you want to bind an input field to a property in your component class and reflect any changes in both the input field and the component.</p>

```TypeScript
// Component class
export class ExampleComponent {
  inputValue = 'Initial Value';
}

<!-- Template with Two-Way Data Binding -->
<input [(ngModel)]="inputValue" />

```

<p>In this example, the inputValue property is bound to the value of the input field, and any changes in the input field will automatically update the inputValue property in the component class.</p>

<p>To use two-way data binding, you need to import the FormsModule in your Angular module and add it to the imports array. This module provides the ngModel directive.</p>

```TypeScript
// Import the FormsModule in your Angular module
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // other modules
    FormsModule
  ],
  // other configurations
})
export class AppModule { }
```

<p>Behind the scenes, Angular combines property binding and event binding to achieve two-way data binding. The [(ngModel)] directive binds the value of the input field to the property in the component and listens for the input event to update the property when the user types.</p>

```html
<!-- Equivalent Syntax Combining Property and Event Binding -->
<input [ngModel]="inputValue" (ngModelChange)="inputValue=$event" />
```

<p>Two-way data binding simplifies the code required to keep the template and component in sync, especially in scenarios where user input needs to be reflected immediately in the component and vice versa. It's important to note that two-way data binding requires the use of the FormsModule for the ngModel directive.</p>

<p>Potential performance issues: Frequent updates can impact performance in large forms. Consider alternatives like one-way data binding with manual updates in complex scenarios.</p>
<p>Use with caution: Not always necessary for simple data display. Evaluate the trade-offs based on your specific use case.</p>

<h3>Pipes</h3>
<p>Pipes in Angular are powerful tools that transform data displayed in your templates before it's presented to the user. They act like filters, manipulating the output of expressions to improve readability and user experience.</p>
<p>Pipes always produce the same output for the same input, ensuring predictable behavior.</p>
<p>Applied using the pipe operator (|) after an expression in the template.</p>
<p> Angular offers pre-built pipes for common tasks and allows you to create custom ones for specific needs.</p>
<ul>
	<li>DatePipe: Formats a date value according to locale rules.</li>
	<li>UpperCasePipe: Transforms text to all upper case.</li>
	<li>LowerCasePipe: Transforms text to all lower case.</li>
	<li>CurrencyPipe: Transforms a number to a currency string, formatted according to locale rules.</li>
	<li>DecimalPipe: Transforms a number into a string with a decimal point, formatted according to locale rules.</li>
	<li>PercentPipe: Transforms a number to a percentage string, formatted according to locale rules</li>
	<li>AsyncPipe: Subscribe and unsubscribe to an asynchronous source such as an observable.</li>
	<li>JsonPipe: Display a component object property to the screen as JSON for debugging.</li>
	<li>More <a href="https://angular.io/api/common#pipes">Click Here</a></li>
</ul>
<p>To use a pipe, you apply it to a binding expression in your template using the | symbol, followed by the pipe name and any additional parameters.</p>

```html
<!-- Example: Using the uppercase pipe -->
<p>{{ message | uppercase }}</p>
```
<p>In this example, the uppercase pipe is used to transform the message variable to uppercase before displaying it.</p>

<p>You can chain multiple pipes together to perform multiple transformations.</p>

```html
<!-- Example: Chaining the date and uppercase pipes -->
<p>{{ today | date:'short' | uppercase }}</p>
```

<p>In this example, the date pipe formats the today variable as a short date, and then the uppercase pipe transforms the result to uppercase.</p>

<p>You can create your own custom pipes for specific transformations that aren't covered by the built-in ones. Creating a custom pipe involves implementing the PipeTransform interface.</p>

```TypeScript
// Example: Custom pipe for reversing a string
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}

<p>{{ message | reverse }}</p>

```
<p>Here, the reverse pipe is a custom pipe that reverses the characters of the message variable.</p>

<p>The pipe operator has a higher precedence than the JavaScript ternary operator (?:).</p>
<p>condition ? a : b | pipe ->evaluted as-> condition ? a : (b | pipe)</p>

<p>If you want the pipe to apply to the result of the ternary expression, wrap the entire expression in parentheses. For example,</p>
<p>(condition ? a : b) | pipe</p>

<h3>Template Variables</h3>
<p>Template variables in Angular provide a way to capture and work with references to elements or components in your template. These variables are declared within the template and can be used to reference elements, components, or directives for various purposes.</p>
<p>Template variables in Angular provide a way to capture and work with references to elements or components in your template. These variables are declared within the template and can be used to reference elements, components, or directives for various purposes.</p>

```html
<!-- Example: Declaring a template variable for an input element -->
<input #inputVar type="text" />
```
<p>In this example, #inputVar is a template variable declared for the input element.</p>

<p>You can access the value of a template variable in the template or pass it to methods.</p>

```html
<!-- Example: Using the template variable value in the template -->
<p>{{ inputVar.value }}</p>
```
<p>In this example, the value of the inputVar template variable is displayed within a paragraph.</p>

<p>Template variables can be used to reference elements and interact with them in the component class</p>

```TypeScript
<!-- Example: Using a template variable to reference an element -->
<button #btn (click)="onClick(btn)">Click me</button>

// Component class
export class ExampleComponent {
  onClick(button: HTMLButtonElement) {
    console.log('Button clicked!', button);
  }
}
```

<p>In this example, the #btn template variable is used to reference the button element, and the reference is passed to the onClick method in the component class.</p>

<p>Template variables can also be used to reference components and interact with their properties or methods.</p>

```html
<!-- Example: Using a template variable to reference a component -->
<app-child #childCmp></app-child>
<button (click)="childCmp.doSomething()">Call Child Method</button>
```

<p>In this example, #childCmp is a template variable referencing the app-child component, and the doSomething method of the child component is called when the button is clicked.</p>

<p>Angular assigns a template variable a value based on where you declare the variable:</p>
<ul>
	<li>If you declare the variable on a component, the variable refers to the component instance.</li>
	<li>If you declare the variable on a standard HTML tag, the variable refers to the element.</li>
	<li>If you declare the variable on an ng-template element, the variable refers to a TemplateRef instance which represents the template</li>
</ul>

<p>If the variable specifies a name on the right-hand side, such as #var="ngModel", the variable refers to the directive or component on the element with a matching exportAs name.</p>

```TypeScript
<form #itemForm="ngForm" (ngSubmit)="onSubmit(itemForm)">
  <label for="name">Name</label>
  <input type="text" id="name" class="form-control" name="name" ngModel required />
  <button type="submit">Submit</button>
</form>

<div [hidden]="!itemForm.form.valid">
  <p>{{ submitMessage }}</p>
</div>
```

<p>The NgForm directive demonstrates getting a reference to a different value by referencing a directive's exportAs name. In the following example, the template variable, itemForm, appears three times separated by HTML.</p>
<p>Without the ngForm attribute value, the reference value of itemForm would be the HTMLFormElement, <form>. If an element is an Angular Component, a reference with no attribute value will automatically reference the component instance. Otherwise, a reference with no value will reference the DOM element, even if the element has one or more directives applied to it</p>
<p>Just like variables in JavaScript or TypeScript code, template variables are scoped to the template that declares them.</p>
<p>Similarly, Structural directives such as *ngIf and *ngFor, or <ng-template> declarations create a new nested template scope, much like JavaScript's control flow statements like if and for create new lexical scopes. You cannot access template variables within one of these structural directives from outside of its boundaries.</p>


<h2>DOM</h2>
<p>DOM stands for Document Object Model. It is a programming interface for web documents that represents the structure of a document as a tree of objects.</p>
<p>The DOM provides a way for programs to manipulate the structure, style, and content of web documents dynamically. </p>
<p>Essentially, it serves as an interface between web browsers and JavaScript or other scripting languages.</p>
<p>The DOM represents an HTML or XML document as a hierarchical tree structure. Each node in the tree corresponds to an element, attribute, or piece of text in the document.</p>
<p>In the DOM, elements, attributes, and text content are represented as objects. These objects have properties that can be manipulated using scripting languages like JavaScript.</p>
<p>The DOM allows for dynamic interaction with web documents. This means that scripts can be used to modify the document structure, content, and style in response to user actions, events, or other triggers.</p>
<p>The DOM is designed to be platform-independent, providing a standard interface that can be used across different programming languages and platforms. This makes it a crucial part of web development, enabling consistency in manipulating documents across various browsers.</p>
<p>Developers can use the DOM to create, delete, or modify elements and attributes in a document. This allows for the dynamic updating of the user interface without requiring a full page reload.</p>
<p>The DOM also facilitates event handling, allowing scripts to respond to user actions such as clicks, keyboard inputs, or changes in the document.</p>
<p>In the context of JavaScript and web development, developers commonly use the DOM API to interact with HTML documents. The API provides methods and properties to traverse and manipulate the document tree. For example, you can use JavaScript to create new elements, modify existing ones, change styles, and respond to user interactions.</p>
<p>Here's a simple example in JavaScript that illustrates accessing an HTML element and changing its content:</p>

```html
<!DOCTYPE html>
<html>
<head>
  <title>DOM Example</title>
</head>
<body>

<p id="exampleParagraph">This is a paragraph.</p>

<script>
  // Accessing the element with id "exampleParagraph" using the DOM
  var paragraphElement = document.getElementById("exampleParagraph");

  // Modifying the content of the paragraph
  paragraphElement.innerHTML = "This paragraph has been modified using the DOM.";
</script>

</body>
</html>
```

<p>In this example, the script uses document.getElementById to access an HTML element with the id "exampleParagraph" and then modifies its content using the innerHTML property.</p>

<h2>Directive</h2>
<p>In Angular, directives are a powerful feature that allows you to extend and manipulate the Document Object Model (DOM) within your application. Directives are used to create reusable components, apply behavior to elements, and structure the layout of your application.</p>
<p>There are three main types of directives:</p>
<ul>
	<li>Component Directives</li>
	<li>Attribute Directives</li>
	<li>Structural Directives</li>
</ul>

<h3>Component Directives</h3>
<p>It is the same topic we have discussed as Components.</p>
<p>he primary concept related to components is not referred to as "Component Directives" but simply as "Components."</p>
<p>Like other directives, they are TypeScript classes that encapsulate specific functionality for your application. This logic can include things like data processing, handling user interactions, and managing the component's state.</p>
<p>Unlike other directives, component directives have their own template. This template defines the visual structure of the component using HTML-like syntax. It determines how the component will be displayed on the screen.</p>
<p>Using Component Directives, It Modifies The DOM such as By combining logic with a template, they allow you to create reusable UI components that make your application well-structured, maintainable, and scalable.</p>

<h3>Attribute Directives</h3>
<p>Attribute directives in Angular are a type of directive that modifies the appearance or behavior of existing DOM elements.</p>
<p>They don't change the DOM structure itself, but rather manipulate attributes or styles based on certain conditions.</p>
<p>Many attribute directives are defined through modules such as the CommonModule, RouterModule and FormsModule.</p>
<p>The most common attribute directives are as follows:</p>
<ul>
	<li><strong>NgClass</strong> : Adds and removes a set of CSS classes.</li>
	<li><strong>NgStyle</strong> : Adds and removes a set of HTML styles.</li>
	<li><strong>NgModel</strong> : Adds two-way data binding to an HTML form element.</li>
</ul>

<h4>NgClass</h4>
<p>The ngClass directive is used to conditionally apply CSS classes to an element.</p>
<p>This directive allows you to dynamically set styles on an element based on an expression.</p>
<p>We can add or remove multiple CSS classes simultaneously with ngClass.</p>
<p>To use NgClass, import CommonModule and add it to the component's imports list.</p>

```html
<p [ngClass]="{'text-large': fontSize > 20}">This paragraph can change size</p>
```
<p>Here, the ngClass directive adds the class text-large to the <p> element if the fontSize variable is greater than 20.</p>

```html
<div [ngClass]="{'active': isActive, 'error': hasError}">Conditional Classes</div>
```

<p>Here, the classes 'active' and 'error' are applied based on the boolean values of isActive and hasError.</p>

<p>We can add classes dynamically</p>

```TypeScript
currentClasses: Record<string, boolean> = {};
/* . . . */
setCurrentClasses() {
  // CSS classes: added/removed per current state of component properties
  this.currentClasses = {
    saveable: this.canSave,
    modified: !this.isUnchanged,
    special: this.isSpecial,
  };
}

<div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special.</div>
```

<h4>NgStyle</h4>
<p>It Similar to ngClass , but here we can manage inline styles of elements</p>
<p>This directive allows you to dynamically set styles on an element based on an expression.</p>
<p>The ngStyle directive allows you to dynamically set styles for an element based on properties of the component.</p>

```html
<div [ngStyle]="{'color': textColor, 'font-size': fontSize + 'px'}">Dynamic Styling</div>
<h1 [ngStyle]="{'color': isSpecial ? 'red' : 'black'}">This is a heading</h1>
```

<p>In this example, the ngStyle directive sets the color style of the h1 element to 'red' if isSpecial is true, otherwise it sets it to 'black'.</p>

<h4>ngModel</h4>
<p>It is used for two way data binding</p>


<h4>Custome Attribute Directive</h4>
<p>To create a directive, use the CLI command ng generate directive.</p>

```
ng generate directive highlight
```
<p>The CLI creates src/app/highlight.directive.ts, a corresponding test file src/app/highlight.directive.spec.ts, and declares the directive class in the AppModul</p>

```
import {Directive} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {}
```
<p>The @Directive() decorator's configuration property specifies the directive's CSS attribute selector,</p>
<p>Import ElementRef from @angular/core. ElementRef grants direct access to the host DOM element through its nativeElement property.</p>
<p>Add ElementRef in the directive's constructor() to inject a reference to the host DOM element, the element to which you apply appHighlight</p>
<p>Add logic to the HighlightDirective class that sets the background to yellow.</p>

```TypeScript
import {Directive, ElementRef} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```
<p>To use the HighlightDirective, add a <p> element to the HTML template with the directive as an attribute.</p>

```html
<p appHighlight>Highlight me!</p>
```

<p>Angular creates an instance of the HighlightDirective class and injects a reference to the <p> element into the directive's constructor, which sets the p element's background style to yellow.</p>

<p>The @HostListener decorator allows you to listen for DOM events (like mouse clicks, hovers, etc.) on the host element and execute specific logic when those events occur.</p>

```typescript
@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

<p>The background color appears when the pointer hovers over the paragraph element and disappears as the pointer moves out.</p>

<p>We can also pass parameters to directive</p>
<p>Add an appHighlight @Input() property.</p>

```typescript
@Directive({
  standalone: true,
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight = '';
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

<p>To simultaneously apply the directive and the color, use property binding with the appHighlight directive selector, setting it equal to color.</p>

```html
export class AppComponent {
  color = 'yellow';
}

<p [appHighlight]="color">Highlight me!</p>
```

<h3>Structural Directives</h3>
<p>Structural directives in Angular are a powerful tool for manipulating the layout of your application's DOM (Document Object Model). Unlike attribute directives that modify existing elements, structural directives control how the DOM is built by adding, removing, or replacing elements based on certain conditions.</p>
<p>Selector: They use a specific selector syntax, typically prefixed with an asterisk (*) to indicate where they are applied in the template. Common examples include *ngIf, *ngFor, and *ngSwitch.</p>
<p>DOM Manipulation: They affect the structure of the DOM by adding, removing, or replacing elements. This allows you to dynamically show or hide content based on data or user interactions.</p>
<p>While they don't have their own templates like component directives, they often work in conjunction with template (ng-template) references to define the content to be added or removed.</p>
<p>The most common built-in structural directives are:</p>
<ul>
	<li>NgIf</li>
	<li>NgFor</li>
	<li>NgSwitch</li>
</ul>
<p>To use built-in structural directives, import <strong>CommonModule</strong> and add it to the component's imports list.</p>
<h4>NgIf</h4>
<p>We can add or remove an element by applying an NgIf directive to a host element.</p>
<p>This directive conditionally includes a block of HTML code in the template. If the expression provided to *ngIf evaluates to true, the element and its content are displayed in the DOM. Otherwise, they are removed.</p>
<p>When NgIf is false, Angular removes an element and its descendants from the DOM. Angular then disposes of their components, which frees up memory and resources.</p>

```html
<div *ngIf="isVisible">Visible if true</div>
```
<p>In this example, the content of the <div> is only rendered if the isVisible property is true.</p>

<h4>NgFor</h4>
<p>This directive iterates over an array or collection of data and dynamically creates elements for each item. It provides a way to loop through data and display it in a structured format within your template.</p>
<p>Angular translates this instruction into an ng-template around the host element, then uses this template repeatedly to create a new set of elements and bindings for each item in the list</p>
<p>Example : NgFor directive to present a list of items.</p>
<ol>
	<li>Define a block of HTML that determines how Angular renders a single item.</li>
	<li>To list your items, assign the shorthand let item of items to *ngFor.</li>
	<li>The string "let item of items" instructs Angular to do the following</li>
	<ul>
		<li>Store each item in the items array in the local item looping variable</li>
		<li>Make each item available to the templated HTML for each iteration</li>
		<li>Translate "let item of items" into an ng-template around the host element</li>
		<li>Repeat the ng-template for each item in the list</li>
	</ul>
</ol>

```html
<div *ngFor="let item of items">{{item.name}}</div>
```

<p>To repeat a component element, apply *ngFor to the selector. In the following example, the selector is app-item-detail.</p>

```html
<app-item-detail *ngFor="let item of items" [item]="item"></app-item-detail>
```

<p> You can also access the index of the current item within the loop</p>
<p>In the *ngFor, add a semicolon and let i=index to the shorthand. The following example gets the index in a variable named i and displays it with the item name.</p>

```html
<div *ngFor="let item of items; let i=index">{{i + 1}} - {{item.name}}</div>
```

<p>The index property of the NgFor directive context returns the zero-based index of the item in each iteration.</p>

<p>By default, ngFor tracks items by their identity. If your items don't have unique identifiers, you can use the trackBy property to specify a custom tracking function.</p>
<p>Reduce the number of calls your application makes to the server by tracking changes to an item list. With the *ngFor trackBy property, Angular can change and re-render only those items that have changed, rather than reloading the entire list of items.</p>
<p>Add a method to the component that returns the value NgFor should track. In this example, the value to track is the item's id. If the browser has already rendered id, Angular keeps track of it and doesn't re-query the server for the same id.</p>

```TypeScript
trackByItems(index: number, item: Item): number {
  return item.id;
}

<div *ngFor="let item of items; trackBy: trackByItems">
  ({{item.id}}) {{item.name}}
</div>
```

<h4>NgContainer</h4>
<p>ng-container is a special element that acts as a wrapper for other elements or directives. It doesn't represent an HTML element itself and isn't included in the final rendered DOM</p>
<p>ng-container allows you to group elements together without introducing an extra DOM element. This can be helpful for organizing your template and applying directives to a group of elements at once</p>
<p>Use ng-container when there's no single element to host the directive.</p>
<p>It can be used specifically with structural directives like *ngIf, *ngFor, or *ngSwitch to avoid adding unnecessary elements to the DOM. Since ng-container itself isn't rendered, it keeps the DOM structure clean.</p>
<p>When using *ngIf to conditionally render a block of elements, you might want to avoid adding an extra element (like a <div>) just for the conditional logic. ng-container can group those elements without affecting the DOM.</p>

```html
<ng-container *ngIf="isLoggedIn">
  <h2>Welcome, {{ username }}!</h2>
  <p>You can now view your profile information.</p>
</ng-container>
```

<p>Similarly, when iterating with *ngFor, you might have additional elements within the loop that you don't want to clutter the DOM structure. ng-container can be used to group them.</p>

```html
<ul>
  <ng-container *ngFor="let item of items">
    <li>{{ item.name }}</li>
    <span>{{ item.description }}</span>
  </ng-container>
</ul>

```

<p>Simply. its an alternative for span or div </p>

<h4>ngSwitch</h4>
<p>ngSwitch is a structural directive in Angular that acts like a switch statement for your templates. It allows you to conditionally display different sections of content based on the value of an expression. This is useful for scenarios where you want to display different UI elements depending on a certain condition.</p>

```html
<div [ngSwitch]="selectedValue">
  <div *ngSwitchCase="'option1'">Content for option 1</div>
  <div *ngSwitchCase="'option2'">Content for option 2</div>
  <div *ngSwitchDefault>Default content</div>
</div>
```

<ul>
	<li>[ngSwitch]="selectedValue": This attribute binds the switch expression to a property in your component class (selectedValue in this example). The value of this property will determine which case is displayed.</li>
	<li>*ngSwitchCase="'option1'": This directive defines a case for a specific switch expression value. The quoted string ('option1') represents the value to match. You can have multiple cases for different conditions.</li>
	<li>*ngSwitchDefault: This optional directive defines the default content to display if none of the switch cases match the expression value.</li>
</ul>


<p>To prevent expression evaluation in the browser, add ngNonBindable to the host element. ngNonBindable deactivates interpolation, directives, and binding in templates.</p>

```html
<p>Use ngNonBindable to stop evaluation.</p>
<p ngNonBindable>This should not evaluate: {{ 1 + 1 }}</p>
```

<p>In the Above example, the expression {{ 1 + 1 }} renders just as it does in your code editor, and does not display 2.</p>

<p>Applying ngNonBindable to an element stops binding for that element's child elements. However, ngNonBindable still lets directives work on the element where you apply ngNonBindable. In the following example, the appHighlight directive is still active but Angular does not evaluate the expression {{ 1 + 1 }}.</p>

```html
<h3>ngNonBindable with a directive</h3>
<div ngNonBindable [appHighlight]="'yellow'">This should not evaluate: {{ 1 +1 }}, but will highlight yellow.
</div>
```

<p>If you apply ngNonBindable to a parent element, Angular disables interpolation and binding of any sort, such as property binding or event binding, for the element's children.</p>

<h4>Structural directive shorthand</h4>
<p>When structural directives are applied they generally are prefixed by an asterisk, *, such as *ngIf</p>
<p>This convention is shorthand that Angular interprets and converts into a longer form. Angular transforms the asterisk in front of a structural directive into an <ng-template> that surrounds the host element and its descendants.</p>

```html
<div *ngIf="hero" class="name">{{hero.name}}</div>

<ng-template [ngIf]="hero">
  <div class="name">{{hero.name}}</div>
</ng-template>

<!---->
<div
  *ngFor="let hero of heroes; let i=index; let odd=odd; trackBy: trackById"
  [class.odd]="odd">
  ({{i}}) {{hero.name}}
</div>

<ng-template ngFor let-hero [ngForOf]="heroes"
  let-i="index" let-odd="odd" [ngForTrackBy]="trackById">
  <div [class.odd]="odd">
    ({{i}}) {{hero.name}}
  </div>
</ng-template>
```

<h4>Custom Structural Directive</h4>
<p>Using the Angular CLI, run the following command, where unless is the name of the directive:</p>

```
ng generate directive unless
```
<p>Angular creates the directive class and specifies the CSS selector, appUnless, that identifies the directive in a template.</p>

<p>mport Input, TemplateRef, and ViewContainerRef.</p>

```typescript
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appUnless]',
})
export class UnlessDirective {
}
```

<p>Inject TemplateRef and ViewContainerRef in the directive constructor as private variables.</p>

```TypeScript
constructor(
  private templateRef: TemplateRef<any>,
  private viewContainer: ViewContainerRef,
) {}
```

<p>The UnlessDirective creates an embedded view from the Angular-generated ng-template and inserts that view in a view container adjacent to the directive's original p host element.
TemplateRef helps you get to the ng-template contents and ViewContainerRef accesses the view container.</p>

<p>Add an appUnless @Input() property with a setter.</p>

```TypeScript
@Input() set appUnless(condition: boolean) {
  if (!condition && !this.hasView) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.hasView = true;
  } else if (condition && this.hasView) {
    this.viewContainer.clear();
    this.hasView = false;
  }
}
```

<p>Angular sets the appUnless property whenever the value of the condition changes.</p>
<ul>
	<li>If the condition is falsy and Angular hasn't created the view previously, the setter causes the view container to create the embedded view from the template</li>
	<li>If the condition is truthy and the view is currently displayed, the setter clears the container, which disposes of the view</li>
</ul>

```TypeScript
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({
  standalone: true,
  selector: '[appUnless]',
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```


<h3>Host Directives</h3>
<p>Host directives in Angular are a unique type of directive specifically designed to add behaviors directly to the element that hosts the directive.</p>
<p> Unlike attribute directives that modify existing elements or structural directives that manipulate the DOM layout, host directives focus on attaching functionalities to the host element itself.</p>
<p>You apply directives to a component by adding a hostDirectives property to a component's decorator. We call such directives host directives.</p>
<p>In this example, we apply the directive MenuBehavior to the host element of AdminMenu. This works similarly to applying the MenuBehavior to the admin-menu element in a template.</p>

```typescript
@Component({
  standalone: true,
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [MenuBehavior],
})
export class AdminMenu { }
```
<p>When the framework renders a component, Angular also creates an instance of each host directive. The directives' host bindings apply to the component's host element. </p>
<p>Angular applies host directives statically at compile time.</p>
<p>Directives used in hostDirectives must be standalone: true.</p>
<p>Angular ignores the selector of directives applied in the hostDirectives property.</p>

<p>When you apply hostDirectives to your component, the inputs and outputs from the host directives are not included in your component's API by default. You can explicitly include inputs and outputs in your component's API by expanding the entry in hostDirectives:</p>

```typescript
@Component({
  standalone: true,
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [{
    directive: MenuBehavior,
    inputs: ['menuId'],
    outputs: ['menuClosed'],
  }],
})
export class AdminMenu { }

<admin-menu menuId="top-menu" (menuClosed)="logMenuClosed()">
```

```typescript
@Component({
  standalone: true,
  selector: 'admin-menu',
  template: 'admin-menu.html',
  hostDirectives: [{
    directive: MenuBehavior,
    inputs: ['menuId: id'],
    outputs: ['menuClosed: closed'],
  }],
})
export class AdminMenu { }

<admin-menu id="top-menu" (closed)="logMenuClosed()">
```

<p><strong>@HostBinding</strong>: This decorator allows you to bind properties of the directive class to attributes or properties of the host element. This enables dynamic changes to the host element based on the directive's logic.</p>
<p><strong>@HostListener</strong>: This decorator is used to listen for DOM events (clicks, hovers, etc.) that occur on the host element. You can define functions within the directive class to handle these events.</p>

<p>You can also add hostDirectives to other directives, in addition to components. This enables the transitive aggregation of multiple behaviors.</p>
<p>For More Info : <a href="https://angular.io/guide/directive-composition-api">Click Here</a></p>


<h2>Dependency Injection</h2>
<p>Dependency Injection (DI) is a fundamental design pattern in Angular that promotes loose coupling between different parts of your application. It essentially manages how components and services acquire the objects (dependencies) they need to function.</p>
<p>Two main roles exist in the DI system: dependency consumer and dependency provider.</p>
<ul>
	<li><strong>Dependency Consumer :</strong> A class which need some other class or object to perform task</li>
	<li><strong>Dependency Provider :</strong>An object or service that a component or another service needs to perform its work. For example, a component might depend on a service to fetch data from an API.</li>
	<li><strong>Injector:</strong>A central service responsible for creating and providing dependencies throughout the application. There's a hierarchical structure of injectors, with a root injector at the application level.</li>
</ul>

<h3>Creating Injectable Service</h3>
<p>Angular CLI provides a command to create a new service.</p>
<p>Run this Angular CLI command:</p>

```
ng generate service heroes/hero
```
<p>This command creates the following default HeroService.</p>

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

}
```

<p>The @Injectable() decorator specifies that Angular can use this class in the DI system. The metadata, providedIn: 'root', means that the HeroService is visible throughout the application.</p>
<p>Add a getHeroes() method that returns the heroes from mock.heroes.ts to get the hero mock data:</p>

```typescript
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';

@Injectable({
  // declares that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class HeroService {
  getHeroes() { return HEROES; }
}
```

<p>To inject a service as a dependency into a component, you can use component's constructor() and supply a constructor argument with the dependency type.</p>
<p>he following example specifies the HeroService in the HeroListComponent constructor. The type of the heroService is HeroService. Angular recognizes the HeroService as a dependency, since that class was previously annotated with the @Injectable decorator.</p>

```typescript
constructor(heroService: HeroService)
```

<p>When a service depends on another service, follow the same pattern as injecting into a component. In the following example HeroService depends on a Logger service to report its activities.</p>

```typescrit
import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Logger } from '../logger.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(private logger: Logger) {  }

  getHeroes() {
    this.logger.log('Getting heroes ...');
    return HEROES;
  }
}
```

<p>In this example, the getHeroes() method uses the Logger service by logging a message when fetching heroes.</p>

<p>The Creating and injecting services topic describes how to use classes as dependencies.,Besides classes, you can also use other values such as Boolean, string, date, and objects as dependencies. Angular DI provides the necessary APIs to make the dependency configuration flexible, so you can make those values available in DI.</p>

<p>If you specify the service class as the provider token, the default behavior is for the injector to instantiate that class using the new operator.</p>
<p>In the following example, the Logger class provides a Logger instance.</p>

```TypeScript
providers: [Logger],
```

<p>You can, however, configure a DI to use a different class or any other different value to associate with the Logger class. So when the Logger is injected, this new value is used instead.</p>
<p>In fact, the class provider syntax is a shorthand expression that expands into a provider configuration, defined by the Provider interface.</p>
<p>Angular expands the providers value in this case into a full provider object as follows:</p>

```TypeScript
providers: [{ provide: Logger, useClass: Logger }]
```

<p>The expanded provider configuration is an object literal with two properties:</p>
<ul>
	<li>The provide property holds the token that serves as the key for both locating a dependency value and configuring the injector.</li>
	<li>The second property is a provider definition object, which tells the injector how to create the dependency value. The provider-definition key can be one of the following:</li>
	<ul>
		<li>useClass - this option tells Angular DI to instantiate a provided class when a dependency is injected</li>
		<li>useExisting - allows you to alias a token and reference any existing one.</li>
		<li>useFactory - allows you to define a function that constructs a dependency.</li>
		<li>useValue - provides a static value that should be used as a dependency.</li>
	</ul>
</ul>

<h4>Class providers: useClass</h4>
<p>The useClass provider key lets you create and return a new instance of the specified class.</p>

```typescript
[{ provide: Logger, useClass: BetterLogger }]
```

<p>The BetterLogger class would be instantiated when the Logger dependency is requested in a component or any other class.</p>

<h4>Alias providers: useExisting</h4>
<p>The useExisting provider key lets you map one token to another. In effect, the first token is an alias for the service associated with the second token, creating two ways to access the same service object.</p>

<p>The useExisting provider key lets you map one token to another. In effect, the first token is an alias for the service associated with the second token, creating two ways to access the same service object.</p>

```TypeScript
[ NewLogger,
  // Alias OldLogger w/ reference to NewLogger
  { provide: OldLogger, useExisting: NewLogger}]
```

<p>Ensure you do not alias OldLogger to NewLogger with useClass, as this creates two different NewLogger instances.</p>

<h4>Factory providers: useFactory</h4>
<p>The useFactory provider key lets you create a dependency object by calling a factory function. With this approach you can create a dynamic value based on information available in the DI and elsewhere in the app.</p>

```TypeScript
constructor(
  private logger: Logger,
  private isAuthorized: boolean) { }

getHeroes() {
  const auth = this.isAuthorized ? 'authorized ' : 'unauthorized';
  this.logger.log(`Getting heroes for ${auth} user.`);
  return HEROES.filter(hero => this.isAuthorized || !hero.isSecret);
}

const heroServiceFactory = (logger: Logger, userService: UserService) =>
new HeroService(logger, userService.user.isAuthorized);

export const heroServiceProvider =
  { provide: HeroService,
    useFactory: heroServiceFactory,
    deps: [Logger, UserService]
  };
```

<p>The useFactory field specifies that the provider is a factory function whose implementation is heroServiceFactory.</p>
<p>he deps property is an array of provider tokens. The Logger and UserService classes serve as tokens for their own class providers. The injector resolves these tokens and injects the corresponding services into the matching heroServiceFactory factory function parameters.</p>

<h4>Value providers: useValue</h4>
<p>The useValue key lets you associate a fixed value with a DI token. Use this technique to provide runtime configuration constants such as website base addresses and feature flags. You can also use a value provider in a unit test to provide mock data in place of a production data service. The next section provides more information about the useValue key.</p>

<h4>InjectionToken</h4>
<p>The InjectionToken class provides a way to create unique tokens that can be used to identify and inject dependencies.</p>
<p>It is used to create custome token name (provide : Key value) for non-class dependencies</p>
<p>Token: In the context of Angular DI, a token is a unique identifier that is used to associate a particular dependency with a specific value or provider. Tokens are typically instances of classes, and Angular uses them to look up and resolve dependencies.</p>
<p>InjectionToken Class: The InjectionToken class is a way to create custom tokens. It is often used when you need to inject a value or service that doesn't have a corresponding class. For example, when injecting configuration values or third-party services.

Here's an example of creating an InjectionToken:</p>

```typescript
import { InjectionToken } from '@angular/core';

export const MY_CUSTOM_TOKEN = new InjectionToken<string>('MyCustomToken');
```

<p>In this example, MY_CUSTOM_TOKEN is an instance of InjectionToken that is used to identify a specific dependency.</p>

<p>Providing Values with InjectionToken: Once you have an InjectionToken, you can use it in the providers array of an Angular module to associate it with a particular value or provider. This allows Angular to resolve and inject the dependency where needed.</p>

```Typescript
import { NgModule, Inject } from '@angular/core';
import { MY_CUSTOM_TOKEN } from './path-to-your-token';

@NgModule({
  providers: [
    { provide: MY_CUSTOM_TOKEN, useValue: 'This is a custom value' }
  ]
})
export class MyModule { }
```
<p>Now, whenever you inject MY_CUSTOM_TOKEN in a component or service, Angular will provide the value 'This is a custom value'.</p>

<p>InjectionToken is commonly used when you need to inject non-class values, such as configuration settings, strings, or instances of third-party libraries. It provides a way to avoid potential naming conflicts and ensures that dependencies are properly resolved.</p>



<h2>NgModules</h2>
<p>An NgModule groups related functionalities like components, directives, pipes, and services together. This makes your code more maintainable and easier to understand. Imagine a feature like a user profile. An NgModule could contain all the components, directives, pipes, and services specific to user profiles.</p>
<p>NgModules configure how Angular creates objects (services) that your components rely on. This process is called dependency injection. By specifying providers in an NgModule, you tell Angular which services are available for use within that module and its child modules.</p>
<p>Not all components created in an NgModule are meant to be used everywhere. NgModules control which components are visible outside the module through the exports property. Components listed in exports can be used in templates of other NgModules.</p>
<p>NgModules allow you to create feature modules that represent specific functionalities within your application. This promotes modularity and reusability of code. You can even lazy load feature modules, meaning they are loaded only when needed, improving initial load times of your application.</p>
<p>Angular libraries are NgModules, such as FormsModule, HttpClientModule, and RouterModule. Many third-party libraries are available as NgModules such as Material Design, Ionic, and AngularFire2.</p>

<p>An NgModule is defined using the @NgModule decorator in TypeScript.</p>
<p>The @NgModule decorator takes a metadata object that describes how the module should be compiled, initialized, and used in the application.</p>
<p>There are five main meta properties as listed below:</p>
<ul>
	<li>Declarations</li>
	<li>Exports</li>
	<li>Imports</li>
	<li>Bootstrap</li>
	<li>Providers</li>
</ul>

<h3>Declarations</h3>
<p>The declarations array in the @NgModule decorator lists the components, directives, and pipes that belong to the module. These are the building blocks of the module.</p>

```TypeScript
declarations : [
                 Components,
                 Directives,
                 Pipes
               ]
```

<h3>Exports</h3>
<p>The exports array in the @NgModule decorator lists the components, directives, and pipes that should be available for other modules to use. This is useful for creating shared modules.</p>
<p>When module A is imported by module B, then we have to export the module A in order to be used by other modules. By exporting module A, we can use any of the components, directives, services or pipes present in module A in any imported module.</p>
<p>This is based on the object oriented programming concept, where the components, directives, and pipes are by default private and we need to add them in the export module to make it usable by other modules. It looks like:</p>

```TypeScript
exports : [
            PublicComponents,
            PublicDirectives,
            PublicPipes
	      ]
```

<h3>Imports</h3>
<p>The imports array in the @NgModule decorator specifies other modules whose exported components, directives, or pipes should be available for use within this module. It allows you to organize your application into feature modules.</p>
<p>all the exported components and pipes from other modules can be imported in a module by declaring them in an import section of NgModule.</p>

```TypeScript
imports : [
            ModuleA,
            ModuleB,
            ModuleC
          ]
```

<h3>Providers</h3>
<p>The providers array in the @NgModule decorator is used to configure the dependency injection system. It includes the services that the module contributes to the application's dependency injection system.</p>
<p>n the providers property, we provide all the data providers like services and auth guards here. So these services can be used in the declared module and all the modules which import this particular module.</p>
<p>Services by default are ‘providedIn’ or attached to the root module, thus available by any code in the application essentially.</p>
<p>Services can instead be provided by a specific module, but we also need to specify that in the ‘providedIn’ property of the ‘@Injectable’ decorator with 'any' .</p>
```TypeScript
providers : [
               Services,
               Guards
            ]
```

<h3>BootStrap</h3>
<p>The bootstrap property in the @NgModule decorator specifies the root component that Angular should bootstrap when the application starts. This is typically the main component of the application.</p>
<p>The root component that Angular creates and inserts into the index.html host web page.</p>

```TypeScript
bootstrap : [
	          RootComponent
	        ]
```

<p>An example of NgModule would look like below:</p>

```TypeScript
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
	imports: [ BrowserModule ],
	providers: [ Logger ],
	declarations: [ AppComponent ],
	exports:[ AppComponent ],
	bootstrap:[ AppComponent ]
})
export class AppModule {

}
```

<p>An Angular application needs at least one module that serves as the root module. As you add features to your app, you can add them in modules. The following are frequently used Angular modules with examples of some of the things they contain:</p>
<ul>
	<li>BrowserModule : To run your application in a browser.</li>
	<li>CommonModule : To use directives such as NgIf and NgFor..etc.</li>
	<li>FormsModule : To build template driven forms.</li>
	<li>ReactiveFormsModule : To build template driven forms</li>
	<li>RouterModule : To use RouterLink, .forRoot(), and .forChild().</li>
	<li>HttpClientModule : To communicate with a server using the HTTP protocol.</li>
</ul>