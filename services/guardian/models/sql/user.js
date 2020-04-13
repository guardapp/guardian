const crypto = require('crypto');
const {Model, Op, DataLoader} = require('@guardapp/server');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.role, {through: 'user_roles'});
      this.hasMany(models.child, {as: 'Children', foreignKey: 'parent_id'});
      this.hasOne(models.kindergarten, {foreignKey: 'principal_id'});
      this.hasOne(models.class, {foreignKey: 'teacher_id'});
    }

    static get teacherLoader() {
      return teacherLoader;
    }

    static get principalLoader() {
      return principalLoader;
    }

    static get(id) {
      return this.findByPk(id, {
        include: [sequelize.models.role],
      });
    }

    static getAll(role, paginate) {
      const where = role ? {name: role} : null;
      return this.findAndCountAll({
        include: [
          {
            model: sequelize.models.role,
            where,
          },
        ],
        limit: paginate.limit,
        offset: paginate.offset,
      });
    }

    static async addUser({email, roles}) {
      const [user, notFound] = await this.findOrBuild({
        where: {email},
        defaults: {
          password: '1234',
        },
      });
      if (!notFound) {
        return {message: 'user is already exists'};
      }
      const _roles = await sequelize.models.role.findAll({
        where: {name: {[Op.in]: roles}},
      });
      await user.save();
      await user.setRoles(_roles);

      user.roles = _roles;
      return user;
    }

    static async delete(id) {
      const rows = await this.destroy({where: {id}});
      return rows === 1;
    }
  }

  const teacherLoader = new DataLoader(async (classIds) => {
    const teachers = await User.findAll({
      include: [
        {
          model: sequelize.models.class,
          where: {id: {[Op.in]: classIds}},
        },
        {
          model: sequelize.models.role,
          where: {name: 'TEACHER'},
        },
      ],
    });
    return classIds.map((classId) => teachers.find((teacher) => teacher.class.id == classId));
  });

  const principalLoader = new DataLoader(async (kindergartenIds) => {
    const principals = await User.findAll({
      include: [
        {
          model: sequelize.models.kindergarten,
          where: {id: {[Op.in]: kindergartenIds}},
        },
        {
          model: sequelize.models.role,
          where: {name: 'PRINCIPAL'},
        },
      ],
    });
    return kindergartenIds.map((id) => principals.find((p) => p.kindergarten.id == id));
  });

  User.init(
      {
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNulls: false,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNulls: false,
          set(value) {
            // create salt
            const buf = crypto.randomBytes(16);
            const salt = buf.toString('hex');
            this.setDataValue('salt', salt);
            // hash password with salt
            const hash = crypto.createHash('sha256');
            hash.update(salt + value);
            this.setDataValue('password', hash.digest('hex'));
          },
        },
        salt: {
          type: DataTypes.STRING,
          allowNulls: false,
          set(value) {
            throw new Error('readonly value');
          },
        },
      },
      {
        sequelize,
        modelName: 'user',
        underscored: true,
      }
  );

  return User;
};
