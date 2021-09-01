<?php
declare(strict_types=1);


namespace App\Controllers\Entity;


use Apitte\Core\Mapping\Request\BasicEntity;

class SquaresFilter extends BasicEntity
{
    /** @var string */
    public $id;
    /** @var int */
    public $page;
    /** @var int */
    public $itemsPerPage;

    protected function normalize(string $property, $value)
    {
        if ($property === 'page' || $property === 'itemsPerPage') {
            if (is_array($value)) {
                $values = [];
                foreach ($value as $v) {
                    $values[] = (int)$v;
                }
                return $values;
            }
            return (int)$value;
        }
        return parent::normalize($property, $value);
    }
}