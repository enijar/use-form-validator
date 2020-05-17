import * as React from "react";
import useFormValidator from "../../lib/use-form-validator";
import { Data, Rules } from "../../lib/config/types";

export default function Basic() {
  const [data, setData] = React.useState<Data>({});
  const [rules] = React.useState<Rules>({
    firstName: "required|max:255",
    lastName: "required|max:255",
    email: "required|max:255|email",
  });
  // Default message overrides
  const [messages] = React.useState({
    // Override default "required" message
    required: "This field is required",
    // Override "firstName.required" message
    firstName: {
      required: "Please enter your first name",
    },
  });
  const validator = useFormValidator(data, rules, messages);

  const onSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      if (validator.valid) {
        // Validated data
        console.log(data);
      }
    },
    [validator]
  );

  const onChange = React.useCallback(
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
