import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-gray-900 text-center py-20">
          <h2 className="text-5xl font-bold mb-4">새로운 웹 기술을 탐험해보세요</h2>
          <p className="text-xl mb-8">Next.js 15, React 19, Tailwind CSS v4를 사용하여 최신 웹 개발을 경험해보세요.</p>
          <Link href="#features" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full">더 알아보기</Link>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-800">
          <div className="container mx-auto px-6">
            <h3 className="text-4xl font-bold text-center mb-12">주요 기능</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold mb-4">TensorFlow.js</h4>
                <p>클라이언트 측에서 머신러닝 모델을 실행하여 브라우저의 성능을 확인해보세요.</p>
                <Link href="/demos/tensorflow" className="mt-4 inline-block text-blue-400 hover:text-blue-500">데모 보기 &rarr;</Link>
              </div>
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold mb-4">ROS 데모</h4>
                <p>roslibjs를 사용하여 ROS 브릿지와 실시간으로 통신하는 프론트엔드 애플리케이션을 경험해보세요.</p>
                <Link href="/demos/ros" className="mt-4 inline-block text-blue-400 hover:text-blue-500">데모 보기 &rarr;</Link>
              </div>
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold mb-4">React 19</h4>
                <p>새로운 동시성 기능과 향상된 성능을 제공하는 최신 React를 사용해보세요.</p>
                <Link href="/demos/react" className="mt-4 inline-block text-blue-400 hover:text-blue-500">데모 보기 &rarr;</Link>
              </div>
              <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold mb-4">Tailwind CSS v4</h4>
                <p>차세대 CSS 프레임워크를 사용하여 더 빠르고 효율적으로 UI를 구축해보세요.</p>
                <Link href="/demos/tailwind" className="mt-4 inline-block text-blue-400 hover:text-blue-500">데모 보기 &rarr;</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
