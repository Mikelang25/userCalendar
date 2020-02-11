module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    task_day:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    task_stime:{
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    task_etime:{
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    task_comment:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Task;
};
