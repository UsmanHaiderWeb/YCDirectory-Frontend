export const createdAtFormatter = (createdAtString: string): string => {
    const date = new Date(parseInt(createdAtString, 10));
    const month = date.toLocaleString('default', { month: 'long' });
    const day = `0${date.getDate()}`.slice(-2);
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}