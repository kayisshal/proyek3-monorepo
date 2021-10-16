'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Keterangan', {
      id_keterangan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      // nim (foreign key)
      status: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      isAccepted: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })

    await queryInterface.createTable('daftar_hadir_mahasiswa', {
      id_daftar_hadir_mhs: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      // id_studi (fk)
      // id_keterangan (fk)
      keterlambatan: {
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.DATEONLY
      },
      isHadir: {
        type: Sequelize.BOOLEAN
      },
      minggu: {
        type: Sequelize.INTEGER
      },
      bulan: {
        type: Sequelize.INTEGER
      },
      ja: {
        type: Sequelize.INTEGER
      },
      jb: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }
    )

    await queryInterface.createTable('daftar_hadir_dosen', {
      id_daftar_hadir_dosen: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      tanggal: {
        type: Sequelize.DATEONLY
      },
      isHadir: {
        type: Sequelize.BOOLEAN
      },
      idJadwal: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }
    )

    await queryInterface.createTable('Jadwal', {
      id_jadwal: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      ja:{
        type: Sequelize.INTEGER
      },
      jb:{
        type: Sequelize.INTEGER
      },
      waktu_mulai: {
        type: Sequelize.TIME
      },
      waktu_selesai: {
        type: Sequelize.TIME
      },
      batas_terakhir_absen: {
        type: Sequelize.TIME
      },
      hari: {
        type: Sequelize.INTEGER
      },
      jenis: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    }
    )

    await queryInterface.createTable('Bap', {
      id_BAP: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    
      },
      materi: {
        type: Sequelize.TEXT
      },
      kegiatan: {
        type: Sequelize.TEXT
      },
      minggu: {
        type: Sequelize.INTEGER
      },
      bukti: {
        // url dari location foto
        type: Sequelize.STRING
      },
      jumlah_mhs_hadir: {
        type: Sequelize.INTEGER
      },
      jumlah_mhs_tidak_hadir: {
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.DATEONLY
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Bap')
    await queryInterface.dropTable('Keterangan')
    await queryInterface.dropTable('daftar_hadir_mahasiswa')
    await queryInterface.dropTable('daftar_hadir_dosen')
    await queryInterface.dropTable('Jadwal')
  }
};
