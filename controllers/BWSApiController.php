<?php 

require_once(ROOT.'/components/Api.php');
require_once(ROOT.'/models/BottomWeatherStrip.php');

class BWSApiController extends Api 
{
    public $apiName = 'bws';

    public function indexAction()
    {
        $bws = BottomWeatherStrip::getStrips();
        if($bws)
            return $this->response($bws,200);
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