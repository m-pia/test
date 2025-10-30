import Link from 'next/link';

const demos = {
  tensorflow: [
    { slug: 'simple-model', title: '간단한 모델 실행', description: '브라우저에서 간단한 TensorFlow.js 모델을 실행합니다.' },
  ],
  ros: [
    { slug: 'topic-viewer', title: '토픽 뷰어', description: 'ROS 토픽을 실시간으로 확인합니다.' },
  ],
  react: [
    { slug: 'use-optimistic', title: 'useOptimistic 훅', description: 'React 19의 useOptimistic 훅을 사용한 예제입니다.' },
  ],
  tailwind: [
    { slug: 'jit-engine', title: 'JIT 엔진', description: 'Tailwind CSS v4의 새로운 JIT 엔진을 사용한 예제입니다.' },
  ],
};

export default async function DemoCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const demoList = demos[category as keyof typeof demos] || [];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">{category} Demos</h1>
      </div>
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoList.map((demo) => (
            <Link key={demo.slug} href={`/demos/${category}/${demo.slug}`}>
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-full hover:bg-gray-700 transition-colors duration-300">
                <h2 className="text-xl font-bold text-white mb-2">{demo.title}</h2>
                <p className="text-gray-400">{demo.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
