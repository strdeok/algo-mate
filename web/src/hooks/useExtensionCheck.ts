import { useState, useEffect } from "react";

export const useExtensionCheck = () => {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    let checkCount = 0;
    const interval = setInterval(() => {
      checkCount++;
      const flag = document.getElementById("algo-mate-installed");

      if (flag) {
        setIsInstalled(true);
        clearInterval(interval);
      }

      if (checkCount > 10) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return isInstalled;
};
