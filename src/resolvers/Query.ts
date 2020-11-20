import {getUserId, replaceRange} from "../utils";

async function accounts(parent: any, args: any, context: any, info: any) {
    const userId = getUserId(context);
    const accounts = await context.prisma.account.findMany({
        where: {
            clientId: userId
        },
        orderBy: args.orderBy
    });

    return accounts.map((account: any) => {
        return {
            ...account,
            statement: replaceRange(account.statement, 4, '*')
        };
    });
}

async function account(parent: any, args: any, context: any, info: any) {
    const userId = getUserId(context);
    const id = +args.id;
    const account = await context.prisma.account.findOne({
        where: {
            id
        },
    });

    if(account.clientId !== userId) {
        return undefined;
    }

    return {
        ...account,
        statement: replaceRange(account.statement, 4, '*')
    };
}

async function client(parent: any, args: any, context: any, info: any) {
    const userId = getUserId(context);

    return await context.prisma.user.findOne({
        where: {
            id: userId
        },
    });
}

async function movements(parent: any, args: any, context: any, info: any) {
    const userId = getUserId(context);
    const accountId = +args.accountId;

    return await context.prisma.movement.findMany({
        where: {
            clientId: userId,
            accountId: accountId,
        },
    });
}

export default {
    account,
    accounts,
    client,
    movements,
}