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
            $table->date('filing_date');
            $table->date('issue_date');
            $table->date('expiration_date');
            $table->string('status');
            $table->string('jurisdiction');
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
