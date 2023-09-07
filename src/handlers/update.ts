import prisma from "../db";

export const getAllUpdates = async (req, res) => {
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
};

export const getOneUpdate = async (req, res) => {
  const id = req.params.id;

  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  });

  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
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
};

export const updateUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
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
};

export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
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
};
