"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function accounts(parent, args, context) {
    return context.prisma.user.findOne({ where: { id: parent.id } }).accounts();
}
exports.default = { accounts: accounts };
