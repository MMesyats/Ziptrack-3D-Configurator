<?php

require_once(ROOT . '/components/Api.php');
require_once(ROOT . '/models/Product.php');


class ProductApiController extends Api
{
    public $apiName = 'product';

    public function indexAction()
    {
        $products = Product::getProducts();
        if ($products)
            return $this->response($products, 200);
        return $this->response('Data not Found', 404);
    }
    public function viewAction()
    {
    }
    public function createAction()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        error_log(print_r($data, TRUE));

        call_user_func_array('Product::addProduct', $data);
        return $this->response('OK', 200);
    }

    public function updateAction()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        error_log(print_r($data, TRUE));

        call_user_func_array('Product::updateProduct', $data);
        return $this->response('Data updated', 200);
    }
    public function deleteAction()
    {
    }
}
