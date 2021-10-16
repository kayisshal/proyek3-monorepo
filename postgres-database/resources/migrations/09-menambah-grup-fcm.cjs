'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Grup', {
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
    await queryInterface.createTable('User_Device', {
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      id_user: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
    await queryInterface.createTable('User_Group', {
      nama_grup: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Grup',
          key: 'nama'
        }
      },
      id_user: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Group')
    await queryInterface.dropTable('User_Device')
    await queryInterface.dropTable('User')
    await queryInterface.dropTable('Grup')
  }
}
