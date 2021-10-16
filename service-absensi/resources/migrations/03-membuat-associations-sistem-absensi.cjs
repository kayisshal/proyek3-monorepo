'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Keterangan', 'nim', {
      type: Sequelize.STRING(15),
      references: {
        model: 'Mahasiswa',
        key: 'nim'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.addColumn('daftar_hadir_mahasiswa', 'id_studi', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Studi',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.addColumn('daftar_hadir_mahasiswa', 'id_keterangan', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Keterangan',
        key: 'id_keterangan'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.addColumn('Jadwal', 'nip', {
      type: Sequelize.STRING(30),
      allowNull: true,
      references: {
        model: 'Dosen',
        key: 'nip'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.addColumn('Jadwal', 'id_perkuliahan', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Perkuliahan',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.addColumn('daftar_hadir_dosen', 'nip', {
      type: Sequelize.STRING(30),
      allowNull: true,
      references: {
        model: 'Dosen',
        key: 'nip'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
    
    await queryInterface.addColumn('daftar_hadir_dosen', 'id_studi', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Studi',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.addColumn('Bap', 'nip', {
      type: Sequelize.STRING(30),
      allowNull: true,
      references: {
        model: 'Dosen',
        key: 'nip'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    // await queryInterface.addColumn('Bap', 'id_perkuliahan', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Perkuliahan',
    //     key: 'id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL'
    // })

    await queryInterface.addColumn('Bap', 'id_jadwal', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Jadwal',
        key: 'id_jadwal'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.addConstraint('daftar_hadir_mahasiswa', {
      fields: ['id_studi', 'tanggal', 'ja', 'jb'],
      type: 'Unique',
      name: 'presensi_hari_tertentu'
    })

    await queryInterface.addConstraint('Bap', {
      fields: ['id_jadwal', 'tanggal'],
      type: 'Unique',
      name: 'bap_hari_tertentu'
    })

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Bap', 'bap_hari_tertentu')
    await queryInterface.removeConstraint('daftar_hadir_mahasiswa', 'presensi_hari_tertentu')
    await queryInterface.removeColumn('Bap', 'nip')
    await queryInterface.removeColumn('Bap', 'id_jadwal')
    await queryInterface.removeColumn('Keterangan', 'nim')
    await queryInterface.removeColumn('daftar_hadir_mahasiswa', 'id_studi')
    await queryInterface.removeColumn('daftar_hadir_mahasiswa', 'id_keterangan')
    await queryInterface.removeColumn('Jadwal', 'nip')
    await queryInterface.removeColumn('Jadwal', 'id_perkuliahan')
  }
};
