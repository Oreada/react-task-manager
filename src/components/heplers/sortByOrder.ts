export const sortByOrder = <Type extends { order: number }>(array: Type[]): Type[] => {
  return [...array].sort((a, b) => a.order - b.order);
};
