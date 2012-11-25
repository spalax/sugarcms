<?php
return array(
  'routes' => array(
    'manage-default' => array(
        'type' => 'Zend\Mvc\Router\Http\Segment',
        'options' => array(
            'route' => '/manage[/:controller[.:format]]',
            'constraints' => array(
                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                'format'     => '(json|html)'
            )
        )
    ),
    'manage-home' => array(
        'type' => 'Zend\Mvc\Router\Http\Segment',
        'options' => array(
            'route' => '/manage/home/:login',
            'constraints' => array(
                'login'      => '[0-9]+'
            ),
            'defaults' => array('controller'=>'home')
        )
    ),
    'manage-menus' => array(
        'type' => 'Zend\Mvc\Router\Http\Segment',
        'options' => array(
            'route' => '/manage/menus.json[/:id]',
            'constraints' => array(
                'id'      => '[0-9]+'
            ),
            'defaults' => array('controller'=>'menus')
        )
    )
  )
);
