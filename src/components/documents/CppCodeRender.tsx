/* C++コードをシンタックスハイライト付きで表示するコンポーネント */

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CppCodeRender({ code }: {code: string }) {
    

    return (
        <SyntaxHighlighter
            language="cpp"
            style={vscDarkPlus}
            customStyle={{
                background: '#1e1e1e',
                borderRadius: '8px',
                padding: '12px'
            }}
            codeTagProps={{ style: { fontSize: 16 } }}
        >
            {code}
        </SyntaxHighlighter>
    );
}

