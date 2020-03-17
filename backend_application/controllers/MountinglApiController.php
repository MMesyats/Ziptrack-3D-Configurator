<?php 

require_once(ROOT.'/components/Api.php');
require_once(ROOT.'/models/Mounting.php');

class MountinglApiController extends Api 
{
    public $apiName = 'mounting';

    public function indexAction()
    {
        $mounting = Mounting::getMountings();
        if($mounting)
            return $this->response($mounting,200);
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