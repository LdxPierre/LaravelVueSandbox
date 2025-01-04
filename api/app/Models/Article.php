<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    static function getId(): string
    {
        throw new Exception("Error Processing Request", 1);

        return "";
    }
}
