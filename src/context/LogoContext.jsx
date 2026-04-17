// LogoContext.jsx
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../config";
// import { getSchoolContext } from "../utills/schoolContext";
export const LogoContext = createContext();
export function LogoProvider({ children }) {
  const [logoUrl, setLogoUrl] = useState("");
  // const { appId, appName } = getSchoolContext();
  const appId="16";
    const appName="Ice";
  useEffect(() => {
    if (!appId || !appName) return;
    setLogoUrl(
      `${API_URL}/api/logo/active/image?appId=${appId}&appName=${appName}`
    );
  }, [appId, appName]);
  const setLogoById = (logoId) => {
    if (!logoId) return;
    setLogoUrl(`${API_URL}/api/logo/image/${logoId}`);
  };

  return (
    <LogoContext.Provider value={{ logoUrl, setLogoById }}>
      {children}
    </LogoContext.Provider>
  ); 
}
