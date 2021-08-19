const { Model } = require('sequelize');

// sanitize an instance of sequelize Model
// return
//  - Object
const sanitizeOne = (entity) => {
  if (entity instanceof Model) return entity.get({ plain: true });
  throw new Error('Expect an instance of Model');
}

// sanitize entities from sequelize Model
// return
//  - Object
const sanitize = (entities) => {
  if (entities instanceof Model) return sanitizeOne(entities);
  if (entities instanceof Array) {
    return entities.map(entity => sanitizeOne(entity));
  }
  throw new Error('Expect the argument to be an array or instance of Model')
}

module.exports = sanitize;