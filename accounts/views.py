from accounts.forms import (
    SignUpForm,
    EditProfileForm
)
from accounts.models import User
from django.urls import reverse_lazy
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import (
    UserChangeForm,
    PasswordChangeForm
)

#from allauth.account.views import SignupView, LoginView, LogoutView
from django.contrib.auth.views import (
    update_session_auth_hash,
    LoginView,
    LogoutView
)


def SignUp(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('accounts:view_profile')
        else:
            return redirect('accounts:change_password')
    else:
        form = SignUpForm()
        args = {'form' : form}
        return render(request, 'home/account/signup.html', args)

@login_required
def ViewProfile(request):
    args = {'user': request.user}
    return render(request, 'home/account/profile.html', args)

@login_required
def EditProfile(request):
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=request.user)

        if form.is_valid():
            form.save()
            return redirect('/accounts/profile')
    else:
        form = EditProfileForm(instance=request.user)
        args = {'form' : form}
        return render(request, 'home/account/edit_profile.html', args)

@login_required
def ChangePassword(request):
    if request.method == 'POST':
        form = PasswordChangeForm(data=request.POST, user=request.user)

        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            return redirect('accounts:view_profile')
        else:
            return redirect('accounts:change_password')
    else:
        form = PasswordChangeForm(user=request.user)
        args = {'form' : form}
        return render(request, 'home/account/password_change.html', args)

#class AirFarmsSignupView(SignupView):
#    form_class = SignUpForm
#    success_url = reverse_lazy('home')
#    template_name = 'home/account/signup.html'

class AirFarmsLoginView(LoginView):
    template_name = 'home/account/login.html'

class AirFarmsLogoutView(LogoutView):
    success_url = reverse_lazy('home')
    template_name = 'home/account/logout.html'
