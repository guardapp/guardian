function extractRole(parent) {
  return parent.roles.map(role => role.name);
}

module.exports = {
  Query: {
    me: async (_, args, ctx) => ctx.user,
    users: async (parent, {role, paginate}, ctx) => {
      return await ctx.models.user.getAll(role, paginate) || [];
    }
  },
  User: {
    __resolveType: (user) => {
      if (user.roles.some(role => role.name === 'ADMIN')) {
        return 'Admin';
      }
      if (user.roles.some(role => role.name === 'PRINCIPAL')) {
        return 'Principal';
      }
      if (user.roles.some(role => role.name === 'TEACHER')) {
        return 'Teacher';
      }
      return 'Parent';
    }
  },
  Admin: {
    roles: extractRole
  },
  Principal: {
    roles: extractRole
  },
  Teacher: {
    roles: extractRole
  },
  Parent: {
    roles: extractRole,
    children: async (parent, args, {models}) => {
      return await models.child.loader.load(parent.id);
    }
  }
};
