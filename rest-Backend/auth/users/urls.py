from django.urls import path
from .views import Register,LoginView,UserView,LogoutView,UpdateView,AdminUserList,DeleteUserView

urlpatterns = [
    
    path('register', Register.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('update', UpdateView.as_view()),
    path('admin', AdminUserList.as_view()),
    path('userdelete', DeleteUserView.as_view()),
]
