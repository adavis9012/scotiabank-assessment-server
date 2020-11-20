import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserId } from '../utils';

async function signup(parent: any, args: any, context: any, info: any) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = APP_SECRET && jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent: any, args: any, context: any, info: any) {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });

  if (!user) throw new Error('No such user found');

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) throw new Error('Invalid password');

  const token = APP_SECRET && jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

function createAccount(parent: any, args: any, context: any, info: any) {
  const userId = getUserId(context);

  return context.prisma.account.create({
    data: {
      accountType: args.accountType,
      statement: args.statement,
      availableValue: args.availableValue,
      client: { connect: { id: userId } },
    },
  });
}

async function createMovement(parent: any, args: any, context: any, info: any) {
  const userId = getUserId(context);
  const accountId = +args.accountId;

  return context.prisma.movement.create({
    data: {
      client: { connect: { id: userId } },
      account: { connect: { id: accountId } },
      description: args.description,
      amount: args.amount,
      type: args.type,
    },
  });
}

async function updateMovement(parent: any, args: any, context: any, info: any) {
  const movementId = +args.movementId;

  return context.prisma.movement.update({
    where: {
      id: movementId,
    },
    data: {
      description: args.description,
      type: args.type,
      amount: +args.amount,
    }
  });
}

async function deleteMovement(parent: any, args: any, context: any, info: any) {
  const movementId = +args.movementId;

  return context.prisma.movement.delete({
    where: {
      id: movementId,
    }
  });
}

export default {
  signup,
  login,
  createAccount,
  createMovement,
  updateMovement,
  deleteMovement,
};
