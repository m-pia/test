'use server';

export async function updateName(previousState: any, formData: FormData): Promise<{ message: string; timestamp: number }> {
  const name = formData.get('name') as string;

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (name.trim().length < 3) {
    return { message: '이름은 3글자 이상이어야 합니다.', timestamp: Date.now() };
  }

  return { message: `이름이 성공적으로 업데이트되었습니다: ${name}`, timestamp: Date.now() };
}
