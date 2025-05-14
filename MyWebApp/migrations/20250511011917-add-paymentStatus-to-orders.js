'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Orders', 'paymentStatus', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'неоплачено'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Orders', 'paymentStatus');
    }
};
