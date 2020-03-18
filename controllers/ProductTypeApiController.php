<?php 

require_once(ROOT.'/components/Api.php');
require_once(ROOT.'/models/ProductType.php');

class ProductTypeApiController extends Api 
{
    public $apiName = 'product type';

    public function indexAction()
    {
        $product_types = ProductType::getProductTypes();
        if($product_types)
            return $this->response($product_types,200);
        return $this->response('Data not Found',404);
    }
    public function viewAction()
    {
        
    }
    public function createAction() 
    {
    } 

    public function updateAction()
    {

    }
    public function deleteAction()
    {

    }
}