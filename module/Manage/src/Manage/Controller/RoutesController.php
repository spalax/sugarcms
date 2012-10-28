<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Manage\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\ViewModel;

class RoutesController extends AbstractRestfulController
{
    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::getList()
     */
    public function getList()
    {
        print_r("FUUUUUUUUUUUUUUUUUUCCCCKKKK");
        exit(0);
    }

    /* (non-PHPdoc)
     * @see Zend\Mvc\Controller.AbstractRestfulController::get()
     */
    public function get($id)
    {

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
