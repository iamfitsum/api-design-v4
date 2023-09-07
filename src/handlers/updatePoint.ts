import prisma from "../db";

export const getAllUpdatePoints = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.body.updateId,
    },
  });

  if (!update) {
    // product does not exist or belong to user
    res.json({ message: "Invalied Request" });
  }

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: update.productId,
        belongsToId: req.user.id,
      },
    },
  });

  if (!product) {
    // product does not exist or belong to user
    res.json({ message: "Invalied Request" });
  }

  const updatePoints = await prisma.updatePoint.findMany({
    where: {
      updateId: update.id,
    },
  });

  res.json({ data: updatePoints });
};

export const getOneUpdatePoint = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.body.updateId,
    },
  });

  if (!update) {
    // product does not exist or belong to user
    res.json({ message: "Invalied Request" });
  }

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: update.productId,
        belongsToId: req.user.id,
      },
    },
  });
  if (!product) {
    // product does not exist or belong to user
    res.json({ message: "Invalied Request" });
  }

  const id = req.params.id;

  const updatePoint = await prisma.updatePoint.findUnique({
    where: {
      id_updateId: {
        id,
        updateId: update.id,
      },
    },
  });

  res.json({ data: updatePoint });
};

export const createUpdatePoint = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.body.updateId,
    },
  });

  if (!update) {
    // product does not exist or belong to user
    res.json({ message: "Invalied Request" });
  }

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: update.productId,
        belongsToId: req.user.id,
      },
    },
  });
  if (!product) {
    // product does not exist or belong to user
    res.json({ message: "Invalied Request" });
  }

  const updatePoint = await prisma.updatePoint.create({
    data: {
      updateId: update.id,
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.json({ data: updatePoint });
};

export const updateUpdatePoint = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.body.updateId,
    },
  });

  if (!update) {
    // product does not exist or belong to user
    res.json({ message: "Invalied Request" });
  }

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: update.productId,
        belongsToId: req.user.id,
      },
    },
  });
  if (!product) {
    // product does not exist or belong to user
    res.json({ message: "Invalied Request" });
  }

  const id = req.params.id;
  const updated = await prisma.updatePoint.update({
    where: {
      id_updateId: {
        id,
        updateId: update.id,
      },
    },
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.json({ data: updated });
};

export const deleteUpdatePoint = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.body.updateId,
    },
  });

  if (!update) {
    // product does not exist or belong to user
    res.json({ message: "Invalied Request" });
  }

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: update.productId,
        belongsToId: req.user.id,
      },
    },
  });

  if (!product) {
    // product does not exist or belong to user
    res.json({ message: "Invalied Request" });
  }

  const id = req.params.id;
  const deleted = await prisma.updatePoint.delete({
    where: {
      id_updateId: {
        id,
        updateId: update.id,
      },
    },
  });

  res.json({ data: deleted });
};
