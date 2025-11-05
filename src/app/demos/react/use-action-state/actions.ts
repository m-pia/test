'use server';

export async function addToCart(prevState: unknown, formData: FormData): Promise<{message: string}> {
    const itemID = formData.get('itemID');
    console.log('prevState', prevState);
    console.log('itemID', itemID);

    if (itemID === '1') {
        return { message: '🛒 장바구니에 사과를 추가했습니다.' };
    } 
    return { message: '🛒 장바구니에 다른 상품을 추가했습니다.' };
}