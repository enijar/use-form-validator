import { MessagesMap } from "./types";

const messagesMap: MessagesMap = {
  required: "The :field field is required",
  min: "The :field field must have a min of :min characters",
  max: "The :field field must have a max of :max characters",
  between: "The :field field be between :min and :max characters",
  email: "The :field field is not a valid email",
  uuid: "The :field field is not a valid uuid",
  required_if: 'The :field field is required',
  required_with: "The :field field is required",
  required_unless: "The :field field is required",
};

export default messagesMap;
