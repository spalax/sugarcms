<?php
return array(
  'routes' => array(
    'manage-default' => array(
        'type' => 'Zend\Mvc\Router\Http\Segment',
        'options' => array(
            'route' => '/manage[/]',
            'constraints' => array(
                 'login' => '[0-9]+'
            ),
            'defaults' => array('controller' => 'home')
        )
    ),
    'manage-login' => array(
      'type' => 'Zend\Mvc\Router\Http\Segment',
      'options' => array(
          'route' => '/manage/login.json',
          'defaults' => array('controller' => 'login')
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
            'route' => '/manage/page[/:id][/]',
            'constraints' => array(
                'id'      => '[0-9]+'
            ),
            'defaults' => array('controller'=>'page')
        )
    )
  )
);
