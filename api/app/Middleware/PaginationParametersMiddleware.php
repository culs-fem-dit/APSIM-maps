<?php
declare(strict_types=1);


namespace App\Middleware;


use Contributte\Middlewares\IMiddleware;
use Nette\Utils\Json;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class PaginationParametersMiddleware implements IMiddleware
{

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param callable $next
     * @return ResponseInterface
     */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, callable $next): ResponseInterface
    {
        $parameters = $request->getQueryParams();

        if (array_key_exists('itemsPerPage', $parameters)
            && array_key_exists('page', $parameters)
            && !$this->isPaginationSetProperly($parameters)) {
            return $this->badRequestParameters($response,
                'Pagination requires these parameters: page (int, x > 0), itemsPerPage (int, x > 0)');
        }
        return $next($request, $response);
    }

    private function isPaginationSetProperly(array $parameters): bool
    {
        $page = (int) ($parameters['page'] ?? null);
        $itemsPerPage = (int) ($parameters['itemsPerPage'] ?? null);

        if (!($itemsPerPage > 0 && $page > 0)) {
            return false;
        }

        return true;
    }

    private function badRequestParameters(ResponseInterface $response, string $message): ResponseInterface
    {
        $response->getBody()->write(Json::encode([
            'code' => 400,
            'status' => 'error',
            'message' => $message,
        ]));

        return $response->withStatus(400)
            ->withHeader('Content-Type', 'application/json');
    }
}