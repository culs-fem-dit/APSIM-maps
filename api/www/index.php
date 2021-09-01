<?php
declare(strict_types=1);

/** @var $container Nette\DI\Container  */
if (file_exists(__DIR__ . '/../.htdeployment')) {
    $container = require __DIR__ . '/../app/Bootstrap.php';
} else {
    $container = require __DIR__ . '/../app/Bootstrap.php';
}

$container->getByType(Contributte\Middlewares\Application\IApplication::class)->run();