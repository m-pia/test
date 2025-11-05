'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitForm } from './actions';

// A custom SubmitButton component that uses useFormStatus
function SubmitButton() {
  const { pending, data } = useFormStatus();
  const email = data?.get('email') as string;

  return (
    <button 
      type="submit" 
      disabled={pending} 
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
    >
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {email ? `${email}님 구독 처리 중...` : '처리 중...'}
        </>
      ) : (
        '뉴스레터 구독'
      )}
    </button>
  );
}

const initialState: { message: string | null } = {
  message: null,
};

export default function UseFormStatusPage() {
  const [state, formAction] = useFormState(submitForm, initialState);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">useFormStatus 데모</h1>
        <p className="text-gray-400 mb-8 text-center">폼 제출 시 버튼의 상태가 어떻게 변하는지 확인해보세요.</p>
        
        <form action={formAction}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium mb-2">이메일</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="your.email@example.com"
              className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required 
            />
          </div>
          <SubmitButton />
        </form>

        {state?.message && (
          <div className="mt-6 p-4 rounded-lg bg-gray-700 animate-fade-in">
            <p className="text-lg text-green-400 text-center">{state.message}</p>
          </div>
        )}

        <p className="text-sm text-gray-500 mt-6 text-center">
          폼을 제출하면 1.5초의 딜레이 후 처리됩니다. <br/> 이 시간 동안 `useFormStatus`의 `pending` 상태를 관찰할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
