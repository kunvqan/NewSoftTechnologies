import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

// Hàm tạo user mới
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === '1' ? true : false,
        roleId: data.roleId
      });
      resolve('OK create a new user successfull');
    } catch (e) {
      reject(e);
    }
  });
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
}

// Lấy tất cả findAll CRUD
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true, // hiện dữ liệu gốc
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
}

// Lấy findOne CRUD
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId }, // query điều kiện cho tham số
        raw: true
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
}

// Hàm put CRUD
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id }
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        // Lấy danh sách user
        let allusers = await db.User.findAll();
        resolve(allusers);
      } else {
        resolve(); // hàm trả về kết quả rỗng
      }
    } catch (e) {
      reject(e);
    }
  });
}

// Hàm xóa user
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId }
      });
      if (user) {
        user.destroy();
      }
      resolve(); // là return
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = { // xuất hàm ra bên ngoài
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUser: updateUser,
  deleteUserById: deleteUserById
}
