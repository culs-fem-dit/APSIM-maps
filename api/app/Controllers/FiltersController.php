<?php
declare(strict_types=1);


namespace App\Controllers;


use Apitte\Core\Annotation\Controller\ControllerPath;
use Apitte\Core\Annotation\Controller\Method;
use Apitte\Core\Annotation\Controller\Path;
use Apitte\Core\UI\Controller\IController;
use App\Model\FilterFacade;

/**
 * @ControllerPath("/filters")
 */
final class FiltersController implements IController
{

    /** @var FilterFacade @inject */
    public $facade;

    /**
     * @Path("/")
     * @Method("GET")
     * @return array
     */
    public function index(): array
    {
        return [
            'variables' => $this->facade->getVariableOptions(),
            'soils' => $this->facade->getSoilOptions(),
            'scenarios' => $this->facade->getScenarioOptions()
        ];
    }

    /**
     * @Path("/dates")
     * @Method("GET")
     * @return array
     */
    public function sowingWindowValues(): array
    {
        return $this->facade->getSowingWindowValues();
    }

    /**
     * @Path("/soils")
     * @Method("GET")
     * @return array
     */
    public function soils(): array
    {
        return $this->facade->getSoilOptions();
    }

    /**
     * @Path("/variables")
     * @Method("GET")
     * @return array
     */
    public function variables(): array
    {
        return $this->facade->getVariableOptions();
    }

    /**
     * @Path("/simulations")
     * @Method("GET")
     * @return array
     */
    public function simulations(): array
    {
        return $this->facade->getSimulationOptions();
    }


    /**
     * @Path("/scenarios")
     * @Method("GET")
     * @return array
     */
    public function scenarios(): array
    {
        return $this->facade->getScenarioOptions();
    }
}