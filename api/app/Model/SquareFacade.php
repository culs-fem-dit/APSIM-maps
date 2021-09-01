<?php
declare(strict_types=1);


namespace App\Model;


use Nette\Database\Context;
use Nette\Database\Table\Selection;

class SquareFacade implements Facade
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

    public function findBy(array $parameters): array
    {
        return $this->findByWithPagination($this->findAll(), $parameters);
    }

    public function findAll(): Selection
    {
        return $this->db->table('square')
            ->select('*');
    }

    /**
     * @param int $id
     * @return array|null
     */
    public function getById($id): ?array
    {
        return $this->findAll()->get($id)->toArray();
    }
}