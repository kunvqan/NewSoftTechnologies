import express from "express";
import homeController from "../controller/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  // Cách 1: inline
  router.get('/', (req, res) => {
    return res.send('Nguyễn Vũ Quân');
  });

  // Cách 2: gọi hàm trong controller
  router.get('/home', homeController.getHomePage);          // url cho trang chủ
  router.get('/about', homeController.getAboutPage);        // url cho trang about
  router.get('/crud', homeController.getCRUD);              // url get crud (form tạo user)
  router.post('/post-crud', homeController.postCRUD);       // url post crud
  router.get('/get-crud', homeController.getFindAllCrud);   // url lấy findAll
  router.get('/edit-crud', homeController.getEditCRUD);     // url get editcrud
  router.post('/put-crud', homeController.putCRUD);         // url put crud
  router.get('/delete-crud', homeController.deleteCRUD);    // url get delete crud

  return app.use("/", router);
}

module.exports = initWebRoutes;
