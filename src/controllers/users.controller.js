import { userValidationSchema } from "../validators/userValidator.js";
import * as UserService from "../services/users.services.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID bo'sh bo'lmasligi kerak" });
    }

    const user = await UserService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { email, username, password, role, status } = req.body;

    if (!email || !username || !password || !role || !status) {
      return res.status(400).json({ error: "Barcha maydonlar to'ldirilishi kerak" });
    }
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID kerak" });
  }

  try {
    const { email, username, password, role, status } = req.body;

    if (!email && !username && !password && !role && !status) {
      return res.status(400).json({ error: "Hech bo'lmaganda bitta maydon jo'natilishi kerak" });
    }

    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await UserService.updateUser(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID kerak" });
    }

    const deletedUser = await UserService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Foydalanuvchi topilmadi" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};
