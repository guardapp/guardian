const {adminOnly, minPrincipal} = require('@guardapp/server');

function toPagination({offset, limit}, {rows, count}) {
  return {
    data: rows,
    total: count,
    hasMore: Math.floor((count/limit) - ((offset+limit)/limit)) > 0
  };
}

module.exports = {
  Query: {
    // users
    me: async (_, args, ctx) => ctx.user,
    users: adminOnly(async (_, {role, paginate}, {models}) => {
      return toPagination(paginate, await models.user.getAll(role, paginate));
    }),
    user: (_, {id}, {models}) => {
      return models.user.get(id);
    },
    // child
    child: (_, {id}, {models}) => {
      return models.child.get(id);
    },
    // classes
    classes: minPrincipal(async (_, {paginate}, {models}) => {
      return toPagination(paginate, await models.class.getAll(paginate));
    }),
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
  Parent: {
    children: async (parent, args, {models}) => {
      return await models.child.loader.load(parent.id);
    }
  },
  Child: {
    parent: (child) => {
      return child.getParent();
    },
    class: (child) => {
      return child.getClass();
    }
  }
};
