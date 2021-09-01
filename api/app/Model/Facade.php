<?php
declare(strict_types=1);


namespace App\Model;


use Nette\Database\Table\Selection;

interface Facade
{
    public function getById($id): ?array;
    public function findAll(): Selection;
}