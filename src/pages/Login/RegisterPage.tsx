import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RegisterAccount } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './LoginPage.css';

export default function RegisterPage() {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [discordId, setDiscordId] = useState('');
    const [error, setError] = useState('');

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        // フォームの既定の送信（ページリロード）を防ぐ
        e.preventDefault();
        setError('');

        if (!discordId) {
            setError('Discord ID は必須です');
            return;
        }

        // アカウント登録
        const register_result = await RegisterAccount({
            username,
            password,
            discord_id: discordId
        });

        if (register_result) {
            // 成功した場合の処理
            alert('アカウントが作成されました。');
            navigate('/');
        } else {
            // 失敗した場合の処理
            setError('登録に失敗しました。Discord IDが既に使用されていないか確認してください。');
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>アカウント登録</h1>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <form className="login-form" onSubmit={handleRegister}>
                    <div className="login-field">
                        <label>
                            ユーザー名
                            <input
                                className="login-input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
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
                                required
                            />
                        </label>
                    </div>

                    <div className="login-field">
                        <label>
                            Discord ID（必須）
                            <input
                                className="login-input"
                                type="text"
                                placeholder="例: user#1234"
                                value={discordId}
                                onChange={(e) => setDiscordId(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <button className="login-button" type="submit">アカウント作成</button>
                </form>

                {/* ログインページへのリンク */}
                <p>
                    アカウントをお持ちの方は、<Link to="/">こちら</Link>からログインできます。
                </p>
            </div>
        </div>
    );
}
