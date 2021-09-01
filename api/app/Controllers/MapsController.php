<?php
declare(strict_types=1);


namespace App\Controllers;


use Apitte\Core\Annotation\Controller\ControllerPath;
use Apitte\Core\Annotation\Controller\Method;
use Apitte\Core\Annotation\Controller\Path;
use Apitte\Core\Annotation\Controller\RequestMapper;
use Apitte\Core\Annotation\Controller\RequestParameter;
use Apitte\Core\Annotation\Controller\RequestParameters;
use Apitte\Core\Http\ApiRequest;
use Apitte\Core\Http\ApiResponse;
use Apitte\Core\UI\Controller\IController;
use App\Model\MapFacade;

/**
 * @ControllerPath("/maps")
 */
final class MapsController implements IController
{

    /** @var MapFacade @inject */
    public $facade;

    /**
     * @Path("/")
     * @Method("GET")
     * @RequestMapper(entity="App\Controllers\Entity\MapsFilter")
     * @param ApiRequest $request
     * @param ApiResponse $response
     * @return array
     */
    public function index(ApiRequest $request, ApiResponse $response): array
    {
        return $this->facade->findBy($request->getEntity()->toArray());
    }

    /**
     * @Path("/{id}")
     * @Method("GET")
     * @RequestParameters({
     *     @RequestParameter(name="id", type="int", description="Map ID")
     * })
     * @param ApiRequest $request
     * @param ApiResponse $response
     * @return array
     */
    public function detail(ApiRequest $request, ApiResponse $response): array
    {
        return $this->facade->getById($request->getParameter('id'));
    }
}