'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateName } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
    >
      {pending ? '처리 중...' : '이름 업데이트'}
    </button>
  );
}

export default function UseActionStatePage() {
  const [state, formAction] = useActionState(updateName, { message: '', timestamp: 0 });

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">useActionState 데모</h1>
        <p className="text-gray-400 mb-8">이름을 입력하고 제출하면 서버 액션을 통해 상태가 업데이트됩니다.</p>
        
        <form action={formAction}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium mb-2">이름</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>
          <SubmitButton />
        </form>

        {state.message && (
          <div 
            key={state.timestamp} // Re-trigger animation on new message
            className="mt-8 p-4 rounded-lg bg-gray-700 animate-fade-in"
          >
            <p className={`text-lg ${state.message.includes('성공') ? 'text-green-400' : 'text-red-400'}`}>
              {state.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
