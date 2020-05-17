import { MessagesMap } from "./types";

const messagesMap: MessagesMap = {
  required: "The :field field is required",
  min: "The :field field must have a min of :length characters",
  max: "The :field field must have a max of :length characters",
  email: "The :field field is not a valid email",
};

export default messagesMap;
