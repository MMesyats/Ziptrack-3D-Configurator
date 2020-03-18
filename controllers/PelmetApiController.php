<?php 

require_once(ROOT.'/components/Api.php');
require_once(ROOT.'/models/Pelmet.php');

class PelmetApiController extends Api 
{
    public $apiName = 'pelmet';

    public function indexAction()
    {
        $pelmets = Pelmet::getPelmets();
        if($pelmets)
            return $this->response($pelmets,200);
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