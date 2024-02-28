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
	<li><strong>TypeScript Class:<strong>A TypeScript class defines the component's behavior. It contains properties to hold data and methods to implement functionality. This is where you handle user interactions, communicate with services, and manage the component's state.</li>
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