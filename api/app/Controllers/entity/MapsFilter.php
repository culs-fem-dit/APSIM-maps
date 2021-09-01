<?php
declare(strict_types=1);


namespace App\Controllers\Entity;


use Apitte\Core\Mapping\Request\BasicEntity;

class MapsFilter extends BasicEntity
{
    /** @var int */
    public $id;
    /** @var int */
    public $soil;
    /** @var string */
    public $scenario;
    /** @var string */
    public $variable;
    /** @var string */
    public $label;
    /** @var string */
    public $name;
    /** @var string */
    public $type;
    /** @var string */
    public $criteria;
    /** @var bool */
    public $is_shown = 1;
    /** @var int */
    public $page;
    /** @var int */
    public $itemsPerPage;

    protected function normalize(string $property, $value)
    {
        if ($property === 'soil' || $property === 'page' || $property === 'itemsPerPage') {
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