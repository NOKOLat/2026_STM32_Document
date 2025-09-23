import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Login } from '../../context/AuthContext';
import { GetProgress } from '../../context/ManageProgress';

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

            // 進捗を取得
            await GetProgress();

            // メインページへ遷移
            navigate('/mainpage'); 
        }
        else{

            // 失敗した場合の処理
            alert("ユーザー名またはパスワードが違います");
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>ログイン</h1>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-field">
                        <label>
                            ユーザー名
                            <input
                                className="login-input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="login-field">
                        <label>
                            パスワード
                            <input
                                className="login-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>

                    <button className="login-button" type="submit">ログイン</button>
                </form>

                {/* アカウント作成ページへのリンク */}
                <p>
                    アカウントをお持ちでない方は、<Link to="/register">こちら</Link>から作成できます。
                </p>
            </div>
        </div>
    );
}
