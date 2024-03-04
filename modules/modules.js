export const isEqual = (a, b) => {
    if (typeof a !== 'object' || typeof b !== 'object') {
      return a === b;
    }
  
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
  
    if (keysA.length !== keysB.length) {
      return false;
    }
  
    for (let key of keysA) {
      if (!keysB.includes(key) || !isEqual(a[key], b[key])) {
        return false;
      }
    }
  
    return true;
  }