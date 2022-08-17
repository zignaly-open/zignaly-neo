function Resolver(path, options) {
  return options.defaultResolver(path, {
    ...options,
    packageFilter: (pkg) => {
      if (pkg.name === 'nanoid') {
        // eslint-disable-next-line no-param-reassign
        delete pkg.exports;
        // eslint-disable-next-line no-param-reassign
        delete pkg.module;
      }
      return pkg;
    },
  });
}

module.exports = Resolver;
