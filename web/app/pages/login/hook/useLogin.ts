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

  function RememberMe({email, password}: {email: string, password: string}) {
    localStorage.setItem('rememberMe', JSON.stringify({ email, password }));
  }

  return {
    SaveOnCokie,
    GetFromCookie,
    RememberMe
  }
}