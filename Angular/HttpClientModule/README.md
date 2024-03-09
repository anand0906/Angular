<h1>HttpClient</h1>
<p>The HttpClient is a module in Angular that provides functionalities for making HTTP requests to backend servers and handling the responses within your Angular application.</p>
<p>The HttpClientModule is a module in Angular that provides functionalities for making HTTP requests to backend servers and handling the responses within your Angular application.</p>
<p>It is part of the @angular/common/http module and provides a convenient API for handling HTTP operations.</p>

<h2>Setup</h2>
<p>You need to import HttpClientModule into your application's root module (usually AppModule) to make the HttpClient service available throughout your application.</p>

```Typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
  // ...
})
export class AppModule { }
```
<p>HttpClient Service: This is the core service within HttpClientModule. It offers methods to perform various HTTP operations like GET, POST, PUT, DELETE, etc.</p>
<p>To use HttpClient in your service or component, you need to inject it. You can do this by adding it to the constructor as follows</p>

```Typescript
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) { }
```

<p>You can use various methods provided by HttpClient to make HTTP requests, such as get, post, put, delete, etc. Here's an example of making a simple GET request</p>

```Typescript
getData() {
  return this.http.get('https://api.example.com/data');
}
```

<h2>Observable</h2>
<p>Observables are a fundamental concept in libraries like RxJS (Reactive Extensions for JavaScript) used in frameworks like Angular. They provide a way to handle asynchronous data streams in a reactive manner.</p>
<p>Think of an Observable as a stream of data flowing over time. It's like a river of information where things (data or events) come along at different moments.</p>
<p>You can create your own Observable to represent this stream. For example, you might have an Observable that emits messages.</p>

```Typescript
const messageStream = new Observable((observer) => {
  observer.next('Hello');
  observer.next('World');
  observer.complete();
});
```
<p>To actually get the data from the stream, you "subscribe" to it. It's like saying, "Hey, I'm interested in hearing what comes down this river!"</p>

```Typescript
messageStream.subscribe(
  (message) => console.log(message),  // Print each message
  (error) => console.error(error),    // Handle errors (if any)
  () => console.log('Stream ended')    // Do something when the stream is done
);
```
<p>The stream has a lifecycle. It can send data (next), encounter an error (error), or signal that it's done sending data (complete).</p>
<p>If you decide you're not interested in the stream anymore, you can "unsubscribe." It's like saying, "Okay, I've seen enough. I don't want to hear from this stream anymore."</p>

```Typescript
const subscription = messageStream.subscribe(/* handlers */);

// Later, if you want to stop listening
subscription.unsubscribe();
```

<p>You can also do cool things with the stream, like changing the messages or filtering them. This is done using "operators."</p>

```Typescript
import { map, filter } from 'rxjs/operators';

messageStream.pipe(
  map((message) => message.toUpperCase()),
  filter((message) => message.startsWith('H'))
).subscribe((transformedMessage) => console.log(transformedMessage));
```

<p>The HttpClient in Angular provides several methods for making HTTP requests. Each method corresponds to a different HTTP verb (GET, POST, PUT, DELETE, etc.).</p>

<h2>GET</h2>
<p>The GET method in the HttpClient module of Angular is used to retrieve data from a specified URL</p>
<p>This is typically used when you want to fetch information from a server, such as retrieving a list of items, details of a specific resource, or any other data available via an HTTP GET request.</p>
<p>Use the get() method of HttpClient to initiate the GET request. It takes two arguments:</p>
<ul>
	<li>URL: The URL of the resource you want to retrieve data from.</li>
	<li>Options (Optional): An object containing additional configuration options for the request, such as headers, params (query parameters), or the expected response type.</li>
</ul>

```Typescript
const url = 'https://api.example.com/data'; // Replace with your actual API URL

// Basic GET request
this.http.get(url);

// GET request with options
const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  params: { filter: 'active' }
};
this.http.get(url, options);
```

<p>The get() method returns an Observable. Observables are streams of data emitted over time. You subscribe to the Observable to receive and process the data as it arrives from the server, or handle any errors that might occur.</p>

```Typescript
this.http.get<any>(url) // Specifying the expected response type (any in this case)
  .subscribe(data => {
    console.log('GET request successful:', data);
    // Process the received data here
  },
  error => {
    console.error('Error fetching data:', error);
    // Handle errors here
  });
```

<p>In general, you should unsubscribe from an observable when a component is destroyed.
You don't have to unsubscribe from HttpClient observables because they unsubscribe automatically after the server request responds or times out. Most developers choose not to unsubscribe. None of this guide's examples unsubscribe.</p>
<p>In fact, each subscribe() initiates a separate, independent execution of the observable. Subscribing twice results in two HTTP requests</p>

```Typescript
const req = http.get<Heroes>('/api/heroes');
// 0 requests made - .subscribe() not called.
req.subscribe();
// 1 request made.
req.subscribe();
// 2 requests made.
```

<p>The options parameter in the get method of HttpClient in Angular is an optional object that allows you to configure various aspects of your GET request. It provides flexibility and control over how your request is made and how the response is handled.</p>

```Typescript
options: {
  headers?: HttpHeaders | {[header: string]: string | string[]},
  observe?: 'body' | 'events' | 'response',
  params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
  reportProgress?: boolean,
  responseType?: 'arraybuffer'|'blob'|'json'|'text',
  withCredentials?: boolean,
}
```

<h5>headers</h5>
<p>Used to send additional information about the request to the server.</p>
<p>Created using the HttpHeaders class.</p>
<p>Common headers include:</p>
<ul>
	<li>Content-Type: Specifies the format of the request body (e.g., application/json, text/plain). This is usually not required for GET requests as they typically don't have a body.</li>
	<li>Authorization: Used for authentication purposes (e.g., bearer tokens).</li>
	<li>Accept: Specifies the types of responses the client can accept (e.g., application/json).</li>
</ul>

```Typescript
const headers = new HttpHeaders({
  'Authorization': `Bearer my-access-token`
});

this.http.get(url, { headers });
```

<h5>Params</h5>
<p>Used to send data along with the GET request in the URL as query string parameters. These are key-value pairs appended to the URL after a question mark (?).</p>
<p>Defined as a key-value object within the options object.</p>

```TypeScript
import { HttpParams } from '@angular/common/http';

const queryParams = new HttpParams()
  .set('param1', 'value1')
  .set('param2', 'value2');

this.http.get('https://api.example.com/data', { params: queryParams }).subscribe(
  (data) => {
    // Handle successful response
    console.log(data);
  },
  (error) => {
    // Handle error
    console.error(error);
  }
);

```

<h5> Response Type:</h5>
<p>By default, HttpClient returns the response body as a JavaScript object. This might not always be the desired format.</p>
<p> you can use the responseType property in the options object to control the response format:</p>
<ul>
	<li>'json': Parse JSON response (default).</li>
	<li>'text': Get the response as plain text.</li>
	<li>'blob': Get the response as a Blob object (useful for binary data).</li>
	<li>'arraybuffer': Get the response as an ArrayBuffer.</li>
</ul>

```Typescript
this.http.get<Product[]>(url); // Specifying expected response type as an array of Product objects

// Using responseType in options
this.http.get(url, { responseType: 'text' });
```
<h5>Observe</h5>
<p>The observe property within the options object of HttpClient's get (and other) methods in Angular deals with how much of the HTTP response you want to observe. </p>
<p>It essentially determines what data you receive from the server and how you handle it.</p>
<p>Two common values used with observe</p>

<h6>'body': (Default Behavior)</h6>
<p>By default, the observe value is 'body', meaning you receive the response body.</p>
<h6>'events': For Progress Events</h6>
<p>This option is useful when you want to monitor the progress of the HTTP request as it's being downloaded.</p>
<p>Setting observe to 'events' results in HttpClient emitting multiple HttpEvent objects throughout the request lifecycle.</p>
<p>This approach is beneficial for scenarios like displaying a progress bar while downloading large files or handling long-running requests.</p>

<p>You can also set it to 'response' if you want the full HTTP response, including headers and status.</p>

<h5>withCredentials?: boolean</h5>
<p>By default, web browsers enforce security restrictions to prevent a web page from making HTTP requests to a different domain than the one that served the page. This is known as the Same-Origin Policy (SOP).</p>
<p>Cross-Origin Requests (CORS) are a mechanism that allows web browsers to relax this restriction under certain conditions.When making a request to a different domain (cross-origin), cookies associated with the original domain (where the page is hosted) are not automatically sent by the browser due to SOP.</p>
<p>Setting withCredentials to true in the options object instructs the browser to include any cookies associated with the target domain in the request. This is crucial for scenarios where authentication or session management relies on cookies.</p>
<p>Imagine your Angular application is hosted on your-app.com and you need to make a GET request to an API endpoint on api.example.com.</p>
<p>If the API endpoint on api.example.com uses cookies for authentication and expects them to be present in the request, you'll need to set withCredentials to true:</p>

```Typescript
const options = { withCredentials: true };

this.http.get('https://api.example.com/data', options).subscribe(...)
```
<p>For withCredentials to work effectively, the server that receives the request (api.example.com in this case) must also be configured to allow requests with credentials. This server-side configuration varies depending on the server technology being used.</p>
<p>Using withCredentials can introduce security implications, as cookies can contain sensitive information. Make sure you only enable it for trusted domains and APIs that require it for authentication or session management.</p>
<p>withCredentials is typically used only for cross-origin requests. For same-origin requests (where the domain of the API endpoint matches the domain of your application), cookies are sent automatically by the browser.</p>
<p>withCredentials is typically used only for cross-origin requests. For same-origin requests (where the domain of the API endpoint matches the domain of your application), cookies are sent automatically by the browser.</p>

<h5>Reportprogress</h5>
<p>The reportProgress option in Angular's HttpClient is used when you want to listen for progress events during the transfer of large amounts of data, such as when uploading or downloading files. This option allows you to monitor the progress of the HTTP request and receive updates on how much data has been transferred.</p>
<p>When making a request, set the reportProgress option to true. This informs HttpClient that you want to receive progress events.</p>

```typescript
import { HttpClient, HttpEventType } from '@angular/common/http';

// ...

this.http.get('https://api.example.com/large-data', { reportProgress: true, responseType: 'text' })
  .subscribe(event => {
    if (event.type === HttpEventType.DownloadProgress) {
      // Handle download progress event
      const percentDone = Math.round((100 * event.loaded) / event.total);
      console.log(`Download progress: ${percentDone}%`);
    } else if (event.type === HttpEventType.Response) {
      // Handle the complete response
      console.log('Download complete:', event.body);
    }
  });
```

<p>Inside the subscription, you can check the type of the event using event.type to determine whether it's a progress event (HttpEventType.DownloadProgress or HttpEventType.UploadProgress). If it is, you can extract information such as the loaded and total bytes to calculate the progress percentage.</p>

```typescript
if (event.type === HttpEventType.DownloadProgress) {
  const percentDone = Math.round((100 * event.loaded) / event.total);
  console.log(`Download progress: ${percentDone}%`);
}
```
<p>After the progress events, you will eventually receive a response event (HttpEventType.Response). This event contains the complete response from the server.</p>

```typescript
else if (event.type === HttpEventType.Response) {
  // Handle the complete response
  console.log('Download complete:', event.body);
}
```

<h3>Typed Response</h3>
<p>When using Angular's HttpClient to make HTTP requests, you can request a typed response by specifying the desired type as a generic parameter when making the request.</p>
<p>his is useful when you know the shape of the expected response and want TypeScript to provide type checking and autocompletion for the received data.</p>
<p>Suppose you made the get call without specifying the return type like this:</p>

```typescript
return this.http.get(this.configUrl);
```

<p>The return type would be Object, To access its properties you would have to explicitly convert them with as any like this:</p>

```typescript
showConfig() {
  this.configService.getConfig()
    .subscribe(data => this.config = {
        heroesUrl: (data as any).heroesUrl,
        textfile:  (data as any).textfile,
        date: (data as any).date,
    });
  }
```

<p>Before making the request, define the TypeScript interface or type that represents the expected structure of the response data.</p>

```typescript
export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}
```

<p>When making the request using HttpClient, provide the type as a generic parameter using the get<T> method (replace T with your defined type). The response observable will now emit values of the specified type.</p>

```Typescript
getConfig() {
  // now returns an Observable of Config
  return this.http.get<Config>(this.configUrl);
}

config: Config | undefined;

showConfig() {
  this.configService.getConfig()
    .subscribe(data => this.config = {
        heroesUrl: data.heroesUrl,
        textfile:  data.textfile,
        date: data.date,
    });
}
```

<p>When subscribing to the observable, TypeScript will recognize the data type, allowing you to work with the received data with the correct structure.</p>
<p>By using typed responses, you get the benefits of TypeScript's static typing, making your code more robust and reducing the likelihood of runtime errors. It also provides better code completion and documentation within your integrated development environment (IDE).</p>

<h2>Handling Errors</h2>
<p>In Angular, HttpClient provides mechanisms to handle errors that can occur during HTTP requests to backend servers.</p>
<p>If the request fails on the server, HttpClient returns an error object instead of a successful response.</p>
<p>When an error occurs, you can obtain details of what failed to inform your user. In some cases, you might also automatically retry the request.</p>
<p>Two types of errors can occur. server-side errors and client-side errors.</p>
<h5>Client Side Errors</h5>
<p>Client-side errors may occur due to network issues or exceptions thrown within RxJS operators. </p>
<p>These errors happen on the client (user's browser) and prevent the request from completing successfully. They typically have a status code of 0 and the error property in the error object provides more details. Here's a breakdown of client-side errors:</p>
<h6>Network Errors:</h6>
<p>These occur due to issues with the internet connection or server availability. The error property might contain a ProgressEvent object, and the type property within ProgressEvent could indicate the specific network issue, such as 'timeout', 'load', or 'abort'.</p>
<p>These errors have status set to 0</p>
<h5>Server Side Errors</h5>
<p>These errors originate from the backend server and are indicated by an HTTP response with a status code in the 4xx or 5xx range. Common examples include:</p>

```typescript
private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}

```
<h3>Retrying Failure Requets</h3>
<p>Retrying failed requests is a common strategy to improve the robustness of your application, especially when dealing with network-related issues or intermittent errors. In Angular, you can implement request retries using the retry operator provided by RxJS.</p>
<p>Use the retry operator to specify the number of times you want to retry the request. Combine it with the catchError operator to handle errors and decide whether to retry or propagate the error.</p>

```typescript
getDataWithRetry(): Observable<any> {
  const maxRetries = 3; // You can adjust this value based on your requirements

  return this.http.get('https://api.example.com/data').pipe(
    retry(maxRetries),
    catchError((error) => {
      // Log the error or perform custom error handling
      console.error('Error occurred:', error);

      // Propagate the error if the maximum number of retries is reached
      if (error.status === 0 || error.status >= 500) {
        return throwError('Maximum retries reached or server error.');
      }

      // Retry for other types of errors
      return throwError(error);
    })
  );
}

this.getDataWithRetry().subscribe(
  (data) => {
    // Handle successful response
    console.log(data);
  },
  (error) => {
    // Handle error (this block is reached only if maximum retries are exhausted)
    console.error('Final error:', error);
  }
);

```
<p>In this example, the retry operator will attempt to resend the request up to maxRetries times. The catchError operator is used to handle errors and decide whether to continue with retries or propagate the error if the maximum retry limit is reached.</p>

<h2>POST</h2>
<p>The POST method in Angular's HttpClient is used to send data to the server, typically to create a new resource. </p>
<p>The HttpClient.post() method is similar to get() in that it has a type parameter, which you can use to specify that you expect the server to return data of a given type. The method takes a resource URL and two additional parameters:</p>
<p>body: The data to POST in the body of the request.</p>
<p>body:	The data to POST in the body of the request.</p>

```Typescript
/** POST: add a new hero to the database */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
}
```

<h2>PUT</h2>
<p>The PUT method in Angular's HttpClient is used to update an existing resource on the server with the provided data.</p>
<p>An app can send PUT requests using the HTTP client service. The following HeroesService example, like the POST example, replaces a resource with updated data.</p>

```Typescript
/** PUT: update the hero on the server. Returns the updated hero upon success. */
updateHero(hero: Hero): Observable<Hero> {
  return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('updateHero', hero))
    );
}
```

<h2>Add And Updating Headers</h2>
<p>Add Headers</p>

```Typescript
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
```

<p>Update Headers</p>
<p>You can't directly modify the existing headers within the previous options object because instances of the HttpHeaders class are immutable. Use the set() method instead, to return a clone of the current instance with the new changes applied.</p>
```Typescript
httpOptions.headers =
  httpOptions.headers.set('Authorization', 'my-new-auth-token');
```

<h2>Configure URL Parameters</h2>
<p>Use the HttpParams class with the params request option to add URL query strings in your HttpRequest.</p>
<p>The HttpParams object is immutable. If you need to update the options, save the returned value of the .set() method.</p>

```Typescript
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  term = term.trim();

  // Add safe, URL encoded search parameter if there is a search term
  const options = term ?
   { params: new HttpParams().set('name', term) } : {};

  return this.http.get<Hero[]>(this.heroesUrl, options)
    .pipe(
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
}
```
<p>You can also create HTTP parameters directly from a query string by using the fromString variable:</p>

```Typescript
const params = new HttpParams({fromString: 'name=foo'});
```