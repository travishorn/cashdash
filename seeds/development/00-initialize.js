import { seed as prodInitSeed } from "../production/00-initialize.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  await prodInitSeed(knex);
};
