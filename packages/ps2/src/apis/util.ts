export const providesList = <
  R extends { [K in P]: string | number }[],
  T extends string,
  P extends string,
>(
  resultsWithIds: R | undefined,
  tagType: T,
  idKey = 'id' as P,
) => {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map((r) => ({ type: tagType, id: r[idKey] })),
      ]
    : [{ type: tagType, id: 'LIST' }];
};
