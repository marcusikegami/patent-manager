@component('mail::message')
# Welcome to $company_name!

Hello,

Your account has been created successfully.

Here are your login details:
Email: {{ $user->email }}
Temporary Password: {{ $temporaryPassword }}

Please login using your email and temporary password. You will need to change your password after logging in for the first time.

If you have any questions or need assistance, feel free to contact our support team at support@$company_name.com.

Thank you,
The $company_name Team
@endcomponent