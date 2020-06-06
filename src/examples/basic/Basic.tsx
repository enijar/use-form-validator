import * as React from "react";
import useFormValidator from "../../lib/use-form-validator";
import { Data, Rules } from "../../lib/config/types";

export default function Basic() {
  const [data, setData] = React.useState<Data>({});
  const [rules] = React.useState<Rules>({
    name: "required|max:255",
    email: "required|max:255|email",
    age: "required|between:18,30",
    uuid: 'required|uuid',
    requiredIf: "required_if:name,John,email,email@john.com",
  });
  // Default message overrides
  const [messages] = React.useState({
    // Override default "required" message
    required: "This field is required",
    // Override "name.required" message
    name: {
      required: "Please enter your name",
    },
    // requiredIf: {
    //   required_if: 'Tell more about you.'
    // }
  });
  const { valid, errors } = useFormValidator(data, rules, messages);

  const onSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      if (valid) {
        // Validated data
        console.log(data);
      }
    },
    [valid]
  );

  const onChange = React.useCallback(
    ({ target: { name, value } }) => {
      const updatedData = { ...data };
      updatedData[name] = value;
      setData(updatedData);
    },
    [data, setData]
  );

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">name</label>
        <input id="name" name="name" onChange={onChange} />
        {errors.first("name")}
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input id="email" name="email" onChange={onChange} />
        {errors.first("email")}
      </div>
      <div>
        <label htmlFor="age">age</label>
        <input id="age" name="age" type="number" onChange={onChange} />
        {errors.first("age")}
      </div>
      <div>
        <label htmlFor="uuid">uuid</label>
        <input id="uuid" name="uuid" type="text" onChange={onChange} />
        {errors.first("uuid")}
      </div>
      <div>
        <label htmlFor="drivingLicense">Required if name: John && email: email@john.com</label>
        <input id="requiredIf" name="requiredIf" type="text" onChange={onChange} />
        {errors.first("requiredIf")}
      </div>
      <div>
        <button>submit</button>
      </div>
    </form>
  );
}
