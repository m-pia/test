export default function AdvancedAnimationsPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">고급 애니메이션 & 그라디언트</h1>
        <p className="text-gray-400 mb-10 text-center">
          `tailwind.config.ts`를 확장하여 커스텀 애니메이션과 그라디언트를 추가한 예제입니다.
        </p>

        {/* Section 1: Custom Background Pan Animation */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold mb-6">1. 커스텀 배경 팬 애니메이션</h2>
          <p className="text-gray-400 mb-6">
            `keyframes`와 `animation`을 `tailwind.config.ts`에 추가하여 `animate-background-pan` 유틸리티를 만들었습니다. <br/>
            아래 버튼에 마우스를 올리면 배경 그라디언트가 움직이는 것을 확인하세요.
          </p>
          <div className="flex justify-center">
            <button 
              className="
                px-8 py-4 text-xl font-bold text-white rounded-lg 
                bg-[length:200%_auto] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                hover:animate-background-pan
                transition-all duration-300
              "
            >
              마우스를 올려보세요
            </button>
          </div>
        </div>

        {/* Section 2: Custom Shimmer Gradient and Animation */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">2. 커스텀 쉬머(Shimmer) 효과</h2>
          <p className="text-gray-400 mb-6">
            커스텀 그라디언트(`gradient-shimmer`)와 애니메이션(`animate-shimmer`)을 조합하여 스켈레톤 로딩과 같은 쉬머 효과를 구현할 수 있습니다.
          </p>
          <div className="space-y-4">
            <p className="text-lg">아래는 쉬머 효과가 적용된 스켈레톤 UI 예시입니다.</p>
            <div className="w-full h-32 p-4 rounded-lg bg-gray-700 space-y-3">
              <div className="w-3/4 h-6 rounded bg-gray-600 bg-gradient-shimmer bg-[length:400%_100%] animate-shimmer"></div>
              <div className="w-1/2 h-6 rounded bg-gray-600 bg-gradient-shimmer bg-[length:400%_100%] animate-shimmer"></div>
              <div className="w-5/6 h-6 rounded bg-gray-600 bg-gradient-shimmer bg-[length:400%_100%] animate-shimmer"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
