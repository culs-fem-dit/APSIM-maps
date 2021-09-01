<?php
declare(strict_types=1);


namespace App\Model;


use Apitte\Core\Exception\Api\ClientErrorException;
use Nette\Database\Context;
use Nette\Database\Table\ActiveRow;
use Nette\Database\Table\IRow;
use Nette\Database\Table\Selection;
use Nette\Http\IResponse;
use Nette\NotImplementedException;
use Nette\Utils\Arrays;
use Nette\Utils\Strings;
use Psr\Http\Message\ResponseInterface;

class ValueFacade implements Facade
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

    /**
     * @param string $id
     * @return array|null
     */
    public function getById($id): ?array
    {
        $value = $this->findAll()->get($id);

        if ($value) {
            return $value->toArray();
        }

        return null;
    }

    public function findAll(): Selection
    {
        return $this->db->table('value');
    }

    public function findBy(array $parameters): array
    {
        if (!array_key_exists('simulation', $parameters) || $parameters['simulation'] === '') {
            throw new ClientErrorException('Simulation parameter is missing ಗಾ ﹏ ಗಾ', IResponse::S400_BAD_REQUEST);
        }

        $simulation = $parameters['simulation'];
        unset($parameters['simulation']);

        $variablesToIgnoreForExtremes = ['sowing_window'];

        $parameters = $this->processParametersToMapConditions($parameters); //eg: map_id -> map.id

        $mapInfo = $this->getMapInfo($parameters);
        if (!$mapInfo) {
            return ['No results'];
        }

        if (!in_array($mapInfo->variable, $variablesToIgnoreForExtremes, true)) {
            $mapExtremes = $this->getMapExtremes($mapInfo['id']);
        }

        $squares = $this->findSquareValuesBy(Arrays::mergeTree($parameters, ['simulation' => $simulation]));

        if (!$squares) {
            throw new ClientErrorException('No values found by given simulation ಗಾ ﹏ ಗಾ', IResponse::S404_NOT_FOUND);
        }

        $toMerge['mapInfo'] = $mapInfo->toArray();
        $toMerge['mapInfo']['simulation'] = $simulation;

        if (isset($mapExtremes)) {
            $toMerge[]['extremes']['local'] = Arrays::map($mapExtremes->toArray(), static function ($value) {
                return (double)$value;
            });

            if (array_key_exists('map.variable', $parameters)) {
                $toMerge[]['extremes']['global'] = $this->getExtremesByVariable($parameters['map.variable']);
            }
        }

        $squares = $this->normalizeSquareValues($squares);
        sort($squares);
        $toMerge[]['squares'] = $squares;

        $merged = [];
        foreach ($toMerge as $array) {
            $merged = Arrays::mergeTree($merged, $array);
        }

        return $merged;
    }

    private function processParametersToMapConditions(array $parameters): array
    {
        $conditions = [];
        foreach ($parameters as $parameter => $value) {
            if ($parameter !== 'is_shown' && Strings::contains($parameter, '_')) {
                $parameter = Strings::replace($parameter, '~\_~', '.');
                $conditions[$parameter] = $value;
            } else {
                $conditions["map.{$parameter}"] = $value;
            }
        }

        return $conditions;
    }

    public function getExtremesByVariable(string $variable): array
    {
        $squares = $this->db->table('value')
            ->select('map.id, MAX(CAST(value AS DECIMAL(65,30))) AS max, MIN(CAST(value AS DECIMAL(65,30))) AS min')
            ->where('map.variable', $variable)
            ->fetchAssoc('id');

        $corrected = [];
        foreach ($squares as $square) {
            $corrected += $square;
        }
        unset($corrected['id']);

        return Arrays::map($corrected, static function ($value) {
            return (double)$value;
        });
    }

    private function normalizeSquareValues(array $array): array
    {
        return Arrays::map($array, static function ($item) {
            $normalizedItem = Arrays::map($item, static function ($value, $key) {
                if ($key !== 'id' && !Strings::contains((string)$value, '-')) {
                    $value = (double)$value;
                }
                return $value;
            });
            return $normalizedItem;
        });
    }

    /**
     * @param array $parameters
     * @return \Nette\Database\IRow|ActiveRow|null
     */
    protected function getMapInfo(array $parameters)
    {
        return $this->db->table('value')
            ->select('map.*')
            ->where($parameters)
            ->limit(1)
            ->fetch();
    }

    /**
     * @param int $mapId
     * @return IRow|ActiveRow|null
     */
    protected function getMapExtremes(int $mapId)
    {
        return $this->db->table('value')
            ->select('MAX(CAST(value AS DECIMAL(65,30))) AS max, MIN(CAST(value AS DECIMAL(65,30))) AS min')
            ->where('map_id', $mapId)
            ->fetch();
    }

    protected function findSquareValuesBy(array $parameters): array
    {
        return $this->db->table('value')
            ->select('square.id, north, east, south, west, lat, lng, value, simulation')
            ->where($parameters)
            ->limit(311)
            ->fetchAssoc('id');
    }
}