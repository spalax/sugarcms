<?php
return array(
  'routes' => array(
    'manage-default' => array(
        'type' => 'Zend\Mvc\Router\Http\Segment',
        'options' => array(
            'route' => '/manage[/:controller[.:format][/:id]]',
            'constraints' => array(
                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                'format' => 'json',
                'id' => '[a-zA-Z0-9_-]*'
            ),
            'defaults' => array(
                'module' => 'manage',
                'controller' => 'home',
                'format' => 'json'
            )
        )
    ),
    'manage-login' => array(
        'type' => 'Zend\Mvc\Router\Http\Literal',
        'options' => array(
            'route'    => '/manage/login',
            'defaults' => array(
                  'controller' => 'login'
            )
        ),
        'may_terminate' => true,
        'child_routes' => array(
            'login' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/in',
                    'defaults' => array(
                        'controller' => 'login/in'
                    )
                )
            )
        )
    )
  )
);
