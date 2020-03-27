function extractRole(parent) {
  return parent.roles.map(role => role.name);
}

// function authorize(...roles, resolver) {
//   return (parent, args, ctx, info) {
//     if (!ctx)
//   }
// }

module.exports = {
  Query: {
    // users
    me: async (_, args, ctx) => ctx.user,
    users: (_, {role, paginate}, {models}) => {
      return models.user.getAll(role, paginate);
    },
    user: (_, {id}, {models}) => {
      return models.user.get(id);
    },
    // child
    child: (_, {id}, {models}) => {
      return models.child.get(id);
    },
    parentChildren: (_, {parentId}, {models}) => {
      return models.child.getByParent(parentId);
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
