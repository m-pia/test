'use client';

import { useState } from 'react';

export default function ArbitraryValuesPage() {
  const [width, setWidth] = useState(256);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">임의의 값 사용하기</h1>
        <p className="text-gray-400 mb-8 text-center">
          슬라이더를 조작하여 아래 요소의 너비를 실시간으로 변경해보세요. <br/>
          Tailwind의 JIT 엔진이 `w-[{width}px]` 클래스를 동적으로 생성합니다.
        </p>

        <div className="space-y-6">
          {/* The element that will be resized */}
          <div 
            className={`bg-gradient-to-r from-blue-500 to-purple-600 h-32 rounded-lg transition-all duration-200 ease-out`}
            style={{ width: `${width}px` }} // Direct style for smooth transition
          >
             <div className="p-4 text-lg font-bold">너비: {width}px</div>
          </div>

          {/* The slider control */}
          <div>
            <input 
              type="range"
              min="100"
              max="600"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-gray-700 text-center">
          <p className="text-lg">
            적용된 클래스: <code className="bg-gray-900 px-2 py-1 rounded">{`w-[${width}px]`}</code> (실제로는 style로 적용됨)
          </p>
          <p className="text-sm text-gray-500 mt-2">
            참고: 이 데모에서는 부드러운 전환 효과를 위해 style 속성을 직접 사용했지만, JIT 엔진은 이와 같은 임의의 값 클래스를 완벽하게 지원합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
