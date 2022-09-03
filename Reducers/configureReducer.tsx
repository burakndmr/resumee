import { Config } from "../lib/types";

export default function configureReducer(
  state: Config[],
  action: any
): Config[] {
  console.log("CONFIG_REDUCER", state);
  switch (action.type) {
    case "SET_SELECTED_RESUME":
      return action.payload;

    default:
      return state;
  }
}
