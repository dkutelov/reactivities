import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";

interface Store {
  activityStore: ActivityStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
};

// React Context
export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
