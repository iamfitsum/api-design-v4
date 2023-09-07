import prisma from "../db";

export const getAllUpdates = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    res.json({ data: updates });
  } catch (error) {
    next(error);
  }
};

export const getOneUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;

    const update = await prisma.update.findUnique({
      where: {
        id,
      },
    });

    res.json({ data: update });
  } catch (error) {
    next(error);
  }
};

export const createUpdate = async (req, res, next) => {
  let product;

  try {
    product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: req.body.productId,
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
    const update = await prisma.update.create({
      data: {
        productId: product.id,
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        version: req.body.version,
        asset: req.body.asset,
      },
    });

    res.json({ data: update });
  } catch (error) {
    next(error);
  }
};

export const updateUpdate = async (req, res, next) => {
  let product;

  try {
    product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: req.body.productId,
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
    const updated = await prisma.update.update({
      where: {
        id_productId: {
          id,
          productId: product.id,
        },
      },
      data: {
        productId: product.id,
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        version: req.body.version,
        asset: req.body.asset,
      },
    });

    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteUpdate = async (req, res, next) => {
  let product;

  try {
    product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: req.body.productId,
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
    const deleted = await prisma.update.delete({
      where: {
        id_productId: {
          id,
          productId: product.id,
        },
      },
    });

    res.json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
