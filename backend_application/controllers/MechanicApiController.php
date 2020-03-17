<?php 

require_once(ROOT.'/components/Api.php');
require_once(ROOT.'/models/Mechanic.php');

class MechanicApiController extends Api 
{
    public $apiName = 'mechanic';

    public function indexAction()
    {
        $mechanics = Mechanic::getMechanics();
        if($mechanics)
            return $this->response($mechanics,200);
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