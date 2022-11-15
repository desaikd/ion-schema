import init, {load_schema, validate} from "./wasm_ion_schema.js";

// Default values for populating the input fields
const schemaInputValue = "// write your type definition here";

// Type definitions for the answer schemas in code challenges
const type_def_1 = "type:: {\n" +
    "  name: type_def_1,\n" +
    "  annotations: [required::type],\n" +
    "  type: struct,\n" +
    "  fields: {\n" +
    "    name: { type: symbol, valid_values: [Toppings, toppings] },\n" +
    "    type: { type: symbol, valid_values: [list] }\n" +
    "  }\n" +
    "}";

const type_def_2 = "type:: {\n" +
    "  name: type_def_2,\n" +
    "  annotations: [required::type],\n" +
    "  type: struct,\n" +
    "  fields: {\n" +
    "    name: { type: symbol, valid_values: [shape, Shape] },\n" +
    "    any_of: { type: list, valid_values: [[square, round, rectangle]] }\n" +
    "  }\n" +
    "}";


function _set_output_style(resultDiv, styleName) {
    var toRemove = [];
    resultDiv.classList.forEach(value => {
        if (value.startsWith("bs-callout-")) toRemove += value;
    })
    resultDiv.classList.remove(toRemove)
    resultDiv.classList.add(`bs-callout-${styleName}`)
}

function show(result_div_name, result_name, code_challenge_editor, type_def_challenge, type_def_challenge_name, extraContext) {
    const answerContent = ace.edit(code_challenge_editor).getValue();
    const schemaContent = answerContent + extraContext;
    console.log("inside show");
    init()
        .then(() => {
            console.log("inside init");

            const resultDiv = document.getElementById(result_div_name);
            const result = load_schema(schemaContent);
            const pre = document.getElementById(result_name);

            // check if there is any error while loading schema and show the error
            if (result.has_error()) {
                _set_output_style(resultDiv, "danger")
                pre.textContent = result.error();
            } else {
                console.log(schemaContent.trim(), schemaInputValue.trim());
                if (answerContent.trim() === schemaInputValue.trim().toString() || !answerContent) {
                    _set_output_style(resultDiv, "danger")
                    pre.textContent = "Oops! Looks like you forgot to define a type.";
                } else {
                    const validation_result = validate(answerContent, type_def_challenge, type_def_challenge_name);
                    if(validation_result.result()) {
                        _set_output_style(resultDiv, "success")
                        pre.textContent = "Great! You just learnt how to create a type definition.";
                    } else {
                        _set_output_style(resultDiv, "warning")
                        pre.textContent = "Almost there! It might need some tweaks before your answer matches the expected schema.";
                    }
                }
            }

            console.log(result);
        });
}


function loadPage() {
    ace.edit("code-challenge-editor-1").setOptions({
        mode: 'ace/mode/ion',
        theme: 'ace/theme/github',
        showPrintMargin: false,
        tabSize: 2,
        value: schemaInputValue,
    });
    ace.edit("code-challenge-editor-2").setOptions({
        mode: 'ace/mode/ion',
        theme: 'ace/theme/github',
        showPrintMargin: false,
        tabSize: 2,
        value: schemaInputValue,
    });
}

loadPage();

document.getElementById("code-challenge-btn-1").addEventListener("click", function() {
    show("code-challenge-1", "result-1", "code-challenge-editor-1", type_def_1, "type_def_1", "")
});

document.getElementById("code-challenge-btn-2").addEventListener("click", function() {
    show("code-challenge-2", "result-2", "code-challenge-editor-2", type_def_2, "type_def_2", "type::{name: square} type::{name: round} type::{name: rectangle}")
});