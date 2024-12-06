export const unique = <T>(a: Array<T>, idAccessor: (item: T) => string) => {
  var seen = {} as { [key: string]: boolean };
  return a.filter(function (item) {
    const id = idAccessor(item);
    return seen.hasOwnProperty(id) ? false : (seen[id] = true);
  });
};
