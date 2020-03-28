const {adminOnly, minPrincipal} = require('@guardapp/server');

function toPagination({offset, limit}, {rows, count}) {
  return {
    data: rows,
    total: count,
    hasMore: Math.floor((count/limit) - ((offset+limit)/limit)) > 0
  };
}

function resolveUserRole(user) {
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
    class: (_, {id}, {models}) => {
      return models.class.get(id);
    },
    // kindergarten
    kindergartens: adminOnly(async (_, {paginate}, {models}) => {
      return toPagination(paginate, await models.kindergarten.getAll(paginate));
    }),
    kindergarten: (_, {id}, {models}) => {
      return models.kindergarten.get(id);
    },
  },
  User: {
    __resolveType: resolveUserRole
  },
  Parent: {
    children: async (parent, _, {models}) => {
      return await models.child.loaderByParent.load(parent.id);
    }
  },
  Child: {
    parent: (child) => {
      return child.getParent();
    },
    class: (child) => {
      return child.getClass();
    }
  },
  Class: {
    children: async (parent, _, {models}) => {
      return await models.child.loaderByClass.load(parent.id);
    },
    teacher: async (parent, _, {models}) => {
      return await models.user.teacherLoader.load(parent.id);
    },
    kindergarten: async (parent, _, {models}) => {
      return await models.kindergarten.kindergartenLoader.load(parent.id);
    },
  },
  Kindergarten: {
    classes: async (parent, _, {models}) => {
      return await models.class.classLoader.load(parent.id);
    },
    principal: async (parent, _, {models}) => {
      return await models.user.principalLoader.load(parent.id);
    },
  },
  AddUserResult: {
    __resolveType: result => {
      if (result.message) return 'EmailExists';
      return resolveUserRole(result);
    }
  },
  Mutation: {
    addUser: adminOnly((_, {user}, {models}) => {
      return models.user.addUser(user);
    }),
    deleteUser: adminOnly((_, {id}, {models}) => {
      return models.user.delete(id);
    }),
  }
};
