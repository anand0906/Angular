# Angular Pipes

## Index

1. [Introduction to Pipes](#1-introduction-to-pipes)
   - 1.1 [What are Pipes?](#11-what-are-pipes)
   - 1.2 [Pipe Syntax](#12-pipe-syntax)
   - 1.3 [Why Use Pipes?](#13-why-use-pipes)

2. [Built-in Pipes](#2-built-in-pipes)
   - 2.1 [Date Pipe](#21-date-pipe)
   - 2.2 [Currency Pipe](#22-currency-pipe)
   - 2.3 [Decimal Pipe](#23-decimal-pipe)
   - 2.4 [Percent Pipe](#24-percent-pipe)
   - 2.5 [Uppercase and Lowercase Pipes](#25-uppercase-and-lowercase-pipes)
   - 2.6 [Titlecase Pipe](#26-titlecase-pipe)
   - 2.7 [JSON Pipe](#27-json-pipe)
   - 2.8 [Slice Pipe](#28-slice-pipe)
   - 2.9 [Async Pipe](#29-async-pipe)
   - 2.10 [KeyValue Pipe](#210-keyvalue-pipe)
   - 2.11 [I18nSelect and I18nPlural Pipes](#211-i18nselect-and-i18nplural-pipes)

3. [Custom Pipes Creation](#3-custom-pipes-creation)
   - 3.1 [Creating a Custom Pipe](#31-creating-a-custom-pipe)
   - 3.2 [Pipe Decorator](#32-pipe-decorator)
   - 3.3 [Transform Method](#33-transform-method)
   - 3.4 [Simple Custom Pipe Examples](#34-simple-custom-pipe-examples)
   - 3.5 [Registering Custom Pipes](#35-registering-custom-pipes)

4. [Pure vs Impure Pipes](#4-pure-vs-impure-pipes)
   - 4.1 [Understanding Pure Pipes](#41-understanding-pure-pipes)
   - 4.2 [Understanding Impure Pipes](#42-understanding-impure-pipes)
   - 4.3 [Performance Comparison](#43-performance-comparison)
   - 4.4 [When to Use Each](#44-when-to-use-each)
   - 4.5 [Change Detection with Pipes](#45-change-detection-with-pipes)

5. [Parameterized Pipes](#5-parameterized-pipes)
   - 5.1 [Single Parameter](#51-single-parameter)
   - 5.2 [Multiple Parameters](#52-multiple-parameters)
   - 5.3 [Optional Parameters](#53-optional-parameters)
   - 5.4 [Parameter Types](#54-parameter-types)
   - 5.5 [Dynamic Parameters](#55-dynamic-parameters)

6. [Chaining Pipes](#6-chaining-pipes)
   - 6.1 [Basic Chaining](#61-basic-chaining)
   - 6.2 [Order Matters](#62-order-matters)
   - 6.3 [Complex Chains](#63-complex-chains)
   - 6.4 [Best Practices for Chaining](#64-best-practices-for-chaining)

7. [Standalone Pipes](#7-standalone-pipes)
   - 7.1 [What are Standalone Pipes?](#71-what-are-standalone-pipes)
   - 7.2 [Creating Standalone Pipes](#72-creating-standalone-pipes)
   - 7.3 [Importing Standalone Pipes](#73-importing-standalone-pipes)
   - 7.4 [Converting to Standalone](#74-converting-to-standalone)
   - 7.5 [Benefits of Standalone Pipes](#75-benefits-of-standalone-pipes)

---

## 1. Introduction to Pipes

### 1.1 What are Pipes?

Pipes are **simple functions** that transform data in templates before displaying it.

**Think of it like:**
A filter on a camera that changes how photos look. Pipes change how data looks without modifying the original data.

**Purpose:**
- Format data for display
- Transform values
- Keep templates clean
- Reusable transformations

**Key Feature:**
Pipes transform data **only in the template**, not in the component.

**Simple Example:**
```typescript
// Without pipe
export class AppComponent {
  name = 'john doe';
  displayName = this.name.toUpperCase();  // JOHN DOE
}
```
```html
<p>{{ displayName }}</p>
```

**With pipe (better):**
```typescript
export class AppComponent {
  name = 'john doe';
}
```
```html
<p>{{ name | uppercase }}</p>  <!-- JOHN DOE -->
```

### 1.2 Pipe Syntax

**Basic Syntax:**
```typescript
{{ value | pipeName }}
```

**With Parameters:**
```typescript
{{ value | pipeName:parameter }}
```

**Multiple Parameters:**
```typescript
{{ value | pipeName:param1:param2 }}
```

**Chained Pipes:**
```typescript
{{ value | pipe1 | pipe2 | pipe3 }}
```

**Visual:**
```
Data → Pipe → Transformed Data → Display
```

### 1.3 Why Use Pipes?

**1. Keep Components Clean:**
```typescript
// ✗ Without pipes: Logic in component
export class AppComponent {
  price = 99.99;
  formattedPrice = '$' + this.price.toFixed(2);
}

// ✓ With pipes: Clean component
export class AppComponent {
  price = 99.99;
}
```
```html
{{ price | currency }}
```

**2. Reusability:**
```typescript
// Use same pipe everywhere
{{ price1 | currency }}
{{ price2 | currency }}
{{ price3 | currency }}
```

**3. Testability:**
Pipes are easy to test in isolation.

**4. Readability:**
```typescript
// Clear what's happening
{{ birthday | date:'short' }}
{{ value | uppercase }}
```

---

## 2. Built-in Pipes

### 2.1 Date Pipe

**Formats Date objects into readable strings.**

**Basic Syntax:**
```typescript
{{ dateValue | date }}
```

**Simple Examples:**

**1. Default Format:**
```typescript
<p>{{ today | date }}</p>
```

```typescript
export class DateComponent {
  today = new Date();
}
```

**Output:**
```
Feb 13, 2026
```

**2. Short Date:**
```typescript
<p>{{ today | date:'short' }}</p>
```

**Output:**
```
2/13/26, 10:30 AM
```

**3. Common Formats:**
```typescript
<p>{{ today | date:'short' }}</p>        <!-- 2/13/26, 10:30 AM -->
<p>{{ today | date:'medium' }}</p>       <!-- Feb 13, 2026, 10:30:45 AM -->
<p>{{ today | date:'long' }}</p>         <!-- February 13, 2026 at 10:30:45 AM GMT+0 -->
<p>{{ today | date:'full' }}</p>         <!-- Friday, February 13, 2026 at 10:30:45 AM GMT+00:00 -->
<p>{{ today | date:'shortDate' }}</p>    <!-- 2/13/26 -->
<p>{{ today | date:'mediumDate' }}</p>   <!-- Feb 13, 2026 -->
<p>{{ today | date:'longDate' }}</p>     <!-- February 13, 2026 -->
<p>{{ today | date:'fullDate' }}</p>     <!-- Friday, February 13, 2026 -->
<p>{{ today | date:'shortTime' }}</p>    <!-- 10:30 AM -->
<p>{{ today | date:'mediumTime' }}</p>   <!-- 10:30:45 AM -->
```

**4. Custom Formats:**
```typescript
<p>{{ today | date:'yyyy-MM-dd' }}</p>           <!-- 2026-02-13 -->
<p>{{ today | date:'dd/MM/yyyy' }}</p>           <!-- 13/02/2026 -->
<p>{{ today | date:'MMM d, y' }}</p>             <!-- Feb 13, 2026 -->
<p>{{ today | date:'EEEE, MMMM d, y' }}</p>      <!-- Friday, February 13, 2026 -->
<p>{{ today | date:'h:mm a' }}</p>               <!-- 10:30 AM -->
<p>{{ today | date:'HH:mm:ss' }}</p>             <!-- 10:30:45 -->
```

**Format Codes:**
```
y = Year (2026)
M = Month number (2)
MMM = Month short (Feb)
MMMM = Month full (February)
d = Day (13)
E = Day of week short (Fri)
EEEE = Day of week full (Friday)
h = Hour 12-format (10)
H = Hour 24-format (10)
m = Minute (30)
s = Second (45)
a = AM/PM
```

**5. Timezone:**
```typescript
<p>{{ today | date:'short':'UTC' }}</p>
<p>{{ today | date:'short':'+0530' }}</p>
```

### 2.2 Currency Pipe

**Formats numbers as currency.**

**Basic Syntax:**
```typescript
{{ value | currency }}
```

**Simple Examples:**

**1. Default (USD):**
```typescript
<p>{{ price | currency }}</p>
```

```typescript
export class CurrencyComponent {
  price = 99.99;
}
```

**Output:**
```
$99.99
```

**2. Different Currencies:**
```typescript
<p>{{ price | currency:'USD' }}</p>      <!-- $99.99 -->
<p>{{ price | currency:'EUR' }}</p>      <!-- €99.99 -->
<p>{{ price | currency:'GBP' }}</p>      <!-- £99.99 -->
<p>{{ price | currency:'INR' }}</p>      <!-- ₹99.99 -->
<p>{{ price | currency:'JPY' }}</p>      <!-- ¥100 -->
```

**3. Symbol Display:**
```typescript
<!-- 'symbol' (default) -->
<p>{{ price | currency:'USD':'symbol' }}</p>     <!-- $99.99 -->

<!-- 'code' -->
<p>{{ price | currency:'USD':'code' }}</p>       <!-- USD99.99 -->

<!-- 'symbol-narrow' -->
<p>{{ price | currency:'USD':'symbol-narrow' }}</p>  <!-- $99.99 -->

<!-- Custom symbol -->
<p>{{ price | currency:'USD':'$' }}</p>          <!-- $99.99 -->
```

**4. Decimal Places:**
```typescript
<!-- Format: 'minIntegerDigits.minFractionDigits-maxFractionDigits' -->
<p>{{ 5 | currency:'USD':'symbol':'1.2-2' }}</p>      <!-- $5.00 -->
<p>{{ 5.1 | currency:'USD':'symbol':'1.2-2' }}</p>    <!-- $5.10 -->
<p>{{ 5.123 | currency:'USD':'symbol':'1.2-2' }}</p>  <!-- $5.12 -->
<p>{{ 1234.56 | currency:'USD':'symbol':'1.0-0' }}</p> <!-- $1,235 -->
```

**5. Complete Example:**
```typescript
<div>
  <p>Price: {{ 1234.56 | currency:'USD':'symbol':'1.2-2' }}</p>
  <p>Price: {{ 1234.56 | currency:'EUR':'code' }}</p>
  <p>Price: {{ 1234.56 | currency:'GBP' }}</p>
</div>
```

**Output:**
```
Price: $1,234.56
Price: EUR1,234.56
Price: £1,234.56
```

### 2.3 Decimal Pipe

**Formats numbers with decimal points.**

**Basic Syntax:**
```typescript
{{ value | number }}
```

**Simple Examples:**

**1. Default Format:**
```typescript
<p>{{ 3.14159 | number }}</p>
```

**Output:**
```
3.142
```

**2. Custom Format:**
```typescript
<!-- Format: 'minIntegerDigits.minFractionDigits-maxFractionDigits' -->
<p>{{ 3.14159 | number:'1.0-0' }}</p>    <!-- 3 -->
<p>{{ 3.14159 | number:'1.1-1' }}</p>    <!-- 3.1 -->
<p>{{ 3.14159 | number:'1.2-2' }}</p>    <!-- 3.14 -->
<p>{{ 3.14159 | number:'1.5-5' }}</p>    <!-- 3.14159 -->
```

**3. Minimum Integer Digits:**
```typescript
<p>{{ 5 | number:'1.0-0' }}</p>      <!-- 5 -->
<p>{{ 5 | number:'2.0-0' }}</p>      <!-- 05 -->
<p>{{ 5 | number:'3.0-0' }}</p>      <!-- 005 -->
```

**4. Thousands Separator:**
```typescript
<p>{{ 1234567 | number }}</p>                 <!-- 1,234,567 -->
<p>{{ 1234567.89 | number:'1.2-2' }}</p>      <!-- 1,234,567.89 -->
```

**5. Real Examples:**
```typescript
<div>
  <p>Score: {{ 85.6789 | number:'1.2-2' }}</p>
  <p>Distance: {{ 12345.678 | number:'1.0-2' }} km</p>
  <p>Temperature: {{ 98.6543 | number:'1.1-1' }}°F</p>
</div>
```

**Output:**
```
Score: 85.68
Distance: 12,345.68 km
Temperature: 98.7°F
```

### 2.4 Percent Pipe

**Formats numbers as percentages.**

**Basic Syntax:**
```typescript
{{ value | percent }}
```

**Simple Examples:**

**1. Default Format:**
```typescript
<p>{{ 0.25 | percent }}</p>
```

**Output:**
```
25%
```

**2. With Decimal Places:**
```typescript
<p>{{ 0.259 | percent }}</p>               <!-- 26% -->
<p>{{ 0.259 | percent:'1.0-0' }}</p>       <!-- 26% -->
<p>{{ 0.259 | percent:'1.1-1' }}</p>       <!-- 25.9% -->
<p>{{ 0.259 | percent:'1.2-2' }}</p>       <!-- 25.90% -->
```

**3. Real Examples:**
```typescript
<div>
  <p>Success Rate: {{ 0.856 | percent:'1.1-1' }}</p>
  <p>Progress: {{ 0.67 | percent:'1.0-0' }}</p>
  <p>Discount: {{ 0.15 | percent }}  OFF</p>
</div>
```

**Output:**
```
Success Rate: 85.6%
Progress: 67%
Discount: 15% OFF
```

**4. From Percentage Numbers:**
```typescript
<!-- If value is already percentage (e.g., 25 instead of 0.25) -->
<p>{{ 25 / 100 | percent }}</p>  <!-- 25% -->
<p>{{ 85.5 / 100 | percent:'1.1-1' }}</p>  <!-- 85.5% -->
```

### 2.5 Uppercase and Lowercase Pipes

**Transform text case.**

**Simple Examples:**

**Uppercase:**
```typescript
<p>{{ 'hello world' | uppercase }}</p>
<p>{{ name | uppercase }}</p>
```

```typescript
export class CaseComponent {
  name = 'john doe';
}
```

**Output:**
```
HELLO WORLD
JOHN DOE
```

**Lowercase:**
```typescript
<p>{{ 'HELLO WORLD' | lowercase }}</p>
<p>{{ title | lowercase }}</p>
```

```typescript
export class CaseComponent {
  title = 'IMPORTANT NOTICE';
}
```

**Output:**
```
hello world
important notice
```

**Real Example:**
```typescript
<div>
  <p>Username: {{ username | lowercase }}</p>
  <p>Code: {{ code | uppercase }}</p>
</div>
```

```typescript
export class UserComponent {
  username = 'JohnDoe123';
  code = 'abc123xyz';
}
```

**Output:**
```
Username: johndoe123
Code: ABC123XYZ
```

### 2.6 Titlecase Pipe

**Capitalizes first letter of each word.**

**Simple Examples:**

```typescript
<p>{{ 'hello world' | titlecase }}</p>
<p>{{ 'the quick brown fox' | titlecase }}</p>
<p>{{ name | titlecase }}</p>
```

```typescript
export class TitleComponent {
  name = 'john doe smith';
}
```

**Output:**
```
Hello World
The Quick Brown Fox
John Doe Smith
```

**Real Example:**
```typescript
<div>
  <h1>{{ pageTitle | titlecase }}</h1>
  <p>Author: {{ author | titlecase }}</p>
</div>
```

```typescript
export class ArticleComponent {
  pageTitle = 'angular pipes tutorial';
  author = 'jane smith';
}
```

**Output:**
```
Angular Pipes Tutorial
Author: Jane Smith
```

### 2.7 JSON Pipe

**Converts objects to JSON strings (useful for debugging).**

**Simple Examples:**

**1. Basic Object:**
```typescript
<pre>{{ user | json }}</pre>
```

```typescript
export class JsonComponent {
  user = {
    name: 'John',
    age: 25,
    email: 'john@example.com'
  };
}
```

**Output:**
```json
{
  "name": "John",
  "age": 25,
  "email": "john@example.com"
}
```

**2. Array:**
```typescript
<pre>{{ items | json }}</pre>
```

```typescript
export class JsonComponent {
  items = ['Apple', 'Banana', 'Orange'];
}
```

**Output:**
```json
[
  "Apple",
  "Banana",
  "Orange"
]
```

**3. Nested Object:**
```typescript
<pre>{{ data | json }}</pre>
```

```typescript
export class JsonComponent {
  data = {
    user: {
      name: 'John',
      address: {
        city: 'New York',
        zip: '10001'
      }
    }
  };
}
```

**Output:**
```json
{
  "user": {
    "name": "John",
    "address": {
      "city": "New York",
      "zip": "10001"
    }
  }
}
```

**Use Cases:**
- Debugging
- Display API responses
- Show component state

### 2.8 Slice Pipe

**Extracts a portion of an array or string.**

**Syntax:**
```typescript
{{ value | slice:start:end }}
```

**Simple Examples:**

**1. String Slicing:**
```typescript
<p>{{ 'Hello World' | slice:0:5 }}</p>    <!-- Hello -->
<p>{{ 'Hello World' | slice:6 }}</p>      <!-- World -->
<p>{{ 'Hello World' | slice:0:8 }}</p>    <!-- Hello Wo -->
<p>{{ 'Hello World' | slice:-5 }}</p>     <!-- World -->
```

**2. Array Slicing:**
```typescript
<p>{{ items | slice:0:3 | json }}</p>
<p>{{ items | slice:2:5 | json }}</p>
<p>{{ items | slice:3 | json }}</p>
```

```typescript
export class SliceComponent {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
```

**Output:**
```
[1, 2, 3]
[3, 4, 5]
[4, 5, 6, 7, 8, 9, 10]
```

**3. Real Example - Show First 3 Items:**
```typescript
<ul>
  <li *ngFor="let item of items | slice:0:3">
    {{ item }}
  </li>
</ul>
<button (click)="showAll = true" *ngIf="!showAll">Show More</button>

<ul *ngIf="showAll">
  <li *ngFor="let item of items">
    {{ item }}
  </li>
</ul>
```

**4. Negative Indices:**
```typescript
<p>{{ items | slice:-3 | json }}</p>      <!-- Last 3 items -->
<p>{{ items | slice:0:-2 | json }}</p>    <!-- All except last 2 -->
```

### 2.9 Async Pipe

**Automatically subscribes and unsubscribes from Observables/Promises.**

**Why Use Async Pipe?**
- No manual subscription needed
- Automatic unsubscription (prevents memory leaks)
- Cleaner code

**Simple Examples:**

**1. With Observable:**
```typescript
<p>{{ time$ | async }}</p>
```

```typescript
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export class AsyncComponent {
  time$: Observable<Date>;
  
  constructor() {
    this.time$ = interval(1000).pipe(
      map(() => new Date())
    );
  }
}
```

**2. With Promise:**
```typescript
<p>{{ message | async }}</p>
```

```typescript
export class PromiseComponent {
  message: Promise<string>;
  
  constructor() {
    this.message = new Promise((resolve) => {
      setTimeout(() => resolve('Hello after 2 seconds'), 2000);
    });
  }
}
```

**3. Real Example - HTTP Request:**
```typescript
<div *ngIf="users$ | async as users">
  <div *ngFor="let user of users">
    {{ user.name }}
  </div>
</div>
```

```typescript
export class UsersComponent {
  users$: Observable<User[]>;
  
  constructor(private http: HttpClient) {
    this.users$ = this.http.get<User[]>('/api/users');
  }
}
```

**4. Without Async Pipe (manual - not recommended):**
```typescript
// Component
users: User[];
subscription: Subscription;

ngOnInit() {
  this.subscription = this.http.get<User[]>('/api/users')
    .subscribe(users => this.users = users);
}

ngOnDestroy() {
  this.subscription.unsubscribe();  // Must remember!
}

// Template
<div *ngFor="let user of users">{{ user.name }}</div>
```

**With Async Pipe (automatic - recommended):**
```typescript
// Component
users$ = this.http.get<User[]>('/api/users');

// Template
<div *ngFor="let user of users$ | async">{{ user.name }}</div>
```

**5. Multiple Uses:**
```typescript
<!-- ✗ Bad: Subscribes multiple times -->
<p>{{ user$ | async }}</p>
<p>{{ user$ | async }}</p>
<p>{{ user$ | async }}</p>

<!-- ✓ Good: Subscribe once with 'as' -->
<div *ngIf="user$ | async as user">
  <p>{{ user.name }}</p>
  <p>{{ user.email }}</p>
  <p>{{ user.age }}</p>
</div>
```

### 2.10 KeyValue Pipe

**Transforms objects/maps into key-value pairs for iteration.**

**Simple Examples:**

**1. Object to Key-Value:**
```typescript
<div *ngFor="let item of object | keyvalue">
  Key: {{ item.key }}, Value: {{ item.value }}
</div>
```

```typescript
export class KeyValueComponent {
  object = {
    name: 'John',
    age: 25,
    city: 'New York'
  };
}
```

**Output:**
```
Key: name, Value: John
Key: age, Value: 25
Key: city, Value: New York
```

**2. Map to Key-Value:**
```typescript
<div *ngFor="let item of map | keyvalue">
  {{ item.key }}: {{ item.value }}
</div>
```

```typescript
export class MapComponent {
  map = new Map([
    ['apple', 5],
    ['banana', 3],
    ['orange', 7]
  ]);
}
```

**3. Real Example - Display Object Properties:**
```typescript
<div class="user-info">
  <div *ngFor="let prop of user | keyvalue">
    <strong>{{ prop.key | titlecase }}:</strong> {{ prop.value }}
  </div>
</div>
```

```typescript
export class UserComponent {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    age: 25
  };
}
```

**Output:**
```
Firstname: John
Lastname: Doe
Email: john@example.com
Age: 25
```

**4. Custom Sorting:**
```typescript
<div *ngFor="let item of object | keyvalue:sortByKey">
  {{ item.key }}: {{ item.value }}
</div>
```

```typescript
export class SortComponent {
  object = { z: 1, a: 2, m: 3 };
  
  sortByKey(a: any, b: any) {
    return a.key.localeCompare(b.key);
  }
}
```

### 2.11 I18nSelect and I18nPlural Pipes

**I18nSelect - Choose text based on value:**

```typescript
<p>{{ gender | i18nSelect:genderMap }}</p>
```

```typescript
export class SelectComponent {
  gender = 'male';
  genderMap = {
    'male': 'He',
    'female': 'She',
    'other': 'They'
  };
}
```

**Output:**
```
He
```

**I18nPlural - Choose text based on number:**

```typescript
<p>{{ count | i18nPlural:itemMapping }}</p>
```

```typescript
export class PluralComponent {
  count = 5;
  itemMapping = {
    '=0': 'No items',
    '=1': 'One item',
    'other': '# items'
  };
}
```

**Output:**
```
5 items
```

---

## 3. Custom Pipes Creation

### 3.1 Creating a Custom Pipe

**Generate pipe using CLI:**
```bash
ng generate pipe reverse
# or shorthand
ng g p reverse
```

**Creates:**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
```

### 3.2 Pipe Decorator

**@Pipe decorator marks a class as a pipe:**

**Properties:**

**1. name (required):**
```typescript
@Pipe({
  name: 'reverse'  // Used in template
})
```

**2. pure (optional):**
```typescript
@Pipe({
  name: 'myPipe',
  pure: true  // Default (pure pipe)
})

@Pipe({
  name: 'myPipe',
  pure: false  // Impure pipe
})
```

**3. standalone (optional):**
```typescript
@Pipe({
  name: 'myPipe',
  standalone: true  // Standalone pipe (Angular 14+)
})
```

### 3.3 Transform Method

**The transform method does the actual transformation:**

**Signature:**
```typescript
transform(value: any, ...args: any[]): any
```

**Parameters:**
- `value`: The input value
- `args`: Optional parameters

**Returns:**
- Transformed value

**Simple Example:**
```typescript
@Pipe({
  name: 'double'
})
export class DoublePipe implements PipeTransform {
  transform(value: number): number {
    return value * 2;
  }
}
```

**Usage:**
```html
<p>{{ 5 | double }}</p>  <!-- 10 -->
```

### 3.4 Simple Custom Pipe Examples

**1. Reverse String Pipe:**

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.split('').reverse().join('');
  }
}
```

**Usage:**
```html
<p>{{ 'hello' | reverse }}</p>  <!-- olleh -->
```

**2. Truncate Pipe:**

```typescript
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 10): string {
    if (!value) return value;
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}
```

**Usage:**
```html
<p>{{ 'This is a long text' | truncate:10 }}</p>  
<!-- This is a ... -->
```

**3. Exponential Pipe:**

```typescript
@Pipe({
  name: 'exponential'
})
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exponent: number = 1): number {
    return Math.pow(value, exponent);
  }
}
```

**Usage:**
```html
<p>{{ 2 | exponential:3 }}</p>  <!-- 8 -->
<p>{{ 5 | exponential:2 }}</p>  <!-- 25 -->
```

**4. Time Ago Pipe:**

```typescript
@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date): string {
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - value.getTime()) / 1000);
    
    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} days ago`;
  }
}
```

**Usage:**
```typescript
export class PostComponent {
  postDate = new Date('2026-02-13T10:00:00');
}
```
```html
<p>Posted {{ postDate | timeAgo }}</p>
```

**5. File Size Pipe:**

```typescript
@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
```

**Usage:**
```html
<p>{{ 1024 | fileSize }}</p>       <!-- 1 KB -->
<p>{{ 1048576 | fileSize }}</p>    <!-- 1 MB -->
<p>{{ 5242880 | fileSize }}</p>    <!-- 5 MB -->
```

**6. Filter Pipe:**

```typescript
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, property: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    
    searchText = searchText.toLowerCase();
    
    return items.filter(item => {
      return item[property].toLowerCase().includes(searchText);
    });
  }
}
```

**Usage:**
```typescript
export class ListComponent {
  users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 35 }
  ];
  searchTerm = '';
}
```
```html
<input [(ngModel)]="searchTerm" placeholder="Search">
<div *ngFor="let user of users | filter:searchTerm:'name'">
  {{ user.name }}
</div>
```

### 3.5 Registering Custom Pipes

**Module-based:**
```typescript
import { NgModule } from '@angular/core';
import { ReversePipe } from './reverse.pipe';

@NgModule({
  declarations: [ReversePipe],  // Declare pipe
  exports: [ReversePipe]        // Export if used in other modules
})
export class SharedModule { }
```

**Standalone Component:**
```typescript
import { Component } from '@angular/core';
import { ReversePipe } from './reverse.pipe';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ReversePipe],  // Import pipe
  template: '<p>{{ text | reverse }}</p>'
})
export class ExampleComponent {
  text = 'hello';
}
```

---

## 4. Pure vs Impure Pipes

### 4.1 Understanding Pure Pipes

**Pure pipes execute only when:**
1. Primitive input value changes (string, number, boolean)
2. Object reference changes

**Default behavior:** All pipes are pure by default.

**Simple Example:**

```typescript
@Pipe({
  name: 'pure',
  pure: true  // Default
})
export class PurePipe implements PipeTransform {
  transform(value: string): string {
    console.log('Pure pipe executed');
    return value.toUpperCase();
  }
}
```

**Usage:**
```typescript
export class PureComponent {
  name = 'john';
  
  changeName() {
    this.name = 'jane';  // Pure pipe executes (primitive changed)
  }
}
```

**With Objects:**
```typescript
export class ObjectComponent {
  user = { name: 'John' };
  
  changeProperty() {
    this.user.name = 'Jane';  // Pure pipe DOESN'T execute (same reference)
  }
  
  changeObject() {
    this.user = { name: 'Jane' };  // Pure pipe executes (new reference)
  }
}
```

**Why Pure Pipes are Fast:**
```typescript
// Pure pipe checks reference
if (oldValue === newValue) {
  return cachedResult;  // Skip execution
}
```

### 4.2 Understanding Impure Pipes

**Impure pipes execute:**
- On every change detection cycle
- Even if inputs haven't changed

**Create Impure Pipe:**
```typescript
@Pipe({
  name: 'impure',
  pure: false  // Make impure
})
export class ImpurePipe implements PipeTransform {
  transform(value: string): string {
    console.log('Impure pipe executed');
    return value.toUpperCase();
  }
}
```

**When to Use Impure Pipes:**
- When pipe depends on data that Angular can't detect
- When working with mutable objects

**Simple Example - Filter Pipe:**

```typescript
@Pipe({
  name: 'filterImpure',
  pure: false  // Impure to detect array changes
})
export class FilterImpurePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) return items;
    
    return items.filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
```

**Usage:**
```typescript
export class ListComponent {
  items = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Orange' }
  ];
  search = '';
  
  addItem() {
    this.items.push({ name: 'Grape' });  // Impure pipe detects this
  }
}
```

### 4.3 Performance Comparison

**Pure Pipe (Fast):**
```typescript
// Executes only when input changes
{{ name | pure }}  // Executes once

// Change detection runs 1000 times
// Pure pipe: Executes ~1 time
```

**Impure Pipe (Slow):**
```typescript
// Executes on every change detection
{{ name | impure }}  // Executes many times

// Change detection runs 1000 times
// Impure pipe: Executes ~1000 times
```

**Performance Test:**
```typescript
@Pipe({ name: 'pureTest', pure: true })
export class PureTestPipe implements PipeTransform {
  callCount = 0;
  
  transform(value: string): string {
    this.callCount++;
    console.log('Pure pipe called:', this.callCount);
    return value;
  }
}

@Pipe({ name: 'impureTest', pure: false })
export class ImpureTestPipe implements PipeTransform {
  callCount = 0;
  
  transform(value: string): string {
    this.callCount++;
    console.log('Impure pipe called:', this.callCount);
    return value;
  }
}
```

**Results:**
```
After 10 change detection cycles:
Pure pipe called: 1
Impure pipe called: 10
```

### 4.4 When to Use Each

**Use Pure Pipes (Default):**
```typescript
✓ Formatting data (date, currency, uppercase)
✓ Simple transformations
✓ Stateless operations
✓ Most use cases
```

**Use Impure Pipes (Rarely):**
```typescript
✓ Filtering/sorting mutable arrays
✓ Pipes that depend on external state
✓ When you need execution on every change
✗ Avoid if possible (performance impact)
```

**Examples:**

**Pure Pipe Use Cases:**
```typescript
{{ price | currency }}           // Format number
{{ name | uppercase }}           // Transform string
{{ date | date:'short' }}        // Format date
{{ value | customFormat }}       // Custom formatting
```

**Impure Pipe Use Cases:**
```typescript
{{ items | filter:searchTerm }}  // Filter array
{{ data | sort:order }}          // Sort array
{{ time | now }}                 // Current time
```

### 4.5 Change Detection with Pipes

**Pure Pipe:**
```typescript
export class PureExample {
  // Pure pipe executes
  primitiveValue = 'hello';
  changePrimitive() {
    this.primitiveValue = 'world';  // ✓ Pipe executes
  }
  
  // Pure pipe doesn't execute
  objectValue = { name: 'John' };
  changeProperty() {
    this.objectValue.name = 'Jane';  // ✗ Pipe doesn't execute
  }
  
  // Pure pipe executes
  changeReference() {
    this.objectValue = { name: 'Jane' };  // ✓ Pipe executes
  }
  
  // Pure pipe executes
  arrayValue = [1, 2, 3];
  addToArray() {
    this.arrayValue = [...this.arrayValue, 4];  // ✓ Pipe executes (new reference)
  }
  
  // Pure pipe doesn't execute
  pushToArray() {
    this.arrayValue.push(4);  // ✗ Pipe doesn't execute (same reference)
  }
}
```

**Best Practice:**
```typescript
// ✗ Bad: Mutates array (pure pipe won't detect)
addItem() {
  this.items.push(newItem);
}

// ✓ Good: Creates new array (pure pipe detects)
addItem() {
  this.items = [...this.items, newItem];
}
```

---

## 5. Parameterized Pipes

### 5.1 Single Parameter

**Pass one parameter to a pipe:**

**Syntax:**
```typescript
{{ value | pipeName:parameter }}
```

**Simple Example:**

```typescript
@Pipe({
  name: 'multiply'
})
export class MultiplyPipe implements PipeTransform {
  transform(value: number, factor: number): number {
    return value * factor;
  }
}
```

**Usage:**
```html
<p>{{ 5 | multiply:2 }}</p>   <!-- 10 -->
<p>{{ 10 | multiply:3 }}</p>  <!-- 30 -->
```

**Real Example - Truncate:**
```typescript
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number): string {
    return value.length > length 
      ? value.substring(0, length) + '...'
      : value;
  }
}
```

**Usage:**
```html
<p>{{ longText | truncate:20 }}</p>
<p>{{ description | truncate:50 }}</p>
```

### 5.2 Multiple Parameters

**Pass multiple parameters:**

**Syntax:**
```typescript
{{ value | pipeName:param1:param2:param3 }}
```

**Simple Example:**

```typescript
@Pipe({
  name: 'power'
})
export class PowerPipe implements PipeTransform {
  transform(value: number, exponent: number, precision: number): string {
    const result = Math.pow(value, exponent);
    return result.toFixed(precision);
  }
}
```

**Usage:**
```html
<p>{{ 2 | power:3:0 }}</p>    <!-- 8 -->
<p>{{ 2.5 | power:2:2 }}</p>  <!-- 6.25 -->
```

**Real Example - Substring:**
```typescript
@Pipe({
  name: 'substring'
})
export class SubstringPipe implements PipeTransform {
  transform(value: string, start: number, end: number): string {
    return value.substring(start, end);
  }
}
```

**Usage:**
```html
<p>{{ 'Hello World' | substring:0:5 }}</p>   <!-- Hello -->
<p>{{ 'Hello World' | substring:6:11 }}</p>  <!-- World -->
```

### 5.3 Optional Parameters

**Make parameters optional with default values:**

```typescript
@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(
    value: number, 
    prefix: string = '', 
    suffix: string = ''
  ): string {
    return `${prefix}${value}${suffix}`;
  }
}
```

**Usage:**
```html
<p>{{ 100 | format }}</p>              <!-- 100 -->
<p>{{ 100 | format:'$' }}</p>          <!-- $100 -->
<p>{{ 100 | format:'$':'%' }}</p>      <!-- $100% -->
```

**Real Example - Date Range:**
```typescript
@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {
  transform(
    value: Date,
    format: string = 'short',
    timezone: string = 'UTC'
  ): string {
    // Implementation
    return formattedDate;
  }
}
```

**Usage:**
```html
<p>{{ date | dateRange }}</p>                    <!-- Default -->
<p>{{ date | dateRange:'long' }}</p>             <!-- Custom format -->
<p>{{ date | dateRange:'medium':'EST' }}</p>     <!-- Custom format & timezone -->
```

### 5.4 Parameter Types

**Different parameter types:**

**1. String Parameters:**
```typescript
@Pipe({ name: 'greet' })
export class GreetPipe implements PipeTransform {
  transform(name: string, greeting: string = 'Hello'): string {
    return `${greeting}, ${name}!`;
  }
}
```

**Usage:**
```html
<p>{{ 'John' | greet }}</p>              <!-- Hello, John! -->
<p>{{ 'Jane' | greet:'Hi' }}</p>         <!-- Hi, Jane! -->
```

**2. Number Parameters:**
```typescript
@Pipe({ name: 'repeat' })
export class RepeatPipe implements PipeTransform {
  transform(value: string, times: number): string {
    return value.repeat(times);
  }
}
```

**Usage:**
```html
<p>{{ 'Hello ' | repeat:3 }}</p>  <!-- Hello Hello Hello  -->
```

**3. Boolean Parameters:**
```typescript
@Pipe({ name: 'toggle' })
export class TogglePipe implements PipeTransform {
  transform(value: string, uppercase: boolean): string {
    return uppercase ? value.toUpperCase() : value.toLowerCase();
  }
}
```

**Usage:**
```html
<p>{{ 'Hello' | toggle:true }}</p>   <!-- HELLO -->
<p>{{ 'Hello' | toggle:false }}</p>  <!-- hello -->
```

**4. Object Parameters:**
```typescript
@Pipe({ name: 'format' })
export class FormatPipe implements PipeTransform {
  transform(value: number, options: { prefix?: string, suffix?: string }): string {
    const prefix = options.prefix || '';
    const suffix = options.suffix || '';
    return `${prefix}${value}${suffix}`;
  }
}
```

**Usage:**
```html
<p>{{ 100 | format:{prefix: '$', suffix: ' USD'} }}</p>  <!-- $100 USD -->
```

### 5.5 Dynamic Parameters

**Use component properties as parameters:**

```typescript
@Component({
  template: `
    <input [(ngModel)]="maxLength" type="number">
    <p>{{ text | truncate:maxLength }}</p>
  `
})
export class DynamicComponent {
  text = 'This is a long text that will be truncated';
  maxLength = 20;
}
```

**Multiple Dynamic Parameters:**
```typescript
@Component({
  template: `
    <select [(ngModel)]="currency">
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
    
    <select [(ngModel)]="format">
      <option value="symbol">Symbol</option>
      <option value="code">Code</option>
    </select>
    
    <p>{{ price | currency:currency:format }}</p>
  `
})
export class CurrencyComponent {
  price = 99.99;
  currency = 'USD';
  format = 'symbol';
}
```

---

## 6. Chaining Pipes

### 6.1 Basic Chaining

**Apply multiple pipes in sequence:**

**Syntax:**
```typescript
{{ value | pipe1 | pipe2 | pipe3 }}
```

**Simple Examples:**

**1. Case + Date:**
```typescript
<p>{{ today | date:'long' | uppercase }}</p>
```

**Output:**
```
FEBRUARY 13, 2026 AT 10:30:45 AM GMT+00:00
```

**2. Currency + Uppercase:**
```typescript
<p>{{ price | currency:'USD' | uppercase }}</p>
```

**Output:**
```
$99.99  (would be uppercase if there were letters)
```

**3. Slice + Uppercase:**
```typescript
<p>{{ 'hello world' | slice:0:5 | uppercase }}</p>
```

**Output:**
```
HELLO
```

### 6.2 Order Matters

**Different order = different result:**

**Example 1:**
```typescript
{{ 'hello' | uppercase | slice:0:3 }}  <!-- HEL -->
{{ 'hello' | slice:0:3 | uppercase }}  <!-- HEL -->
```
*Same result in this case*

**Example 2:**
```typescript
{{ 'HELLO WORLD' | slice:0:5 | lowercase }}  <!-- hello -->
{{ 'HELLO WORLD' | lowercase | slice:0:5 }}  <!-- hello -->
```
*Same result*

**Example 3 (Different Results):**
```typescript
{{ items | slice:0:3 | json }}  <!-- First 3 items as JSON -->
{{ items | json | slice:0:50 }} <!-- First 50 chars of JSON -->
```

**Visual Flow:**
```
Data → Pipe 1 → Result 1 → Pipe 2 → Result 2 → Pipe 3 → Final Result
```

### 6.3 Complex Chains

**Real-World Examples:**

**1. Date Formatting:**
```typescript
<p>{{ dateString | date:'medium' | uppercase }}</p>
```

**2. Number Formatting:**
```typescript
<p>{{ largeNumber | number:'1.2-2' | slice:0:10 }}</p>
```

**3. Array Processing:**
```typescript
<p>{{ items | slice:0:5 | json }}</p>
```

**4. Custom Pipes Chain:**
```typescript
<p>{{ text | truncate:20 | uppercase }}</p>
<p>{{ number | multiply:2 | exponential:2 }}</p>
```

**5. Complete Example:**
```typescript
@Component({
  template: `
    <!-- Show first 3 users, uppercase names -->
    <div *ngFor="let user of users | slice:0:3">
      {{ user.name | uppercase }}
    </div>
    
    <!-- Format price with currency and custom suffix -->
    <p>{{ price | currency:'USD':'symbol':'1.2-2' }} only!</p>
    
    <!-- Date in short format, uppercase -->
    <p>Posted: {{ postDate | date:'short' | uppercase }}</p>
    
    <!-- Async + multiple pipes -->
    <p>{{ data$ | async | json | slice:0:100 }}</p>
  `
})
export class ChainComponent {
  users = [
    { name: 'John' },
    { name: 'Jane' },
    { name: 'Bob' },
    { name: 'Alice' }
  ];
  price = 99.99;
  postDate = new Date();
  data$ = of({ name: 'Test', value: 123 });
}
```

### 6.4 Best Practices for Chaining

**1. Keep Chains Short:**
```typescript
<!-- ✓ Good: 2-3 pipes -->
{{ value | pipe1 | pipe2 }}

<!-- ✗ Bad: Too many pipes -->
{{ value | pipe1 | pipe2 | pipe3 | pipe4 | pipe5 }}
```

**2. Use Custom Pipe Instead:**
```typescript
<!-- ✗ Bad: Long chain -->
{{ text | uppercase | slice:0:10 | lowercase }}

<!-- ✓ Good: Create custom pipe -->
{{ text | formatText }}
```

**3. Consider Performance:**
```typescript
<!-- ✗ Bad: Multiple async pipes -->
{{ data$ | async | pipe1 }}
{{ data$ | async | pipe2 }}

<!-- ✓ Good: Single async with 'as' -->
<div *ngIf="data$ | async as data">
  {{ data | pipe1 }}
  {{ data | pipe2 }}
</div>
```

**4. Readable Order:**
```typescript
<!-- ✓ Good: Logical order -->
{{ date | date:'short' | uppercase }}

<!-- ✗ Confusing: Illogical order -->
{{ date | uppercase | date:'short' }}
```

---

## 7. Standalone Pipes

### 7.1 What are Standalone Pipes?

**Standalone pipes don't need to be declared in NgModules.**

**Introduced in:** Angular 14

**Think of it like:**
A portable tool that works on its own without needing a toolbox.

**Benefits:**
- No module required
- Easier to use
- Better tree-shaking
- Simpler imports

### 7.2 Creating Standalone Pipes

**Using CLI:**
```bash
ng generate pipe custom --standalone
# or
ng g p custom --standalone
```

**Manual Creation:**

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
  standalone: true  // Mark as standalone
})
export class CustomPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
```

**Simple Example - Reverse Pipe:**

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.split('').reverse().join('');
  }
}
```

### 7.3 Importing Standalone Pipes

**In Standalone Components:**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReversePipe } from './reverse.pipe';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, ReversePipe],  // Import pipe
  template: `
    <p>{{ 'hello' | reverse }}</p>
  `
})
export class ExampleComponent { }
```

**In Module-based Components:**

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example.component';
import { ReversePipe } from './reverse.pipe';

@NgModule({
  declarations: [ExampleComponent],
  imports: [
    CommonModule,
    ReversePipe  // Import standalone pipe
  ]
})
export class ExampleModule { }
```

### 7.4 Converting to Standalone

**Before (Module-based):**

```typescript
// custom.pipe.ts
@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}

// app.module.ts
@NgModule({
  declarations: [CustomPipe]  // Must declare
})
export class AppModule { }
```

**After (Standalone):**

```typescript
// custom.pipe.ts
@Pipe({
  name: 'custom',
  standalone: true  // Add this line
})
export class CustomPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}

// No module declaration needed
// Import directly in components
```

**Step-by-Step Conversion:**

1. **Add `standalone: true`:**
```typescript
@Pipe({
  name: 'myPipe',
  standalone: true  // Add this
})
```

2. **Remove from module declarations:**
```typescript
// Before
@NgModule({
  declarations: [MyPipe]  // Remove
})

// After
@NgModule({
  declarations: []  // Empty
})
```

3. **Import in components:**
```typescript
@Component({
  imports: [MyPipe]  // Import directly
})
```

### 7.5 Benefits of Standalone Pipes

**1. No Module Required:**
```typescript
// ✓ Standalone: Just create and use
@Pipe({
  name: 'simple',
  standalone: true
})

// ✗ Module-based: Need module
@NgModule({
  declarations: [SimplePipe]
})
```

**2. Easier Imports:**
```typescript
// ✓ Standalone: Import pipe directly
@Component({
  imports: [SimplePipe]
})

// ✗ Module-based: Import module containing pipe
@Component({
  imports: [SimpleModule]
})
```

**3. Better Tree-Shaking:**
Only imported pipes are included in the bundle.

**4. Clearer Dependencies:**
```typescript
@Pipe({
  standalone: true,
  // Clear what it needs (if any)
})
```

**5. Simpler Testing:**
```typescript
// Standalone: Easier setup
TestBed.configureTestingModule({
  imports: [SimplePipe]
});

// Module-based: More boilerplate
TestBed.configureTestingModule({
  declarations: [SimplePipe]
});
```

**Complete Standalone Example:**

```typescript
// temperature.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(celsius: number, unit: string = 'F'): string {
    if (unit === 'F') {
      const fahrenheit = (celsius * 9/5) + 32;
      return `${fahrenheit.toFixed(1)}°F`;
    }
    return `${celsius}°C`;
  }
}

// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperaturePipe } from './temperature.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TemperaturePipe],
  template: `
    <p>Temperature: {{ 25 | temperature }}</p>
    <p>Temperature: {{ 25 | temperature:'C' }}</p>
  `
})
export class AppComponent { }
```

**Output:**
```
Temperature: 77.0°F
Temperature: 25°C
```

**Multiple Standalone Pipes:**

```typescript
import { Component } from '@angular/core';
import { ReversePipe } from './reverse.pipe';
import { TruncatePipe } from './truncate.pipe';
import { TemperaturePipe } from './temperature.pipe';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    ReversePipe,
    TruncatePipe,
    TemperaturePipe
  ],
  template: `
    <p>{{ 'hello' | reverse }}</p>
    <p>{{ longText | truncate:20 }}</p>
    <p>{{ 30 | temperature }}</p>
  `
})
export class DemoComponent {
  longText = 'This is a very long text';
}
```

---

## Summary

You've mastered **Angular Pipes**!

**Key Concepts:**

**1. What are Pipes:**
- Transform data in templates
- Don't modify original data
- Reusable and testable
- Syntax: `{{ value | pipeName }}`

**2. Built-in Pipes:**
- **Date**: Format dates (`{{ date | date:'short' }}`)
- **Currency**: Format currency (`{{ price | currency:'USD' }}`)
- **Decimal**: Format numbers (`{{ num | number:'1.2-2' }}`)
- **Percent**: Show percentages (`{{ 0.5 | percent }}`)
- **Case**: Transform text (`{{ text | uppercase }}`)
- **JSON**: Debug objects (`{{ obj | json }}`)
- **Slice**: Extract portions (`{{ arr | slice:0:3 }}`)
- **Async**: Handle Observables/Promises (auto-unsubscribe)
- **KeyValue**: Iterate objects (`*ngFor="let item of obj | keyvalue"`)

**3. Custom Pipes:**
- Create with `@Pipe` decorator
- Implement `PipeTransform`
- Define `transform()` method
- Register in module or use standalone

**4. Pure vs Impure:**
- **Pure** (default): Executes only when input changes
- **Impure** (`pure: false`): Executes every change detection
- Pure pipes are faster (preferred)
- Use impure only when necessary

**5. Parameterized Pipes:**
- Single parameter: `{{ value | pipe:param }}`
- Multiple parameters: `{{ value | pipe:p1:p2 }}`
- Optional parameters with defaults
- Dynamic parameters from component

**6. Chaining Pipes:**
- Apply multiple transformations: `{{ value | pipe1 | pipe2 }}`
- Order matters
- Keep chains short (2-3 pipes)
- Consider custom pipe for long chains

**7. Standalone Pipes:**
- Add `standalone: true`
- No module declaration needed
- Import directly in components
- Better tree-shaking

**Pipe Creation Checklist:**
```typescript
1. Generate: ng g p myPipe --standalone
2. Implement transform method
3. Add parameters if needed
4. Choose pure/impure
5. Import in component
6. Use in template
```

**Common Patterns:**
```typescript
// Formatting
{{ date | date:'medium' }}
{{ price | currency:'USD' }}
{{ score | percent:'1.1-1' }}

// Transformation
{{ text | uppercase }}
{{ text | lowercase }}
{{ text | titlecase }}

// Extraction
{{ text | slice:0:10 }}
{{ items | slice:0:5 }}

// Async operations
{{ data$ | async }}
<div *ngIf="user$ | async as user">

// Chaining
{{ date | date:'short' | uppercase }}
{{ items | slice:0:3 | json }}

// Custom with parameters
{{ text | truncate:20 }}
{{ value | multiply:2 }}
```

**Best Practices:**
- Use pure pipes (default) for better performance
- Create custom pipes for reusable transformations
- Use async pipe to prevent memory leaks
- Keep pipe logic simple and focused
- Chain pipes sparingly (2-3 max)
- Use standalone pipes for new projects
- Test pipes in isolation

**Performance Tips:**
- Prefer pure pipes
- Avoid complex calculations in pipes
- Cache results when possible
- Use trackBy with *ngFor
- Single async pipe with 'as' syntax

Master these pipe concepts to create clean, maintainable templates with powerful data transformations!
