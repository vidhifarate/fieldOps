'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users',[{
    name : "vd",
    email:"vidhi.farate@gmail.com",
    password:"$2a$05$oi3eRfMaheCsdrtaW4z1GuMAPmBJH1cJqOUWrZhrkAmixcVZLC6xy",
    role:"Dispatcher",
    is_active:true


   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  }
};
