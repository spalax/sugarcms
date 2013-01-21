<?php
namespace Manage\Controller;

use MilcrewSugarDeveloper\Utility;

use Zend\Config\Factory;

use Zend\View\Model\JsonModel;

use Zend\Json\Server\Response;
use Zend\Mvc\Controller\AbstractRestfulController;

class MenuController extends AbstractRestfulController
{
    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::getList()
     */
    public function getList()
    {
        $json = new JsonModel(Factory::fromFile(__DIR__.'/../../../data/menu/menus.json'));
        return $json;
    }

    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::get()
     */
    public function get($id) {
        $json = new JsonModel(Factory::fromFile(__DIR__.'/../../../data/menu/menubyid.json'));
        return $json;
    }

    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::create()
     */
    public function create($data)
    {

    }

    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::update()
     */
    public function update($id, $data)
    {

    }

    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::delete()
     */
    public function delete($id)
    {

    }
}
