export function useLogin() {
  function SaveOnCokie(token: string, refreshToken: string) {
    cookieStore.set('token', token);
    cookieStore.set('refresh_token', refreshToken);
  }

  function GetFromCookie() {
    const token = cookieStore.get('token');
    const refreshToken = cookieStore.get('refresh_token');
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