export default function TailwindJitEnginePage() {
  return (
    <div className="max-w-2xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8 mt-10">
      <h1 className="text-3xl font-bold text-white mb-4">Tailwind CSS v4 JIT Engine Demo</h1>
      <p className="text-gray-400 mb-6">
        This page demonstrates the power of Tailwind's JIT (Just-In-Time) compiler.
        The classes below are generated on-the-fly.
      </p>

      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <p className="text-white font-bold">Gradient background</p>
        </div>
        <div className="p-4 border-l-4 border-green-500 bg-gray-700">
          <p className="text-green-300">Left border</p>
        </div>
        <div className="p-4 rounded-lg shadow-lg bg-gray-700">
          <p className="text-white text-shadow-lg">Text with shadow</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-700">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110">
            Hover me
          </button>
        </div>
      </div>
    </div>
  );
}
