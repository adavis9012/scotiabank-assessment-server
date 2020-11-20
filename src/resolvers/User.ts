function accounts(parent: any, args: any, context: any) {
  return context.prisma.user.findOne({ where: { id: parent.id } }).accounts();
}

export default { accounts };
