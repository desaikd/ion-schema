---
title:  Ion Schema Language Tutorial
---
<!-- including the title in a `<h1>` instead of using `#` means that it won't be included in the TOC /-->

<!-- DO NOT MODIFY BETWEEN THESE LINES! -->
<script src="./assets/ace-builds/src-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="./assets/ace-builds/src-noconflict/mode-ion.js" type="text/javascript" charset="utf-8"></script>
<script type="module" src="assets/tutorial-widget.js"></script>

<h1> {{ page.title }} </h1>

This tutorial helps in learning Ion Schema Language as per [Ion Schema Specification 1.0][1]. Tutorial starts with a section for 
type definition and then has a separate sections for each ISL constraints. Each section contains a brief introduction 
on how to define a constraint or type, examples and code challenges to test your learnings with our schema sandbox.

_Note: This tutorial simply provides examples to learn Ion Schema Language. For more details on any of the sections 
mentioned in this tutorial please visit our official Ion Schema Specification 1.0._

<!-- DO NOT MODIFY BETWEEN THESE LINES! -->
* Placeholder for Table of Content (Must not be removed)
{:toc}
## Ion Schema

Ion Schema consists of a version marker, schema header(optional), schema footer(optional) and types. 
While a header and footer are both optional, a footer is required if a header is present (and vice-versa).
 
Let's start with an example to see how an Ion Schema is defined:
```ion
// defines a schema with an integer type
$ion_schema_1_0
schema_header::{
    imports: [
        { id: "com/example/Trucks.isl" },
        { id: "com/example/Bikes.isl" },
    ]
}

type:: {
    name: vehicle_name,
    type: string,
}

schema_footer::{}
```

As defined above schema header can have an optional import field which can be used to leverage importing types from other schemas.
Above example contains a `string` type with name `vehicle_name`. We will learn about defining types in the next section.

## Type

An Ion schema type consists of a collection of zero or more constraints. A type definition is annotated with `type::` and 
always contains a `name` field to provide a name to the type that you have defined.
If a type definition does not have any constraints then it is equivalent to define the type with `type: $any`.

Here's an example of how to define a type in Ion Schema Language:
```ion
type:: {
    name: my_int,
    type: int
}
```
In the above example, name of the type definition is `my_int` and a type constraint with built-in type `int`.
More information on the Ion schema language built-in types can be found in the [Ion schema specification][2].

Now lets try defining a type in Ion schema language with the following code challenge.

<div id="code-challenge-1" class="bs-callout bs-callout-default"> 
<h3> Try it yourself! </h3>

Define a schema for cakes which has type name `toppings` and a type constraint `list` to provide list of toppings for the cake.
<div id="code-challenge-editor-1" class="bs-callout bs-callout-primary tutorial-challenge"></div>
<button id="code-challenge-btn-1" type="submit">Run</button>
<br>
<br>
<h4 id="result-1"></h4>
<details>
<summary>
Answer
</summary>
<pre>
type:: {
    name: toppings,
    type: list
}
</pre>
</details>
</div>
<div id="snackbar"></div>

# Constraints

As mentioned in the previous section, each type contains zero or more constraints. There are many constraints in Ion schema 
like  logical constraints, decimal constraints, timestamp constraints, container constraints, string constraints, blob/clob constraints. 
Constraints can be repeated, and when they are, all instances of the constraint will apply. In the following sections, 
we will go through each constraint and how they can be defined in Ion schema language. 

## Logic constraints

Logic constraints provides `all_of`, `any_of`, `one_of` and `not` constraints over a one or more types.
All these constraints can be defined as a list of types which then can be applied ona  value.
Following is an example of `one_of` constraint for a restaurant order schema:
```ion
// following type accepts orders that are either Pickup or Delivery
type:: {
    name: OrderType,
    one_of: [
       Pickup,
       Delivery
    ]
}
```
As shown in the above example, it defines a type with name as `OrderType` and has an `one_of` constraint. `one_of` constraints 
is defined as a list of types `Pickup` and `Delivery`, which means that `OrderType` can accept either`Pickup` or `Delivery` types.
Similarly `all_of` and `any_of` can be defined by a list of types, where `all_of` accepts value that must be valid for all the types in the list and  
`any_of` accepts value that must be valid for one or more types in the list.

Following is an example of `any_of` type that accepts `int` between `[1, 5]` and/or nullable `string`: 
```ion
type:: {
    name: any_of_type,
    any_of: [ { valid_values: range::[1, 5] }, nullable::string ]
}
```
In the above example an integer between `[1, 5]` is defined using an inline type definition which uses `valid_values` constraint 
to accept values between 1 and 5. Also, for defining a `nullable` built-in type simply use `nullable` as annotation.

<div id="code-challenge-2" class="bs-callout bs-callout-default"> 
<h3> Try it yourself! </h3>

Let's continue our previous cake schema example and assume we have already defined types called `square`, `round` and `rectangle`. Now define 
a type called `shape` which can be either of the shape types `suqare`, `round` or `rectangle`.
<div id="code-challenge-editor-2" class="bs-callout bs-callout-primary tutorial-challenge"></div>
<button id="code-challenge-btn-2" type="submit">Run</button>
<br>
<br>
<h4 id="result-2"></h4>
<details>
<summary>
Answer
</summary>
<pre>
type:: {
    name: shape,
    one_of: [square, round, rectangle]
}
</pre>
</details>
</div>
<div id="snackbar"></div>

## Fields

`fields` constraint cna be used on a `struct` type to restrict struct field names and values. 
A field may narrow its declared type by specifying additional constraints. By default, a field is constrained by occurs: optional.

Following an example of fields constraint with fields `first_name`, `last_name` and `age`.
```ion
type:: {
name: fields_type,
    fields: {
        first_name: { type: string, occurs: required },
        last_name: { type: string, occurs: required }
        age: { type: int, valid_values: range::[0, 200] },
    }
}
```
From the above example, you cna also specify the number of occurrences for a field using `occurs`. `occurs` can be defined either
as `required`, `optional` or a `range::[1, n]`.

<div id="code-challenge-3" class="bs-callout bs-callout-default"> 
<h3> Try it yourself! </h3>

TBD
<div id="code-challenge-editor-3" class="bs-callout bs-callout-primary tutorial-challenge"></div>
<button id="code-challenge-btn-3" type="submit">Run</button>
<br>
<br>
<h4 id="result-3"></h4>
<details>
<summary>
Answer
</summary>
<pre>
TBD
</pre>
</details>
</div>
<div id="snackbar"></div>

## Valid Values


<!-- References -->
[1]: docs/isl-1-0/spec.md
[2]: docs/isl-1-0/spec.md#core-types
