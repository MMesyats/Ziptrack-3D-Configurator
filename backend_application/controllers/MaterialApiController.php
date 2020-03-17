<?php 

require_once(ROOT.'/components/Api.php');
require_once(ROOT.'/models/Material.php');

class MaterialApiController extends Api 
{
    public $apiName = 'material';

    public function indexAction()
    {
        $materials = Material::getMaterials();
        if($materials)
            return $this->response($materials,200);
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