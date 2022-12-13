<h1>Typescript</h1>
<h6>Problems With JavaScript</h6>
<ol>
	<li>Dynamically Typed</li>
	<li>Global Scoping</li>
	<li>Minimal Object Oriented Support</li>
	<li>minimal IDE Support</li>
</ol>
<h6>Advantages of Typescript</h6>
<ol>
	<li>Creating Optimized Code with Static Typing. Declaring Data type of varibale explicitly</li>
	<li>Advanced Functional Programming Concepts</li>
	<li>Developing Object Oriented Concepts</li>
	<li>Modularizing The Application</li>
	<li>Good IDE Support</li>
</ol>
<p>Typescript is a superset of javascript which is developed and maintained by microsoft.It is open source language for developing large scale development.</p>
<p>Both Typescript ana javascript extends form ES6. Typescript compiles to javascript for browser compatability.</p>
<h6>Steps to run typescript</h6>
<ol>
	<li>Install node in system</li>
	<li>run 'node -v' for confirmation</li>
	<li>install typescript by running command 'npm install -g typescript'</li>
	<li>now create file with extension '.ts'</li>
	<li>compile the typescript file to js file by running 'tsc filename.ts'</li>
	<li>now you can observe new file created with extension '.js'</li>
	<li>now run file by running command 'node filename.js'</li>
</ol>
<ul>
	<li>Ts is statically typed language</li>
	<li>TS can be serverside and clientside </li>
	<li>Node is required to run TS</li>
	<li>Ts Strongly typed language</li>
	<li>It is compiled language</li>
</ul>
<h6>Variable Declaration</h6>
<ul>
	<li>'var' keyword(Declared at top the scope)</li>
	<li>'let' keyword(Block Level)</li>
	<li>'const' keyword(Block Level)</li>
</ul>
<p>There are Basic Data Types</p>
<ul>
	<li>boolean : is for the two values true and false</li>
	<li>number :  is for numbers like 42. JavaScript does not have a special runtime value for integers, so there’s no equivalent to int or float - everything is simply number</li>
	<li>string : represents string values like "Hello, world</li>
	<li>any : It can take any type of value at any time</li>
	<li>unknown, null, undefined, bignint</li>
</ul>
<p>Arrays can be declared using [] after datatype name. Eg: number[], string[], any[]..etc</p>
<p>We can mention readonly keyword for fixed size error.</p>
<p>Tuples are known to be predefined length of arrays. Eg: let mydetails:[string,number,boolean]</p>
<p>we can have data type as object also, Eg: let details:{name:string , age:number}</p>
<p>If we want to define optional field we can mention it by '?'</p>
<p>Eg: let details:{name:string , age?:number}</p>
<h6>enum is a special class which is used to represent the set of constant values</h6>
<p>Basically there are two type of enums numeric and string</p>
<code>
	enum directions {
	  north,
	  south,
	  west,
	  east
    }
    console.log(directions.north) // prints 0
    //by defalt those are assigned as index positions.
</code>
<p>We can alse mention our own index start value or we can assign value to each enum property</p>
<code>
	enum CardinalDirections {
	  North = 1,
	  East,
	  South,
	  West
	}
	// logs 1
	console.log(CardinalDirections.North);
	// logs 4
	console.log(CardinalDirections.West);

	enum StatusCodes {
	  NotFound = 404,
	  Success = 200,
	  Accepted = 202,
	  BadRequest = 400
	}
	// logs 404
	console.log(StatusCodes.NotFound);
	// logs 200
	console.log(StatusCodes.Success);
</code>
<p>we can also assign string values</p>
<code>
	enum CardinalDirections {
	  North = 'North',
	  East = "East",
	  South = "South",
	  West = "West"
	};
	// logs "North"
	console.log(CardinalDirections.North);
	// logs "West"
	console.log(CardinalDirections.West);	
</code>