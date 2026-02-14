/* eslint-disable react-refresh/only-export-components */
// AuthContext.tsx
// JWT認証機能の実装
// 認証エンドポイント: https://nokolatauth.s241507v.workers.dev/

const AUTH_API_URL = "https://nokolatauth.s241507v.workers.dev";

// JWT トークンをデコードする関数
function decodeJWT(token: string): {
  user_id: string | number;
  username: string;
  iat: number;
  exp: number;
} {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const payload = JSON.parse(
    atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))
  );

  return payload;
}

// ユーザーログイン
export async function Login({
  username,
  password
}: {
  username: string;
  password: string;
}): Promise<boolean> {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      console.error('Login failed:', response.status);
      return false;
    }

    const data = await response.json();

    // トークンをデコードして user_id を取得
    const payload = decodeJWT(data.access_token);

    // localStorage に保存
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    localStorage.setItem('userId', String(payload.user_id));
    localStorage.setItem('username', payload.username);
    localStorage.setItem('isLoggedIn', 'true');

    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
}

// ユーザー登録
export async function RegisterAccount({
  username,
  password,
  discord_id
}: {
  username: string;
  password: string;
  discord_id: string;
}): Promise<boolean> {
  try {
    const response = await fetch(`${AUTH_API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        discord_id
      })
    });

    if (response.status === 201) {
      return true;
    } else if (response.status === 409) {
      console.error('User or Discord ID already exists');
      return false;
    } else {
      const error = await response.json();
      console.error('Registration failed:', error);
      return false;
    }
  } catch (error) {
    console.error('Registration failed:', error);
    return false;
  }
}

// トークン更新
export async function RefreshToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    console.warn('No refresh token available');
    return false;
  }

  try {
    const response = await fetch(`${AUTH_API_URL}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (!response.ok) {
      // refresh_token も期限切れ → ログイン画面へ
      if (response.status === 401) {
        console.warn('Refresh token expired. Redirecting to login.');
        localStorage.clear();
        window.location.href = '/';
      }
      return false;
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.access_token);
    return true;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
}

// ログアウト
export async function Logout(): Promise<void> {
  const refreshToken = localStorage.getItem('refreshToken');

  // サーバーで refresh_token を無効化
  if (refreshToken) {
    try {
      await fetch(`${AUTH_API_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
      });
    } catch (error) {
      console.error('Server logout error:', error);
      // ローカルストレージはクリアする
    }
  }

  // ローカルストレージをクリア
  localStorage.clear();
  window.location.href = '/';
}
