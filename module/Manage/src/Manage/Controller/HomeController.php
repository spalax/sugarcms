<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Manage\Controller;

use Zend\Mvc\Controller\AbstractController;
use Zend\View\Model\ViewModel;
use Zend\Mvc\Exception;
use Zend\Mvc\MvcEvent;

class HomeController extends AbstractController
{
    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractActionController::onDispatch()
     */
    public function onDispatch(MvcEvent $e)
    {
        $actionResponse = new ViewModel();
        $actionResponse->setTemplate('manage/home/index');
        $e->setResult($actionResponse);
        return $actionResponse;
    }
}
