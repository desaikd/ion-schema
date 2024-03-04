---
title: Give Ion Schema a Try!
---

# {{ page.title }}
<script src="./assets/ace-builds/src-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="./assets/ace-builds/src-noconflict/mode-ion.js" type="text/javascript" charset="utf-8"></script>
<script src="//d3js.org/d3.v5.min.js"></script>
<script src="https://unpkg.com/@hpcc-js/wasm@0.3.11/dist/index.min.js"></script>
<script src="https://unpkg.com/d3-graphviz@3.0.5/build/d3-graphviz.js"></script>

<div id="wrapper">
<div id="section1">
<label for="schema"></label> 

{% include note.html type="note" content="This sandbox uses `ion-schema-rust` (pre-release version) to validate Ion value using given schema" %}
<br/>

Predefined examples: 
<select name="examples" id="examples">
  <!-- These are loaded dynamically in ion-schema-widget.js --/>
</select>
<br/>
<br/>

Enter one or more type definitions. No Authority is configured, so imports are not available.
<br/>

<div id="schema" class="bs-callout bs-callout-primary"></div>
<br/>

<label for="value"></label>
Enter a single Ion value.
<br/>
<label class="container"> 
    <input id="document" type="checkbox">
    <span class="checkmark"></span>
Treat the input Ion value as document type that represents a series of top-level values
</label>
<br/>

<div id="value" class="bs-callout bs-callout-primary"></div>
<br/>

<label for="schema_type">Validate as </label>

<input type="text" id="schema_type" placeholder="e.g. my_type" name="schema_type" size="15"/>

<button id="validate" type="submit">Go</button>
<button id="graph" type="submit">Visualize schema</button>
<button id="share" type="submit" title="Share a link to your schema" style="float: right;"><i class="fa fa-share-square-o" aria-hidden="true"></i></button>
<br/>

<div id="resultdiv" class="bs-callout bs-callout-default">
<h4 id="result"></h4>
<pre id="violation"></pre>
</div>
<br/>
</div>
<div id="section2">
<button id="download-svg" class="btn btn-outline-primary" type="submit">Download SVG</button>
<button id="download-dot-file" class="btn btn-outline-primary" type="submit">Download DOT File</button>
<div id="graph-error-div" class="bs-callout bs-callout-danger">
<h4 id="graph-view-error"></h4>
</div>
<div id="graph-view" style="text-align: center;"></div>
<br/>

<div id="graph-legend" style="text-align: left;"></div>

</div>
<div id="snackbar"></div>

<script async type="module" src="assets/ion-schema-widget.js"></script>
</div>