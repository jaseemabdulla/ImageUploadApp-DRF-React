from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt,datetime
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        
        user = User.objects.filter(email = email).first()
        
        if user is None:
            raise AuthenticationFailed('user not found')
        
        if not user.check_password(password):
            raise AuthenticationFailed('password miss match')
        
        payload = {
            'id':user.id,
            'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat':datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response()
        
        response.set_cookie(key='jwt',value=token,httponly=True, samesite="none", secure=True)
        
        serializer = UserSerializer(user)
        
        response.data = {
            'jwt':token,
            'user':serializer.data
        }
        
        return response
    
    
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')    
        
        if not token:
            raise AuthenticationFailed('please login')
        
        try:
            payload = jwt.decode(token,'secret', algorithms=['HS256'])
        
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('please login again')
        
        user = User.objects.filter(id = payload['id']).first()    
        serializer = UserSerializer(user)    
        
        return Response(serializer.data)
    
 
class LogoutView(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')  
        response = Response()
        print('fffffffffffffffffffffffffffffffffffff')
        response.set_cookie(key='jwt', value=token, httponly=True, samesite="none", secure=True, max_age=0)

        response.data = {
            'messege' : 'success'
        } 
        return response
    
    
class UpdateView(APIView):
    def post(self,request):
        token = request.COOKIES.get('jwt')
        
        
        if not token:
            
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        user = User.objects.get(id = payload['id'])
        
        serializer = UserSerializer(user,data = request.data,partial=True)
        print('dddddddddddddddddddddddddddddddddd',serializer)
        
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)   
    
    
class AdminUserList(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        token = request.COOKIES.get('jwt')  
        
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        user = User.objects.all().order_by('id')
        serializer = UserSerializer(user, many = True)
        
        return Response(serializer.data)
    

class DeleteUserView(APIView):
    def post(self,request):
        tocken = request.COOKIES.get('jwt')
        id = request.data['id']
        if not tocken:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(tocken, 'secret', algorithms=['HS256'])
            
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        user = User.objects.get(id=id)
        user.delete()
        
        users = User.objects.all().order_by('id')
        serializer = UserSerializer(users, many = True)
        
        return Response(serializer.data)    
               