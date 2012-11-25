<?php
/**
 * @author Milotskiy Alexey (aka SpalaX)
 * @category Manage
 * @package Controller
 * @version 1.0
 * @copyright Copyright (c) Milcrew (http://www.milcrew.com)
 * Created Nov 4, 2012
 */
namespace Manage\Controller;

use MilcrewDeveloper\Utility;

use Zend\View\Model\JsonModel;

use Zend\Mvc\Controller\AbstractController;
use Zend\Mvc\Exception;
use Zend\Mvc\MvcEvent;

class LoginController extends AbstractController
{
    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractActionController::onDispatch()
     */
    public function onDispatch(MvcEvent $e)
    {
        $json = new JsonModel(array('status'=>0));
        $e->setResult($json);
    }
}
