import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(event: React.FormEvent) {

        event.preventDefault();
    }

    function handleGuestLogin() {


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
            
                {/* ゲストログインの仮実装 */}
                <div style={{ marginTop: 12 }}>
                    <button
                        type="button"
                        onClick={handleGuestLogin}
                        style={{ color: 'black' }}
                    >
                        ゲストログイン
                    </button>
                </div>
        </div>
    );


}
