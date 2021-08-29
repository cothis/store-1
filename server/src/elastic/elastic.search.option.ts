export const elasticOption = (keyword: string) => {
  return {
    index: 'store',
    body: {
      query: {
        bool: {
          should: [
            {
              match: {
                title: keyword,
              },
            },
            {
              fuzzy: {
                title: {
                  value: keyword,
                  fuzziness: 1,
                },
              },
            },
          ],
        },
      },
    },
  };
};
