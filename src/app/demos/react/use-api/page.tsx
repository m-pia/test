import { Suspense } from 'react';
import { Message, ThemeProviderComponent } from './components';

// --- Promise Fetching with use() ---
export function fetchMessage(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("🚀 서버로부터 받은 메시지입니다!"), 1500));
}

export default function UseApiPage() {
  const messagePromise = fetchMessage();

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">`use` API 데모</h1>
        <p className="text-gray-400 mb-10">React 19의 새로운 `use` API를 사용하여 프로미스와 컨텍스트를 간결하게 처리하는 방법을 보여줍니다.</p>

        {/* Section 1: Using use() with Promises and Suspense */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold mb-4">1. `use`로 프로미스 처리하기</h2>
          <p className="text-gray-400 mb-6">아래 컴포넌트는 데이터를 가져오는 프로미스를 `use` API로 처리합니다. 데이터가 로딩되는 동안 `Suspense`가 로딩 UI를 보여줍니다.</p>
          <Suspense 
            fallback={
              <div className="flex items-center justify-center p-4 bg-gray-700 rounded-lg">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-xl">메시지를 불러오는 중...</span>
              </div>
            }
          >
            <Message message={messagePromise} />
          </Suspense>
        </div>

        {/* Section 2: Using use() with Context */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">2. `use`로 컨텍스트 사용하기</h2>
          <p className="text-gray-400 mb-6">`use` API는 `useContext`와 달리 조건문이나 반복문 안에서도 호출할 수 있어 더 유연합니다. 아래 예제에서는 테마가 &apos;dark&apos;일 때만 언어 컨텍스트를 사용합니다.</p>
          <ThemeProviderComponent />
        </div>
      </div>
    </div>
  );
}
