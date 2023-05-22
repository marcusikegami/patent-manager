<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Patent;

class PatentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patents = [
            ['patent_number' => 'NL252825', 'title' => 'Innovative Methodology for Real-time Image-Based Diagnostic Analysis', 'abstract' => 'A system for real-time image-based diagnostic analysis that includes acquiring a series of images of an object to be analyzed; processing the series of images to identify one or more regions of interest; generating one or more analytical parameters for each region of interest; comparing the analytical parameters to predetermined thresholds to identify one or more abnormal conditions; and providing diagnostic output indicative of the one or more abnormal conditions.', 'inventor' => 'Alice Smith', 'filing_date' => '2019-02-01', 'issue_date' => '2022-03-28', 'expiration_date' => '2030-02-01', 'status' => 'active', 'jurisdiction' => 'PT'],
            ['patent_number' => 'US9876543', 'title' => 'Automated System for Intelligent Garbage Sorting', 'abstract' => 'The present invention provides an automated system for intelligent garbage sorting. The system includes a conveyor belt for transporting garbage, a sensor array for detecting and identifying different types of garbage, a robotic arm for sorting garbage, and a control unit for coordinating the operations of the sensor array and the robotic arm.', 'inventor' => 'Bob Johnson', 'filing_date' => '2020-05-15', 'issue_date' => '2023-03-01', 'expiration_date' => '2040-05-15', 'status' => 'active', 'jurisdiction' => 'US'],
            ['patent_number' => 'JP5432109', 'title' => 'Intelligent Traffic Control System for Smart Cities', 'abstract' => 'The present invention provides an intelligent traffic control system for smart cities. The system includes a network of traffic sensors for detecting and analyzing traffic patterns, a central control unit for coordinating traffic flow, and a communication module for transmitting real-time traffic information to vehicles and pedestrians.', 'inventor' => 'Emily Lee', 'filing_date' => '2021-08-01', 'issue_date' => '2024-06-15', 'expiration_date' => '2041-08-01', 'status' => 'active', 'jurisdiction' => 'JP'],
            ['patent_number' => 'CN1357901', 'title' => 'Intelligent Agricultural Monitoring System', 'abstract' => 'The present invention provides an intelligent agricultural monitoring system. The system includes a network of sensors for monitoring soil moisture, temperature, and nutrient levels, a central control unit for analyzing the sensor data and making irrigation and fertilization decisions, and a mobile app for providing farmers with real-time monitoring and control capabilities.', 'inventor' => 'David Chen', 'filing_date' => '2019-11-15', 'issue_date' => '2022-09-01', 'expiration_date' => '2039-11-15', 'status' => 'active', 'jurisdiction' => 'CN'],
            ['patent_number' => 'US8765432', 'title' => 'Virtual Reality Fitness System', 'abstract' => 'The present invention provides a virtual reality fitness system. The system includes a headset with integrated sensors for tracking head movement and orientation, a virtual reality environment for immersive exercise experiences, and a control unit for monitoring and recording fitness data.', 'inventor' => 'Grace Wang', 'filing_date' => '2020-02-14', 'issue_date' => '2023-12-01', 'expiration_date' => '2040-02-14', 'status' => 'active', 'jurisdiction' => 'US'],
            ['patent_number' => 'KR9876543', 'title' => 'Smart Contact Lens with Integrated Biosensors', 'abstract' => 'The present invention provides a smart contact lens with integrated biosensors. The lens includes a miniature biosensor array for monitoring glucose levels, blood pressure, and other physiological parameters, a wireless communication module for transmitting the sensor data to a mobile app, and a rechargeable battery.', 'inventor' => 'James Kim', 'filing_date' => '2021-06-30', 'issue_date' => '2024-04-15', 'expiration_date' => '2041-06-30', 'status' => 'active', 'jurisdiction' => 'KR'],
            ['patent_number' => 'DE1234567', 'title' => 'Smart Waste Management System for Urban Areas', 'abstract' => 'The present invention provides a smart waste management system for urban areas. The system includes a network of smart trash cans for detecting and segregating different types of waste, a central control unit for monitoring and optimizing waste collection routes, and a mobile app for providing citizens with real-time information on waste collection schedules.', 'inventor' => 'Sophie Mueller', 'filing_date' => '2020-11-15', 'issue_date' => '2023-09-01', 'expiration_date' => '2040-11-15', 'status' => 'active', 'jurisdiction' => 'DE'],
            ['patent_number' => 'EP246810', 'title' => 'Intelligent Home Automation System', 'abstract' => 'The present invention provides an intelligent home automation system. The system includes a central control unit for coordinating various smart home devices, such as lighting, heating, and security systems, based on user preferences and activity patterns, a voice-controlled personal assistant for controlling the devices, and a mobile app for remote monitoring and control.', 'inventor' => 'Alexandre Dupont', 'filing_date' => '2018-06-01', 'issue_date' => '2021-03-15', 'expiration_date' => '2038-06-01', 'status' => 'active', 'jurisdiction' => 'EP']
        ];

        foreach ($patents as $patent) {
            Patent::create([
                'patent_number' => $patent['patent_number'],
                'title' => $patent['title'],
                'abstract' => $patent['abstract'],
                'inventor' => $patent['inventor'],
                'filing_date' => $patent['filing_date'],
                'issue_date' => $patent['issue_date'],
                'expiration_date' => $patent['expiration_date'],
                'status' => $patent['status'],
                'jurisdiction' => $patent['jurisdiction'],
            ]);
        }
    }
}
