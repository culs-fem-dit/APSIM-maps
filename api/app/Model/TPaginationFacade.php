<?php
declare(strict_types=1);


namespace App\Model;


use Nette\Database\Table\Selection;

trait TPaginationFacade
{
    protected function findByWithPagination(Selection $selection, array $conditions): array
    {
        if ($this->shouldUsePagination($conditions)) {
            return $this->findResultsWithPagination($selection, $conditions);
        }
        unset($conditions['page'], $conditions['itemsPerPage']);

        $sorted = $selection
            ->where($conditions)
            ->fetchAssoc('id');

        sort($sorted);

        return $sorted;
    }

    private function findResultsWithPagination(Selection $selection, array $conditions): array
    {
        $page = $conditions['page'];
        $itemsPerPage = $conditions['itemsPerPage'];
        unset($conditions['page'], $conditions['itemsPerPage']);

        $sorted = $selection
            ->page($page, $itemsPerPage, $numOfPages)
            ->where($conditions)
            ->fetchAssoc('id');

        sort($sorted);

        return [
            'page' => $page,
            'itemsPerPage' => $itemsPerPage,
            'numOfPages' => $numOfPages,
            'items' => $sorted
        ];
    }

    private function shouldUsePagination(array $parameters): bool
    {
        return array_key_exists('itemsPerPage', $parameters) && array_key_exists('page', $parameters);
    }

}