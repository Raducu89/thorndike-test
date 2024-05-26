<?php

declare(strict_types=1);

namespace App\Application\Actions\Api;

use App\Domain\Service\ApiService;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Log\LoggerInterface;

class SaveTestMethodAction
{
    private ApiService $apiService;
    private LoggerInterface $logger;

    public function __construct(ApiService $apiService, LoggerInterface $logger)
    {
        $this->apiService = $apiService;
        $this->logger = $logger;
    }

    public function __invoke(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody();
        $id = $this->apiService->saveTestMethod($data);

        $response->getBody()->write(json_encode(['success' => true]));
        return $response->withHeader('Content-Type', 'application/json');
    }
}