'use client';

import { useState } from 'react';
import { Resizable } from 'react-resizable';

export default function ContainerQueriesPage() {
  const [width, setWidth] = useState(600);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-4 text-center">컨테이너 쿼리 데모</h1>
        <p className="text-gray-400 mb-8 text-center">
          오른쪽 하단의 핸들을 드래그하여 컨테이너의 크기를 조절해보세요. <br/>
          컨테이너의 너비에 따라 카드 레이아웃이 어떻게 변하는지 확인하세요.
        </p>

        <Resizable 
          width={width} 
          height={200} // Initial height, not super important
          onResize={(event, {size}) => setWidth(size.width)} 
          minConstraints={[320, 200]} 
          maxConstraints={[1000, 200]}
          className="@container mx-auto border-2 border-dashed border-gray-600 rounded-lg p-4 bg-gray-800/20"
        >
            <div style={{ width: `${width}px` }}>
                {/* The card that responds to the container's size */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden @lg:flex">
                    {/* Image section */}
                    <div className="@lg:w-1/3">
                        <img 
                            src="https://images.unsplash.com/photo-1682687220247-9f786e34d472?q=80&w=800&auto=format&fit=crop" 
                            alt="Desert landscape" 
                            className="w-full h-48 @lg:h-full object-cover"
                        />
                    </div>

                    {/* Content section */}
                    <div className="p-6 @lg:w-2/3">
                        <h2 className="text-2xl font-bold mb-2">컨테이너에 반응하는 카드</h2>
                        <p className="text-gray-400 mb-4">
                            이 카드의 레이아웃은 뷰포트가 아닌 부모 컨테이너의 너비에 따라 변경됩니다.
                        </p>
                        <div className="p-4 bg-gray-700 rounded-lg">
                            <p className="font-mono">컨테이너 너비가 <span className="text-cyan-400">32rem (512px)</span> 이상이면 수평으로 바뀝니다.</p>
                            <p className="font-mono">현재 클래스: <span className="text-yellow-400">`@lg:flex`</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </Resizable>

        <div className="mt-8 p-4 rounded-lg bg-gray-700 text-center w-full max-w-5xl">
            <p className="text-lg">
            이 데모는 `@tailwindcss/container-queries` 플러그인과 `react-resizable`을 사용합니다.
            </p>
            <p className="text-sm text-gray-500 mt-2">
            `@container` 클래스를 부모 요소에 추가하고 `@lg` 등의 변형을 자식 요소에 사용하여 컨테이너 크기에 따라 스타일을 지정할 수 있습니다.
            </p>
        </div>

      </div>
    </div>
  );
}
