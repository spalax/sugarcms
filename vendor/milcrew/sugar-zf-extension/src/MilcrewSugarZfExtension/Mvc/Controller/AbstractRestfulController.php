<?php
namespace MilcrewSugarZfExtension\Mvc\Controller;

use Zend\Mvc\Controller\AbstractRestfulController as _AbstractRestfulController;
use Zend\Json\Json;
use Zend\Stdlib\RequestInterface as Request;
use Zend\Mvc\Exception;

/**
 * Abstract RESTful controller
 *
 * @category   Zend
 * @package    Zend_Mvc
 * @subpackage Controller
 */
abstract class AbstractRestfulController extends _AbstractRestfulController
{

    const CONTENT_TYPE_JSON = 'json';

    protected $contentTypes = array(
        self::CONTENT_TYPE_JSON => array(
            'application/vnd.myapp.resource+json',
            'application/json'
        )
    );

    /**
     * Process post data and call create
     *
     * @param Request $request
     * @return mixed
     */
    public function processPostData (Request $request)
    {
        if($this->requestHasContentType($request, self::CONTENT_TYPE_JSON)) {
            return $this->create(Json::decode($request->getContent()));
        }

        return parent::processPostData($request);
    }

    /**
     * Process put data and call update
     *
     * @param Request $request
     * @param $routeMatch
     * @return mixed
     * @throws Exception\DomainException
     */
    public function processPutData(Request $request, $routeMatch)
    {
        if (null === $id = $routeMatch->getParam('id')) {
            if (!($id = $request->getQuery()->get('id', false))) {
                throw new Exception\DomainException('Missing identifier');
            }
        }

        if($this->requestHasContentType($request, self::CONTENT_TYPE_JSON)) {
            return $this->update($id, Json::decode($request->getContent()));
        }

        $content = $request->getContent();
        parse_str($content, $parsedParams);

        return $this->update($id, $parsedParams);
    }

    /**
     * Check if request has certain content type
     *
     * @return boolean
     */
    public function requestHasContentType (Request $request, $contentType = '')
    {
        $requestContentTypeValue = $request->getHeaders()->get('Content-Type')->getFieldValue();

        if(array_key_exists($contentType, $this->contentTypes)) {
            foreach ($this->contentTypes[$contentType] as $contentTypeValue) {
                if (strpos(strtolower($requestContentTypeValue), strtolower($contentTypeValue)) !== false) {
                    return true;
                }
            }
        }

        return false;
    }
}
