export default async (js, { queryBuilder, moment, console }) => {
  return await eval(js); // eslint-disable-line no-eval
}
