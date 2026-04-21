export function useLogin() {
  function SaveOnCokie(token: string, refreshToken: string) {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refreshToken);
    } catch {
      // ignore
    }

    const anyWindow = window as any;
    if (anyWindow.cookieStore?.set) {
      anyWindow.cookieStore.set('token', token);
      anyWindow.cookieStore.set('refresh_token', refreshToken);
    }
  }

  function GetFromCookie() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');
    return { token, refreshToken };
  }

  function SaveSession(sessionID: string){
    sessionStorage.setItem('sessionID', sessionID);
  }

  function SaveID(ID: number){
    sessionStorage.setItem('ID', ID.toString());
  }


  return {
    SaveOnCokie,
    GetFromCookie,
    SaveSession,
    SaveID
  }
}