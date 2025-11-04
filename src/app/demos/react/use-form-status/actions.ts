'use server';

export async function submitForm(formData: FormData): Promise<{ message: string }> {
  const email = formData.get('email') as string;

  // Simulate a longer network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  console.log("Form submitted with email:", email);

  return { message: `구독해 주셔서 감사합니다, ${email}님!` };
}
