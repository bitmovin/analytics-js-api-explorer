export default async (js, { queryBuilder, moment, console }) => {
  await eval(js);
}
