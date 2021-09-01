<?php
declare(strict_types=1);

use Nette\Configurator;

require __DIR__ . '/../vendor/autoload.php';

$configurator = new Configurator();

$configurator->setDebugMode(false);
$configurator->enableDebugger(__DIR__ . '/../log');

$configurator->setTimeZone('Europe/Prague');
$configurator->setTempDirectory(__DIR__ . '/../temp');
$configurator->addConfig(__DIR__ . '/config/common.neon');
//$configurator->addConfig(__DIR__ . '/config/tracy.neon');
$configurator->addConfig(__DIR__ . '/config/database.neon');
$configurator->addConfig(__DIR__ . '/config/resources.neon');
$configurator->addConfig(__DIR__ . '/config/middleware.neon');

return $configurator->createContainer();