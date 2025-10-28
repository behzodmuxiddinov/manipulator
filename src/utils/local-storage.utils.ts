export const getLocalStorage = (key: string, parse: boolean = false) => {
    const item = localStorage.getItem(key);

    if(!item) return null;

    if(parse){
      try {
        return JSON.parse(item)
      } catch (err) {
        console.error("Xatolik: " + err)
        return null
      }
    }
    
    return item;
}

export const setLocalStorage = (key: string, value: any, stringify: boolean = false) => {
  localStorage.setItem(key, stringify ? JSON.stringify(value) : value)
}

export const removeLocalStorage = (key: string): void => localStorage.removeItem(key);

export const clearStorage = () : void => localStorage.clear();

export const logoutAndPreserve = (keysToKeep: string[]): void => {
  const preserved: Record<string, string> = {};

  keysToKeep.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      preserved[key] = value;
    }
  });

  localStorage.clear();

  for (const [key, value] of Object.entries(preserved)) {
    localStorage.setItem(key, value);
  }
};
  