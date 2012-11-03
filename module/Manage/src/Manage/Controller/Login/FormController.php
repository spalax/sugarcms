<?php
/**
 * @author Milotskiy Alexey (aka SpalaX)
 * @category Manage
 * @package Controller
 * @version 1.0
 * @copyright Copyright (c) Milcrew (http://www.milcrew.com)
 * Created Nov 4, 2012
 */
namespace Manage\Controller\Login;

use Zend\View\Model\ViewModel;
use Zend\Mvc\Controller\AbstractController;
use Zend\Mvc\Exception;
use Zend\Mvc\MvcEvent;

class FormController extends AbstractController
{
    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractActionController::onDispatch()
     */
    public function onDispatch(MvcEvent $e)
    {
        $actionResponse = new ViewModel();
        $actionResponse->setTemplate('manage/login/form/index');
        $e->setResult($actionResponse);
        return $actionResponse;
    }
}
