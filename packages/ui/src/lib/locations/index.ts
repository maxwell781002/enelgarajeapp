import { CITIES } from "./cities";
import { STATES } from "./states";

export const getCityByCode = (code: string) => {
  return CITIES.find((b: any) => b.code === code);
};

export const getStateByCode = (state: string) => {
  return STATES.find((b: any) => b.state === state);
};
