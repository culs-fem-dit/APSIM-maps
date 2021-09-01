<?php
declare(strict_types=1);


namespace App\Controllers;


use Apitte\Core\Annotation\Controller\ControllerPath;
use Apitte\Core\Annotation\Controller\Method;
use Apitte\Core\Annotation\Controller\Path;
use Apitte\Core\Annotation\Controller\RequestMapper;
use Apitte\Core\Http\ApiRequest;
use Apitte\Core\Http\ApiResponse;
use Apitte\Core\UI\Controller\IController;
use App\Model\ValueFacade;

/**
 * @ControllerPath("/values")
 */
final class ValuesController implements IController
{

    /** @var ValueFacade @inject */
    public $facade;

    /**
     * @Path("/")
     * @Method("GET")
     * @RequestMapper(entity="App\Controllers\Entity\ValuesFilter")
     * @param ApiRequest $request
     * @param ApiResponse $response
     * @return array
     */
    public function index(ApiRequest $request, ApiResponse $response): array
    {
        return $this->facade->findBy($request->getEntity()->toArray());
    }

}