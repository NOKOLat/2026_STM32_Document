import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RegisterAccount } from '../../context/AuthContext';

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
            alert("アカウントが作成されました。");
            navigate('/'); 
        }
        else{

            // 失敗した場合の処理
            alert("エラーが発生しました。別のユーザー名を試すか、時間をおいて再度お試しください。");
        }
    }

    return (
    
        <div>
            <h1>アカウント作成ページ</h1>

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

                <button type="submit" style={{ color: 'black' }}>アカウント作成</button>

            </form>
        </div>
    );
}
