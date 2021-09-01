<?php
declare(strict_types=1);


namespace App\Controllers\Entity;


use Apitte\Core\Mapping\Request\BasicEntity;

class ValuesFilter extends BasicEntity
{
    /** @var int */
    public $map_id;
    /** @var int */
    public $square_id;
    /** @var int */
    public $soil;
    /** @var string */
    public $scenario;
    /** @var string */
    public $variable;
    /** @var string */
    public $name;
    /** @var string */
    public $type;
    /** @var string */
    public $criteria;
    /** @var string */
    public $value;
    /** @var string */
    public $simulation;
    /** @var bool */
    public $is_shown = 1;

    protected function normalize(string $property, $value)
    {
        if ($property === 'soil') {
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