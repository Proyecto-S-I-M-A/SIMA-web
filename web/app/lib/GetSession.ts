export function GetSession() {
  if (typeof window === 'undefined') {
    return null;
  }
  return sessionStorage.getItem('sessionID');
}

export function DeleteSession() {
  if (typeof window === 'undefined') {
    return;
  }
  sessionStorage.removeItem('sessionID');
}