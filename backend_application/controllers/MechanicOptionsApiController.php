<?php

require_once(ROOT . '/components/Api.php');
require_once(ROOT . '/models/Mechanic.php');

class MechanicOptionsApiController extends Api
{
    public $apiName = 'mechanics options';

    public function indexAction()
    {
        $mechanics_options = Mechanic::getMechanicsOptions();
        if ($mechanics_options)
            return $this->response($mechanics_options, 200);
        return $this->response('Data not Found', 404);
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
