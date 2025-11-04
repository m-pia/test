import Link from 'next/link';

const demos = {
  tensorflow: [
    { slug: 'simple-model', title: '간단한 모델 실행', description: '브라우저에서 간단한 TensorFlow.js 모델을 실행합니다.' },
    { slug: 'image-classification', title: '이미지 분류', description: 'MobileNet 모델을 사용하여 이미지를 분석하고 분류합니다.' },
    { slug: 'object-detection', title: '객체 탐지', description: 'COCO-SSD 모델을 사용하여 이미지나 영상에서 객체를 탐지합니다.' },
    { slug: 'face-detection', title: '안면 탐지', description: 'FaceMesh 모델을 활용하여 실시간으로 얼굴의 주요 특징점을 감지합니다.' },
    { slug: 'question-and-answer', title: '질의응답', description: 'MobileBERT 모델을 기반으로 주어진 문맥과 질문에 대한 답을 찾습니다.' },
  ],
  ros: [
    { slug: 'topic-viewer', title: '토픽 뷰어', description: 'ROS 토픽을 실시간으로 확인합니다.' },
    { slug: 'service-caller', title: '서비스 콜러', description: 'ROS 서비스를 호출하고 응답을 확인합니다.' },
    { slug: 'parameter-viewer', title: '파라미터 뷰어', description: 'ROS 파라미터를 확인하고 수정합니다.' },
    { slug: 'action-caller', title: '액션 콜러', description: 'ROS 액션을 호출하고 피드백과 결과를 확인합니다.' },
    { slug: 'dynamic-reconfiguration', title: '동적 재설정', description: 'ROS 노드의 파라미터를 동적으로 재설정합니다.' },
    { slug: '2d-view', title: '2D 뷰', description: 'ros2djs를 사용하여 2D 맵과 로봇의 위치를 시각화합니다.' },
    { slug: '3d-view', title: '3D 뷰', description: 'ros3djs를 사용하여 3D 모델과 포인트 클라우드를 시각화합니다.' },
  ],
  react: [
    { slug: 'use-optimistic', title: 'useOptimistic 훅', description: 'React 19의 useOptimistic 훅을 사용한 예제입니다.' },
    { slug: 'use-action-state', title: 'useActionState 훅', description: '서버 액션의 상태를 관리하는 useActionState 훅 예제입니다.' },
    { slug: 'use-form-status', title: 'useFormStatus 훅', description: '폼 제출 상태를 추적하는 useFormStatus 훅 예제입니다.' },
    { slug: 'use-api', title: 'use API', description: '프로미스와 컨텍스트를 쉽게 사용하는 `use` API 예제입니다.' },
  ],
  tailwind: [
    { slug: 'jit-engine', title: 'JIT 엔진', description: 'Tailwind CSS v4의 새로운 JIT 엔진을 사용한 예제입니다.' },
    { slug: 'arbitrary-values', title: '임의의 값 사용하기', description: 'JIT 엔진을 사용하여 동적으로 클래스를 생성합니다.' },
    { slug: 'container-queries', title: '컨테이너 쿼리', description: '컨테이너 크기에 따라 레이아웃을 변경합니다.' },
    { slug: 'advanced-animations', title: '고급 애니메이션', description: '커스텀 키프레임과 애니메이션을 사용합니다.' },
  ],
};

export default async function DemoCategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.toLowerCase();
  const demoList = demos[category as keyof typeof demos] || [];
  const categoryTitle = Object.keys(demos).find(key => key === category) || params.category;


  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white capitalize">{categoryTitle} Demos</h1>
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
