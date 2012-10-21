<?php
namespace {

require 'Zend/Loader/StandardAutoloader.php';

$loader = new Zend\Loader\StandardAutoloader(array(
                'namespaces' => array(
                                'Zend' => __DIR__ . '/Zend',
                                'Mvc'  => __DIR__ . '/Mvc'
                )
));

$loader->register();

$factory = new Zend\Config\Factory();
$config = new Zend\Di\Config($factory->fromFile(__DIR__.'/dependencies.json'));

$di = new Zend\Di\Di(null, null, $config);
$di->instanceManager()->setParameters('Zend\Config\Config',
                                      array('array'=>Zend\Config\Factory::fromFile(__DIR__.'/application.json')));

$human = $di->get('Mvc\Application');
$human->bootstrap();
print_r($human);
}
