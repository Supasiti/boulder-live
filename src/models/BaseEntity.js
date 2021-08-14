class BaseEntity {
  constructor (model){
    this.model = model;
  }

  getModel () {
    return this.model;
  };
  
  // Drop the table represented by this Model
  drop (options) {
    return this.model.drop(options)
  }

  // -------------
  // Create
  create (values, options){
    return this.model.create(values, options)
  };

  bulkCreate(records, options){
    return this.model.bulkCreate(records, options);
  };

  // -------------
  // Read

  findAll (options) {
    return this.model.findAll(options);
  };

  findByPk (param, options) {
    return this.model.findByPk(param, options);
  };

  findOne (options) {
    this.model.findOne(options);
  };

  // -------------
  // Update

  update (values, options) {
     return this.model.update(values, options);
  };

  // -------------
  // Delete
  
  remove (options) {
    return this.model.destroy(options);
  };
}

module.exports = BaseEntity;