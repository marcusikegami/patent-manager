<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('patents');

        Schema::create('patents', function (Blueprint $table) {
            $table->id();
            $table->string('patent_number');
            $table->string('title');
            $table->text('abstract');
            $table->string('inventor');
            $table->dateTime('filing_date');
            $table->dateTime('issue_date');
            $table->dateTime('expiration_date');
            $table->string('status');
            $table->string('jurisdiction');
            $table->json('related_patents');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patents');
    }
};
