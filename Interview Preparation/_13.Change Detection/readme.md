# Angular Change Detection
## Index

1. [Introduction to Change Detection](#1-introduction-to-change-detection)
   - 1.1 [What is Change Detection?](#11-what-is-change-detection)
   - 1.2 [Why Change Detection Matters](#12-why-change-detection-matters)
   - 1.3 [How Change Detection Works](#13-how-change-detection-works)

2. [Change Detection Strategies](#2-change-detection-strategies)
   - 2.1 [Default Strategy](#21-default-strategy)
   - 2.2 [OnPush Strategy](#22-onpush-strategy)
   - 2.3 [Comparing Strategies](#23-comparing-strategies)
   - 2.4 [When to Use OnPush](#24-when-to-use-onpush)
   - 2.5 [OnPush with Observables](#25-onpush-with-observables)

3. [Zone.js and NgZone](#3-zonejs-and-ngzone)
   - 3.1 [What is Zone.js?](#31-what-is-zonejs)
   - 3.2 [How Zone.js Works](#32-how-zonejs-works)
   - 3.3 [NgZone Service](#33-ngzone-service)
   - 3.4 [Running Outside Angular](#34-running-outside-angular)
   - 3.5 [Running Inside Angular](#35-running-inside-angular)

4. [Manual Change Detection](#4-manual-change-detection)
   - 4.1 [ChangeDetectorRef](#41-changedetectorref)
   - 4.2 [detectChanges()](#42-detectchanges)
   - 4.3 [markForCheck()](#43-markforcheck)
   - 4.4 [detach()](#44-detach)
   - 4.5 [reattach()](#45-reattach)

5. [Detach and Reattach Strategies](#5-detach-and-reattach-strategies)
   - 5.1 [When to Detach](#51-when-to-detach)
   - 5.2 [Detaching Components](#52-detaching-components)
   - 5.3 [Reattaching Components](#53-reattaching-components)
   - 5.4 [Use Cases](#54-use-cases)

6. [markForCheck vs detectChanges](#6-markforcheck-vs-detectchanges)
   - 6.1 [Understanding markForCheck](#61-understanding-markforcheck)
   - 6.2 [Understanding detectChanges](#62-understanding-detectchanges)
   - 6.3 [Key Differences](#63-key-differences)
   - 6.4 [When to Use Each](#64-when-to-use-each)

7. [Performance Optimization](#7-performance-optimization)
   - 7.1 [OnPush Strategy](#71-onpush-strategy)
   - 7.2 [TrackBy Functions](#72-trackby-functions)
   - 7.3 [Pure Pipes](#73-pure-pipes)
   - 7.4 [Detaching Heavy Components](#74-detaching-heavy-components)
   - 7.5 [Avoiding Change Detection](#75-avoiding-change-detection)
   - 7.6 [Profiling and Debugging](#76-profiling-and-debugging)

---

## 1. Introduction to Change Detection

### 1.1 What is Change Detection?

**Change Detection** is the process Angular uses to sync the component's data (model) with the view (template).

**Think of it like:**
A guard who checks if anything changed and updates the display accordingly.

**Simple Example:**
```typescript
@Component({
  selector: 'app-counter',
  template: `
    <h1>Count: {{ count }}</h1>
    <button (click)="increment()">Increment</button>
  `
})
export class CounterComponent {
  count = 0;
  
  increment() {
    this.count++;  // Model changes
    // Angular detects change and updates view
  }
}
```

**What happens:**
```
1. User clicks button
2. count property changes
3. Change detection runs
4. View updates to show new count
```

### 1.2 Why Change Detection Matters

**Without change detection:**
```typescript
// Model changes
this.count = 10;

// View still shows old value!
// User sees nothing happen
```

**With change detection:**
```typescript
// Model changes
this.count = 10;

// Change detection runs automatically
// View updates to show 10
```

**Impact on performance:**
- Every change triggers checking
- Large apps = many components to check
- Inefficient checking = slow app

### 1.3 How Change Detection Works

**Change Detection Tree:**

```
AppComponent (checks)
├── HeaderComponent (checks)
├── MainComponent (checks)
│   ├── SidebarComponent (checks)
│   └── ContentComponent (checks)
└── FooterComponent (checks)
```

**Default behavior:**
```typescript
// ANY event triggers change detection on ALL components
button.click()
  → Change detection runs on entire tree
  → All components checked (even if unchanged)
```

**What triggers change detection:**
- DOM events (click, input, etc.)
- HTTP requests
- Timers (setTimeout, setInterval)
- Promises
- Observables

---

## 2. Change Detection Strategies

### 2.1 Default Strategy

**Default strategy checks component every time.**

**Example:**
```typescript
@Component({
  selector: 'app-user',
  template: `
    <h1>{{ user.name }}</h1>
    <p>Checked: {{ getRandom() }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.Default  // Default
})
export class UserComponent {
  @Input() user: User;
  
  getRandom() {
    console.log('Checking...');
    return Math.random();
  }
}
```

**Behavior:**
```
Click anywhere in app
  → getRandom() called
  → Console logs "Checking..."
  → Happens EVERY time (expensive!)
```

### 2.2 OnPush Strategy

**OnPush strategy only checks when:**
1. Input reference changes
2. Event originates from component
3. Manually triggered

**Example:**
```typescript
@Component({
  selector: 'app-user',
  template: `
    <h1>{{ user.name }}</h1>
    <p>Checked: {{ getRandom() }}</p>
    <button (click)="onClick()">Click</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user: User;
  
  getRandom() {
    console.log('Checking...');
    return Math.random();
  }
  
  onClick() {
    console.log('Clicked');
  }
}
```

**Behavior:**
```
Click in parent component
  → getRandom() NOT called
  → More efficient!

Click button in THIS component
  → getRandom() called
  → Only this component checked

Change input reference
  → getRandom() called
  → Component checked
```

### 2.3 Comparing Strategies

**Default:**
```typescript
// Parent
export class ParentComponent {
  user = { name: 'John' };
  
  changeName() {
    this.user.name = 'Jane';  // Mutation
  }
}

// Child with Default strategy
@Component({
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChildComponent {
  @Input() user: User;
  // ✓ Detects change (checks every time)
}
```

**OnPush:**
```typescript
// Parent
export class ParentComponent {
  user = { name: 'John' };
  
  changeName() {
    this.user.name = 'Jane';  // Mutation
  }
}

// Child with OnPush strategy
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() user: User;
  // ✗ Doesn't detect change (same reference)
}
```

**OnPush with immutable update:**
```typescript
// Parent
export class ParentComponent {
  user = { name: 'John' };
  
  changeName() {
    this.user = { ...this.user, name: 'Jane' };  // New reference
  }
}

// Child with OnPush strategy
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() user: User;
  // ✓ Detects change (new reference)
}
```

### 2.4 When to Use OnPush

**Use OnPush when:**

```typescript
✓ Component relies on inputs
✓ Data is immutable
✓ Performance matters
✓ Component is presentation-only

// Example: Display component
@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user: User;
  // Perfect for OnPush - just displays data
}
```

**Don't use OnPush when:**

```typescript
✗ Component has complex internal state
✗ Using mutable data
✗ Many timers/intervals
✗ Third-party libraries

// Example: Real-time component
@Component({
  template: `<p>{{ currentTime }}</p>`,
  changeDetection: ChangeDetectionStrategy.Default  // Better
})
export class ClockComponent {
  currentTime = new Date();
  
  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date();  // Needs to update
    }, 1000);
  }
}
```

### 2.5 OnPush with Observables

**Using async pipe (recommended):**

```typescript
@Component({
  selector: 'app-users',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  users$ = this.http.get<User[]>('/api/users');
  
  constructor(private http: HttpClient) {}
  // ✓ Works! Async pipe triggers change detection
}
```

**Without async pipe (needs markForCheck):**

```typescript
@Component({
  selector: 'app-users',
  template: `
    <div *ngFor="let user of users">
      {{ user.name }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  users: User[] = [];
  
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit() {
    this.http.get<User[]>('/api/users').subscribe(users => {
      this.users = users;
      this.cdr.markForCheck();  // ✓ Needed!
    });
  }
}
```

---

## 3. Zone.js and NgZone

### 3.1 What is Zone.js?

**Zone.js** is a library that intercepts async operations and notifies Angular.

**Think of it like:**
A spy that watches all async operations and tells Angular when to check for changes.

**Without Zone.js:**
```typescript
setTimeout(() => {
  this.count = 10;
  // View doesn't update!
  // Need to manually trigger change detection
}, 1000);
```

**With Zone.js:**
```typescript
setTimeout(() => {
  this.count = 10;
  // View updates automatically!
  // Zone.js triggered change detection
}, 1000);
```

### 3.2 How Zone.js Works

**Zone.js monkey-patches async APIs:**

```typescript
// Original setTimeout
const originalSetTimeout = window.setTimeout;

// Zone.js wraps it
window.setTimeout = function(fn, delay) {
  return originalSetTimeout(() => {
    fn();  // Execute callback
    // Trigger Angular change detection
    runChangeDetection();
  }, delay);
};
```

**What Zone.js patches:**
- setTimeout / setInterval
- Promises
- XHR / Fetch
- DOM events
- requestAnimationFrame

### 3.3 NgZone Service

**Access NgZone:**

```typescript
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-example'
})
export class ExampleComponent {
  constructor(private ngZone: NgZone) {}
}
```

**Check if inside Angular zone:**
```typescript
ngOnInit() {
  console.log(NgZone.isInAngularZone());  // true
}
```

### 3.4 Running Outside Angular

**Avoid triggering change detection:**

```typescript
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: `<p>{{ time }}</p>`
})
export class ClockComponent {
  time = new Date();
  
  constructor(private ngZone: NgZone) {}
  
  ngOnInit() {
    // ✗ Bad: Triggers change detection every second
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    
    // ✓ Good: Runs outside Angular
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.time = new Date();
        // Need to manually trigger when needed
        this.ngZone.run(() => {
          // Change detection runs
        });
      }, 1000);
    });
  }
}
```

**Real-world example:**

```typescript
@Component({
  selector: 'app-game',
  template: `<canvas #canvas></canvas>`
})
export class GameComponent {
  @ViewChild('canvas') canvas: ElementRef;
  
  constructor(private ngZone: NgZone) {}
  
  ngAfterViewInit() {
    // Game loop outside Angular
    this.ngZone.runOutsideAngular(() => {
      const gameLoop = () => {
        this.updateGame();
        this.renderGame();
        requestAnimationFrame(gameLoop);
      };
      gameLoop();
    });
  }
  
  updateGame() {
    // Update game state
    // No change detection needed
  }
  
  renderGame() {
    // Render to canvas
    // No change detection needed
  }
}
```

### 3.5 Running Inside Angular

**Trigger change detection:**

```typescript
@Component({
  selector: 'app-example'
})
export class ExampleComponent {
  count = 0;
  
  constructor(private ngZone: NgZone) {}
  
  startOutsideAngular() {
    this.ngZone.runOutsideAngular(() => {
      // Heavy computation outside Angular
      const result = this.expensiveOperation();
      
      // Bring result back into Angular
      this.ngZone.run(() => {
        this.count = result;
        // Change detection runs automatically
      });
    });
  }
  
  expensiveOperation() {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return sum;
  }
}
```

---

## 4. Manual Change Detection

### 4.1 ChangeDetectorRef

**Access change detector:**

```typescript
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-manual'
})
export class ManualComponent {
  constructor(private cdr: ChangeDetectorRef) {}
}
```

**Available methods:**
- `detectChanges()` - Check this component and children
- `markForCheck()` - Mark for next check
- `detach()` - Detach from change detection
- `reattach()` - Reattach to change detection
- `checkNoChanges()` - Verify no changes (dev mode)

### 4.2 detectChanges()

**Immediately check component and children:**

```typescript
@Component({
  selector: 'app-example',
  template: `<p>{{ value }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  value = 0;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  updateValue() {
    // Update via setTimeout (outside Zone)
    setTimeout(() => {
      this.value = Math.random();
      this.cdr.detectChanges();  // Manually trigger
    }, 1000);
  }
}
```

**Use case - Third-party library:**

```typescript
@Component({
  selector: 'app-chart',
  template: `<div #chartContainer></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
  @ViewChild('chartContainer') container: ElementRef;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngAfterViewInit() {
    // Third-party chart library
    const chart = new Chart(this.container.nativeElement);
    
    chart.on('click', (data) => {
      this.handleClick(data);
      this.cdr.detectChanges();  // Update view
    });
  }
  
  handleClick(data: any) {
    // Update component state
  }
}
```

### 4.3 markForCheck()

**Mark component and ancestors for next check:**

```typescript
@Component({
  selector: 'app-child',
  template: `<p>{{ data }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  data: string;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  updateFromObservable() {
    this.dataService.data$.subscribe(data => {
      this.data = data;
      this.cdr.markForCheck();  // Schedule check
    });
  }
}
```

**markForCheck vs detectChanges:**

```typescript
// markForCheck: Schedules for next cycle
this.cdr.markForCheck();
// Component checked on next change detection cycle

// detectChanges: Runs immediately
this.cdr.detectChanges();
// Component checked NOW
```

### 4.4 detach()

**Detach component from change detection:**

```typescript
@Component({
  selector: 'app-heavy',
  template: `
    <p>{{ data }}</p>
    <button (click)="update()">Update</button>
  `
})
export class HeavyComponent {
  data = 'Initial';
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.cdr.detach();  // Stop automatic checking
  }
  
  update() {
    this.data = 'Updated';
    this.cdr.detectChanges();  // Manually check
  }
}
```

### 4.5 reattach()

**Reattach component to change detection:**

```typescript
@Component({
  selector: 'app-toggle'
})
export class ToggleComponent {
  isDetached = false;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  toggleDetection() {
    if (this.isDetached) {
      this.cdr.reattach();
      this.isDetached = false;
    } else {
      this.cdr.detach();
      this.isDetached = true;
    }
  }
}
```

---

## 5. Detach and Reattach Strategies

### 5.1 When to Detach

**Detach when:**

```typescript
✓ Component updates rarely
✓ Heavy rendering
✓ Real-time data (manual control)
✓ Performance critical

// Example: Static content
@Component({
  selector: 'app-static',
  template: `<div>{{ content }}</div>`
})
export class StaticComponent {
  @Input() content: string;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.cdr.detach();  // Content rarely changes
  }
  
  ngOnChanges() {
    this.cdr.detectChanges();  // Check when input changes
  }
}
```

### 5.2 Detaching Components

**Detach on initialization:**

```typescript
@Component({
  selector: 'app-dashboard',
  template: `
    <app-widget *ngFor="let widget of widgets" [data]="widget">
    </app-widget>
  `
})
export class DashboardComponent {
  widgets = [...];
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    // Heavy dashboard with many widgets
    this.cdr.detach();
    
    // Update every 5 seconds instead of constantly
    setInterval(() => {
      this.updateDashboard();
      this.cdr.detectChanges();
    }, 5000);
  }
  
  updateDashboard() {
    // Fetch new data
  }
}
```

### 5.3 Reattaching Components

**Conditional reattach:**

```typescript
@Component({
  selector: 'app-conditional'
})
export class ConditionalComponent {
  isActive = false;
  
  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();  // Start detached
  }
  
  activate() {
    this.isActive = true;
    this.cdr.reattach();  // Reattach when active
  }
  
  deactivate() {
    this.isActive = false;
    this.cdr.detach();  // Detach when inactive
  }
}
```

### 5.4 Use Cases

**Use case 1: Real-time data with throttling:**

```typescript
@Component({
  selector: 'app-stock-ticker',
  template: `<p>{{ price }}</p>`
})
export class StockTickerComponent {
  price: number;
  
  constructor(
    private cdr: ChangeDetectorRef,
    private stockService: StockService
  ) {}
  
  ngOnInit() {
    this.cdr.detach();
    
    // Stock prices update every millisecond
    this.stockService.prices$.subscribe(price => {
      this.price = price;
      // Don't check every millisecond - throttle to 100ms
    });
    
    // Check every 100ms instead of every millisecond
    setInterval(() => {
      this.cdr.detectChanges();
    }, 100);
  }
}
```

**Use case 2: Heavy list:**

```typescript
@Component({
  selector: 'app-heavy-list',
  template: `
    <div *ngFor="let item of items; trackBy: trackById">
      {{ item.name }}
    </div>
  `
})
export class HeavyListComponent {
  items: Item[] = [];
  
  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }
  
  loadItems() {
    this.service.getItems().subscribe(items => {
      this.items = items;
      this.cdr.detectChanges();  // Check once after load
    });
  }
  
  trackById(index: number, item: Item) {
    return item.id;
  }
}
```

---

## 6. markForCheck vs detectChanges

### 6.1 Understanding markForCheck

**markForCheck marks component for next check:**

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  data: string;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  updateData() {
    this.data = 'New data';
    this.cdr.markForCheck();  // Will check on next cycle
    
    console.log('markForCheck called');
    // View not updated yet!
    
    setTimeout(() => {
      console.log('View updated now');
    }, 0);
  }
}
```

**What it does:**
```
1. Marks component as "dirty"
2. Marks all ancestors as "dirty"
3. Waits for next change detection cycle
4. Angular checks marked components
```

### 6.2 Understanding detectChanges

**detectChanges checks immediately:**

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  data: string;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  updateData() {
    this.data = 'New data';
    this.cdr.detectChanges();  // Checks NOW
    
    console.log('detectChanges called');
    // View updated immediately!
  }
}
```

**What it does:**
```
1. Immediately checks this component
2. Checks all children
3. Updates view synchronously
4. Doesn't check ancestors
```

### 6.3 Key Differences

**Comparison:**

| Aspect | markForCheck | detectChanges |
|--------|-------------|---------------|
| **When** | Next cycle | Immediately |
| **Scope** | This + ancestors | This + children |
| **Performance** | Better | Worse |
| **Use with** | OnPush + async | Detached components |

**Visual:**

```
markForCheck:
Child (marked) → Parent (marked) → Root (marked)
                                   ↓
                            Next CD cycle runs

detectChanges:
Parent → Child (checked) → Grandchild (checked)
         ↓
      Updates NOW
```

### 6.4 When to Use Each

**Use markForCheck:**

```typescript
// ✓ With OnPush and async data
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncComponent {
  data: string;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.service.data$.subscribe(data => {
      this.data = data;
      this.cdr.markForCheck();  // ✓ Correct
    });
  }
}
```

**Use detectChanges:**

```typescript
// ✓ With detached components
@Component({})
export class DetachedComponent {
  data: string;
  
  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();
  }
  
  updateData() {
    this.data = 'New';
    this.cdr.detectChanges();  // ✓ Correct (component detached)
  }
}
```

---

## 7. Performance Optimization

### 7.1 OnPush Strategy

**Enable OnPush everywhere possible:**

```typescript
// ✓ Enable OnPush
@Component({
  selector: 'app-user-card',
  template: `
    <div>{{ user.name }}</div>
    <div>{{ user.email }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user: User;
}

// Parent uses immutable updates
export class ParentComponent {
  user = { name: 'John', email: 'john@example.com' };
  
  updateUser() {
    // ✓ Create new reference
    this.user = { ...this.user, name: 'Jane' };
  }
}
```

**Performance gain:**
```
Before OnPush: Checks on every change (expensive)
After OnPush: Checks only when input changes (fast)
```

### 7.2 TrackBy Functions

**Use trackBy with *ngFor:**

```typescript
@Component({
  selector: 'app-list',
  template: `
    <div *ngFor="let item of items; trackBy: trackById">
      {{ item.name }}
    </div>
  `
})
export class ListComponent {
  items: Item[] = [];
  
  trackById(index: number, item: Item) {
    return item.id;  // Track by unique ID
  }
  
  updateItems() {
    // Without trackBy: Recreates ALL DOM elements
    // With trackBy: Only updates changed items
    this.items = [...this.items, newItem];
  }
}
```

**Performance impact:**

```typescript
// Without trackBy
items = [1, 2, 3]
items = [1, 2, 3, 4]
→ Destroys and recreates ALL 4 elements

// With trackBy
items = [1, 2, 3]
items = [1, 2, 3, 4]
→ Only creates element for item 4
```

### 7.3 Pure Pipes

**Use pure pipes (default):**

```typescript
// ✓ Pure pipe (efficient)
@Pipe({
  name: 'filter',
  pure: true  // Default
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    console.log('Pipe executed');
    return items.filter(item => 
      item.name.includes(searchTerm)
    );
  }
}

// Usage
<div *ngFor="let item of items | filter:searchTerm">
  {{ item.name }}
</div>
```

**Why pure pipes are fast:**
```
Pure pipe only re-executes when:
- Input reference changes
- Parameter changes

Impure pipe re-executes:
- Every change detection cycle (slow!)
```

### 7.4 Detaching Heavy Components

**Detach components with heavy rendering:**

```typescript
@Component({
  selector: 'app-chart',
  template: `<canvas #canvas></canvas>`
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef;
  private updateInterval: any;
  
  constructor(private cdr: ChangeDetectorRef) {
    this.cdr.detach();  // Detach immediately
  }
  
  ngOnInit() {
    // Update chart every second
    this.updateInterval = setInterval(() => {
      this.updateChart();
      // Only check when we actually update
      this.cdr.detectChanges();
    }, 1000);
  }
  
  ngOnDestroy() {
    clearInterval(this.updateInterval);
    this.cdr.reattach();
  }
  
  updateChart() {
    // Heavy chart rendering
  }
}
```

### 7.5 Avoiding Change Detection

**Run code outside Angular zone:**

```typescript
@Component({
  selector: 'app-heavy'
})
export class HeavyComponent {
  constructor(private ngZone: NgZone) {}
  
  startHeavyWork() {
    // Run outside Angular
    this.ngZone.runOutsideAngular(() => {
      // Heavy operations that don't affect view
      this.processData();
      this.performCalculations();
      
      // Only run inside when done
      this.ngZone.run(() => {
        this.displayResults();
      });
    });
  }
  
  processData() {
    // Heavy processing
    // No change detection triggered
  }
  
  performCalculations() {
    // More heavy work
    // No change detection triggered
  }
  
  displayResults() {
    // Update view
    // Change detection triggered
  }
}
```

### 7.6 Profiling and Debugging

**Enable profiling:**

```typescript
import { enableDebugTools } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';

// In main.ts
platformBrowserDynamic().bootstrapModule(AppModule)
  .then(moduleRef => {
    const applicationRef = moduleRef.injector.get(ApplicationRef);
    const componentRef = applicationRef.components[0];
    enableDebugTools(componentRef);
  });
```

**Use Chrome DevTools:**

```javascript
// In browser console

// Profile change detection
ng.profiler.timeChangeDetection()

// Output:
// {
//   msPerTick: 1.5,
//   numTicks: 10,
//   core: 15
// }
```

**Angular DevTools Extension:**
```
Install Angular DevTools extension
→ Profiler tab
→ Record
→ Perform action
→ See which components are checked
```

**Best practices:**

```typescript
// ✓ Good
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let item of items; trackBy: trackById">
      {{ item | purePipe }}
    </div>
  `
})

// ✗ Bad
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div *ngFor="let item of items">
      {{ expensiveMethod() }}
    </div>
  `
})
```

---

## Summary

You've mastered **Angular Change Detection**!

**Key Concepts:**

**1. Change Detection Strategies:**
- **Default**: Check every time (safe, slower)
- **OnPush**: Check only on input change (fast, requires immutability)

**2. Zone.js:**
- Automatically triggers change detection
- Can run code outside Angular for performance
- Use `NgZone.runOutsideAngular()` for heavy operations

**3. Manual Change Detection:**
- **detectChanges()**: Check immediately (this + children)
- **markForCheck()**: Schedule check (this + ancestors)
- **detach()**: Remove from change detection
- **reattach()**: Add back to change detection

**4. Performance Optimization:**
- Use OnPush strategy
- Use trackBy with *ngFor
- Use pure pipes
- Detach heavy components
- Run outside Angular zone

**Decision Tree:**

```
Need to optimize?
├─ Use OnPush strategy
├─ Make data immutable
├─ Use trackBy functions
├─ Use pure pipes
└─ Profile and measure

Heavy component?
├─ Detach from CD
├─ Manually trigger when needed
└─ Consider running outside Angular

Third-party library?
├─ Run outside Angular
├─ Use detectChanges() when needed
└─ Consider detaching component
```

**Best Practices:**

```typescript
// ✓ Use OnPush
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// ✓ Use immutable updates
this.user = { ...this.user, name: 'New' };

// ✓ Use trackBy
<div *ngFor="let item of items; trackBy: trackById">

// ✓ Use async pipe
{{ data$ | async }}

// ✓ Run heavy work outside Angular
this.ngZone.runOutsideAngular(() => {
  // Heavy work
});

// ✗ Don't mutate objects with OnPush
this.user.name = 'New';  // Won't trigger CD with OnPush

// ✗ Don't use methods in templates
{{ expensiveMethod() }}  // Runs on every CD

// ✗ Don't forget trackBy
<div *ngFor="let item of items">  // Recreates all items
```

**Performance Impact:**

```
Large app without optimization:
- Default CD everywhere
- No trackBy
- Impure pipes
Result: Slow, laggy

Same app with optimization:
- OnPush everywhere
- trackBy on lists
- Pure pipes
- Detached heavy components
Result: Fast, smooth
```

Master these change detection concepts to build high-performance Angular applications! 🚀
