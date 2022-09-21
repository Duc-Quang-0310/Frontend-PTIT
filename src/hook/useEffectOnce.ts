import { useEffect, EffectCallback } from "react";

export const useEffectOnce = (callback: EffectCallback) => {
  useEffect(callback, []);
};
