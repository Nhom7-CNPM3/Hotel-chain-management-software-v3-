'use client'

import { useState, useEffect } from "react";

function useNetwork(){
  const [isOnline, setNetwork] = useState(typeof window !== 'undefined' ? window.navigator.onLine : true);
  useEffect(() => {
      if (typeof window !== 'undefined') {
          window.addEventListener("offline", () => setNetwork(window.navigator.onLine));
          window.addEventListener("online", () => setNetwork(window.navigator.onLine));
      }
  });
  return isOnline;
}
    export default useNetwork;