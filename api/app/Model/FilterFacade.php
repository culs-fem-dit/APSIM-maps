<?php
declare(strict_types=1);


namespace App\Model;


use DateTimeImmutable;
use Nette\Database\Context;
use Nette\Database\Table\Selection;
use Nette\Utils\Arrays;
use Nette\Utils\Strings;

class FilterFacade implements Facade
{
    /** @var Context */
    private $db;

    /**
     * @param Context $db
     */
    public function __construct(Context $db)
    {
        $this->db = $db;
    }

    public function findAll(): Selection
    {
        return $this->db->table('map');
    }

    public function findValues(): Selection
    {
        return $this->db->table('value');
    }

    public function findSoils(): Selection
    {
        return $this->db->table('soil');
    }

    public function getSoilOptions(): array
    {
        $list = $this->findSoils()
            ->select('id AS value, label AS name')
            ->fetchAssoc('value');

        sort($list);

        return $list;
    }

    public function getVariableOptions(): array
    {
        $list = $this->findAll()
            ->select('DISTINCT variable AS value, label AS name')
            ->where('map.is_shown', 1)
            ->order('name')
            ->fetchAssoc('value');

        sort($list);

        foreach ($list as &$item) {
            $item['name'] = Strings::capitalize(Strings::replace($item['name'], '~\_~', ' '));
        }

        return $list;
    }

    public function getScenarioOptions(): array
    {
        $list = $this->findall()
            ->select('DISTINCT scenario AS value')
            ->fetchAssoc('value');

        sort($list);

        foreach ($list as &$item) {
            $item['name'] = Strings::capitalize($item['value']);
        }

        return $list;
    }

    public function getSowingWindowValues(): array
    {
        $list = $this->findall()
            ->select(':value.value')
            ->where('variable', 'sowing_window')
            ->fetchPairs('value', 'value');

        usort($list, static function ($a, $b) {
            $firstDateA = Strings::match($a, '~^(\w+)~')[1] ?? '';
            $firstDateB = Strings::match($b, '~^(\w+)~')[1] ?? '';
            $a = new DateTimeImmutable($firstDateA);
            $b = new DateTimeImmutable($firstDateB);
            return $a <=> $b;
        });

        return $list;
    }

    public function getSimulationOptions(): array
    {
        $list = $this->findValues()
            ->select('DISTINCT simulation AS value')
            ->fetchAssoc('value');

        sort($list);

        foreach ($list as &$item) {
            $item['name'] = Strings::capitalize($item['value']);
        }

        return $list;
    }

    /**
     * @param int $id
     * @return array
     */
    public function getById($id): array
    {
        return $this->findall()->get($id)->toArray();
    }

}