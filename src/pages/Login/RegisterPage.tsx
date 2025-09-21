import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RegisterAccount } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './LoginPage.css';

export default function RegisterPage() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        // フォームの既定の送信（ページリロード）を防ぐ
        e.preventDefault();

        // アカウント登録
        const register_result = await RegisterAccount({ username, password });

        if (register_result) {
            // 成功した場合の処理
            alert('アカウントが作成されました。');
            navigate('/');
        } else {
            // 失敗した場合の処理
            alert('エラーが発生しました。別のユーザー名を試すか、時間をおいて再度お試しください。');
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>アカウント登録</h1>

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

                    <button className="login-button" type="submit">アカウント作成</button>
                </form>

                {/* アカウント作成ページへのリンク */}
                <p>
                    アカウントをお持ちの方は、<Link to="/">こちら</Link>からログインできます。
                </p>
            </div>
        </div>
    );
}
