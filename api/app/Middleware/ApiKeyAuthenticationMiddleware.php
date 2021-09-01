<?php
declare(strict_types=1);


namespace App\Middleware;


use Apitte\Core\Http\ApiRequest;
use Apitte\Core\Http\ApiResponse;
use Contributte\Middlewares\IMiddleware;
use Nette\Utils\Json;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ApiKeyAuthenticationMiddleware implements IMiddleware
{

    /**
     * @param ServerRequestInterface|ApiRequest $request
     * @param ResponseInterface|ApiResponse $response
     * @param callable $next
     * @return ResponseInterface
     */
    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, callable $next): ResponseInterface
    {
        if (!$apiKey = $request->getQueryParam('apiKey', null)) {
            return $this->notAuthenticated($response, 'API key not provided');
        }

        if ($apiKey !== 'testing') {
            return $this->notAuthenticated($response, 'Unauthorized with provided API key');
        }

        return $next($request, $response);
    }

    private function notAuthenticated(ResponseInterface $response, string $message): ResponseInterface
    {
        $response->getBody()->write(Json::encode([
            'code' => 401,
            'status' => 'error',
            'message' => $message,
        ]));

        return $response->withStatus(401)
            ->withHeader('Content-Type', 'application/json');
    }
}