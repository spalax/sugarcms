<?php
/**
 * @author Milotskiy Alexey (aka SpalaX)
 * @category Manage
 * @package Controller
 * @version 1.0
 * @copyright Copyright (c) Milcrew (http://www.milcrew.com)
 * Created Dec 2, 2012
 */
namespace Manage\Controller;

use MilcrewSugarDeveloper\Utility;

use Zend\View\Model\JsonModel;

use Zend\Json\Server\Response;
use MilcrewSugarZfExtension\Mvc\Controller\AbstractRestfulController;
use Zend\Http\Response as HttpResponse;

class PageController extends AbstractRestfulController
{
    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::getList()
     */
    public function getList()
    {
        $json = new JsonModel(array(array("id"=>"1",
                                          "title"=>"Glorios Page",
                                          "descr"=>"Very nice page page page page page"),
                                    array("id"=>"2",
                                          "title"=>"Wan helsing Page",
                                          "descr"=>"Very nice page page page page page")));
        return $json;
    }

    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::get()
     */
    public function get($id)
    {
        $json = new JsonModel(array(
            'some_parameter' => 'some value',
            'error'=>true,
        ));
        return $json;
    }

    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::create()
     */
    public function create($data)
    {
        $json = new JsonModel(array_merge(array('id'=>5),(array)$data));
        return $json;
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
       return $this->getResponse()->setStatusCode(400);
    }
}
