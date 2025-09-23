import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Login } from '../../context/AuthContext';

export default function LoginPage() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
            
        // フォームの既定の送信（ページリロード）を防ぐ
        e.preventDefault();

        // ログイン認証
        const login_result = await Login({ username, password });
        
        if (login_result) {

            // 成功した場合の処理（クライアント側ルーティング）

            // ユーザー名を保存
            localStorage.setItem('username', username);

            // メインページへ遷移
            navigate('/mainpage'); 
        }
        else{

            // 失敗した場合の処理
            alert("ユーザー名またはパスワードが違います");
        }
    }

    return (
    
        <div>
            <h1>ログインページ</h1>

            <form onSubmit={handleLogin}>
                <div>

                    <label>

                        ユーザー名
                        
                        <input
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            
                            style={{ color : 'black' }}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        パスワード
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                            style={{ color : 'black' }}
                        />
                    </label>
                </div>

                <button type="submit" style={{ color: 'black' }}>ログイン</button>
            </form>

            {/* アカウント作成ページへのリンク */}
            <p>
                アカウントをお持ちでない方は、<Link to="/register">こちら</Link>から作成できます。
            </p>
        </div>
    );
}
