<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/zf2 for the canonical source repository
 * @copyright Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 * @package   Zend_Mvc
 */

namespace Mvc;

use Zend\ServiceManager\ServiceManager;

use Mvc\MvcEvent;
use Mvc\View\Http\ViewManager;
use Mvc\RouteListener;
use Mvc\Router\RouteStackInterface;
use Mvc\Service\RouterFactory;
use Mvc\DispatchListener;

use Zend\Config\Config;
use Zend\EventManager\EventManagerAwareInterface;
use Zend\EventManager\EventManagerInterface;
use Zend\ModuleManager\ModuleManagerInterface;
use Zend\Stdlib\RequestInterface;
use Zend\Stdlib\ResponseInterface;

/**
 * Main application class for invoking applications
 *
 * Expects the user will provide a configured ServiceManager, configured with
 * the following services:
 *
 * - EventManager
 * - ModuleManager
 * - Request
 * - Response
 * - RouteListener
 * - Router
 * - DispatchListener
 * - ViewManager
 *
 * The most common workflow is:
 * <code>
 * $services = new Zend\ServiceManager\ServiceManager($servicesConfig);
 * $app      = new Application($appConfig, $services);
 * $app->bootstrap();
 * $response = $app->run();
 * $response->send();
 * </code>
 *
 * bootstrap() opts in to the default route, dispatch, and view listeners,
 * sets up the MvcEvent, and triggers the bootstrap event. This can be omitted
 * if you wish to setup your own listeners and/or workflow; alternately, you
 * can simply extend the class to override such behavior.
 *
 * @category   Zend
 * @package    Zend_Mvc
 */
class Application implements
    ApplicationInterface,
    EventManagerAwareInterface
{
    const ERROR_CONTROLLER_CANNOT_DISPATCH = 'error-controller-cannot-dispatch';
    const ERROR_CONTROLLER_NOT_FOUND       = 'error-controller-not-found';
    const ERROR_CONTROLLER_INVALID         = 'error-controller-invalid';
    const ERROR_EXCEPTION                  = 'error-exception';
    const ERROR_ROUTER_NO_MATCH            = 'error-router-no-match';

    /**
     * @var array
     */
    protected $configuration = null;

    /**
     * MVC event token
     * @var MvcEvent
     */
    protected $event;

    /**
     * @var EventManagerInterface
     */
    protected $events;

    /**
     * @var RequestInterface
     */
    protected $request;

    /**
     * @var ResponseInterface
     */
    protected $response;

    /**
     * @var RouteStackInterface
     */
    protected $router;

    /**
     * @var DispatchListener
     */
    protected $dispatchListener;

    /**
     * @var RouteListener
     */
    protected $routeListener;

    /**
     * @var ViewManager
     */
    protected $viewManager;

    /**
     * @var MvcEvent
     */
    protected $mvcEvent;

    /**
     * @var ServiceManager
     */
    protected $serviceManager;

    /**
     * @param Config $configuration
     * @param ServiceManager $serviceManager
     * @param EventManagerInterface $eventManager
     * @param RequestInterface $request
     * @param ResponseInterface $response
     * @param RouteStackInterface $router
     * @param DispatchListener $dispatchListener
     * @param RouteListener $routeListener
     * @param ViewManager $viewManager
     * @param MvcEvent $event
     */
    public function __construct(Config $configuration,
                                ServiceManager $serviceManager,
                                EventManagerInterface $eventManager,
                                RequestInterface $request,
                                ResponseInterface $response,
                                RouteStackInterface $router,
                                DispatchListener $dispatchListener,
                                RouteListener $routeListener,
                                ViewManager $viewManager,
                                MvcEvent $event
                                )
    {
        $this->configuration  = $configuration;
        $this->setEventManager($eventManager);
        $this->serviceManager = $serviceManager;

        $this->request        = $request;
        $this->response       = $response;

        $this->router = $router;
        $this->dispatchListener = $dispatchListener;
        $this->routeListener = $routeListener;
        $this->viewManager = $viewManager;
        $this->event = $event;
    }

    /**
     * Retrieve the application configuration
     *
     * @return array|object
     */
    public function getConfig()
    {
        return $this->configuration;
    }

    /**
     * Bootstrap the application
     *
     * Defines and binds the MvcEvent, and passes it the request, response, and
     * router. Attaches the ViewManager as a listener. Triggers the bootstrap
     * event.
     *
     * @return Application
     */
    public function bootstrap()
    {
        $events         = $this->getEventManager();

        $events->attach($this->routeListener);
        $events->attach($this->dispatchListener);
        $events->attach($this->viewManager);

        // Setup MVC Event
        $this->event->setTarget($this);

        $this->event->setApplication($this)
              ->setRequest($this->getRequest())
              ->setResponse($this->getResponse())
              ->setRouter($this->router);

        // Trigger bootstrap events
        $events->trigger(MvcEvent::EVENT_BOOTSTRAP, $this->event);
        return $this;
    }

    /**
     * Get the request object
     *
     * @return RequestInterface
     */
    public function getRequest()
    {
        return $this->request;
    }

    /**
     * Get the response object
     *
     * @return ResponseInterface
     */
    public function getResponse()
    {
        return $this->response;
    }

    /**
     * Get the MVC event instance
     *
     * @return MvcEvent
     */
    public function getMvcEvent()
    {
        return $this->event;
    }

    /**
     * Set the event manager instance
     *
     * @param  EventManagerInterface $eventManager
     * @return Application
     */
    public function setEventManager(EventManagerInterface $eventManager)
    {
        $eventManager->setIdentifiers(array(
            __CLASS__,
            get_called_class(),
        ));
        $this->events = $eventManager;
        return $this;
    }

    /**
     * Retrieve the event manager
     *
     * Lazy-loads an EventManager instance if none registered.
     *
     * @return EventManagerInterface
     */
    public function getEventManager()
    {
        return $this->events;
    }

    /**
     * @return ServiceManager
     */
    public function getServiceManager()
    {
        return $this->serviceManager;
    }

    /**
     * Run the application
     *
     * @triggers route(MvcEvent)
     *           Routes the request, and sets the RouteMatch object in the event.
     * @triggers dispatch(MvcEvent)
     *           Dispatches a request, using the discovered RouteMatch and
     *           provided request.
     * @triggers dispatch.error(MvcEvent)
     *           On errors (controller not found, action not supported, etc.),
     *           populates the event with information about the error type,
     *           discovered controller, and controller class (if known).
     *           Typically, a handler should return a populated Response object
     *           that can be returned immediately.
     * @return ResponseInterface
     */
    public function run()
    {
        $events = $this->getEventManager();
        $event  = $this->getMvcEvent();

        // Define callback used to determine whether or not to short-circuit
        $shortCircuit = function ($r) use ($event) {
            if ($r instanceof ResponseInterface) {
                return true;
            }
            if ($event->getError()) {
                return true;
            }
            return false;
        };

        // Trigger route event
        $result = $events->trigger(MvcEvent::EVENT_ROUTE, $event, $shortCircuit);
        if ($result->stopped()) {
            $response = $result->last();
            if ($response instanceof ResponseInterface) {
                $event->setTarget($this);
                $events->trigger(MvcEvent::EVENT_FINISH, $event);
                return $response;
            }
            if ($event->getError()) {
                return $this->completeRequest($event);
            }
            return $event->getResponse();
        }
        if ($event->getError()) {
            return $this->completeRequest($event);
        }

        // Trigger dispatch event
        $result = $events->trigger(MvcEvent::EVENT_DISPATCH, $event, $shortCircuit);

        // Complete response
        $response = $result->last();
        if ($response instanceof ResponseInterface) {
            $event->setTarget($this);
            $events->trigger(MvcEvent::EVENT_FINISH, $event);
            return $response;
        }

        $response = $this->getResponse();
        $event->setResponse($response);

        return $this->completeRequest($event);
    }

    /**
     * Complete the request
     *
     * Triggers "render" and "finish" events, and returns response from
     * event object.
     *
     * @param  MvcEvent $event
     * @return ResponseInterface
     */
    protected function completeRequest(MvcEvent $event)
    {
        $events = $this->getEventManager();
        $event->setTarget($this);
        $events->trigger(MvcEvent::EVENT_RENDER, $event);
        $events->trigger(MvcEvent::EVENT_FINISH, $event);
        return $event->getResponse();
    }
}
