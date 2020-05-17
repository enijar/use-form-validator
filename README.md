# use-form-validator

Hook for form validation in React

### Installation

```bash
npm add use-form-validator
```

### Usage

**API**

```jsx harmony
import React, { useState, useCallback } from "rect";
import useFormValidator from "use-form-validator";

function Form() {
  // data is an object of form field values, .e.g {name: "Bob", email: "bob@example.com"}
  const [data, setData] = useState({});
  const [rules] = useState({
    name: "required|max:255",
    email: "required|max:255|email",
  });
  // Default message overrides
  const [messages] = useState({
    // Override default "required" message
    required: "This field is required",
    // Override "name.required" message
    name: {
      required: "Please enter your name",
    },
  });
  const validator = useFormValidator(data, rules, messages);

  // validator.valid => boolean if form validation state
  // validator.errors.all => array of form errors
  // validator.errors.get(name) => array of errors for field
  // validator.errors.first(name) => first error for field or null if there is no error
}
```

**Basic Example**

```jsx harmony
import React, { useState, useCallback } from "rect";
import useFormValidator from "use-form-validator";

function Form() {
  const [data, setData] = useState({});
  const [rules] = useState({
    name: "required|max:255",
    email: "required|max:255|email",
  });
  // Default message overrides
  const [messages] = useState({
    // Override default "required" message
    required: "This field is required",
    // Override "name.required" message
    name: {
      required: "Please enter your name",
    },
  });
  const validator = useFormValidator(data, rules, messages);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (validator.valid) {
        // Validated data
        console.log(data);
      }
    },
    [validator]
  );

  const onChange = useCallback(
    ({ target: { name, value } }) => {
      setData((data) => {
        data[name] = value;
        return data;
      });
    },
    [setData]
  );

  return (
    <form onSubmit={onSubmit}>
      <div>
        {/* "name" error message */}
        <input name="name" onChange={onChange} />
        {validator.errors.first("name")}
      </div>
      <div>
        <input name="email" onChange={onChange} />
        {/* "email" error message */}
        {validator.errors.first("email")}
      </div>
      <div>
        <button>submit</button>
      </div>
    </form>
  );
}
```

### Available Rules

| Rule       | Description                    |
| ---------- | ------------------------------ |
| required   | Test value has a value         |
| min:length | Test value length is >= length |
| max:length | Test value length is <= length |
| email      | Test value email format        |

### Contributing

All contributions are welcome, just submit a PR with a clear explanation of your changes.

Changes to the lib are made inside `src/lib` and changes to examples are made inside `src/examples`

### Running Examples

The following commands will serve the examples on [localhost:8081](http://localhost:8081).

```bash
npm install
npm run watch-examples
```

### Making a Release

The below script will bump the major, minor, or patch number by one and make a new NPM and Github release.

```bash
npm run release {release: ["major", "minor", "patch"]} # e.g. npm run release patch
```
