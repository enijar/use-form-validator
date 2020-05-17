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
    firstName: "required|max:255",
    lastName: "required|max:255",
    email: "required|max:255|email",
  });
  // Default message overrides
  const [messages] = useState({
    // Override default "required" message
    required: "This field is required",
    // Override "firstName.required" message
    firstName: {
      required: "Please enter your first name",
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
    firstName: "required|max:255",
    lastName: "required|max:255",
    email: "required|max:255|email",
  });
  // Default message overrides
  const [messages] = useState({
    // Override default "required" message
    required: "This field is required",
    // Override "firstName.required" message
    firstName: {
      required: "Please enter your first name",
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

| Rule | Description |
|------|-------------|
| required | Test value has a value |
| min:length | Test value length is >= length |
| max:length | Test value length is <= length |
| email | Test value email format |
