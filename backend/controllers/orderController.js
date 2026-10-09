import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      totalPrice,
    } = req.body;

    if (
      !items ||
      items.length === 0 ||
      !shippingAddress ||
      totalPrice === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Order details are required.",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order.",
    });
  }
};
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get my orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders.",
    });
  }
};
