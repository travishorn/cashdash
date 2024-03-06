export const production = {
  client: "better-sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./production.sqlite3",
  },
  seeds: {
    directory: "./seeds/production",
  },
};

export const development = {
  ...production,
  connection: {
    filename: "./development.sqlite3",
  },
  seeds: {
    directory: "./seeds/development",
  },
};
