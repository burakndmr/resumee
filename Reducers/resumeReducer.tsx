import { resumeType } from "../lib/types";

export default function resumeReducer(
  state: resumeType,
  action: any
): resumeType {
  switch (action.type) {
    case "SET_RESUME":
      return action.payload;
    default:
      return state;
  }
}
