import db from '../models/index';
import CRUDService from '../services/CRUDService';

// Hàm getHomePage
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render('homepage.ejs', {
      data: JSON.stringify(data)
    });
  } catch (e) {
    console.log(e);
  }
}

// Hàm getAbout
let getAboutPage = (req, res) => {
  return res.render('test/about.ejs');
}

// Hàm CRUD - trả về form tạo user
let getCRUD = (req, res) => {
  return res.render('crud.ejs');
}

// Hàm findAll CRUD
let getFindAllCrud = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render('users/findAllUser.ejs', {
    datalist: data
  });
}

// Hàm post CRUD - tạo user mới
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send('Post crud to server');
}

// Hàm lấy dữ liệu để edit
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render('users/editUser.ejs', {
      data: userData
    });
  } else {
    return res.send('Không lấy được id');
  }
}

// Hàm put CRUD - cập nhật user
let putCRUD = async (req, res) => {
  let data = req.body;
  let data1 = await CRUDService.updateUser(data);
  return res.render('users/findAllUser.ejs', {
    datalist: data1
  });
}

// Hàm delete CRUD - xóa user
let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send('Deleted!!!!!!!!!!!!');
  } else {
    return res.send('Not find user');
  }
}

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  getFindAllCrud: getFindAllCrud,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD
}
