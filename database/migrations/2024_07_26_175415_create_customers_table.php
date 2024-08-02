<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->check("type IN ('individual', 'company')");
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country')->nullable();
            $table->string('tax_id')->nullable();
            $table->string('preferred_currency')->default('EUR');
            $table->date('customer_since')->nullable();
            $table->foreignId('account_manager_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('status')->default('active')->check("status IN ('active', 'inactive', 'prospect')");
            $table->text('notes')->nullable();
            $table->text('custom_fields')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
