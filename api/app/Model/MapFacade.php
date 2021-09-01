<?php
declare(strict_types=1);


namespace App\Model;


use Nette\Database\Context;
use Nette\Database\Table\Selection;

class MapFacade implements Facade
{
    use TPaginationFacade;

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
        return $this->db->table('map')
            ->select('*');
    }

    public function findBy(array $parameters): array
    {
        return $this->findByWithPagination($this->findAll(), $parameters);
    }

    /**
     * @param int $id
     * @return array
     */
    public function getById($id): array
    {
        return $this->findAll()->get($id)->toArray();
    }

}