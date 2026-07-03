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
    await queryInterface.createTable('service_requests', {
      
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.Sequelize.fn('uuidv4')

      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true

      },
      urgency: {
        type: DataTypes.ENUM("high", "mid", "low"),
        allowNull: true

      },
     photo: {
        type:DataTypes.STRING,
        allowNull:true
      },

      customer_id: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }}
        ,
        address_id: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: 'address',
          key: 'id'
        }},
        date: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: Date.now()
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
        }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("service_requests")
  }
};
