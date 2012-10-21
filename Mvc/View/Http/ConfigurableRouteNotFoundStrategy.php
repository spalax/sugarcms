<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/zf2 for the canonical source repository
 * @copyright Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 * @package   Zend_Mvc
 */

namespace Mvc\View\Http;

use Zend\ServiceManager\ServiceManager;

use Zend\Config\Config;
use Mvc\View\Http;

/**
 * @category   Zend
 * @package    Zend_Mvc
 * @subpackage View
 */
class ConfigurableRouteNotFoundStrategy extends RouteNotFoundStrategy
{
    /**
     * @var Config
     */
    protected $config;

    /**
     * @param Config $configuration
     * @param ServiceManager $serviceManager
     */
    public function __construct(Config $configuration, ServiceManager $serviceManager)
    {
        $this->config = $configuration;

        $displayExceptions     = false;
        $displayNotFoundReason = false;
        $notFoundTemplate      = '404';

        if (isset($this->config['display_exceptions'])) {
            $displayExceptions = $this->config['display_exceptions'];
        }
        if (isset($this->config['display_not_found_reason'])) {
            $displayNotFoundReason = $this->config['display_not_found_reason'];
        }
        if (isset($this->config['not_found_template'])) {
            $notFoundTemplate = $this->config['not_found_template'];
        }

        $this->routeNotFoundStrategy->setDisplayExceptions($displayExceptions);
        $this->routeNotFoundStrategy->setDisplayNotFoundReason($displayNotFoundReason);
        $this->routeNotFoundStrategy->setNotFoundTemplate($notFoundTemplate);

        $serviceManager->setService('RouteNotFoundStrategy', $this->routeNotFoundStrategy);
        $serviceManager->setAlias('Zend\Mvc\View\RouteNotFoundStrategy', 'RouteNotFoundStrategy');
        $serviceManager->setAlias('Zend\Mvc\View\Http\RouteNotFoundStrategy', 'RouteNotFoundStrategy');
        $serviceManager->setAlias('404Strategy', 'RouteNotFoundStrategy');
    }
}
