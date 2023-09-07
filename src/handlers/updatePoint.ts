import prisma from "../db";

export const getAllUpdatePoints = async (req, res, next) => {
  let update;

  try {
    update = await prisma.update.findUnique({
      where: {
        id: req.body.updateId,
      },
    });

    if (!update) {
      // product does not exist or belong to user
      res.json({ message: "Invalied Request" });
    }
  } catch (error) {
    next(error);
  }

  try {
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
  } catch (error) {
    next(error);
  }

  try {
    const updatePoints = await prisma.updatePoint.findMany({
      where: {
        updateId: update.id,
      },
    });

    res.json({ data: updatePoints });
  } catch (error) {
    next(error);
  }
};

export const getOneUpdatePoint = async (req, res, next) => {
  let update;

  try {
    update = await prisma.update.findUnique({
      where: {
        id: req.body.updateId,
      },
    });

    if (!update) {
      // product does not exist or belong to user
      res.json({ message: "Invalied Request" });
    }
  } catch (error) {
    next(error);
  }

  try {
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
  } catch (error) {
    next(error);
  }

  try {
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
  } catch (error) {
    next(error);
  }
};

export const createUpdatePoint = async (req, res, next) => {
  let update;

  try {
    update = await prisma.update.findUnique({
      where: {
        id: req.body.updateId,
      },
    });

    if (!update) {
      // product does not exist or belong to user
      res.json({ message: "Invalied Request" });
    }
  } catch (error) {
    next(error);
  }

  try {
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
  } catch (error) {
    next(error);
  }

  try {
    const updatePoint = await prisma.updatePoint.create({
      data: {
        updateId: update.id,
        name: req.body.name,
        description: req.body.description,
      },
    });

    res.json({ data: updatePoint });
  } catch (error) {
    next(error);
  }
};

export const updateUpdatePoint = async (req, res, next) => {
  let update;

  try {
    update = await prisma.update.findUnique({
      where: {
        id: req.body.updateId,
      },
    });

    if (!update) {
      // product does not exist or belong to user
      res.json({ message: "Invalied Request" });
    }
  } catch (error) {
    next(error);
  }

  try {
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
  } catch (error) {
    next(error);
  }

  try {
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
  } catch (error) {
    next(error);
  }
};

export const deleteUpdatePoint = async (req, res, next) => {
  let update;

  try {
    update = await prisma.update.findUnique({
      where: {
        id: req.body.updateId,
      },
    });

    if (!update) {
      // product does not exist or belong to user
      res.json({ message: "Invalied Request" });
    }
  } catch (error) {
    next(error);
  }

  try {
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
  } catch (error) {
    next(error);
  }

  try {
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
  } catch (error) {
    next(error);
  }
};
