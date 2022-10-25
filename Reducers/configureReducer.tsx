import { Config } from "../lib/types";

export default function configureReducer(
  configureState: Config[],
  action: any
): Config[] {
  console.log("CONFIG_REDUCER", configureState);
  switch (action.type) {
    case "SET_SELECTED_RESUME":
      return action.payload;

    default:
      return configureState;
  }
}
