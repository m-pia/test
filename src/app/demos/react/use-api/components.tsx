'use client';

import { createContext, use, useState } from 'react';

interface MessageData {
    message: Promise<string>;
}

export function Message({ message: messagePromise }: MessageData) {
  const message = use(messagePromise);
  return <p className="text-xl text-green-400 p-4 bg-gray-700 rounded-lg">{message}</p>;
}


// --- Context with use() ---

// 1. Create contexts
const ThemeContext = createContext('light');
const LanguageContext = createContext('en');

// 2. A component that uses the context
function Greeting() {
  // use() can be called conditionally, unlike useContext()
  const theme = use(ThemeContext);
  
  if (theme === 'dark') {
    const language = use(LanguageContext);
    const greeting = language === 'ko' ? '안녕하세요! 어두운 테마입니다.' : 'Hello! This is the dark theme.';
    return <p className="text-xl p-4 bg-purple-800 rounded-lg">{greeting}</p>;
  }
  
  return <p className="text-xl p-4 bg-blue-200 text-black rounded-lg">밝은 테마입니다. (언어 컨텍스트는 사용되지 않음)</p>;
}

// 3. A component that provides and switches the context
export function ThemeProviderComponent() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  return (
    <ThemeContext.Provider value={theme}>
      <LanguageContext.Provider value={language}>
        <div className="space-y-4">
            <div className="flex gap-4 items-center">
                <h3 className="text-lg font-semibold">테마 또는 언어 변경:</h3>
                <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="bg-gray-600 px-4 py-2 rounded-lg">테마 전환</button>
                <button onClick={() => setLanguage(l => l === 'en' ? 'ko' : 'en')} className="bg-gray-600 px-4 py-2 rounded-lg">언어 전환 (현재: {language})</button>
            </div>
            <Greeting />
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
