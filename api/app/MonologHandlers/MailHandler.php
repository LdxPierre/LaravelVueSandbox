<?php

namespace App\MonologHandlers;

use App\Mail\ErrorAlert;
use Illuminate\Support\Facades\Mail;
use Monolog\Formatter\FormatterInterface;
use Monolog\Formatter\HtmlFormatter;
use Monolog\Handler\MailHandler as HandlerMailHandler;
use Monolog\Level;

class MailHandler extends HandlerMailHandler
{
  public function send(string $content, array $records): void
  {
    try {
      Mail::to('test@test.fr')->send(new ErrorAlert($content));
    } catch (\Throwable $th) {
      // 
    }
  }

  protected function getDefaultFormatter(): FormatterInterface
  {
    return new HtmlFormatter();
  }
}
