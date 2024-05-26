<?php

declare(strict_types=1);

namespace App\Domain\Service;

use PDO;

class ApiService
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function saveTestResult(array $data): int
    {
        $totalTime = ($data['submitTime'] - $data['startTime']) / 1000;

        $points = 0;
        $points = 0;
        if ($totalTime <= 119) {
            $points = 19;
        } elseif ($totalTime <= 299 && $totalTime >= 120) {
            $points = 18 - intdiv((int)$totalTime - 119, 10);
        } else {
            $points = 0;
        }

        // Calc of adjusted points for errors and missed numbers
        $errors = count($data['selectedNumbers']) - count(array_intersect($data['selectedNumbers'], $data['controlNumbers']));
        $missed = count(array_diff($data['controlNumbers'], $data['selectedNumbers']));

        // Substract points for errors and missed numbers
        $adjustedPoints = $points - 2 * ($errors + $missed);


        $query = "INSERT INTO tests (
            age, gender, `other_gender`, ready, faculty, other_faculty,  faculty_year, test_date, 
            total_score, reaction_time, count_corect_selected_numbers, 
            count_miss_numbers, count_miss, count_additional_numers_selected, 
            resolve_method, numbers_to_find, grid_numbers, 
            timestamp_start, timestamp_submit
        ) VALUES (
            :age, :gender, :other_gender, :ready, :faculty, :other_faculty, :faculty_year, NOW(),
            :total_score, :reaction_time, :count_corect_selected_numbers,
            :count_miss_numbers, :count_miss, :count_additional_numers_selected,
            :resolve_method, :numbers_to_find, :grid_numbers, 
            FROM_UNIXTIME(:timestamp_start), FROM_UNIXTIME(:timestamp_submit)
        )";
    
        $statement = $this->pdo->prepare($query);
    
        $statement->execute([
            'age' => $data['userInfo']['age'],
            'gender' => $data['userInfo']['gender'],
            'other_gender' => $data['userInfo']['otherGender'],
            'other_faculty' => $data['userInfo']['otherFaculty'],
            'ready' => $data['userInfo']['apt'],
            'faculty' => $data['userInfo']['faculty'],
            'faculty_year' => $data['userInfo']['universityYear'],
            'total_score' => $adjustedPoints,
            'reaction_time' => ($data['submitTime'] - $data['startTime'])/1000,
            'count_corect_selected_numbers' => $data['correctNumbersCount'],
            'count_miss_numbers' => $data['missedNumbersCount'],
            'count_miss' => $data['errorsCount'],
            'count_additional_numers_selected' => $data['extraNumbersCount'],
            'resolve_method' => $data['solvingMode'],
            'numbers_to_find' => json_encode($data['controlNumbers']),
            'grid_numbers' => json_encode($data['gridNumbers']),
            'timestamp_start' => $data['startTime'] / 1000, 
            'timestamp_submit' => $data['submitTime'] / 1000,
        ]);

        return intval($this->pdo->lastInsertId());
    }
    
    public function saveTestMethod(array $data): void
    {
        $id = $data['testId'];
        $method = $data['method'];

        $query = "UPDATE tests SET `resolve_method` = :method WHERE id = :id";
        $statement = $this->pdo->prepare($query);
        $statement->execute([
            'id' => $id,
            'method' => $method,
        ]);
    }
}