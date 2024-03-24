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



  // ทำ message ให้เป็น Link
  export const isURL = (message) => {
    let url
    try {
      url = new URL(message);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
};

//ทำการสร้าง id Room โดยการ sort Data
export const createRoomID = (userID1, userID2) =>{
  const sortedIDs = [userID1, userID2].sort();
  return `${sortedIDs[0]}-${sortedIDs[1]}`;
   }
