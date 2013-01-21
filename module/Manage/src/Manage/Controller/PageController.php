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
use Zend\Config\Factory as FileFactory;
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
        $json = new JsonModel(FileFactory::fromFile(__DIR__.'/../../../data/page/pages.json'));
        return $json;
    }

    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::get()
     */
    public function get($id)
    {
        $json = new JsonModel(FileFactory::fromFile(__DIR__.'/../../../data/page/pagebyid.json'));
        return $json;
    }

    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::create()
     */
    public function create($data)
    {
        $json = new JsonModel(array_merge(array('id'=>5), (array)$data));
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
       return $this->getResponse()->setStatusCode(200);
    }
}
