import {AuthenticationError, ForbiddenError, IFieldResolver} from 'apollo-server-express';
import {Model} from '@guardapp/sql';

enum RoleWeight {
    'ADMIN' = 4,
    'PRINCIPAL' = 3,
    'TEACHER'= 2,
    'PARENT'= 1
};

interface RequestContext {
    user: { id: string, email: string, roles: string[] },
    models: Record<string, Model>
}

export function authorize<TSource, TArgs = Record<string, any>>(minRole: RoleWeight, resolver: IFieldResolver<TSource, RequestContext, TArgs>) {
  return (parent: TSource, args: TArgs, ctx: RequestContext, info) => {
    if (!ctx.user) throw new AuthenticationError('user is not logged in');
    if (!ctx.user.roles) throw new AuthenticationError('no roles for user');
    if (ctx.user.roles.every(role => RoleWeight[role] < RoleWeight[minRole])) {
      throw new ForbiddenError('not enought permissions');
    }

    return resolver(parent, args, ctx, info);
  };
}

export function adminOnly<TSource, TArgs = Record<string, any>>(resolver: IFieldResolver<TSource, RequestContext, TArgs>) {
  return authorize(RoleWeight.ADMIN, resolver);
}

export function minPrincipal<TSource, TArgs = Record<string, any>>(resolver: IFieldResolver<TSource, RequestContext, TArgs>) {
  return authorize(RoleWeight.PRINCIPAL, resolver);
}

export function minTeacher<TSource, TArgs = Record<string, any>>(resolver: IFieldResolver<TSource, RequestContext, TArgs>) {
  return authorize(RoleWeight.TEACHER, resolver);
}
