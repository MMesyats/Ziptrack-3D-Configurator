<?php 

require_once(ROOT.'/components/Api.php');
require_once(ROOT.'/models/Colors.php');

class ColorApiController extends Api 
{
    public $apiName = 'color';

    public function indexAction()
    {
        $colors = Colors::getColors();
        if($colors)
            return $this->response($colors,200);
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