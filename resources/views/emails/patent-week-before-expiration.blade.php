@component('mail::message')
# Welcome to {{ env('APP_NAME') }}!

Hello,

{{ $patents->count() }} patent{{ $patents->count() > 1 ? 's' : ''}} will expire one week from today.

## Here is the list of patents that will expire one week from today:
@foreach ($patents as $patent)
# {{ $patent->title }} : {{ $patent->patent_number }}
@endforeach

If you have any questions or need assistance, feel free to contact our support team at support@$company_name.com.

Thank you,
The {{ env('APP_NAME') }} Team
@endcomponent