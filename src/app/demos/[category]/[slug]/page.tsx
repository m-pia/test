import Link from 'next/link';
import TensorFlowSimpleModelPage from '@/app/demos/tensorflow/simple-model/page';
import RosTopicViewerPage from '@/app/demos/ros/topic-viewer/page';
import UseOptimisticPage from '@/app/demos/react/use-optimistic/page';
import TailwindJitEnginePage from '@/app/demos/tailwind/jit-engine/page';

export default function DemoPage({ params }: { params: { category: string, slug: string } }) {
  const { category, slug } = params;

  const DemoContent = () => {
    if (category === 'tensorflow' && slug === 'simple-model') {
      return <TensorFlowSimpleModelPage />;
    } else if (category === 'ros' && slug === 'topic-viewer') {
      return <RosTopicViewerPage />;
    } else if (category === 'react' && slug === 'use-optimistic') {
      return <UseOptimisticPage />;
    } else if (category === 'tailwind' && slug === 'jit-engine') {
      return <TailwindJitEnginePage />;
    } else {
      return <p>Demo not found.</p>;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href={`/demos/${category}`} className="text-blue-400 hover:text-blue-500">
            &larr; Back to {category} demos
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12">
        <DemoContent />
      </main>
    </div>
  );
}
