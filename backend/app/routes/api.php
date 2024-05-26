<?php

declare(strict_types=1);

use App\Application\Actions\Api\SaveTestAction;
use App\Application\Actions\Api\SaveTestMethodAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (Group $group) {
    $group->post('/tests', SaveTestAction::class);
    $group->post('/tests/method', SaveTestMethodAction::class);
};
