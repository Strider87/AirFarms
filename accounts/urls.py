from django.urls import path
from . import views
from django.urls import reverse_lazy
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView
)

app_name = 'accounts'

urlpatterns = [
    path('signup/', views.SignUp, name='signup'),
    path('login/', views.AirFarmsLoginView.as_view(), name='login'),
    path('logout/', views.AirFarmsLogoutView.as_view(), name='logout'),
    path('profile/', views.ViewProfile, name='view_profile'),
    path('profile/edit', views.EditProfile, name='edit_profile'),
    path('change_password/', views.ChangePassword, name='change_password'),
    path('reset_password/', PasswordResetView.as_view(
                            template_name='home/account/password_reset.html',
                            email_template_name='home/account/password_reset_email.html',
                            success_url=reverse_lazy('accounts:password_reset_done'),
                            subject_template_name='home/account/email/password_reset_key_subject.txt',
                        ), name='reset_password'),
    path('reset_password/done/', PasswordResetDoneView.as_view(
                            template_name='home/account/password_reset_done.html'
                        ), name='password_reset_done'),
    path('reset_password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(
                            template_name='home/account/password_set.html',
                            success_url=reverse_lazy('accounts:password_reset_complete'),
                        ), name='password_reset_confirm'),
    path('reset_password/complete/', PasswordResetCompleteView.as_view(
                            template_name='home/account/password_reset_from_key_done.html'
                        ), name='password_reset_complete'),
]
