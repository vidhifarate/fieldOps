'use strict';

import { DataTypes } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users',{
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.Sequelize.fn('uuidv4')

      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true

      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      role: {
        type: DataTypes.ENUM("Customer","Technician","Dispatcher","Default"),
        allowNull: true

      },
      pwd_version: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      is_active:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:false

      },

      created_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.Sequelize.fn('now')
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: Sequelize.Sequelize.fn('now')
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null
      },

      created_by: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }

      },
      updated_by: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }

      },
      deleted_by: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }

      },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users')
  }
};
