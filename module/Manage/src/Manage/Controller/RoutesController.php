<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Manage\Controller;

use Zend\View\Model\JsonModel;

use Zend\Json\Server\Response;
use Zend\Mvc\Controller\AbstractRestfulController;

class RoutesController extends AbstractRestfulController
{
    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::getList()
     */
    public function getList()
    {
        $json = new JsonModel(array(
            array("name"=>"main",
                  "path"=>"/vasya/pupkin",
                  "date"=>"today"),

            array("name"=>"home",
                  "path"=>"/epty/vasya",
                  "date"=>"tomorrow"),

            array("name"=>"petya",
                  "path"=>"/hello/sdatas",
                  "date"=>"day")
        ));

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
