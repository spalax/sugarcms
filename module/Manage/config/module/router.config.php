<?php
return array(
  'routes' => array(
    'manage-default' => array(
        'type' => 'Zend\Mvc\Router\Http\Segment',
        'options' => array(
            'route' => '/manage[/]',
            'defaults' => array('controller' => 'home')
        )
    ),
    'manage-home' => array(
        'type' => 'Zend\Mvc\Router\Http\Segment',
        'options' => array(
            'route' => '/manage/home[/:login]',
            'constraints' => array(
                'login'      => '[0-9]+'
            ),
            'defaults' => array('controller'=>'home')
        )
    ),
    'manage-menu' => array(
        'type' => 'Zend\Mvc\Router\Http\Segment',
        'options' => array(
            'route' => '/manage/menu[/:id]',
            'constraints' => array(
                'id'      => '[0-9]+'
            ),
            'defaults' => array('controller'=>'menu')
        )
    ),
    'manage-page' => array(
        'type' => 'Zend\Mvc\Router\Http\Segment',
        'options' => array(
            'route' => '/manage/page[/:id]',
            'constraints' => array(
                'id'      => '[0-9]+'
            ),
            'defaults' => array('controller'=>'page')
        )
    )
  )
);
