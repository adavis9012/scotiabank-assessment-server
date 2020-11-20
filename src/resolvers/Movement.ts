import {replaceRange} from "../utils";

async function account(parent: any, args: any, context: any) {
    const account = await context.prisma.movement.findOne({where: {id: parent.id}}).account();

    return {
        ...account,
        statement: replaceRange(account.statement, 4, '*')
    };
}

export default {account};
