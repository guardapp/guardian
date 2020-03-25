module.exports = {
  Query: {
    me: async (_, args, ctx) => ctx.user
  }
};
