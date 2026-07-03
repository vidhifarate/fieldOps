'use strict';
import { DataTypes } from 'sequelize';
import { describe } from 'zod/v4/core';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.fn('uuidv4')
      },
      service_request_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: { model: 'service_requests', key: 'id' },
       
      },
      technician_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      description:{
        type: DataTypes.TEXT,
        allowNull: true

      },
      status: {
        type: DataTypes.ENUM("assigned", "en route", "in progress", "completed"),
        allowNull: false,
        defaultValue: "assigned"
      },
      scheduled_at: {
        type: DataTypes.STRING,
        allowNull: false
      },
      after_photo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jobs');
  }
};
